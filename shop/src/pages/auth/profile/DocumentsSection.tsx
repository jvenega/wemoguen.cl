import { useState, useRef, useEffect, useMemo } from "react"
import { useAuthStore } from "@/store/auth.store"
import { useDocuments } from "@/hooks/documents.hook"
import { REQUIRED_DOCUMENTS } from "./documents.constants"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder, Upload, ArrowLeft } from "lucide-react"

import DocumentCard from "./DocumentCard"
import DocumentPreview from "./DocumentPreview"

/* =========================
   TYPES (PRO)
========================= */

type DocStatus = "missing" | "uploaded" | "validated" | "expired"

type UIDocument = {
  id: string
  name: string
  type: "image" | "pdf"
  url?: string
  status: DocStatus
}

type UIFolder = {
  id: string
  name: string
  documents: UIDocument[]
}

/* =========================
   COMPONENT
========================= */

export default function DocumentsSection() {
  const user = useAuthStore((s) => s.user)
  const email = user?.email ?? ""

  const { folders: backendFolders, uploadDocument } = useDocuments(email)

  const [files, setFiles] = useState<Record<string, File | null>>({})
  const [activeFolder, setActiveFolder] = useState<string | null>(null)
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)

  const fileRef = useRef<HTMLInputElement | null>(null)

  const [preview, setPreview] = useState({
    open: false,
    url: undefined as string | undefined,
    type: "image" as "image" | "pdf",
  })

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [])

  /* =========================
     MERGE (PRO)
  ========================= */

  const folders: UIFolder[] = useMemo(() => {
    return REQUIRED_DOCUMENTS.map((requiredFolder) => {
      const backendFolder = backendFolders.find(
        (f) => f.id === requiredFolder.id
      )

      return {
        ...requiredFolder,
        documents: requiredFolder.documents.map((reqDoc): UIDocument => {
          const existing = backendFolder?.documents?.find(
            (d) => d.id === reqDoc.id
          )

          const backendStatus = existing?.name as DocStatus | undefined

          return {
            ...reqDoc,
            ...existing,
            type: existing?.type === "pdf" ? "pdf" : "image",
            status: files[reqDoc.id]
              ? "uploaded"
              : backendStatus === "validated"
              ? "validated"
              : backendStatus === "expired"
              ? "expired"
              : backendStatus === "uploaded"
              ? "uploaded"
              : "missing",
          }
        }),
      }
    })
  }, [backendFolders, files])

  const currentFolder = folders.find((f) => f.id === activeFolder)

  /* =========================
     BUSINESS RULES
  ========================= */

  const hasValidatedDocs = folders.some((folder) =>
    folder.documents.some((doc) => doc.status === "validated")
  )

  const readyToSubmit = hasValidatedDocs
    ? folders.every((folder) =>
        folder.documents.every(
          (doc) =>
            doc.status === "validated" || doc.status === "uploaded"
        )
      )
    : folders.every((folder) =>
        folder.documents.every((doc) => doc.status === "uploaded")
      )

  /* =========================
     ACTIONS
  ========================= */

  const handleUpload = (doc: UIDocument) => {
    const isBlocked =
      doc.status === "validated" ||
      (hasValidatedDocs && doc.status !== "expired")

    if (isBlocked) return

    setSelectedDoc(doc.id)
    fileRef.current?.click()
  }

  const handleFileChange = async (file: File | null) => {
    if (!file || !selectedDoc || !activeFolder) return

    setFiles((prev) => ({
      ...prev,
      [selectedDoc]: file,
    }))

    await uploadDocument(file, activeFolder, selectedDoc)
  }

  const handleSubmit = async () => {
    if (!user) return

    const formData = new FormData()
    formData.append("email", user.email)
    formData.append("fullName", user.fullName)

    Object.entries(files).forEach(([docId, file]) => {
      if (file) formData.append(docId, file)
    })

    try {
      await fetch("/contact.php", {
        method: "POST",
        body: formData,
      })

      alert("Documentos enviados correctamente")
    } catch (err) {
      console.error(err)
      alert("Error al enviar documentos")
    }
  }

  /* =========================
     GUARD
  ========================= */

  if (!user?.email) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          Cargando documentos...
        </CardContent>
      </Card>
    )
  }

  /* =========================
     UI
  ========================= */

  return (
    <Card className="lg:col-span-2">

      {/* HEADER */}
      <CardHeader className="flex flex-col md:flex-row md:justify-between gap-4">

        <CardTitle>Documentación</CardTitle>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">

          <span
            className={`text-xs ${
              readyToSubmit ? "text-green-500" : "text-red-500"
            }`}
          >
            {readyToSubmit
              ? "Listo para enviar"
              : "Completa los documentos requeridos"}
          </span>

          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!readyToSubmit}
            className="gap-2 w-full sm:w-auto text-amber-50"
          >
            <Upload size={16} />
            Enviar
          </Button>

        </div>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* FOLDERS */}
        {!activeFolder && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

            {folders.map((folder) => {
              const completed = folder.documents.filter((d) =>
                ["uploaded", "validated"].includes(d.status)
              ).length

              return (
                <div
                  key={folder.id}
                  onClick={() => setActiveFolder(folder.id)}
                  className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition"
                >
                  <Folder size={18} />

                  <p className="text-sm font-medium mt-2">
                    {folder.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {completed} / {folder.documents.length} completados
                  </p>
                </div>
              )
            })}

          </div>
        )}

        {/* FILES */}
        {activeFolder && currentFolder && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveFolder(null)}
            >
              <ArrowLeft size={16} /> Volver
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

              {currentFolder.documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  now={now}
                  disabled={
                    doc.status === "validated" ||
                    (hasValidatedDocs && doc.status !== "expired")
                  }
                  onUpload={() => handleUpload(doc)}
                  onPreview={() =>
                    setPreview({
                      open: true,
                      url: doc.url,
                      type: doc.type,
                    })
                  }
                />
              ))}

            </div>
          </>
        )}

        {/* FILE INPUT */}
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          aria-label="Subir documento"
          onChange={(e) =>
            handleFileChange(e.target.files?.[0] ?? null)
          }
        />

        {/* PREVIEW */}
        <DocumentPreview
          {...preview}
          onClose={(open) =>
            setPreview((p) => ({ ...p, open }))
          }
        />

      </CardContent>
    </Card>
  )
}
