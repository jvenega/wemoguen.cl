import { Upload, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocumentCard({
  doc,
  onUpload,
  onPreview,
}: any) {
  return (
    <div className="border rounded-xl p-4 space-y-3">

      <div className="flex justify-between items-start">
        <p className="text-sm font-medium">{doc.name}</p>

        {doc.status === "missing" && (
          <span className="text-xs text-red-500">
            Falta
          </span>
        )}

        {doc.status === "uploaded" && (
          <span className="text-xs text-green-500">
            Subido
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onUpload}>
          <Upload size={14} />
        </Button>

        {doc.url && (
          <Button size="sm" variant="ghost" onClick={onPreview}>
            <Eye size={14} />
          </Button>
        )}
      </div>

    </div>
  )
}