import { useState } from "react"
import {
  getUserDocuments,
  upsertUserDocument,
  type FolderType,
} from "@/services/documents"

export function useDocuments(email: string) {
  const [folders, setFolders] = useState<FolderType[]>(
    getUserDocuments(email)
  )

  const uploadDocument = (
    file: File,
    folderId: string,
    docId: string
  ) => {
    upsertUserDocument(email, folderId, docId, file)
    setFolders(getUserDocuments(email))
  }

  return { folders, uploadDocument }
}