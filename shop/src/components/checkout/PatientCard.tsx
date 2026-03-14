import { useNavigate } from "react-router-dom"
import { User, Mail, IdCard } from "lucide-react"

export default function PatientCard({ user }: any) {

  const navigate = useNavigate()

  const initials =
    user?.fullName
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">

      {/* Header responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">

        <div className="flex items-center gap-3 md:gap-4">

          {/* Avatar */}
          <div className="
            w-10 h-10 md:w-12 md:h-12
            rounded-full
            bg-[#4B2863]/10
            text-[#4B2863]
            flex items-center justify-center
            font-semibold
            text-sm md:text-base
          ">
            {initials}
          </div>

          <h2 className="text-base md:text-lg font-semibold text-[#4B2863]">
            Datos del paciente
          </h2>

        </div>

        <button
          onClick={() => navigate("/profile")}
          className="
            self-start sm:self-auto
            text-sm font-medium
            text-[#4B2863]
            border border-[#4B2863]/20
            px-3 py-1.5
            rounded-lg
            hover:bg-[#4B2863]/5
            transition
          "
        >
          Editar perfil
        </button>

      </div>

      {/* Datos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-6 gap-x-8 md:gap-x-10 text-sm">

        <div className="flex items-start gap-3">
          <User size={18} className="text-gray-400 mt-1 shrink-0" />

          <div className="min-w-0">
            <p className="text-gray-500 text-xs md:text-sm">
              Nombre completo
            </p>

            <p className="font-medium mt-0.5 wrap-break-word">
              {user?.fullName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <IdCard size={18} className="text-gray-400 mt-1 shrink-0" />

          <div>
            <p className="text-gray-500 text-xs md:text-sm">
              RUT
            </p>

            <p className="font-medium mt-0.5">
              {user?.rut}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 md:col-span-2">
          <Mail size={18} className="text-gray-400 mt-1 shrink-0" />

          <div className="min-w-0">
            <p className="text-gray-500 text-xs md:text-sm">
              Correo electrónico
            </p>

            <p className="font-medium mt-0.5 break-all">
              {user?.email}
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}