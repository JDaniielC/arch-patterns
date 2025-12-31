'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import ChoreographyDiagram from '@/components/diagrams/ChoreographyDiagram'
import CodeBlock from '@/components/ui/CodeBlock'
import ComparisonTable from '@/components/ui/ComparisonTable'
import { codeExamples } from '@/lib/content'

const comparisonItems = [
  { aspect: 'Control Flow', left: 'Centralized', right: 'Decentralized' },
  { aspect: 'Coupling', left: 'Orchestrator knows all services', right: 'Services only know events' },
  { aspect: 'Single Point of Failure', left: 'Yes (orchestrator)', right: 'No' },
  { aspect: 'Visibility', left: 'Easy to trace workflow', right: 'Harder to trace' },
  { aspect: 'Adding Services', left: 'Modify orchestrator', right: 'Just subscribe to events' },
  { aspect: 'Error Handling', left: 'Centralized compensation', right: 'Distributed saga' },
  { aspect: 'Complexity', left: 'In orchestrator', right: 'Distributed across services' },
]

export default function ChoreographyPage() {
  return (
    <TopicPageLayout topicId="choreography">
      {/* Interactive Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Interactive Diagram</h2>
        <p className="text-text-secondary mb-6">
          Compare centralized orchestration with decentralized choreography patterns.
        </p>
        <ChoreographyDiagram />
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Comparison</h2>
        <ComparisonTable
          leftTitle="Orchestration"
          rightTitle="Choreography"
          items={comparisonItems}
          leftColor="#f59e0b"
          rightColor="#8b5cf6"
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
            <h3 className="text-sm font-medium text-warning mb-3">Orchestration</h3>
            <CodeBlock
              code={codeExamples.choreography.orchestration}
              language="typescript"
              title="order-orchestrator.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-purple-500 mb-3">Choreography</h3>
            <CodeBlock
              code={codeExamples.choreography.choreography}
              language="typescript"
              title="event-handlers.ts"
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
            <h3 className="font-medium text-warning mb-3">Use Orchestration when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Workflow has strict ordering requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Complex compensation/rollback logic needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Need clear visibility of workflow state</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Business logic is complex and changes often</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-purple-500 mb-3">Use Choreography when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Services can operate independently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Want to avoid single point of failure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Teams own their services end-to-end</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Simple, linear workflows</span>
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
        <h2 className="text-xl font-semibold mb-4">AWS Implementation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Orchestration with Step Functions</h3>
            <p className="text-text-secondary text-sm mb-4">
              AWS Step Functions is the primary orchestration service for complex workflows.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Standard:</strong> Long-running, exactly-once (up to 1 year)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Express:</strong> High-volume, at-least-once (5 min max)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Built-in:</strong> Retry, catch, timeout, parallel branches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>SDK integrations:</strong> 220+ AWS services direct calls</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Choreography with EventBridge</h3>
            <p className="text-text-secondary text-sm mb-4">
              EventBridge enables decoupled, event-driven choreography across services.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Event rules:</strong> Content-based routing to targets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Schema registry:</strong> Discover and validate event schemas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Archive:</strong> Replay events for recovery/testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Pipes:</strong> Point-to-point with filtering/enrichment</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-lg mb-4">Saga Pattern on AWS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background">
              <h4 className="font-medium text-warning mb-2">Orchestrated Saga</h4>
              <p className="text-xs text-text-secondary mb-2">Step Functions manages the workflow and compensation.</p>
              <code className="text-xs text-[#FF9900]">Step Functions → Lambda → DynamoDB</code>
            </div>
            <div className="p-4 rounded-lg bg-background">
              <h4 className="font-medium text-purple-500 mb-2">Choreographed Saga</h4>
              <p className="text-xs text-text-secondary mb-2">Services react to events and publish their own.</p>
              <code className="text-xs text-[#FF9900]">EventBridge → Lambda → SNS/SQS</code>
            </div>
          </div>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
