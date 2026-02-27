interface Props {
    currentStep: number
}

const steps = [
    "Solicitud",
    "Validación",
    "Transferencia",
    "Confirmación",
]

export default function ProcessHeader({ currentStep }: Props) {
    return (
        <div className="mb-14">
            <div className="flex items-center justify-between">

                {steps.map((step, index) => {
                    const stepNumber = index + 1
                    const isActive = stepNumber === currentStep
                    const isCompleted = stepNumber < currentStep

                    return (
                        <div
                            key={step}
                            className="flex items-center flex-1"
                        >
                            <div className="flex items-center gap-3">

                                {/* Círculo */}
                                <div
                                    className={`
                    w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium
                    ${isActive
                                            ? "bg-[#4B2863] text-white"
                                            : isCompleted
                                                ? "bg-[#4B2863]/20 text-[#4B2863]"
                                                : "bg-gray-200 text-gray-500"
                                        }
                  `}
                                >
                                    {stepNumber}
                                </div>

                                {/* Texto */}
                                <span
                                    className={`
                    text-sm tracking-wide
                    ${isActive
                                            ? "text-[#4B2863] font-medium"
                                            : isCompleted
                                                ? "text-[#4B2863]"
                                                : "text-gray-400"
                                        }
                  `}
                                >
                                    {step}
                                </span>
                            </div>

                            {/* Línea */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`
                    flex-1 h-0.5 mx-6
                    ${isCompleted
                                            ? "bg-[#4B2863]/40"
                                            : "bg-gray-200"
                                        }
                  `}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}