import { Check, FileText, ShieldCheck, Landmark, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface Props {
  currentStep: number
}

type Step = {
  label: string
  icon: LucideIcon
}

const steps: Step[] = [
  { label: "Solicitud", icon: FileText },
  { label: "Validación", icon: ShieldCheck },
  { label: "Transferencia", icon: Landmark },
  { label: "Confirmación", icon: BadgeCheck },
]

export default function ProcessHeader({ currentStep }: Props) {

  const safeStep = Math.min(Math.max(currentStep, 1), steps.length)

  const progress =
    steps.length > 1
      ? ((safeStep - 1) / (steps.length - 1)) * 100
      : 0

  return (
    <div className="mb-16" aria-label="Progreso del proceso">

      <div className="relative">

        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200" />

        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative flex justify-between">

          {steps.map((step, index) => {

            const StepIcon = step.icon
            const stepNumber = index + 1

            const isCompleted = stepNumber < safeStep
            const isActive = stepNumber === safeStep

            return (
              <div
                key={step.label}
                className="flex flex-col items-center text-center flex-1"
              >

                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border transition
                    ${
                      isCompleted
                        ? "bg-primary text-white border-primary"
                        : isActive
                        ? "bg-white text-primary border-primary"
                        : "bg-gray-100 text-gray-400 border-gray-300"
                    }
                  `}
                >

                  {isCompleted
                    ? <Check size={18} />
                    : <StepIcon size={18} />}

                </motion.div>

                <span
                  className={`
                    mt-3 text-xs md:text-sm
                    ${
                      isActive
                        ? "text-primary font-medium"
                        : isCompleted
                        ? "text-gray-700"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step.label}
                </span>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}