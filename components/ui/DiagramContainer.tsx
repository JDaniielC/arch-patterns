'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react'

interface DiagramContainerProps {
  title: string
  children: React.ReactNode
  onStepChange?: (step: number) => void
  totalSteps?: number
  currentStep?: number
  isPlaying?: boolean
  onPlayPause?: () => void
  onReset?: () => void
  onNextStep?: () => void
}

export default function DiagramContainer({
  title,
  children,
  totalSteps = 0,
  currentStep = 0,
  isPlaying = false,
  onPlayPause,
  onReset,
  onNextStep,
}: DiagramContainerProps) {
  const hasControls = totalSteps > 0

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
        <h3 className="font-semibold text-sm">{title}</h3>
        {hasControls && (
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="p-1.5 rounded-md hover:bg-border/50 transition-colors text-text-secondary hover:text-text-primary"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onPlayPause}
              className="p-1.5 rounded-md bg-accent hover:bg-accent/80 transition-colors text-white"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={onNextStep}
              className="p-1.5 rounded-md hover:bg-border/50 transition-colors text-text-secondary hover:text-text-primary"
              title="Next step"
              disabled={isPlaying}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-text-secondary ml-2">
              Step {currentStep + 1} / {totalSteps}
            </span>
          </div>
        )}
      </div>

      {/* Diagram content */}
      <div className="p-6 min-h-[300px] flex items-center justify-center">
        {children}
      </div>

      {/* Progress bar */}
      {hasControls && (
        <div className="h-1 bg-border">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  )
}
