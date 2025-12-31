'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramContainer from '@/components/ui/DiagramContainer'

export default function FanoutDiagram() {
  const [mode, setMode] = useState<'direct' | 'fanout'>('direct')
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalSteps = mode === 'direct' ? 5 : 4

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
          onClick={() => { setMode('direct'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'direct' ? 'bg-warning text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Direct Messaging
        </button>
        <button
          onClick={() => { setMode('fanout'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'fanout' ? 'bg-pink-500 text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Fanout Pattern
        </button>
      </div>

      <DiagramContainer
        title={mode === 'direct' ? 'Direct Messaging (No Fanout)' : 'Fanout Pattern (Pub/Sub)'}
        totalSteps={totalSteps}
        currentStep={step}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={reset}
        onNextStep={nextStep}
      >
        <svg viewBox="0 0 500 280" className="w-full max-w-lg">
          {mode === 'direct' ? (
            <>
              {/* Publisher */}
              <rect x={50} y={100} width={90} height={50} rx={8} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={95} y={130} textAnchor="middle" fill="#fafafa" fontSize={11}>Publisher</text>

              {/* Consumers */}
              <rect x={250} y={30} width={80} height={40} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={290} y={55} textAnchor="middle" fill="#fafafa" fontSize={10}>Email</text>

              <rect x={250} y={90} width={80} height={40} rx={6} fill="#f59e0b20" stroke="#f59e0b" strokeWidth={1.5} />
              <text x={290} y={115} textAnchor="middle" fill="#fafafa" fontSize={10}>SMS</text>

              <rect x={250} y={150} width={80} height={40} rx={6} fill="#ec489920" stroke="#ec4899" strokeWidth={1.5} />
              <text x={290} y={175} textAnchor="middle" fill="#fafafa" fontSize={10}>Push</text>

              <rect x={250} y={210} width={80} height={40} rx={6} fill="#06b6d420" stroke="#06b6d4" strokeWidth={1.5} />
              <text x={290} y={235} textAnchor="middle" fill="#fafafa" fontSize={10}>Analytics</text>

              {/* Direct connections */}
              <line x1={140} y1={115} x2={250} y2={50} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={140} y1={120} x2={250} y2={110} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={140} y1={130} x2={250} y2={170} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={140} y1={135} x2={250} y2={230} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />

              {/* Animation - sequential calls */}
              <AnimatePresence>
                {step === 1 && (
                  <motion.circle r={5} fill="#22c55e"
                    initial={{ cx: 140, cy: 115, opacity: 0 }}
                    animate={{ cx: 250, cy: 50, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
                {step === 2 && (
                  <motion.circle r={5} fill="#f59e0b"
                    initial={{ cx: 140, cy: 120, opacity: 0 }}
                    animate={{ cx: 250, cy: 110, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
                {step === 3 && (
                  <motion.circle r={5} fill="#ec4899"
                    initial={{ cx: 140, cy: 130, opacity: 0 }}
                    animate={{ cx: 250, cy: 170, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
                {step === 4 && (
                  <motion.circle r={5} fill="#06b6d4"
                    initial={{ cx: 140, cy: 135, opacity: 0 }}
                    animate={{ cx: 250, cy: 230, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={400} y={130} textAnchor="middle" fill="#a3a3a3" fontSize={10}>
                {step === 0 && 'Must call each\nconsumer explicitly'}
                {step >= 1 && step <= 4 && `Call ${step} of 4`}
              </text>
            </>
          ) : (
            <>
              {/* Publisher */}
              <rect x={50} y={100} width={80} height={50} rx={8} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={90} y={130} textAnchor="middle" fill="#fafafa" fontSize={11}>Publisher</text>

              {/* Topic */}
              <rect x={180} y={105} width={80} height={40} rx={6} fill="#ec489920" stroke="#ec4899" strokeWidth={2} />
              <text x={220} y={130} textAnchor="middle" fill="#fafafa" fontSize={11}>Topic</text>

              {/* Queues */}
              <rect x={320} y={30} width={70} height={35} rx={4} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={355} y={52} textAnchor="middle" fill="#fafafa" fontSize={9}>Email Q</text>

              <rect x={320} y={85} width={70} height={35} rx={4} fill="#f59e0b20" stroke="#f59e0b" strokeWidth={1.5} />
              <text x={355} y={107} textAnchor="middle" fill="#fafafa" fontSize={9}>SMS Q</text>

              <rect x={320} y={140} width={70} height={35} rx={4} fill="#8b5cf620" stroke="#8b5cf6" strokeWidth={1.5} />
              <text x={355} y={162} textAnchor="middle" fill="#fafafa" fontSize={9}>Push Q</text>

              <rect x={320} y={195} width={70} height={35} rx={4} fill="#06b6d420" stroke="#06b6d4" strokeWidth={1.5} />
              <text x={355} y={217} textAnchor="middle" fill="#fafafa" fontSize={9}>Analytics Q</text>

              {/* Connections */}
              <line x1={130} y1={125} x2={180} y2={125} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={260} y1={115} x2={320} y2={47} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={260} y1={120} x2={320} y2={102} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={260} y1={130} x2={320} y2={157} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={260} y1={135} x2={320} y2={212} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />

              {/* Animation - single publish, multiple receive */}
              <AnimatePresence>
                {step === 1 && (
                  <motion.circle r={6} fill="#3b82f6"
                    initial={{ cx: 130, cy: 125, opacity: 0 }}
                    animate={{ cx: 180, cy: 125, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                {step >= 2 && (
                  <>
                    <motion.circle r={5} fill="#22c55e"
                      initial={{ cx: 260, cy: 115, opacity: 0 }}
                      animate={{ cx: 320, cy: 47, opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 0.8, delay: 0 }}
                    />
                    <motion.circle r={5} fill="#f59e0b"
                      initial={{ cx: 260, cy: 120, opacity: 0 }}
                      animate={{ cx: 320, cy: 102, opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                    <motion.circle r={5} fill="#8b5cf6"
                      initial={{ cx: 260, cy: 130, opacity: 0 }}
                      animate={{ cx: 320, cy: 157, opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <motion.circle r={5} fill="#06b6d4"
                      initial={{ cx: 260, cy: 135, opacity: 0 }}
                      animate={{ cx: 320, cy: 212, opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={220} y={260} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Publisher sends message once to topic'}
                {step === 1 && 'Message published to topic'}
                {step === 2 && 'Topic fans out to all subscribed queues'}
                {step === 3 && 'Each consumer processes independently'}
              </text>
            </>
          )}
        </svg>
      </DiagramContainer>
    </div>
  )
}
