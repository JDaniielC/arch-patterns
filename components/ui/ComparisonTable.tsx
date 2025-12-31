'use client'

import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'

interface ComparisonItem {
  aspect: string
  left: string | boolean
  right: string | boolean
}

interface ComparisonTableProps {
  leftTitle: string
  rightTitle: string
  items: ComparisonItem[]
  leftColor?: string
  rightColor?: string
}

function renderValue(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-success mx-auto" />
    ) : (
      <X className="w-5 h-5 text-red-500 mx-auto" />
    )
  }
  if (value === '-') {
    return <Minus className="w-5 h-5 text-text-secondary mx-auto" />
  }
  return <span className="text-sm">{value}</span>
}

export default function ComparisonTable({
  leftTitle,
  rightTitle,
  items,
  leftColor = '#3b82f6',
  rightColor = '#22c55e',
}: ComparisonTableProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      {/* Header */}
      <div className="grid grid-cols-3 bg-surface">
        <div className="p-4 border-r border-border" />
        <div
          className="p-4 text-center font-semibold border-r border-border"
          style={{ backgroundColor: `${leftColor}15` }}
        >
          <span style={{ color: leftColor }}>{leftTitle}</span>
        </div>
        <div
          className="p-4 text-center font-semibold"
          style={{ backgroundColor: `${rightColor}15` }}
        >
          <span style={{ color: rightColor }}>{rightTitle}</span>
        </div>
      </div>

      {/* Rows */}
      {items.map((item, index) => (
        <motion.div
          key={item.aspect}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="grid grid-cols-3 border-t border-border hover:bg-surface/50 transition-colors"
        >
          <div className="p-4 border-r border-border font-medium text-sm">
            {item.aspect}
          </div>
          <div className="p-4 border-r border-border text-center text-text-secondary">
            {renderValue(item.left)}
          </div>
          <div className="p-4 text-center text-text-secondary">
            {renderValue(item.right)}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
