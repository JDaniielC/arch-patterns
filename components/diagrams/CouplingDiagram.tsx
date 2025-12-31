'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramContainer from '@/components/ui/DiagramContainer'

export default function CouplingDiagram() {
  const [mode, setMode] = useState<'tight' | 'loose'>('tight')
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalSteps = 4

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
          onClick={() => { setMode('tight'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'tight' ? 'bg-red-500 text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Tight Coupling
        </button>
        <button
          onClick={() => { setMode('loose'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'loose' ? 'bg-success text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Loose Coupling
        </button>
      </div>

      <DiagramContainer
        title={mode === 'tight' ? 'Tight Coupling (Direct Dependencies)' : 'Loose Coupling (Dependency Injection)'}
        totalSteps={totalSteps}
        currentStep={step}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={reset}
        onNextStep={nextStep}
      >
        <svg viewBox="0 0 500 300" className="w-full max-w-lg">
          {mode === 'tight' ? (
            <>
              {/* OrderService */}
              <rect x={175} y={30} width={150} height={60} rx={8} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={250} y={55} textAnchor="middle" fill="#fafafa" fontSize={12} fontWeight={500}>OrderService</text>
              <text x={250} y={75} textAnchor="middle" fill="#a3a3a3" fontSize={9}>new EmailService()</text>

              {/* Direct dependencies */}
              <rect x={50} y={150} width={110} height={50} rx={6} fill="#f4364c20" stroke="#f43f5e" strokeWidth={2} />
              <text x={105} y={180} textAnchor="middle" fill="#fafafa" fontSize={11}>EmailService</text>

              <rect x={195} y={150} width={110} height={50} rx={6} fill="#f4364c20" stroke="#f43f5e" strokeWidth={2} />
              <text x={250} y={180} textAnchor="middle" fill="#fafafa" fontSize={11}>SMSService</text>

              <rect x={340} y={150} width={110} height={50} rx={6} fill="#f4364c20" stroke="#f43f5e" strokeWidth={2} />
              <text x={395} y={180} textAnchor="middle" fill="#fafafa" fontSize={11}>LogService</text>

              {/* Solid dependency arrows (tight coupling) */}
              <line x1={200} y1={90} x2={105} y2={150} stroke="#f43f5e" strokeWidth={2} />
              <polygon points="105,145 100,155 110,155" fill="#f43f5e" />

              <line x1={250} y1={90} x2={250} y2={150} stroke="#f43f5e" strokeWidth={2} />
              <polygon points="250,145 245,155 255,155" fill="#f43f5e" />

              <line x1={300} y1={90} x2={395} y2={150} stroke="#f43f5e" strokeWidth={2} />
              <polygon points="395,145 390,155 400,155" fill="#f43f5e" />

              {/* Problem indicators */}
              {step >= 1 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <text x={105} y={220} textAnchor="middle" fill="#f43f5e" fontSize={9}>Concrete class</text>
                  <text x={250} y={220} textAnchor="middle" fill="#f43f5e" fontSize={9}>Hard to test</text>
                  <text x={395} y={220} textAnchor="middle" fill="#f43f5e" fontSize={9}>Can't swap</text>
                </motion.g>
              )}

              {/* Highlight animation */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.rect x={50} y={150} width={110} height={50} rx={6}
                    fill="none" stroke="#fafafa" strokeWidth={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
                {step === 3 && (
                  <motion.text x={250} y={260} textAnchor="middle" fill="#f43f5e" fontSize={10}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Changing EmailService requires modifying OrderService!
                  </motion.text>
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={280} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'OrderService creates its own dependencies'}
                {step === 1 && 'Direct references to concrete classes'}
                {step === 2 && 'Cannot easily swap implementations'}
                {step === 3 && 'Changes ripple through the codebase'}
              </text>
            </>
          ) : (
            <>
              {/* OrderService */}
              <rect x={175} y={30} width={150} height={60} rx={8} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={250} y={55} textAnchor="middle" fill="#fafafa" fontSize={12} fontWeight={500}>OrderService</text>
              <text x={250} y={75} textAnchor="middle" fill="#a3a3a3" fontSize={9}>INotifier[]</text>

              {/* Interface */}
              <rect x={175} y={120} width={150} height={40} rx={4} fill="#8b5cf620" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4" />
              <text x={250} y={145} textAnchor="middle" fill="#8b5cf6" fontSize={11} fontStyle="italic">INotifier (interface)</text>

              {/* Implementations */}
              <rect x={50} y={200} width={100} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={100} y={227} textAnchor="middle" fill="#fafafa" fontSize={10}>EmailNotifier</text>

              <rect x={200} y={200} width={100} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={250} y={227} textAnchor="middle" fill="#fafafa" fontSize={10}>SMSNotifier</text>

              <rect x={350} y={200} width={100} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={400} y={227} textAnchor="middle" fill="#fafafa" fontSize={10}>MockNotifier</text>

              {/* Dependency to interface (dashed) */}
              <line x1={250} y1={90} x2={250} y2={120} stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4" />
              <polygon points="250,115 245,125 255,125" fill="#8b5cf6" />

              {/* Implementations to interface */}
              <line x1={100} y1={200} x2={200} y2={160} stroke="#22c55e" strokeWidth={1.5} />
              <line x1={250} y1={200} x2={250} y2={160} stroke="#22c55e" strokeWidth={1.5} />
              <line x1={400} y1={200} x2={300} y2={160} stroke="#22c55e" strokeWidth={1.5} />

              {/* "implements" labels */}
              <text x={140} y={185} fill="#22c55e" fontSize={8}>implements</text>
              <text x={250} y={185} textAnchor="middle" fill="#22c55e" fontSize={8}>implements</text>
              <text x={360} y={185} fill="#22c55e" fontSize={8}>implements</text>

              {/* Benefits */}
              {step >= 1 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <text x={100} y={260} textAnchor="middle" fill="#22c55e" fontSize={9}>Swappable</text>
                  <text x={250} y={260} textAnchor="middle" fill="#22c55e" fontSize={9}>Testable</text>
                  <text x={400} y={260} textAnchor="middle" fill="#22c55e" fontSize={9}>Mock in tests</text>
                </motion.g>
              )}

              {/* Highlight animation */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.rect x={350} y={200} width={100} height={45} rx={6}
                    fill="none" stroke="#fafafa" strokeWidth={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={285} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'OrderService depends on interface, not concrete class'}
                {step === 1 && 'Multiple implementations can satisfy interface'}
                {step === 2 && 'Easy to inject mock for testing'}
                {step === 3 && 'Add new notifiers without changing OrderService'}
              </text>
            </>
          )}
        </svg>
      </DiagramContainer>
    </div>
  )
}
