import { useEffect, useState } from "react"
import {
  getUserDocuments,
  upsertUserDocument,
  type FolderType,
} from "@/services/documents"

export function useDocuments(email: string) {
  const [folders, setFolders] = useState<FolderType[]>(
    getUserDocuments(email)
  )

  useEffect(() => {
    setFolders(getUserDocuments(email))
  }, [email])

  const uploadDocument = async (
    file: File,
    folderId: string,
    docId: string
  ) => {
    await upsertUserDocument(email, folderId, docId, file)
    setFolders(getUserDocuments(email))
  }

  return { folders, uploadDocument }
}
