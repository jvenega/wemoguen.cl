import { useState, useRef, useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"
import { useDocuments } from "@/hooks/documents.hook"

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

export default function DocumentsSection() {
  const user = useAuthStore((s) => s.user)

  // ✅ Hook SIEMPRE se ejecuta
  const email = user?.email ?? ""
  const { folders, uploadDocument } = useDocuments(email)

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
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [])

  const currentFolder = folders.find((f) => f.id === activeFolder)

  /* =========================
     GUARD (DESPUÉS de hooks)
  ========================= */

  if (!user?.email) {
    return (
      <Card className="lg:col-span-2">
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

      <CardHeader className="flex justify-between items-center">
        <CardTitle>Documentación</CardTitle>

        <Button size="sm" className="gap-2">
          <Upload size={16} />
          Subir documento
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* FOLDERS */}
        {!activeFolder && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className="border rounded-xl p-4 cursor-pointer hover:shadow-sm"
              >
                <Folder size={18} />
                <p className="text-sm font-medium">{folder.name}</p>
              </div>
            ))}
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
                  onUpload={() => {
                    setSelectedDoc(doc.id)
                    fileRef.current?.click()
                  }}
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

        {/* INPUT */}
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          title="Subir documento"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file && selectedDoc && activeFolder) {
              uploadDocument(file, activeFolder, selectedDoc)
            }
          }}
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