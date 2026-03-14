import { Check, FileText, ShieldCheck, Landmark, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  currentStep: number
}

const steps = [
  { label: "Solicitud", icon: FileText },
  { label: "Validación", icon: ShieldCheck },
  { label: "Transferencia", icon: Landmark },
  { label: "Confirmación", icon: BadgeCheck },
]

export default function ProcessHeader({ currentStep }: Props) {

  const progress =
    ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="mb-16">

      {/* Progress container */}
      <div className="relative">

        {/* Base line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200" />

        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-[#4B2863]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">

          {steps.map((step, index) => {

            const StepIcon = step.icon
            const stepNumber = index + 1

            const isCompleted = stepNumber < currentStep
            const isActive = stepNumber === currentStep

            return (
              <div
                key={step.label}
                className="flex flex-col items-center text-center w-24"
              >

                {/* Circle */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border transition
                    ${
                      isCompleted
                        ? "bg-[#4B2863] text-white border-[#4B2863]"
                        : isActive
                        ? "bg-white text-[#4B2863] border-[#4B2863]"
                        : "bg-gray-100 text-gray-400 border-gray-300"
                    }
                  `}
                >

                  {isCompleted ? (
                    <Check size={18} />
                  ) : (
                    <StepIcon size={18} />
                  )}

                </motion.div>

                {/* Label */}
                <span
                  className={`
                    mt-3 text-xs md:text-sm
                    ${
                      isActive
                        ? "text-[#4B2863] font-medium"
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