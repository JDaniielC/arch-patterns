'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramContainer from '@/components/ui/DiagramContainer'

export default function SyncAsyncDiagram() {
  const [mode, setMode] = useState<'sync' | 'async'>('sync')
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalSteps = mode === 'sync' ? 5 : 4

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
          onClick={() => { setMode('sync'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'sync' ? 'bg-warning text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Synchronous
        </button>
        <button
          onClick={() => { setMode('async'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'async' ? 'bg-cyan-500 text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Asynchronous
        </button>
      </div>

      <DiagramContainer
        title={mode === 'sync' ? 'Synchronous (Blocking)' : 'Asynchronous (Non-blocking)'}
        totalSteps={totalSteps}
        currentStep={step}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={reset}
        onNextStep={nextStep}
      >
        <svg viewBox="0 0 500 280" className="w-full max-w-lg">
          {mode === 'sync' ? (
            <>
              {/* Timeline */}
              <text x={40} y={30} fill="#fafafa" fontSize={11} fontWeight={500}>Main Thread</text>
              <line x1={40} y1={50} x2={40} y2={220} stroke="#3b82f6" strokeWidth={3} />

              {/* Task boxes - sequential */}
              <g>
                <rect x={50} y={50} width={120} height={40} rx={4} fill={step >= 1 ? '#f59e0b30' : '#262626'} stroke={step >= 1 ? '#f59e0b' : '#404040'} strokeWidth={1.5} />
                <text x={110} y={75} textAnchor="middle" fill="#fafafa" fontSize={10}>Task 1 (2s)</text>
                {step === 1 && <motion.rect x={50} y={50} width={120} height={40} rx={4} fill="none" stroke="#fafafa" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1 }} />}
              </g>

              <g>
                <rect x={50} y={100} width={120} height={40} rx={4} fill={step >= 2 ? '#22c55e30' : '#262626'} stroke={step >= 2 ? '#22c55e' : '#404040'} strokeWidth={1.5} />
                <text x={110} y={125} textAnchor="middle" fill="#fafafa" fontSize={10}>Task 2 (3s)</text>
                {step === 2 && <motion.rect x={50} y={100} width={120} height={40} rx={4} fill="none" stroke="#fafafa" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1 }} />}
              </g>

              <g>
                <rect x={50} y={150} width={120} height={40} rx={4} fill={step >= 3 ? '#ec489930' : '#262626'} stroke={step >= 3 ? '#ec4899' : '#404040'} strokeWidth={1.5} />
                <text x={110} y={175} textAnchor="middle" fill="#fafafa" fontSize={10}>Task 3 (1s)</text>
                {step === 3 && <motion.rect x={50} y={150} width={120} height={40} rx={4} fill="none" stroke="#fafafa" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1 }} />}
              </g>

              {/* Blocking indicators */}
              <text x={200} y={75} fill="#f59e0b" fontSize={9}>BLOCKED</text>
              <text x={200} y={125} fill="#22c55e" fontSize={9}>BLOCKED</text>
              <text x={200} y={175} fill="#ec4899" fontSize={9}>BLOCKED</text>

              {/* Total time */}
              <rect x={300} y={60} width={150} height={80} rx={6} fill="#surface" stroke="#262626" strokeWidth={1} />
              <text x={375} y={90} textAnchor="middle" fill="#a3a3a3" fontSize={10}>Total Time:</text>
              <text x={375} y={115} textAnchor="middle" fill="#f59e0b" fontSize={16} fontWeight={600}>2 + 3 + 1 = 6s</text>
              <text x={375} y={130} textAnchor="middle" fill="#a3a3a3" fontSize={9}>(sum of all tasks)</text>

              {/* Step text */}
              <text x={250} y={250} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Tasks execute one at a time'}
                {step === 1 && 'Task 1 blocks thread for 2 seconds'}
                {step === 2 && 'Task 2 blocks thread for 3 seconds'}
                {step === 3 && 'Task 3 blocks thread for 1 second'}
                {step === 4 && 'Total: 6 seconds (sequential)'}
              </text>
            </>
          ) : (
            <>
              {/* Timeline */}
              <text x={40} y={30} fill="#fafafa" fontSize={11} fontWeight={500}>Event Loop</text>
              <line x1={40} y1={50} x2={40} y2={180} stroke="#06b6d4" strokeWidth={3} />

              {/* Concurrent task boxes */}
              <g>
                <rect x={50} y={50} width={100} height={35} rx={4} fill={step >= 1 ? '#f59e0b30' : '#262626'} stroke={step >= 1 ? '#f59e0b' : '#404040'} strokeWidth={1.5} />
                <text x={100} y={72} textAnchor="middle" fill="#fafafa" fontSize={10}>Task 1 (2s)</text>
              </g>

              <g>
                <rect x={50} y={95} width={150} height={35} rx={4} fill={step >= 1 ? '#22c55e30' : '#262626'} stroke={step >= 1 ? '#22c55e' : '#404040'} strokeWidth={1.5} />
                <text x={125} y={117} textAnchor="middle" fill="#fafafa" fontSize={10}>Task 2 (3s)</text>
              </g>

              <g>
                <rect x={50} y={140} width={50} height={35} rx={4} fill={step >= 1 ? '#ec489930' : '#262626'} stroke={step >= 1 ? '#ec4899' : '#404040'} strokeWidth={1.5} />
                <text x={75} y={162} textAnchor="middle" fill="#fafafa" fontSize={10}>T3 (1s)</text>
              </g>

              {/* Parallel indicator */}
              {step >= 1 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <line x1={170} y1={60} x2={220} y2={110} stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4" />
                  <line x1={210} y1={110} x2={220} y2={110} stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4" />
                  <line x1={110} y1={157} x2={220} y2={110} stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4" />
                  <text x={240} y={115} fill="#06b6d4" fontSize={9}>Promise.all()</text>
                </motion.g>
              )}

              {/* Total time */}
              <rect x={300} y={60} width={150} height={80} rx={6} fill="#surface" stroke="#262626" strokeWidth={1} />
              <text x={375} y={90} textAnchor="middle" fill="#a3a3a3" fontSize={10}>Total Time:</text>
              <text x={375} y={115} textAnchor="middle" fill="#06b6d4" fontSize={16} fontWeight={600}>max(2,3,1) = 3s</text>
              <text x={375} y={130} textAnchor="middle" fill="#a3a3a3" fontSize={9}>(longest task only)</text>

              {/* Completion markers */}
              {step >= 2 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <circle cx={108} cy={157} r={8} fill="#ec4899" />
                  <text x={108} y={161} textAnchor="middle" fill="#fafafa" fontSize={10}>✓</text>
                </motion.g>
              )}
              {step >= 2 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <circle cx={158} cy={67} r={8} fill="#f59e0b" />
                  <text x={158} y={71} textAnchor="middle" fill="#fafafa" fontSize={10}>✓</text>
                </motion.g>
              )}
              {step >= 3 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <circle cx={208} cy={112} r={8} fill="#22c55e" />
                  <text x={208} y={116} textAnchor="middle" fill="#fafafa" fontSize={10}>✓</text>
                </motion.g>
              )}

              {/* Step text */}
              <text x={250} y={220} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Tasks start concurrently'}
                {step === 1 && 'All tasks running in parallel'}
                {step === 2 && 'Shorter tasks complete first'}
                {step === 3 && 'Total: 3 seconds (parallel)'}
              </text>
            </>
          )}
        </svg>
      </DiagramContainer>
    </div>
  )
}
