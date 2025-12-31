'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiagramContainer from '@/components/ui/DiagramContainer'

interface MessageProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  delay?: number
}

function Message({ from, to, color, delay = 0 }: MessageProps) {
  return (
    <motion.circle
      r={6}
      fill={color}
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{ cx: to.x, cy: to.y, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1, delay, ease: 'easeInOut' }}
    />
  )
}

function Box({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g>
      <rect
        x={x - 50}
        y={y - 25}
        width={100}
        height={50}
        rx={8}
        fill={`${color}20`}
        stroke={color}
        strokeWidth={2}
      />
      <text x={x} y={y + 5} textAnchor="middle" fill="#fafafa" fontSize={12} fontWeight={500}>
        {label}
      </text>
    </g>
  )
}

export default function EventDrivenDiagram() {
  const [mode, setMode] = useState<'request' | 'event'>('request')
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalSteps = mode === 'request' ? 4 : 5

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
          onClick={() => { setMode('request'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'request' ? 'bg-warning text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Request/Response
        </button>
        <button
          onClick={() => { setMode('event'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'event' ? 'bg-success text-black' : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Event-Driven
        </button>
      </div>

      <DiagramContainer
        title={mode === 'request' ? 'Request/Response Pattern' : 'Event-Driven Pattern'}
        totalSteps={totalSteps}
        currentStep={step}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={reset}
        onNextStep={nextStep}
      >
        <svg viewBox="0 0 500 300" className="w-full max-w-lg">
          {mode === 'request' ? (
            <>
              {/* Request/Response: Client -> Service -> Client */}
              <Box x={100} y={150} label="Client" color="#f59e0b" />
              <Box x={400} y={150} label="Service" color="#3b82f6" />

              {/* Connection lines */}
              <line x1={150} y1={140} x2={350} y2={140} stroke="#262626" strokeWidth={2} strokeDasharray="4" />
              <line x1={150} y1={160} x2={350} y2={160} stroke="#262626" strokeWidth={2} strokeDasharray="4" />

              {/* Labels */}
              <text x={250} y={130} textAnchor="middle" fill="#a3a3a3" fontSize={10}>Request</text>
              <text x={250} y={180} textAnchor="middle" fill="#a3a3a3" fontSize={10}>Response</text>

              {/* Animated messages */}
              <AnimatePresence>
                {step >= 1 && step < 3 && (
                  <Message from={{ x: 150, y: 140 }} to={{ x: 350, y: 140 }} color="#f59e0b" />
                )}
                {step >= 2 && step < 4 && (
                  <Message from={{ x: 350, y: 160 }} to={{ x: 150, y: 160 }} color="#3b82f6" delay={0.5} />
                )}
              </AnimatePresence>

              {/* Step indicator */}
              <text x={250} y={250} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Client needs data from service'}
                {step === 1 && 'Client sends request (blocks and waits)'}
                {step === 2 && 'Service processes and sends response'}
                {step === 3 && 'Client receives response and continues'}
              </text>
            </>
          ) : (
            <>
              {/* Event-Driven: Publisher -> Event Bus -> Subscribers */}
              <Box x={100} y={150} label="Publisher" color="#22c55e" />
              <rect x={210} y={130} width={80} height={40} rx={4} fill="#8b5cf620" stroke="#8b5cf6" strokeWidth={2} />
              <text x={250} y={155} textAnchor="middle" fill="#fafafa" fontSize={11}>Event Bus</text>

              <Box x={400} y={80} label="Subscriber A" color="#3b82f6" />
              <Box x={400} y={150} label="Subscriber B" color="#ec4899" />
              <Box x={400} y={220} label="Subscriber C" color="#06b6d4" />

              {/* Connection lines */}
              <line x1={150} y1={150} x2={210} y2={150} stroke="#262626" strokeWidth={2} strokeDasharray="4" />
              <line x1={290} y1={140} x2={350} y2={80} stroke="#262626" strokeWidth={2} strokeDasharray="4" />
              <line x1={290} y1={150} x2={350} y2={150} stroke="#262626" strokeWidth={2} strokeDasharray="4" />
              <line x1={290} y1={160} x2={350} y2={220} stroke="#262626" strokeWidth={2} strokeDasharray="4" />

              {/* Animated messages */}
              <AnimatePresence>
                {step >= 1 && step < 3 && (
                  <Message from={{ x: 150, y: 150 }} to={{ x: 210, y: 150 }} color="#22c55e" />
                )}
                {step >= 2 && (
                  <>
                    <Message from={{ x: 290, y: 140 }} to={{ x: 350, y: 80 }} color="#3b82f6" delay={0.3} />
                    <Message from={{ x: 290, y: 150 }} to={{ x: 350, y: 150 }} color="#ec4899" delay={0.4} />
                    <Message from={{ x: 290, y: 160 }} to={{ x: 350, y: 220 }} color="#06b6d4" delay={0.5} />
                  </>
                )}
              </AnimatePresence>

              {/* Step indicator */}
              <text x={250} y={280} textAnchor="middle" fill="#a3a3a3" fontSize={11}>
                {step === 0 && 'Publisher has an event to broadcast'}
                {step === 1 && 'Publisher emits event (fire and forget)'}
                {step === 2 && 'Event bus distributes to all subscribers'}
                {step === 3 && 'Subscribers process event independently'}
                {step === 4 && 'Publisher continues without waiting'}
              </text>
            </>
          )}
        </svg>
      </DiagramContainer>
    </div>
  )
}
