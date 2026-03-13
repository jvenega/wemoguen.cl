import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
  title: string
  description?: string
  children: ReactNode
}

export default function AuthLayout({
  title,
  description,
  children,
}: Props) {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}

      <header className="p-6">
        <button
          onClick={() => navigate("/")}
          className="text-lg font-semibold text-[#4B2863]"
        >
          WEMÖGUEN
        </button>
      </header>

      {/* CONTENT */}

      <div className="flex flex-1 items-center justify-center px-6">

        <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8 space-y-6">

          <div className="text-center space-y-2">

            <h1 className="text-2xl font-semibold">
              {title}
            </h1>

            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}

          </div>

          {children}

        </div>

      </div>

    </div>
  )
}