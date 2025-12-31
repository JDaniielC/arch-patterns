'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, LucideIcon } from 'lucide-react'
import { topics } from '@/lib/content'

interface TopicPageLayoutProps {
  topicId: string
  children: React.ReactNode
}

export default function TopicPageLayout({ topicId, children }: TopicPageLayoutProps) {
  const currentIndex = topics.findIndex((t) => t.id === topicId)
  const currentTopic = topics[currentIndex]
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null
  const Icon = currentTopic?.icon

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Topics</span>
          </Link>
          <div className="flex items-center gap-4">
            {Icon && (
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${currentTopic.color}20` }}
              >
                <Icon className="w-7 h-7" style={{ color: currentTopic.color }} />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{currentTopic?.title}</h1>
              <p className="text-text-secondary mt-1">{currentTopic?.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-12">{children}</div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="flex items-center justify-between">
            {prevTopic ? (
              <Link
                href={prevTopic.href}
                className="group flex items-center gap-3 p-4 rounded-xl hover:bg-surface transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                <div>
                  <span className="text-xs text-text-secondary">Previous</span>
                  <p className="font-medium group-hover:text-accent transition-colors">
                    {prevTopic.shortTitle}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextTopic && (
              <Link
                href={nextTopic.href}
                className="group flex items-center gap-3 p-4 rounded-xl hover:bg-surface transition-colors text-right"
              >
                <div>
                  <span className="text-xs text-text-secondary">Next</span>
                  <p className="font-medium group-hover:text-accent transition-colors">
                    {nextTopic.shortTitle}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
