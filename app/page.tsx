'use client'

import { motion } from 'framer-motion'
import TopicCard from '@/components/ui/TopicCard'
import { topics } from '@/lib/content'
import { ArrowRight } from 'lucide-react'

const glossaryItems = [
  {
    term: 'SNS',
    description:
      'Amazon Simple Notification Service powers the fanout demos by broadcasting a single domain event to queues, Lambdas, or HTTPS targets with managed retries.',
  },
  {
    term: 'SQS',
    description:
      'Amazon Simple Queue Service underpins the choreography and async flows—producers enqueue work, consumers poll at their pace, and DLQs capture poison messages.',
  },
  {
    term: 'ALB',
    description:
      'Application Load Balancer represents the entry tier in the microservices and hybrid sections, routing HTTP traffic by host or path to the right Next.js-backed service.',
  },
  {
    term: 'CDC',
    description:
      'Change Data Capture streams database mutations (binlogs, Dynamo Streams, Debezium) into event-driven pipelines so services stay in sync without direct writes.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Architectural Patterns &{' '}
            <span className="text-accent">Design Principles</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            Learn software architecture through interactive diagrams and real-world code examples.
            Master the patterns that power modern distributed systems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-accent"
          >
            <span className="text-sm">Scroll to explore topics</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Choose a Topic
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TopicCard
                  href={topic.href}
                  title={topic.title}
                  description={topic.description}
                  icon={topic.icon}
                  color={topic.color}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            How You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Interactive Diagrams</h3>
              <p className="text-text-secondary text-sm">
                Visualize how data flows through different architectural patterns with animated diagrams.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Code Examples</h3>
              <p className="text-text-secondary text-sm">
                See real implementation examples side-by-side to understand the practical differences.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Decision Guides</h3>
              <p className="text-text-secondary text-sm">
                Learn when to use each pattern with clear guidelines and trade-off comparisons.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-4 text-center"
          >
            Architecture Glossary
          </motion.h2>
          <p className="text-center text-text-secondary max-w-3xl mx-auto mb-10 text-sm">
            Quickly map AWS building blocks to the diagrams and decision guides featured in this
            project so you know where SNS fanout, SQS queues, ALBs, and CDC pipelines appear in the
            walkthroughs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossaryItems.map((item, index) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-surface/60 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{item.term}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
