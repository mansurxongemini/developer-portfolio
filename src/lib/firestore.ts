// Firestore Data Service — CRUD operations for dynamic content
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  Timestamp,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// ==================== TYPES ====================

export type ArticleStatus = "draft" | "published";

export interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  tags: string[];
  category: "blog" | "analysis" | "project";
  status: ArticleStatus;
  image?: string;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  views: number;
  locale: "uz" | "en" | "ru";
}

export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  image?: string;
  link?: string;
  status: ArticleStatus;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnalyticsEvent {
  id?: string;
  type: "pageview" | "session_start" | "session_end";
  path: string;
  referrer?: string;
  userAgent?: string;
  sessionId: string;
  timestamp?: Date;
  duration?: number; // seconds for session_end
}

// ==================== COLLECTIONS ====================

const ARTICLES_COLLECTION = "articles";
const PROJECTS_COLLECTION = "projects";
const ANALYTICS_COLLECTION = "analytics";

// ==================== ARTICLES CRUD ====================

export async function getArticles(
  category?: Article["category"],
  status?: ArticleStatus,
  locale?: string,
): Promise<Article[]> {
  const constraints = [];
  if (category) constraints.push(where("category", "==", category));
  if (status) constraints.push(where("status", "==", status));
  if (locale) constraints.push(where("locale", "==", locale));
  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, ARTICLES_COLLECTION), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const q = query(collection(db, ARTICLES_COLLECTION), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...convertTimestamps(docSnap.data()) } as Article;
}

export async function createArticle(article: Omit<Article, "id" | "createdAt" | "updatedAt" | "views">): Promise<string> {
  const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
    ...article,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: article.status === "published" ? serverTimestamp() : null,
  });
  return docRef.id;
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<void> {
  const docRef = doc(db, ARTICLES_COLLECTION, id);
  const updateData: Record<string, unknown> = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  if (data.status === "published" && !data.publishedAt) {
    updateData.publishedAt = serverTimestamp();
  }
  await updateDoc(docRef, updateData);
}

export async function deleteArticle(id: string): Promise<void> {
  await deleteDoc(doc(db, ARTICLES_COLLECTION, id));
}

export async function incrementArticleViews(id: string): Promise<void> {
  const docRef = doc(db, ARTICLES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const currentViews = docSnap.data().views || 0;
    await updateDoc(docRef, { views: currentViews + 1 });
  }
}

// ==================== PROJECTS CRUD ====================

export async function getProjects(status?: ArticleStatus): Promise<Project[]> {
  const constraints = [];
  if (status) constraints.push(where("status", "==", status));
  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, PROJECTS_COLLECTION), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Project[];
}

export async function createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...project,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: project.status === "published" ? serverTimestamp() : null,
  });
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
}

// ==================== ANALYTICS ====================

export async function trackPageView(path: string, sessionId: string, referrer?: string): Promise<void> {
  await addDoc(collection(db, ANALYTICS_COLLECTION), {
    type: "pageview",
    path,
    sessionId,
    referrer: referrer || "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp: serverTimestamp(),
  });
}

export async function trackSessionEnd(sessionId: string, duration: number): Promise<void> {
  await addDoc(collection(db, ANALYTICS_COLLECTION), {
    type: "session_end",
    path: "",
    sessionId,
    duration,
    timestamp: serverTimestamp(),
  });
}

export async function getAnalyticsData(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const q = query(
    collection(db, ANALYTICS_COLLECTION),
    where("timestamp", ">=", Timestamp.fromDate(startDate)),
    orderBy("timestamp", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as AnalyticsEvent[];
}

// ==================== HELPERS ====================

function convertTimestamps(data: DocumentData): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate();
    } else {
      result[key] = value;
    }
  }
  return result;
}
