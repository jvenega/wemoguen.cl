import rawData from "../mock/documents.json"

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

const STORAGE_KEY = "documents_db"

function readDB(): DocumentsDB {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return seedDB()
  }

  try {
    return JSON.parse(raw) as DocumentsDB
  } catch {
    return seedDB()
  }
}

function writeDB(db: DocumentsDB) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

export function seedDB(force = false): DocumentsDB {
  if (!force) {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (existing) return JSON.parse(existing)
  }

  const db = rawData as DocumentsDB
  writeDB(db)
  return db
}

function findUser(db: DocumentsDB, email: string) {
  return db.users.find((user) => user.email === email)
}

function ensureUser(db: DocumentsDB, email: string): UserDocuments {
  const existing = findUser(db, email)
  if (existing) return existing

  const user = { email, folders: [] }
  db.users.push(user)
  return user
}

function ensureFolder(user: UserDocuments, folderId: string): FolderType {
  const existing = user.folders.find((folder) => folder.id === folderId)
  if (existing) return existing

  const folder = {
    id: folderId,
    name: "Nueva carpeta",
    documents: [],
  }

  user.folders.push(folder)
  return folder
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error("No se pudo leer el archivo"))
    reader.readAsDataURL(file)
  })
}

export function getUserDocuments(email: string): FolderType[] {
  if (!email) return []

  const db = readDB()
  const user = findUser(db, email)

  if (!user) return []

  return user.folders
}

export async function upsertUserDocument(
  email: string,
  folderId: string,
  docId: string,
  file: File
) {
  const db = readDB()
  const user = ensureUser(db, email)
  const folder = ensureFolder(user, folderId)
  const existingDoc = folder.documents.find((document) => document.id === docId)

  const nextDoc: Document = {
    id: docId,
    name: existingDoc?.name ?? file.name,
    type: file.type === "application/pdf" ? "pdf" : "image",
    url: await fileToDataUrl(file),
    expiresAt: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 365
    ).toISOString(),
  }

  if (existingDoc) {
    Object.assign(existingDoc, nextDoc)
  } else {
    folder.documents.push(nextDoc)
  }

  writeDB(db)
}
