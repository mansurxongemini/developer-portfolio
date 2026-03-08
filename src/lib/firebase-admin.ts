// Firebase Admin SDK - for server-side operations
// This is used in API routes and server components

import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set");
  }

  const parsed = JSON.parse(raw) as Record<string, string>;

  // .env files store \\n as literal two-char sequence — convert to real newlines
  if (parsed.private_key) {
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  }

  return initializeApp({
    credential: cert(parsed as unknown as ServiceAccount),
    projectId: parsed.project_id || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// Lazy initialization to avoid build-time crashes
let _adminApp: ReturnType<typeof getAdminApp> | null = null;
let _adminDb: ReturnType<typeof getFirestore> | null = null;
let _adminAuth: ReturnType<typeof getAuth> | null = null;

function getAdminAppInstance() {
  if (!_adminApp) _adminApp = getAdminApp();
  return _adminApp;
}

export function getAdminDb() {
  if (!_adminDb) {
    _adminDb = getFirestore(getAdminAppInstance());
    try {
      _adminDb.settings({ ignoreUndefinedProperties: true });
    } catch {
      // settings() can only be called once — safe to ignore if already set
    }
  }
  return _adminDb;
}

export function getAdminAuth() {
  if (!_adminAuth) _adminAuth = getAuth(getAdminAppInstance());
  return _adminAuth;
}

// Keep backward-compatible exports (lazy getters)
export const adminApp = new Proxy({} as ReturnType<typeof getAdminApp>, {
  get(_, prop) { return (getAdminAppInstance() as any)[prop]; },
});
export const adminDb = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(_, prop) { return (getAdminDb() as any)[prop]; },
});
export const adminAuth = new Proxy({} as ReturnType<typeof getAuth>, {
  get(_, prop) { return (getAdminAuth() as any)[prop]; },
});
