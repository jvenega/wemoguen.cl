import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Image,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react"

/* =========================
   TYPES
========================= */

export type Document = {
  id: string
  name: string
  type: "image" | "pdf"
  url?: string
  expiresAt?: string
}

type ExpState = "valid" | "warning" | "expired"

type Props = {
  doc: Document
  now: number
  onUpload: () => void
  onPreview: () => void
}

/* =========================
   COMPONENT
========================= */

export default function DocumentCard({
  doc,
  now,
  onUpload,
  onPreview,
}: Props) {

  const getExpState = (): ExpState | null => {
    if (!doc.expiresAt) return null

    const diff =
      (new Date(doc.expiresAt).getTime() - now) /
      (1000 * 60 * 60 * 24)

    if (diff < 0) return "expired"
    if (diff < 30) return "warning"
    return "valid"
  }

  const exp = getExpState()

  const canUpload =
    !doc.url || exp === "expired" || exp === "warning"

  const expIcons = {
    valid: CheckCircle2,
    warning: Clock,
    expired: AlertTriangle,
  }

  const expStyles = {
    valid: "bg-green-500/10 text-green-600",
    warning: "bg-yellow-500/10 text-yellow-600",
    expired: "bg-red-500/10 text-red-600",
  }

  const ExpIcon = exp ? expIcons[exp] : null

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-4 h-full">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        {doc.type === "image" ? (
          <Image size={18} />
        ) : (
          <FileText size={18} />
        )}

        {exp && ExpIcon && (
          <Badge className={expStyles[exp]}>
            <ExpIcon size={12} className="mr-1" />
            {exp === "valid"
              ? "Vigente"
              : exp === "warning"
              ? "Por vencer"
              : "Vencido"}
          </Badge>
        )}
      </div>

      {/* INFO */}
      <div>
        <p className="text-sm font-medium">{doc.name}</p>
        <p className="text-xs text-muted-foreground">
          Expira: {doc.expiresAt ?? "—"}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="mt-auto flex flex-col gap-2">

        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          disabled={!doc.url}
          className="w-full"
        >
          Ver documento
        </Button>

        <Button
          size="sm"
          disabled={!canUpload}
          onClick={onUpload}
          className="w-full"
        >
          {!doc.url
            ? "Subir documento"
            : exp === "valid"
            ? "Documento vigente"
            : "Re-subir documento"}
        </Button>

        {exp === "valid" && doc.url && (
          <p className="text-xs text-green-600 text-center">
            Documento válido
          </p>
        )}

      </div>
    </div>
  )
}