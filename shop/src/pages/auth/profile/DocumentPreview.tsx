import { Dialog, DialogContent } from "@/components/ui/dialog"

type Props = {
  open: boolean
  url?: string
  type: "image" | "pdf"
  onClose: (open: boolean) => void
}

export default function DocumentPreview({
  open,
  url,
  type,
  onClose,
}: Props) {
  if (!url) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">

        {type === "image" ? (
          <img
            src={url}
            alt="Vista previa del documento"
            className="w-full rounded-lg"
          />
        ) : (
          <iframe
            src={url}
            title="Vista previa del documento PDF"
            className="w-full h-125"
          />
        )}

      </DialogContent>
    </Dialog>
  )
}