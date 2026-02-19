'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/lib/i18n/context';
import Sidebar from '@/components/Sidebar';
// XLSX 動態 import（避免影響首次載入效能）
import {
  createInviteCode,
  getInviteCodesByCourse,
  isAdmin,
  InviteCode,
} from '@/lib/firebase/inviteCodes';
import {
  getAllCourses,
  getOrCreateCourse,
  updateCourseStudentCount,
  Course,
} from '@/lib/firebase/courses';

// Excel 行資料結構
interface ExcelRow {
  course: string;
  name: string;
  email: string;
}

export default function AdminPage() {
  // 狀態
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<InviteCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; count: number } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { t, language } = useLanguage();

  // 檢查是否為 Admin
  useEffect(() => {
    async function checkAdminStatus() {
      if (authLoading) return;

      if (!user) {
        router.push('/');
        return;
      }

      const adminStatus = await isAdmin(user.uid, user.email || undefined);
      if (!adminStatus) {
        router.push('/dashboard');
        return;
      }

      setIsAdminUser(true);
      loadCourses();
    }

    checkAdminStatus();
  }, [user, authLoading, router]);

  // 載入課程列表
  const loadCourses = async () => {
    setLoading(true);
    try {
      const courseList = await getAllCourses();
      setCourses(courseList);
    } catch (err) {
      console.error('載入課程失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  // 載入選中課程的學員
  const loadStudents = useCallback(async (course: Course) => {
    try {
      const studentList = await getInviteCodesByCourse(course.id);
      setStudents(studentList);
    } catch (err) {
      console.error('載入學員失敗:', err);
      setStudents([]);
    }
  }, []);

  // 選擇課程
  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    loadStudents(course);
  };

  // 解析 Excel 檔案
  const parseExcel = async (file: File): Promise<ExcelRow[]> => {
    const XLSX = await import('xlsx');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
            header: 1,
            range: 1, // 跳過標題列
          });

          const parsedRows: ExcelRow[] = (rows as unknown[][])
            .filter(row => Array.isArray(row) && row.length >= 3 && row[0] && row[1] && row[2])
            .map(row => ({
              course: String(row[0]).trim(),
              name: String(row[1]).trim(),
              email: String(row[2]).trim(),
            }));

          resolve(parsedRows);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // 處理檔案上傳
  const handleFileUpload = async (file: File) => {
    if (!user) return;

    setImporting(true);
    setImportResult(null);

    try {
      const rows = await parseExcel(file);

      if (rows.length === 0) {
        setImportResult({ success: false, count: 0 });
        return;
      }

      // 按課程分組
      const courseGroups: Record<string, ExcelRow[]> = {};
      for (const row of rows) {
        if (!courseGroups[row.course]) {
          courseGroups[row.course] = [];
        }
        courseGroups[row.course].push(row);
      }

      let totalImported = 0;

      // 對每個課程進行處理
      for (const [courseName, students] of Object.entries(courseGroups)) {
        // 取得或建立課程
        const course = await getOrCreateCourse(courseName, user.uid);

        // 為每個學員建立註冊碼
        for (const student of students) {
          try {
            await createInviteCode(student.name, student.email, user.uid, course.id);
            totalImported++;
          } catch (err) {
            // 如果已存在，忽略錯誤
            console.warn('建立註冊碼失敗（可能已存在）:', err);
          }
        }

        // 更新課程學員數量
        const updatedStudents = await getInviteCodesByCourse(course.id);
        await updateCourseStudentCount(course.id, updatedStudents.length);
      }

      setImportResult({ success: true, count: totalImported });
      await loadCourses();
    } catch (err) {
      console.error('匯入失敗:', err);
      setImportResult({ success: false, count: 0 });
    } finally {
      setImporting(false);
    }
  };

  // 處理拖放
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        handleFileUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // 複製註冊碼
  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  // 格式化時間（根據當前語言動態選擇 locale）
  const formatDate = (timestamp: Course['createdAt'] | InviteCode['createdAt']) => {
    if (!timestamp) return '-';
    const localeMap: Record<string, string> = {
      'zh-TW': 'zh-TW',
      'zh-CN': 'zh-CN',
      'en': 'en-US',
      'ms': 'ms-MY',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
    };
    const date = timestamp.toDate();
    return date.toLocaleDateString(localeMap[language] || 'zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Loading 狀態
  if (authLoading || loading || !isAdminUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div role="status" aria-label="Loading" className="text-gray-500">{t.common?.loading || '載入中...'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 lg:ml-0 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* 管理員警告 */}
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {t.admin?.adminWarning || '此為管理員專用頁面，所有操作皆有記錄。請確保 Firestore Security Rules 已正確設定以保護資料安全。'}
            </p>
          </div>

          {/* 標題 */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {t.admin?.title || '管理後台'}
            </h1>
            <p className="text-gray-600 mt-1">
              {t.admin?.inviteCodes || '註冊碼管理'}
            </p>
          </div>

          {/* Excel 上傳區塊 */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t.admin?.uploadExcel || '上傳 Excel'}
            </h2>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />

              {importing ? (
                <div role="status" aria-label="Importing" className="text-gray-600">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  {t.admin?.importing || '匯入中...'}
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-2">📤</div>
                  <p className="text-gray-600 mb-1">
                    {t.admin?.dragDropHint || '拖曳 Excel 檔案到此處，或點擊選擇檔案'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.admin?.supportedFormats || '支援格式：.xlsx, .xls'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {t.admin?.excelFormat || 'Excel 欄位格式：課程日期/名稱、姓名、Email'}
                  </p>
                </>
              )}
            </div>

            {/* 匯入結果 */}
            {importResult && (
              <div
                role="alert"
                className={`mt-4 p-3 rounded-lg ${
                  importResult.success
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {importResult.success
                  ? (t.admin?.importSuccess || '成功匯入 {count} 位學員').replace(
                      '{count}',
                      String(importResult.count)
                    )
                  : t.admin?.importError || '匯入失敗'}
              </div>
            )}
          </div>

          {/* 課程列表 + 學員名單 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左側：課程列表 */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                📚 {t.admin?.courseList || '課程列表'}
              </h2>

              {courses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {t.admin?.noCourses || '尚無課程'}
                </p>
              ) : (
                <div className="space-y-2">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleSelectCourse(course)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCourse?.id === course.id
                          ? 'bg-blue-50 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="font-medium text-gray-900 truncate">
                        {course.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {course.studentCount} {t.admin?.students || '位學員'}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 右側：學員名單 */}
            <div className="card lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                📋 {t.admin?.studentList || '學員名單'}
                {selectedCourse && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    - {selectedCourse.name}
                  </span>
                )}
              </h2>

              {!selectedCourse ? (
                <p className="text-gray-500 text-center py-8">
                  {t.admin?.selectCourse || '請選擇課程查看學員'}
                </p>
              ) : students.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {t.admin?.noStudents || '此課程尚無學員'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          {t.admin?.studentName || '姓名'}
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          {t.admin?.inviteCodes || '註冊碼'}
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          {t.admin?.status || '狀態'}
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          {t.admin?.copyCode || '操作'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-gray-900">
                            {student.name}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {student.email}
                          </td>
                          <td className="py-3 px-4">
                            <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono text-sm">
                              {student.code}
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                student.status === 'used'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {student.status === 'used'
                                ? t.admin?.used || '已使用'
                                : t.admin?.unused || '未使用'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleCopyCode(student.code, student.id)}
                              aria-label={`${t.admin?.copyCode || 'Copy'} ${student.code}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              disabled={student.status === 'used'}
                            >
                              {copiedId === student.id
                                ? t.common?.copied || '已複製!'
                                : t.admin?.copyCode || '複製'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
