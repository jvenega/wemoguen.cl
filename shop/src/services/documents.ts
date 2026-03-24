import rawData from "../mock/documents.json"

/* =========================
   TYPES
========================= */

export type DocumentType = "image" | "pdf"

export type Document = {
  id: string
  name: string
  type: DocumentType
  url?: string
  expiresAt?: string
}

export type FolderType = {
  id: string
  name: string
  documents: Document[]
}

type UserDocuments = {
  email: string
  folders: FolderType[]
}

type DocumentsDB = {
  users: UserDocuments[]
}

/* =========================
   STORAGE
========================= */

const STORAGE_KEY = "documents_db"

/* =========================
   CORE DB
========================= */

function readDB(): DocumentsDB {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return seedDB()
  }

  try {
    return JSON.parse(raw) as DocumentsDB
  } catch {
    // corrupción → reset
    return seedDB()
  }
}

function writeDB(db: DocumentsDB) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

/* =========================
   SEED (IMPORTANTE)
========================= */

export function seedDB(force = false): DocumentsDB {
  if (!force) {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (existing) return JSON.parse(existing)
  }

  const db = rawData as DocumentsDB
  writeDB(db)
  return db
}

/* =========================
   HELPERS
========================= */

function findUser(db: DocumentsDB, email: string) {
  return db.users.find((u) => u.email === email)
}

function ensureUser(db: DocumentsDB, email: string): UserDocuments {
  let user = findUser(db, email)

  if (!user) {
    user = { email, folders: [] }
    db.users.push(user)
  }

  return user
}

function ensureFolder(user: UserDocuments, folderId: string): FolderType {
  let folder = user.folders.find((f) => f.id === folderId)

  if (!folder) {
    folder = {
      id: folderId,
      name: "Nueva carpeta",
      documents: [],
    }
    user.folders.push(folder)
  }

  return folder
}

/* =========================
   PUBLIC API
========================= */

export function getUserDocuments(email: string): FolderType[] {
  if (!email) return []

  const db = readDB()
  const user = findUser(db, email)

  if (!user) return []

  return user.folders
}

/* =========================
   UPSERT DOCUMENT
========================= */

export function upsertUserDocument(
  email: string,
  folderId: string,
  docId: string,
  file: File
) {
  const db = readDB()

  const user = ensureUser(db, email)
  const folder = ensureFolder(user, folderId)

  const existingDoc = folder.documents.find((d) => d.id === docId)

  const url = URL.createObjectURL(file)

  const newDoc: Document = {
    id: docId,
    name: existingDoc?.name ?? "Documento",
    type: existingDoc?.type ?? "image",
    url,
    expiresAt: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 365
    ).toISOString(),
  }

  if (existingDoc) {
    Object.assign(existingDoc, newDoc)
  } else {
    folder.documents.push(newDoc)
  }

  writeDB(db)
}