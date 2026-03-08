// Server-side Firestore service using Firebase Admin SDK
// Use this in API routes and server components — NOT in client components

import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

// ==================== LAZY DB ACCESSOR ====================

function getDb(): FirebaseFirestore.Firestore {
  return getAdminDb();
}

// ==================== TYPES ====================

export type ArticleStatus = "draft" | "published";

export interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  tags: string[];
  category: string;
  status: ArticleStatus;
  image?: string;
  imageUrl?: string;
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
  imageUrl?: string;
  link?: string;
  status: ArticleStatus;
  views?: number;
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
  duration?: number;
}

export interface AnalyticsEventInput {
  type: "pageview" | "session_start" | "session_end";
  path?: string;
  referrer?: string;
  userAgent?: string;
  sessionId: string;
  duration?: number;
}

export interface AdminAnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  avgSessionDurationSec: number;
  trafficSources: Array<{ source: string; visitors: number }>;
  topPages: Array<{ page: string; views: number }>;
  trend: Array<{ date: string; views: number; visitors: number; duration: number }>;
}

export type GalleryCategory =
  | "certificate"
  | "portrait"
  | "legal-work"
  | "legal-tech-event"
  | "award";

export type GalleryRatio = "landscape" | "portrait" | "square";

export interface GalleryItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  ratio: GalleryRatio;
  date: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==================== COLLECTIONS ====================

const ARTICLES = "articles";
const PROJECTS = "projects";
const GALLERY = "gallery";
const ANALYTICS = "analytics";

// ==================== HELPERS ====================

function convertTimestamps(data: FirebaseFirestore.DocumentData): Record<string, unknown> {
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

/** Remove keys whose value is undefined — Firestore rejects them */
function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) clean[k] = v;
  }
  return clean;
}

// ==================== ARTICLES CRUD ====================

export async function getArticles(
  category?: string,
  status?: ArticleStatus,
  locale?: string,
): Promise<Article[]> {
  let queryRef: FirebaseFirestore.Query = getDb().collection(ARTICLES);
  if (category) queryRef = queryRef.where("category", "==", category);
  if (status) queryRef = queryRef.where("status", "==", status);
  if (locale) queryRef = queryRef.where("locale", "==", locale);
  queryRef = queryRef.orderBy("createdAt", "desc");

  try {
    const snapshot = await queryRef.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...convertTimestamps(doc.data()),
    })) as Article[];
  } catch {
    // Safe fallback in case composite index is not yet created.
    const snapshot = await getDb().collection(ARTICLES).get();
    let articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...convertTimestamps(doc.data()),
    })) as Article[];

    if (category) articles = articles.filter((a) => a.category === category);
    if (status) articles = articles.filter((a) => a.status === status);
    if (locale) articles = articles.filter((a) => a.locale === locale);

    articles.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
      return dateB - dateA;
    });

    return articles;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const snapshot = await getDb()
    .collection(ARTICLES)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...convertTimestamps(doc.data()) } as Article;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const doc = await getDb().collection(ARTICLES).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...convertTimestamps(doc.data() || {}) } as Article;
}

export async function createArticle(
  article: Omit<Article, "id" | "createdAt" | "updatedAt" | "views">,
): Promise<string> {
  const image = article.image || article.imageUrl || "";

  const docRef = await getDb().collection(ARTICLES).add({
    ...article,
    image,
    imageUrl: image,
    views: 0,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    publishedAt: article.status === "published" ? FieldValue.serverTimestamp() : null,
  });
  return docRef.id;
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<void> {
  const resolvedImage = data.image ?? data.imageUrl;

  const updateData: Record<string, unknown> = stripUndefined({
    ...data,
    ...(resolvedImage !== undefined ? { image: resolvedImage, imageUrl: resolvedImage } : {}),
    updatedAt: FieldValue.serverTimestamp(),
  });
  if (data.status === "published" && !data.publishedAt) {
    updateData.publishedAt = FieldValue.serverTimestamp();
  }
  await getDb().collection(ARTICLES).doc(id).update(updateData);
}

export async function deleteArticle(id: string): Promise<void> {
  await getDb().collection(ARTICLES).doc(id).delete();
}

// ==================== PROJECTS CRUD ====================

export async function getProjects(status?: ArticleStatus): Promise<Project[]> {
  let queryRef: FirebaseFirestore.Query = getDb().collection(PROJECTS);
  if (status) queryRef = queryRef.where("status", "==", status);
  queryRef = queryRef.orderBy("createdAt", "desc");

  try {
    const snapshot = await queryRef.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...convertTimestamps(doc.data()),
    })) as Project[];
  } catch {
    // Safe fallback in case index is not yet created.
    const snapshot = await getDb().collection(PROJECTS).get();
    let projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...convertTimestamps(doc.data()),
    })) as Project[];

    if (status) projects = projects.filter((p) => p.status === status);

    projects.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
      return dateB - dateA;
    });

    return projects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const snapshot = await getDb()
    .collection(PROJECTS)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...convertTimestamps(doc.data()) } as Project;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const doc = await getDb().collection(PROJECTS).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...convertTimestamps(doc.data() || {}) } as Project;
}

export async function createProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const image = project.image || project.imageUrl || "";

  const docRef = await getDb().collection(PROJECTS).add({
    ...project,
    image,
    imageUrl: image,
    link: project.link || "",
    views: project.views ?? 0,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    publishedAt: project.status === "published" ? FieldValue.serverTimestamp() : null,
  });
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  const resolvedImage = data.image ?? data.imageUrl;

  await getDb().collection(PROJECTS).doc(id).update(stripUndefined({
    ...data,
    ...(resolvedImage !== undefined ? { image: resolvedImage, imageUrl: resolvedImage } : {}),
    updatedAt: FieldValue.serverTimestamp(),
  }));
}

export async function deleteProject(id: string): Promise<void> {
  await getDb().collection(PROJECTS).doc(id).delete();
}

// ==================== PUBLIC CONTENT FETCHERS ====================

export async function getPublishedArticles(locale?: string): Promise<Article[]> {
  return getArticles(undefined, "published", locale);
}

export async function getPublishedProjects(): Promise<Project[]> {
  return getProjects("published");
}

// ==================== GALLERY CRUD ====================

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const snapshot = await getDb().collection(GALLERY).get();
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as GalleryItem[];

  items.sort((a, b) => {
    const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
    const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
    return dateB - dateA;
  });

  return items;
}

export async function addGalleryItem(
  item: Omit<GalleryItem, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const docRef = await getDb().collection(GALLERY).add({
    ...item,
    featured: item.featured ?? false,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return docRef.id;
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<void> {
  await getDb().collection(GALLERY).doc(id).update(stripUndefined({
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  }));
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await getDb().collection(GALLERY).doc(id).delete();
}

// ==================== ANALYTICS (ADMIN) ====================

function toDayLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function normalizeSource(referrer?: string): string {
  if (!referrer) return "Direct";
  try {
    const hostname = new URL(referrer).hostname.replace(/^www\./, "");
    if (hostname.includes("google")) return "Google";
    if (hostname.includes("t.me") || hostname.includes("telegram")) return "Telegram";
    if (hostname.includes("linkedin")) return "LinkedIn";
    return hostname || "Other";
  } catch {
    return "Other";
  }
}

export async function getAdminAnalyticsSummary(
  days: number,
  endDateInput: Date = new Date(),
): Promise<AdminAnalyticsSummary> {
  const safeDays = Math.max(1, days);
  const endDate = new Date(endDateInput);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - safeDays);

  const snapshot = await getDb()
    .collection(ANALYTICS)
    .where("timestamp", ">=", Timestamp.fromDate(startDate))
    .where("timestamp", "<=", Timestamp.fromDate(endDate))
    .orderBy("timestamp", "asc")
    .get();

  const events = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as AnalyticsEvent[];

  const pageViews = events.filter((e) => e.type === "pageview");
  const sessionEnds = events.filter((e) => e.type === "session_end");

  const uniqueVisitorsSet = new Set(pageViews.map((e) => e.sessionId).filter(Boolean));
  const avgSessionDurationSec = sessionEnds.length
    ? Math.round(sessionEnds.reduce((sum, e) => sum + (e.duration || 0), 0) / sessionEnds.length)
    : 0;

  const sourceCount = new Map<string, number>();
  for (const event of pageViews) {
    const source = normalizeSource(event.referrer);
    sourceCount.set(source, (sourceCount.get(source) || 0) + 1);
  }

  const trafficSources = Array.from(sourceCount.entries())
    .map(([source, visitors]) => ({ source, visitors }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 8);

  const pageCount = new Map<string, number>();
  for (const event of pageViews) {
    const page = event.path || "/";
    pageCount.set(page, (pageCount.get(page) || 0) + 1);
  }

  const topPages = Array.from(pageCount.entries())
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const daily = new Map<string, { views: number; visitorSet: Set<string>; durationTotal: number; durationCount: number }>();

  const getOrCreateDailyBucket = (key: string) => {
    const existing = daily.get(key);
    if (existing) return existing;

    const created = { views: 0, visitorSet: new Set<string>(), durationTotal: 0, durationCount: 0 };
    daily.set(key, created);
    return created;
  };

  for (const event of pageViews) {
    const date = event.timestamp instanceof Date ? event.timestamp : new Date();
    const key = toDayLabel(date);
    const bucket = getOrCreateDailyBucket(key);
    bucket.views += 1;
    if (event.sessionId) bucket.visitorSet.add(event.sessionId);
  }

  for (const event of sessionEnds) {
    const date = event.timestamp instanceof Date ? event.timestamp : new Date();
    const key = toDayLabel(date);
    const bucket = getOrCreateDailyBucket(key);
    bucket.durationTotal += event.duration || 0;
    bucket.durationCount += 1;
  }

  const trend = Array.from(daily.entries()).map(([date, data]) => ({
    date,
    views: data.views,
    visitors: data.visitorSet.size,
    duration: data.durationCount ? Math.round(data.durationTotal / data.durationCount) : 0,
  }));

  return {
    totalViews: pageViews.length,
    uniqueVisitors: uniqueVisitorsSet.size,
    avgSessionDurationSec,
    trafficSources,
    topPages,
    trend,
  };
}

export async function createAnalyticsEvent(input: AnalyticsEventInput): Promise<void> {
  const payload = stripUndefined({
    type: input.type,
    path: input.path || "",
    referrer: input.referrer || "",
    userAgent: input.userAgent || "",
    sessionId: input.sessionId,
    duration: input.duration,
    timestamp: FieldValue.serverTimestamp(),
  });

  await getDb().collection(ANALYTICS).add(payload);
}
