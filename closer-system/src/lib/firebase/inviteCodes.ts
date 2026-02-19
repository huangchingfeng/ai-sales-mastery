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

// 註冊碼資料結構
export interface InviteCode {
  id: string;
  code: string;           // 6 位數註冊碼
  email: string;          // 對應的學員 Email
  name: string;           // 學員姓名
  status: 'unused' | 'used';  // 使用狀態
  createdAt?: Timestamp;  // 建立時間
  usedAt?: Timestamp;     // 使用時間
  createdBy?: string;     // 建立者 (admin uid)
  courseId?: string;      // 對應課程 ID
}

// Collection 路徑常數
const INVITE_CODES_COLLECTION = 'inviteCodes';

// 檢查 Firestore 是否可用
function checkDb() {
  if (!db) {
    throw new Error('Firestore 未初始化。請確認環境變數已正確設定。');
  }
  return db;
}

/**
 * 產生 6 位數隨機註冊碼
 */
function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}

/**
 * 建立新的註冊碼
 * @param name - 學員姓名
 * @param email - 學員 Email
 * @param adminUid - 管理員 UID
 * @param courseId - 課程 ID（選填）
 * @returns 新建立的註冊碼
 */
export async function createInviteCode(
  name: string,
  email: string,
  adminUid: string,
  courseId?: string
): Promise<InviteCode> {
  const firestore = checkDb();

  try {
    // 檢查是否已有該 email + courseId 的未使用註冊碼
    const existingCode = await getInviteCodeByEmailAndCourse(email, courseId);
    if (existingCode && existingCode.status === 'unused') {
      throw new Error('此 Email 在此課程已有未使用的註冊碼');
    }

    const code = generateCode();
    const id = `${Date.now()}_${code}`;

    const inviteCode: Omit<InviteCode, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      id,
      code,
      email: email.toLowerCase().trim(),
      name: name.trim(),
      status: 'unused',
      createdAt: serverTimestamp(),
      createdBy: adminUid,
      ...(courseId && { courseId }),
    };

    const docRef = doc(firestore, INVITE_CODES_COLLECTION, id);
    await setDoc(docRef, inviteCode);

    return {
      ...inviteCode,
      createdAt: Timestamp.now(),
    } as InviteCode;
  } catch (error) {
    console.error('建立註冊碼失敗:', error);
    if ((error as Error).message.includes('已有未使用')) {
      throw error;
    }
    throw new Error('無法建立註冊碼，請稍後再試');
  }
}

/**
 * 根據 Email 取得註冊碼
 * @param email - 學員 Email
 */
export async function getInviteCodeByEmail(email: string): Promise<InviteCode | null> {
  const firestore = checkDb();

  try {
    const q = query(
      collection(firestore, INVITE_CODES_COLLECTION),
      where('email', '==', email.toLowerCase().trim())
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // 回傳最新的一個
    const docs = querySnapshot.docs.map(doc => doc.data() as InviteCode);
    docs.sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return timeB - timeA;
    });

    return docs[0];
  } catch (error) {
    console.error('查詢註冊碼失敗:', error);
    return null;
  }
}

/**
 * 驗證註冊碼是否有效
 * @param code - 註冊碼
 * @param email - Email
 * @returns 是否有效
 */
export async function validateInviteCode(code: string, email: string): Promise<{ valid: boolean; inviteCode?: InviteCode; error?: string }> {
  const firestore = checkDb();

  try {
    // 查詢符合 code 和 email 的記錄
    const q = query(
      collection(firestore, INVITE_CODES_COLLECTION),
      where('code', '==', code.toUpperCase().trim()),
      where('email', '==', email.toLowerCase().trim())
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { valid: false, error: '註冊碼無效或不符合此 Email' };
    }

    const inviteCode = querySnapshot.docs[0].data() as InviteCode;

    if (inviteCode.status === 'used') {
      return { valid: false, error: '此註冊碼已被使用' };
    }

    return { valid: true, inviteCode };
  } catch (error) {
    console.error('驗證註冊碼失敗:', error);
    return { valid: false, error: '驗證失敗，請稍後再試' };
  }
}

/**
 * 標記註冊碼為已使用
 * @param codeId - 註冊碼 ID
 */
export async function markInviteCodeAsUsed(codeId: string): Promise<void> {
  const firestore = checkDb();

  try {
    const docRef = doc(firestore, INVITE_CODES_COLLECTION, codeId);
    await updateDoc(docRef, {
      status: 'used',
      usedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('更新註冊碼狀態失敗:', error);
    throw new Error('無法更新註冊碼狀態');
  }
}

/**
 * 取得所有註冊碼列表 (Admin 用)
 */
export async function getAllInviteCodes(): Promise<InviteCode[]> {
  const firestore = checkDb();

  try {
    const q = query(
      collection(firestore, INVITE_CODES_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as InviteCode);
  } catch (error) {
    console.error('取得註冊碼列表失敗:', error);
    throw new Error('無法取得註冊碼列表');
  }
}

// Admin Email 白名單
const ADMIN_EMAILS = [
  'ai@autolab.cloud',
];

/**
 * 檢查用戶是否為 Admin（使用 Email 白名單）
 *
 * 安全限制：此為前端檢查，僅用於 UI 控制。
 * 實際的資料安全需依賴 Firestore Security Rules 來保護。
 * 請確保已設定 Firestore Rules，例如：
 *   match /inviteCodes/{docId} {
 *     allow write: if request.auth != null
 *       && request.auth.token.email in ['ai@autolab.cloud'];
 *   }
 *
 * @param userId - 用戶 UID（未使用，保留參數相容性）
 * @param email - 用戶 Email
 */
export async function isAdmin(userId: string, email?: string): Promise<boolean> {
  // 如果直接傳入 email，用 email 檢查
  if (email) {
    return ADMIN_EMAILS.includes(email.toLowerCase());
  }

  // 否則從 Firebase Auth 取得 email（需要從 caller 傳入）
  // 這裡先返回 false，讓 caller 傳入 email
  return false;
}

/**
 * 根據 Email 檢查是否為 Admin
 * @param email - 用戶 Email
 */
export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * 根據 Email 和課程 ID 取得註冊碼
 * @param email - 學員 Email
 * @param courseId - 課程 ID
 */
export async function getInviteCodeByEmailAndCourse(
  email: string,
  courseId?: string
): Promise<InviteCode | null> {
  const firestore = checkDb();

  try {
    let q;
    if (courseId) {
      q = query(
        collection(firestore, INVITE_CODES_COLLECTION),
        where('email', '==', email.toLowerCase().trim()),
        where('courseId', '==', courseId)
      );
    } else {
      q = query(
        collection(firestore, INVITE_CODES_COLLECTION),
        where('email', '==', email.toLowerCase().trim())
      );
    }
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // 回傳最新的一個
    const docs = querySnapshot.docs.map(doc => doc.data() as InviteCode);
    docs.sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return timeB - timeA;
    });

    return docs[0];
  } catch (error) {
    console.error('查詢註冊碼失敗:', error);
    return null;
  }
}

/**
 * 根據課程 ID 取得所有註冊碼
 * @param courseId - 課程 ID
 */
export async function getInviteCodesByCourse(courseId: string): Promise<InviteCode[]> {
  const firestore = checkDb();

  try {
    const q = query(
      collection(firestore, INVITE_CODES_COLLECTION),
      where('courseId', '==', courseId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as InviteCode);
  } catch (error) {
    console.error('取得課程學員列表失敗:', error);
    throw new Error('無法取得課程學員列表');
  }
}
