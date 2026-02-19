import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  serverTimestamp,
  Timestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';

// 課程資料結構
export interface Course {
  id: string;
  name: string;           // 課程名稱（含日期）
  date: Timestamp;        // 課程日期
  studentCount: number;   // 學員數量
  createdAt: Timestamp;
  createdBy: string;      // Admin UID
}

// Collection 路徑常數
const COURSES_COLLECTION = 'courses';

// 檢查 Firestore 是否可用
function checkDb() {
  if (!db) {
    throw new Error('Firestore 未初始化。請確認環境變數已正確設定。');
  }
  return db;
}

/**
 * 建立新課程
 * @param name - 課程名稱（含日期）
 * @param date - 課程日期
 * @param adminUid - 管理員 UID
 * @returns 新建立的課程
 */
export async function createCourse(
  name: string,
  date: Date,
  adminUid: string
): Promise<Course> {
  const firestore = checkDb();

  try {
    const id = `course_${Date.now()}`;

    const courseData = {
      id,
      name: name.trim(),
      date: Timestamp.fromDate(date),
      studentCount: 0,
      createdAt: serverTimestamp(),
      createdBy: adminUid,
    };

    const docRef = doc(firestore, COURSES_COLLECTION, id);
    await setDoc(docRef, courseData);

    return {
      ...courseData,
      createdAt: Timestamp.now(),
    } as Course;
  } catch (error) {
    console.error('建立課程失敗:', error);
    throw new Error('無法建立課程，請稍後再試');
  }
}

/**
 * 取得所有課程列表
 */
export async function getAllCourses(): Promise<Course[]> {
  const firestore = checkDb();

  try {
    const q = query(
      collection(firestore, COURSES_COLLECTION),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as Course);
  } catch (error) {
    console.error('取得課程列表失敗:', error);
    throw new Error('無法取得課程列表');
  }
}

/**
 * 根據 ID 取得課程
 * @param courseId - 課程 ID
 */
export async function getCourseById(courseId: string): Promise<Course | null> {
  const firestore = checkDb();

  try {
    const docRef = doc(firestore, COURSES_COLLECTION, courseId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as Course;
  } catch (error) {
    console.error('取得課程失敗:', error);
    return null;
  }
}

/**
 * 根據名稱查詢課程（用於檢查是否已存在）
 * @param name - 課程名稱
 */
export async function getCourseByName(name: string): Promise<Course | null> {
  const firestore = checkDb();

  try {
    const q = query(
      collection(firestore, COURSES_COLLECTION),
      where('name', '==', name.trim())
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs[0].data() as Course;
  } catch (error) {
    console.error('查詢課程失敗:', error);
    return null;
  }
}

/**
 * 更新課程學員數量
 * @param courseId - 課程 ID
 * @param count - 學員數量
 */
export async function updateCourseStudentCount(
  courseId: string,
  count: number
): Promise<void> {
  const firestore = checkDb();

  try {
    const docRef = doc(firestore, COURSES_COLLECTION, courseId);
    await updateDoc(docRef, {
      studentCount: count,
    });
  } catch (error) {
    console.error('更新課程學員數失敗:', error);
    throw new Error('無法更新課程學員數');
  }
}

/**
 * 取得或建立課程（用於批次匯入）
 * @param name - 課程名稱
 * @param adminUid - 管理員 UID
 * @returns 課程（現有或新建）
 */
export async function getOrCreateCourse(
  name: string,
  adminUid: string
): Promise<Course> {
  // 先查詢是否已存在
  const existing = await getCourseByName(name);
  if (existing) {
    return existing;
  }

  // 不存在則建立新課程
  // 嘗試從名稱解析日期（格式：2026/04/11 課程名稱）
  const dateMatch = name.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  let courseDate = new Date();

  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    courseDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  return await createCourse(name, courseDate, adminUid);
}
