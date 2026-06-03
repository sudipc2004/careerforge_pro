// lib/user-store.ts
// Simple JSON-file based user store for local development
// In production, replace with a proper database (e.g., PostgreSQL + Prisma)

import fs from 'fs';
import path from 'path';
import { ResumeData } from './resume-schema';

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  resumeCount: number;
  savedResumes: ResumeData[];
  createdAt: string;
  updatedAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

function ensureDbExists() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2));
  }
}

function readDb(): { users: UserRecord[] } {
  ensureDbExists();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return { users: [] };
  }
}

function writeDb(data: { users: UserRecord[] }) {
  ensureDbExists();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getUserByEmail(email: string): UserRecord | null {
  const db = readDb();
  return db.users.find((u) => u.email === email) || null;
}

export function getUserById(id: string): UserRecord | null {
  const db = readDb();
  return db.users.find((u) => u.id === id) || null;
}

export function createUser(email: string, name: string): UserRecord {
  const db = readDb();
  const existing = db.users.find((u) => u.email === email);
  if (existing) return existing;

  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    name,
    plan: 'free',
    resumeCount: 0,
    savedResumes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDb(db);
  return user;
}

export function updateUser(id: string, updates: Partial<UserRecord>): UserRecord | null {
  const db = readDb();
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx === -1) return null;

  db.users[idx] = {
    ...db.users[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
  return db.users[idx];
}

export function upgradeUserToPro(stripeCustomerId: string, subscriptionId: string): UserRecord | null {
  const db = readDb();
  const user = db.users.find((u) => u.stripeCustomerId === stripeCustomerId);
  if (!user) return null;
  return updateUser(user.id, { plan: 'pro', stripeSubscriptionId: subscriptionId });
}

export function downgradeUserToFree(stripeCustomerId: string): UserRecord | null {
  const db = readDb();
  const user = db.users.find((u) => u.stripeCustomerId === stripeCustomerId);
  if (!user) return null;
  return updateUser(user.id, { plan: 'free', stripeSubscriptionId: undefined });
}

export function saveResume(userId: string, resume: ResumeData): UserRecord | null {
  const user = getUserById(userId);
  if (!user) return null;

  const existingIdx = user.savedResumes.findIndex((r) => r.id === resume.id);
  let updatedResumes: ResumeData[];

  if (existingIdx >= 0) {
    updatedResumes = user.savedResumes.map((r) => (r.id === resume.id ? resume : r));
  } else {
    // Free tier: max 1 resume
    if (user.plan === 'free' && user.savedResumes.length >= 1) {
      throw new Error('FREE_LIMIT_REACHED');
    }
    updatedResumes = [...user.savedResumes, resume];
  }

  return updateUser(userId, {
    savedResumes: updatedResumes,
    resumeCount: updatedResumes.length,
  });
}

export function deleteResume(userId: string, resumeId: string): UserRecord | null {
  const user = getUserById(userId);
  if (!user) return null;

  const updatedResumes = user.savedResumes.filter((r) => r.id !== resumeId);
  return updateUser(userId, {
    savedResumes: updatedResumes,
    resumeCount: updatedResumes.length,
  });
}
