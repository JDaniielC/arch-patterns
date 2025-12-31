'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface TopicCardProps {
  href: string
  title: string
  description: string
  icon: LucideIcon
  color: string
}

export default function TopicCard({ href, title, description, icon: Icon, color }: TopicCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-full p-6 rounded-xl bg-surface border border-border hover:border-accent/50 transition-colors overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
          style={{ backgroundColor: color }}
        />
        <div className="relative z-10">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
