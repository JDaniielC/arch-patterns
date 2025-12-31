'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramContainer from '@/components/ui/DiagramContainer'

export default function ChoreographyDiagram() {
  const [mode, setMode] = useState<'orchestration' | 'choreography'>('orchestration')
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalSteps = 5

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
          onClick={() => { setMode('orchestration'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'orchestration' ? 'bg-warning text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Orchestration
        </button>
        <button
          onClick={() => { setMode('choreography'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'choreography' ? 'bg-purple-500 text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Choreography
        </button>
      </div>

      <DiagramContainer
        title={mode === 'orchestration' ? 'Orchestration Pattern' : 'Choreography Pattern'}
        totalSteps={totalSteps}
        currentStep={step}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={reset}
        onNextStep={nextStep}
      >
        <svg viewBox="0 0 500 300" className="w-full max-w-lg">
          {mode === 'orchestration' ? (
            <>
              {/* Central Orchestrator */}
              <rect x={200} y={30} width={100} height={50} rx={8} fill="#f59e0b20" stroke="#f59e0b" strokeWidth={2} />
              <text x={250} y={60} textAnchor="middle" fill="#fafafa" fontSize={11} fontWeight={500}>Orchestrator</text>

              {/* Services */}
              <rect x={50} y={150} width={80} height={45} rx={6} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={90} y={178} textAnchor="middle" fill="#fafafa" fontSize={10}>Payment</text>

              <rect x={210} y={150} width={80} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={2} />
              <text x={250} y={178} textAnchor="middle" fill="#fafafa" fontSize={10}>Inventory</text>

              <rect x={370} y={150} width={80} height={45} rx={6} fill="#ec489920" stroke="#ec4899" strokeWidth={2} />
              <text x={410} y={178} textAnchor="middle" fill="#fafafa" fontSize={10}>Shipping</text>

              {/* Connection lines from orchestrator to services */}
              <line x1={220} y1={80} x2={100} y2={150} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={80} x2={250} y2={150} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={280} y1={80} x2={400} y2={150} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />

              {/* Arrows */}
              <polygon points="100,145 95,150 105,150" fill="#262626" />
              <polygon points="250,145 245,150 255,150" fill="#262626" />
              <polygon points="400,145 395,150 405,150" fill="#262626" />

              {/* Animation - command flow */}
              <AnimatePresence>
                {step >= 1 && step < 3 && (
                  <motion.circle
                    r={5}
                    fill="#f59e0b"
                    initial={{ cx: 250, cy: 80, opacity: 0 }}
                    animate={{
                      cx: step === 1 ? 100 : step === 2 ? 250 : 400,
                      cy: 145,
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 1 }}
                  />
                )}
                {step >= 2 && step < 4 && (
                  <motion.circle
                    r={5}
                    fill="#f59e0b"
                    initial={{ cx: 250, cy: 80, opacity: 0 }}
                    animate={{ cx: 250, cy: 145, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                )}
                {step >= 3 && (
                  <motion.circle
                    r={5}
                    fill="#f59e0b"
                    initial={{ cx: 250, cy: 80, opacity: 0 }}
                    animate={{ cx: 400, cy: 145, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={240} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Orchestrator controls the workflow'}
                {step === 1 && 'Step 1: Orchestrator calls Payment'}
                {step === 2 && 'Step 2: Then calls Inventory'}
                {step === 3 && 'Step 3: Finally calls Shipping'}
                {step === 4 && 'Orchestrator handles all coordination'}
              </text>
            </>
          ) : (
            <>
              {/* Event Bus */}
              <rect x={150} y={120} width={200} height={35} rx={4} fill="#8b5cf620" stroke="#8b5cf6" strokeWidth={2} />
              <text x={250} y={142} textAnchor="middle" fill="#fafafa" fontSize={11}>Event Bus</text>

              {/* Services */}
              <rect x={50} y={40} width={80} height={45} rx={6} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={90} y={68} textAnchor="middle" fill="#fafafa" fontSize={10}>Payment</text>

              <rect x={210} y={40} width={80} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={2} />
              <text x={250} y={68} textAnchor="middle" fill="#fafafa" fontSize={10}>Inventory</text>

              <rect x={370} y={40} width={80} height={45} rx={6} fill="#ec489920" stroke="#ec4899" strokeWidth={2} />
              <text x={410} y={68} textAnchor="middle" fill="#fafafa" fontSize={10}>Shipping</text>

              {/* Connections to event bus */}
              <line x1={90} y1={85} x2={180} y2={120} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={85} x2={250} y2={120} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={410} y1={85} x2={320} y2={120} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />

              {/* Subscribe arrows pointing up */}
              <line x1={180} y1={155} x2={90} y2={190} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={155} x2={250} y2={190} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={320} y1={155} x2={410} y2={190} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />

              {/* Event labels */}
              <text x={90} y={210} textAnchor="middle" fill="#a3a3a3" fontSize={9}>subscribes</text>
              <text x={250} y={210} textAnchor="middle" fill="#a3a3a3" fontSize={9}>subscribes</text>
              <text x={410} y={210} textAnchor="middle" fill="#a3a3a3" fontSize={9}>subscribes</text>

              {/* Animation - event flow */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.circle
                    r={5}
                    fill="#3b82f6"
                    initial={{ cx: 90, cy: 85, opacity: 0 }}
                    animate={{ cx: 180, cy: 120, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
                {step >= 2 && (
                  <motion.circle
                    r={5}
                    fill="#8b5cf6"
                    initial={{ cx: 250, cy: 137, opacity: 0 }}
                    animate={{ cx: 250, cy: 85, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                )}
                {step >= 3 && (
                  <motion.circle
                    r={5}
                    fill="#22c55e"
                    initial={{ cx: 250, cy: 85, opacity: 0 }}
                    animate={{ cx: 180, cy: 120, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={250} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Services react to events independently'}
                {step === 1 && 'Payment emits "payment.completed" event'}
                {step === 2 && 'Inventory listens and reserves items'}
                {step === 3 && 'Inventory emits "inventory.reserved"'}
                {step === 4 && 'Shipping reacts without central control'}
              </text>
            </>
          )}
        </svg>
      </DiagramContainer>
    </div>
  )
}
