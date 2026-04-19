import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
} from "lucide-react"

/* =========================
   MOCK REQUIRED DOCUMENTS
========================= */

const REQUIRED_DOCUMENTS = [
  {
    id: "personal",
    name: "Documentos personales",
    documents: [
      { id: "cedula_frente", name: "Cédula frente" },
      { id: "cedula_reverso", name: "Cédula reverso" },
    ],
  },
  {
    id: "medico",
    name: "Documentos médicos",
    documents: [
      { id: "receta", name: "Receta médica" },
      { id: "antecedentes", name: "Certificado antecedentes" },
    ],
  },
]

/* =========================
   TYPES
========================= */

type DocStatus =
  | "missing"
  | "uploaded"
  | "validated"
  | "expired"
  | "rejected"

type Document = {
  id: string
  status: DocStatus
  expiresAt?: string
  rejectionReason?: string
}

type UserAdmin = {
  id: string
  fullName: string
  email: string
  disabled?: boolean
  documents: Document[]
}

/* =========================
   MOCK USERS
========================= */

const mockUsers: UserAdmin[] = [
  // NUEVO
  {
    id: "1",
    fullName: "Juan Nuevo",
    email: "nuevo@test.cl",
    documents: [
      { id: "cedula_frente", status: "uploaded" },
      { id: "cedula_reverso", status: "missing" },
      { id: "receta", status: "missing" },
      { id: "antecedentes", status: "missing" },
    ],
  },

  // VIGENTE OK
  {
    id: "2",
    fullName: "Ana Vigente OK",
    email: "ok@test.cl",
    documents: [
      { id: "cedula_frente", status: "validated", expiresAt: "2026-01-01" },
      { id: "cedula_reverso", status: "validated", expiresAt: "2026-01-01" },
      { id: "receta", status: "validated", expiresAt: "2025-12-01" },
      { id: "antecedentes", status: "validated", expiresAt: "2025-12-01" },
    ],
  },

  // VIGENTE CON VENCIDOS
  {
    id: "3",
    fullName: "Pedro Vencido",
    email: "vencido@test.cl",
    documents: [
      { id: "cedula_frente", status: "validated", expiresAt: "2026-01-01" },
      { id: "cedula_reverso", status: "validated", expiresAt: "2026-01-01" },
      { id: "receta", status: "expired", expiresAt: "2023-01-01" },
      { id: "antecedentes", status: "validated", expiresAt: "2025-12-01" },
    ],
  },

  // DESHABILITADO
  {
    id: "4",
    fullName: "Luis Bloqueado",
    email: "disabled@test.cl",
    disabled: true,
    documents: [],
  },
]

/* =========================
   HELPERS
========================= */

function isFullyValidated(user: UserAdmin) {
  return REQUIRED_DOCUMENTS.every((f) =>
    f.documents.every((req) =>
      user.documents.some(
        (d) => d.id === req.id && d.status === "validated"
      )
    )
  )
}

function hasExpired(user: UserAdmin) {
  return user.documents.some((d) => d.status === "expired")
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }: { status: DocStatus }) {
  const map = {
    missing: ["No enviado", "text-gray-400", <AlertCircle size={14} />],
    uploaded: ["Recibido", "text-yellow-600", <Clock size={14} />],
    validated: ["Aprobado", "text-green-600", <CheckCircle size={14} />],
    expired: ["Vencido", "text-orange-500", <AlertCircle size={14} />],
    rejected: ["Rechazado", "text-red-600", <XCircle size={14} />],
  }

  const [label, color, icon] = map[status]

  return (
    <div className={`flex items-center gap-1 text-xs ${color}`}>
      {icon}
      {label}
    </div>
  )
}

/* =========================
   MAIN
========================= */

export default function Users() {
  const [users] = useState<UserAdmin[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<UserAdmin | null>(null)

  const { newUsers, activeUsers, disabledUsers } = useMemo(() => {
    const newUsers: UserAdmin[] = []
    const activeUsers: UserAdmin[] = []
    const disabledUsers: UserAdmin[] = []

    users.forEach((u) => {
      if (u.disabled) disabledUsers.push(u)
      else if (!isFullyValidated(u)) newUsers.push(u)
      else activeUsers.push(u)
    })

    return { newUsers, activeUsers, disabledUsers }
  }, [users])

  const activeWithIssues = activeUsers.filter(hasExpired)
  const activeOk = activeUsers.filter((u) => !hasExpired(u))

  return (
    <div className="p-4 md:p-6 space-y-6">

      <h1 className="text-xl md:text-2xl font-semibold">
        Gestión de Usuarios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Column title="Nuevos" users={newUsers} onReview={setSelectedUser} />

        <div className="space-y-4">
          <Column title="⚠️ Revisión" users={activeWithIssues} onReview={setSelectedUser} />
          <Column title="✔ Al día" users={activeOk} />
        </div>

        <Column title="Deshabilitados" users={disabledUsers} />

      </div>

      {selectedUser && (
        <ReviewModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}

/* =========================
   COLUMN
========================= */

function Column({ title, users, onReview }: any) {
  return (
    <div className="bg-white border rounded-xl p-3 space-y-3">

      <h2 className="text-sm font-semibold">{title} ({users.length})</h2>

      {users.map((u: UserAdmin) => (
        <div key={u.id} className="border rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">{u.fullName}</p>
            <p className="text-xs text-muted-foreground">{u.email}</p>
          </div>

          {onReview && (
            <button
              onClick={() => onReview(u)}
              className="flex items-center gap-1 text-xs border px-2 py-1 rounded"
            >
              <FileText size={14} />
              Revisar
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

/* =========================
   MODAL
========================= */

function ReviewModal({ user, onClose }: any) {
  const [exp, setExp] = useState<Record<string, string>>({})
  const [rej, setRej] = useState<Record<string, string>>({})
  const [approved, setApproved] = useState<Record<string, boolean>>({})

  const approve = (id: string) => {
    if (!exp[id]) return toast.error("Ingresa fecha")
    setApproved((p) => ({ ...p, [id]: true }))
    toast.success("Documento aprobado")
  }

  const reject = (id: string) => {
    const r = prompt("Motivo rechazo")
    if (!r) return
    setRej((p) => ({ ...p, [id]: r }))
    toast("Documento marcado para rechazo")
  }

  const submit = () => {
    toast.success("Revisión completada")

    if (isFullyValidated(user)) {
      toast.success("Paciente activado + credenciales enviadas")
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-4">

        <h2 className="font-semibold flex gap-2">
          <FileText size={18} /> Revisar {user.fullName}
        </h2>

        <div className="max-h-[400px] overflow-y-auto space-y-4">

          {REQUIRED_DOCUMENTS.map((f) => (
            <div key={f.id}>
              <p className="text-sm font-medium">{f.name}</p>

              {f.documents.map((doc) => {
                const d = user.documents.find((x) => x.id === doc.id)
                const status = d?.status || "missing"

                return (
                  <div key={doc.id} className="border p-3 rounded mt-2 space-y-2">

                    <div className="flex justify-between">
                      <span>{doc.name}</span>
                      <StatusBadge status={status} />
                    </div>

                    {(status === "uploaded" || status === "expired") && (
                      <>
                        <input
                          type="date"
                          onChange={(e) =>
                            setExp((p) => ({ ...p, [doc.id]: e.target.value }))
                          }
                          className="border p-1 w-full"
                        />

                        <div className="flex gap-2">
                          <button onClick={() => approve(doc.id)}>
                            ✔
                          </button>
                          <button onClick={() => reject(doc.id)}>
                            ❌
                          </button>
                        </div>
                      </>
                    )}

                  </div>
                )
              })}
            </div>
          ))}

        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={submit} className="bg-black text-white px-4 py-2 rounded">
            Confirmar
          </button>
        </div>

      </div>
    </div>
  )
}