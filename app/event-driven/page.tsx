'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import EventDrivenDiagram from '@/components/diagrams/EventDrivenDiagram'
import CodeBlock from '@/components/ui/CodeBlock'
import ComparisonTable from '@/components/ui/ComparisonTable'
import { codeExamples } from '@/lib/content'

const comparisonItems = [
  { aspect: 'Communication', left: 'Direct, synchronous', right: 'Indirect, asynchronous' },
  { aspect: 'Coupling', left: 'Tight (caller knows callee)', right: 'Loose (via events)' },
  { aspect: 'Latency', left: 'Immediate response', right: 'Eventually consistent' },
  { aspect: 'Scalability', left: 'Limited by slowest service', right: 'Highly scalable' },
  { aspect: 'Error Handling', left: 'Immediate feedback', right: 'Complex (retries, DLQ)' },
  { aspect: 'Debugging', left: 'Easy to trace', right: 'Harder to trace' },
  { aspect: 'Dependencies', left: 'Compile-time', right: 'Runtime' },
]

export default function EventDrivenPage() {
  return (
    <TopicPageLayout topicId="event-driven">
      {/* Interactive Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Interactive Diagram</h2>
        <p className="text-text-secondary mb-6">
          Toggle between patterns and use the controls to step through each flow.
        </p>
        <EventDrivenDiagram />
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Comparison</h2>
        <ComparisonTable
          leftTitle="Request/Response"
          rightTitle="Event-Driven"
          items={comparisonItems}
          leftColor="#f59e0b"
          rightColor="#22c55e"
        />
      </motion.section>

      {/* Code Examples */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Code Examples</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-warning mb-3">Request/Response</h3>
            <CodeBlock
              code={codeExamples.eventDriven.requestResponse}
              language="typescript"
              title="request-response.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-success mb-3">Event-Driven</h3>
            <CodeBlock
              code={codeExamples.eventDriven.eventDriven}
              language="typescript"
              title="event-driven.ts"
            />
          </div>
        </div>
      </motion.section>

      {/* When to Use */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">When to Use Each Pattern</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-warning mb-3">Use Request/Response when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>You need immediate feedback or response</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Operations must be atomic/transactional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Simple CRUD operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>User-facing synchronous workflows</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-success mb-3">Use Event-Driven when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Multiple services need to react to changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>You need to decouple producers from consumers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Building scalable, distributed systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Background processing and async workflows</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* AWS Services */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">AWS Event-Driven Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Request/Response on AWS</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>API Gateway + Lambda:</strong> Sync REST/HTTP APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>AppSync:</strong> GraphQL with real-time subscriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>ALB + ECS/EKS:</strong> Container-based APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>ElastiCache:</strong> Low-latency caching layer</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Event-Driven on AWS</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>EventBridge:</strong> Central event bus with routing rules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>SNS + SQS:</strong> Fanout with queue buffering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Kinesis:</strong> High-throughput streaming</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>DynamoDB Streams:</strong> CDC for table changes</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30">
          <p className="text-sm text-text-secondary">
            <strong className="text-[#FF9900]">AWS Tip:</strong> Use EventBridge as the central event bus. It integrates with 90+ AWS services and supports schema discovery, archive/replay, and cross-account routing.
          </p>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
