'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramContainer from '@/components/ui/DiagramContainer'

export default function MicroservicesDiagram() {
  const [mode, setMode] = useState<'monolithic' | 'microservices'>('monolithic')
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalSteps = mode === 'monolithic' ? 4 : 5

  const nextStep = useCallback(() => {
    setStep((s) => (s + 1) % totalSteps)
  }, [totalSteps])

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(nextStep, 1500)
    return () => clearInterval(interval)
  }, [isPlaying, nextStep])

  const reset = () => {
    setStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => { setMode('monolithic'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'monolithic' ? 'bg-warning text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Monolithic
        </button>
        <button
          onClick={() => { setMode('microservices'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'microservices' ? 'bg-accent text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Microservices
        </button>
      </div>

      <DiagramContainer
        title={mode === 'monolithic' ? 'Monolithic Architecture' : 'Microservices Architecture'}
        totalSteps={totalSteps}
        currentStep={step}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={reset}
        onNextStep={nextStep}
      >
        <svg viewBox="0 0 500 320" className="w-full max-w-lg">
          {mode === 'monolithic' ? (
            <>
              {/* Monolithic: Single large box with modules */}
              <rect x={50} y={40} width={400} height={200} rx={12} fill="#f59e0b15" stroke="#f59e0b" strokeWidth={2} />
              <text x={250} y={70} textAnchor="middle" fill="#f59e0b" fontSize={14} fontWeight={600}>Monolithic Application</text>

              {/* Internal modules */}
              <rect x={70} y={90} width={100} height={50} rx={6} fill="#3b82f620" stroke="#3b82f6" strokeWidth={1.5} />
              <text x={120} y={120} textAnchor="middle" fill="#fafafa" fontSize={11}>User Module</text>

              <rect x={200} y={90} width={100} height={50} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={250} y={120} textAnchor="middle" fill="#fafafa" fontSize={11}>Order Module</text>

              <rect x={330} y={90} width={100} height={50} rx={6} fill="#ec489920" stroke="#ec4899" strokeWidth={1.5} />
              <text x={380} y={120} textAnchor="middle" fill="#fafafa" fontSize={11}>Payment Module</text>

              {/* Shared database */}
              <rect x={150} y={170} width={200} height={50} rx={6} fill="#8b5cf620" stroke="#8b5cf6" strokeWidth={1.5} />
              <text x={250} y={200} textAnchor="middle" fill="#fafafa" fontSize={11}>Shared Database</text>

              {/* Connections */}
              <line x1={120} y1={140} x2={200} y2={170} stroke="#262626" strokeWidth={1} strokeDasharray="3" />
              <line x1={250} y1={140} x2={250} y2={170} stroke="#262626" strokeWidth={1} strokeDasharray="3" />
              <line x1={380} y1={140} x2={300} y2={170} stroke="#262626" strokeWidth={1} strokeDasharray="3" />

              {/* Animation highlight */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.rect
                    x={step === 1 ? 70 : step === 2 ? 200 : 330}
                    y={90}
                    width={100}
                    height={50}
                    rx={6}
                    fill="none"
                    stroke="#fafafa"
                    strokeWidth={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={280} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Single deployable unit with all modules'}
                {step === 1 && 'All modules share the same codebase'}
                {step === 2 && 'Tight coupling between modules'}
                {step === 3 && 'Single database for all data'}
              </text>
            </>
          ) : (
            <>
              {/* Microservices: Separate services */}
              <rect x={30} y={40} width={90} height={70} rx={8} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={75} y={70} textAnchor="middle" fill="#fafafa" fontSize={11}>User</text>
              <text x={75} y={85} textAnchor="middle" fill="#fafafa" fontSize={11}>Service</text>

              <rect x={205} y={40} width={90} height={70} rx={8} fill="#22c55e20" stroke="#22c55e" strokeWidth={2} />
              <text x={250} y={70} textAnchor="middle" fill="#fafafa" fontSize={11}>Order</text>
              <text x={250} y={85} textAnchor="middle" fill="#fafafa" fontSize={11}>Service</text>

              <rect x={380} y={40} width={90} height={70} rx={8} fill="#ec489920" stroke="#ec4899" strokeWidth={2} />
              <text x={425} y={70} textAnchor="middle" fill="#fafafa" fontSize={11}>Payment</text>
              <text x={425} y={85} textAnchor="middle" fill="#fafafa" fontSize={11}>Service</text>

              {/* API Gateway */}
              <rect x={175} y={150} width={150} height={40} rx={6} fill="#f59e0b20" stroke="#f59e0b" strokeWidth={2} />
              <text x={250} y={175} textAnchor="middle" fill="#fafafa" fontSize={11}>API Gateway</text>

              {/* Individual databases */}
              <rect x={30} y={230} width={70} height={40} rx={4} fill="#3b82f615" stroke="#3b82f6" strokeWidth={1} />
              <text x={65} y={255} textAnchor="middle" fill="#a3a3a3" fontSize={9}>User DB</text>

              <rect x={215} y={230} width={70} height={40} rx={4} fill="#22c55e15" stroke="#22c55e" strokeWidth={1} />
              <text x={250} y={255} textAnchor="middle" fill="#a3a3a3" fontSize={9}>Order DB</text>

              <rect x={400} y={230} width={70} height={40} rx={4} fill="#ec489915" stroke="#ec4899" strokeWidth={1} />
              <text x={435} y={255} textAnchor="middle" fill="#a3a3a3" fontSize={9}>Payment DB</text>

              {/* Connections */}
              <line x1={75} y1={110} x2={200} y2={150} stroke="#262626" strokeWidth={1} strokeDasharray="3" />
              <line x1={250} y1={110} x2={250} y2={150} stroke="#262626" strokeWidth={1} strokeDasharray="3" />
              <line x1={425} y1={110} x2={300} y2={150} stroke="#262626" strokeWidth={1} strokeDasharray="3" />
              <line x1={65} y1={110} x2={65} y2={230} stroke="#262626" strokeWidth={1} strokeDasharray="3" />
              <line x1={250} y1={110} x2={250} y2={230} stroke="#262626" strokeWidth={1} strokeDasharray="3" />
              <line x1={435} y1={110} x2={435} y2={230} stroke="#262626" strokeWidth={1} strokeDasharray="3" />

              {/* Animation - service highlight */}
              <AnimatePresence>
                {step >= 1 && step < 4 && (
                  <motion.rect
                    x={step === 1 ? 30 : step === 2 ? 205 : 380}
                    y={40}
                    width={90}
                    height={70}
                    rx={8}
                    fill="none"
                    stroke="#fafafa"
                    strokeWidth={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={300} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Independent services with own codebases'}
                {step === 1 && 'Each service can be deployed independently'}
                {step === 2 && 'Services communicate via APIs'}
                {step === 3 && 'Each service owns its data'}
                {step === 4 && 'API Gateway routes external requests'}
              </text>
            </>
          )}
        </svg>
      </DiagramContainer>
    </div>
  )
}
