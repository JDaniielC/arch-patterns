'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramContainer from '@/components/ui/DiagramContainer'

export default function StatefulDiagram() {
  const [mode, setMode] = useState<'stateful' | 'stateless'>('stateful')
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
          onClick={() => { setMode('stateful'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'stateful' ? 'bg-warning text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Stateful
        </button>
        <button
          onClick={() => { setMode('stateless'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'stateless' ? 'bg-success text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Stateless
        </button>
      </div>

      <DiagramContainer
        title={mode === 'stateful' ? 'Stateful Server (Session-based)' : 'Stateless Server (Token-based)'}
        totalSteps={totalSteps}
        currentStep={step}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={reset}
        onNextStep={nextStep}
      >
        <svg viewBox="0 0 500 280" className="w-full max-w-lg">
          {mode === 'stateful' ? (
            <>
              {/* Client */}
              <rect x={50} y={100} width={80} height={50} rx={8} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={90} y={130} textAnchor="middle" fill="#fafafa" fontSize={11}>Client</text>

              {/* Load Balancer */}
              <rect x={180} y={100} width={70} height={50} rx={6} fill="#8b5cf620" stroke="#8b5cf6" strokeWidth={2} />
              <text x={215} y={122} textAnchor="middle" fill="#fafafa" fontSize={10}>Load</text>
              <text x={215} y={135} textAnchor="middle" fill="#fafafa" fontSize={10}>Balancer</text>

              {/* Servers with session storage */}
              <g>
                <rect x={300} y={40} width={80} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
                <text x={340} y={60} textAnchor="middle" fill="#fafafa" fontSize={10}>Server 1</text>
                <rect x={310} y={70} width={60} height={12} rx={2} fill="#f59e0b30" stroke="#f59e0b" strokeWidth={1} />
                <text x={340} y={79} textAnchor="middle" fill="#f59e0b" fontSize={7}>Session: User A</text>
              </g>

              <g>
                <rect x={300} y={105} width={80} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
                <text x={340} y={125} textAnchor="middle" fill="#fafafa" fontSize={10}>Server 2</text>
                <rect x={310} y={135} width={60} height={12} rx={2} fill="#a3a3a330" stroke="#a3a3a3" strokeWidth={1} />
                <text x={340} y={144} textAnchor="middle" fill="#a3a3a3" fontSize={7}>No session</text>
              </g>

              <g>
                <rect x={300} y={170} width={80} height={45} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
                <text x={340} y={190} textAnchor="middle" fill="#fafafa" fontSize={10}>Server 3</text>
                <rect x={310} y={200} width={60} height={12} rx={2} fill="#a3a3a330" stroke="#a3a3a3" strokeWidth={1} />
                <text x={340} y={209} textAnchor="middle" fill="#a3a3a3" fontSize={7}>No session</text>
              </g>

              {/* Connections */}
              <line x1={130} y1={125} x2={180} y2={125} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={115} x2={300} y2={62} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={125} x2={300} y2={127} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={135} x2={300} y2={192} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />

              {/* Sticky session indicator */}
              <text x={215} y={170} textAnchor="middle" fill="#f59e0b" fontSize={9}>Sticky Session</text>
              <text x={215} y={182} textAnchor="middle" fill="#f59e0b" fontSize={9}>Required!</text>

              {/* Animation */}
              <AnimatePresence>
                {step >= 1 && step < 3 && (
                  <motion.circle r={5} fill="#3b82f6"
                    initial={{ cx: 130, cy: 125, opacity: 0 }}
                    animate={{ cx: 180, cy: 125, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                {step >= 2 && step < 4 && (
                  <motion.circle r={5} fill="#22c55e"
                    initial={{ cx: 250, cy: 115, opacity: 0 }}
                    animate={{ cx: 300, cy: 62, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                {step >= 3 && (
                  <motion.rect x={300} y={40} width={80} height={45} rx={6}
                    fill="none" stroke="#f59e0b" strokeWidth={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={250} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Session data stored on specific server'}
                {step === 1 && 'Client makes request with session ID'}
                {step === 2 && 'Must route to same server (sticky session)'}
                {step === 3 && 'If server fails, session is lost!'}
                {step === 4 && 'Hard to scale horizontally'}
              </text>
            </>
          ) : (
            <>
              {/* Client with JWT */}
              <rect x={50} y={100} width={80} height={50} rx={8} fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} />
              <text x={90} y={120} textAnchor="middle" fill="#fafafa" fontSize={11}>Client</text>
              <text x={90} y={135} textAnchor="middle" fill="#22c55e" fontSize={8}>+ JWT Token</text>

              {/* Load Balancer */}
              <rect x={180} y={100} width={70} height={50} rx={6} fill="#8b5cf620" stroke="#8b5cf6" strokeWidth={2} />
              <text x={215} y={122} textAnchor="middle" fill="#fafafa" fontSize={10}>Load</text>
              <text x={215} y={135} textAnchor="middle" fill="#fafafa" fontSize={10}>Balancer</text>

              {/* Stateless servers */}
              <rect x={300} y={40} width={80} height={40} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={340} y={65} textAnchor="middle" fill="#fafafa" fontSize={10}>Server 1</text>

              <rect x={300} y={105} width={80} height={40} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={340} y={130} textAnchor="middle" fill="#fafafa" fontSize={10}>Server 2</text>

              <rect x={300} y={170} width={80} height={40} rx={6} fill="#22c55e20" stroke="#22c55e" strokeWidth={1.5} />
              <text x={340} y={195} textAnchor="middle" fill="#fafafa" fontSize={10}>Server 3</text>

              {/* Round robin indicator */}
              <text x={215} y={170} textAnchor="middle" fill="#22c55e" fontSize={9}>Any server</text>
              <text x={215} y={182} textAnchor="middle" fill="#22c55e" fontSize={9}>can handle!</text>

              {/* Connections */}
              <line x1={130} y1={125} x2={180} y2={125} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={115} x2={300} y2={60} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={125} x2={300} y2={125} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />
              <line x1={250} y1={135} x2={300} y2={190} stroke="#262626" strokeWidth={1.5} strokeDasharray="4" />

              {/* Animation */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.circle r={5} fill="#22c55e"
                    initial={{ cx: 130, cy: 125, opacity: 0 }}
                    animate={{ cx: 180, cy: 125, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                {step === 2 && (
                  <motion.circle r={5} fill="#22c55e"
                    initial={{ cx: 250, cy: 115, opacity: 0 }}
                    animate={{ cx: 300, cy: 60, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                {step === 3 && (
                  <motion.circle r={5} fill="#22c55e"
                    initial={{ cx: 250, cy: 125, opacity: 0 }}
                    animate={{ cx: 300, cy: 125, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                {step === 4 && (
                  <motion.circle r={5} fill="#22c55e"
                    initial={{ cx: 250, cy: 135, opacity: 0 }}
                    animate={{ cx: 300, cy: 190, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </AnimatePresence>

              {/* Step text */}
              <text x={250} y={250} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'All state is in the JWT token'}
                {step === 1 && 'Request includes token with user data'}
                {step === 2 && 'Request 1 → Server 1'}
                {step === 3 && 'Request 2 → Server 2 (any server works!)'}
                {step === 4 && 'Request 3 → Server 3 (easy to scale)'}
              </text>
            </>
          )}
        </svg>
      </DiagramContainer>
    </div>
  )
}
