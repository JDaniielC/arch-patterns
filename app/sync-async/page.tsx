'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import SyncAsyncDiagram from '@/components/diagrams/SyncAsyncDiagram'
import CodeBlock from '@/components/ui/CodeBlock'
import ComparisonTable from '@/components/ui/ComparisonTable'
import { codeExamples } from '@/lib/content'

const comparisonItems = [
  { aspect: 'Execution', left: 'Sequential', right: 'Concurrent' },
  { aspect: 'Thread Blocking', left: 'Yes (waits)', right: 'No (continues)' },
  { aspect: 'Total Time', left: 'Sum of all tasks', right: 'Max of all tasks' },
  { aspect: 'Resource Usage', left: 'One task at a time', right: 'Multiple tasks' },
  { aspect: 'Complexity', left: 'Simple, linear', right: 'Callbacks/Promises' },
  { aspect: 'Error Handling', left: 'try/catch', right: 'Promise.catch()' },
  { aspect: 'Debugging', left: 'Easy (linear flow)', right: 'Harder (race conditions)' },
]

export default function SyncAsyncPage() {
  return (
    <TopicPageLayout topicId="sync-async">
      {/* Interactive Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Interactive Diagram</h2>
        <p className="text-text-secondary mb-6">
          Visualize the difference between blocking synchronous and non-blocking asynchronous execution.
        </p>
        <SyncAsyncDiagram />
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Comparison</h2>
        <ComparisonTable
          leftTitle="Synchronous"
          rightTitle="Asynchronous"
          items={comparisonItems}
          leftColor="#f59e0b"
          rightColor="#06b6d4"
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
            <h3 className="text-sm font-medium text-warning mb-3">Synchronous</h3>
            <CodeBlock
              code={codeExamples.syncAsync.sync}
              language="typescript"
              title="sync-processing.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-cyan-500 mb-3">Asynchronous</h3>
            <CodeBlock
              code={codeExamples.syncAsync.async}
              language="typescript"
              title="async-processing.ts"
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
            <h3 className="font-medium text-warning mb-3">Use Synchronous when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Operations must happen in strict order</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Each step depends on the previous result</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>CPU-bound tasks (calculations)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Simple scripts and utilities</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-cyan-500 mb-3">Use Asynchronous when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>I/O operations (network, files, DB)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>Multiple independent operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>User interface responsiveness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>High-throughput web servers</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Advanced Async Patterns */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Advanced Async Patterns</h2>
        <p className="text-text-secondary mb-6">
          Essential patterns for building reliable, fault-tolerant asynchronous systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Retries */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-cyan-500">Retries with Backoff</h3>
            <p className="text-text-secondary text-sm mb-4">
              Automatically retry failed operations with increasing delays to handle transient failures.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span><strong>Exponential backoff:</strong> 1s, 2s, 4s, 8s delays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span><strong>Jitter:</strong> Add randomness to prevent thundering herd</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span><strong>Max retries:</strong> Limit attempts to avoid infinite loops</span>
              </li>
            </ul>
          </div>

          {/* Dead-Letter Queue */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-red-500">Dead-Letter Queue (DLQ)</h3>
            <p className="text-text-secondary text-sm mb-4">
              A queue that stores messages that failed to be processed after all retries.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span><strong>Isolation:</strong> Failed messages don&apos;t block the main queue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span><strong>Analysis:</strong> Inspect failures for debugging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span><strong>Replay:</strong> Reprocess messages after fixing issues</span>
              </li>
            </ul>
          </div>

          {/* Outbox/Inbox Pattern */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-green-500">Outbox/Inbox Pattern</h3>
            <p className="text-text-secondary text-sm mb-4">
              Ensures reliable message delivery by storing events in the database before publishing.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>Outbox:</strong> Store events in DB, then publish asynchronously</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>Inbox:</strong> Deduplicate incoming messages using unique IDs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>Atomicity:</strong> DB transaction + event in single commit</span>
              </li>
            </ul>
          </div>

          {/* Sagas */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-purple-500">Sagas</h3>
            <p className="text-text-secondary text-sm mb-4">
              Manage distributed transactions across multiple services with compensating actions.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span><strong>Choreography:</strong> Services react to events independently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span><strong>Orchestration:</strong> Central coordinator manages steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span><strong>Compensation:</strong> Rollback via undo operations on failure</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* AWS Services */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">AWS Services for Async Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-2">Amazon SQS</h3>
            <p className="text-sm text-text-secondary mb-2">Fully managed message queuing for decoupling services.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Standard: best-effort ordering, at-least-once</li>
              <li>• FIFO: exactly-once, strict ordering</li>
              <li>• Built-in DLQ support</li>
              <li>• Visibility timeout for retries</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-2">AWS Lambda</h3>
            <p className="text-sm text-text-secondary mb-2">Serverless compute for async event processing.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Triggers: SQS, SNS, EventBridge, S3</li>
              <li>• Auto-scaling to zero</li>
              <li>• Built-in retry with DLQ</li>
              <li>• Max 15-min execution</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-2">AWS Step Functions</h3>
            <p className="text-sm text-text-secondary mb-2">Orchestrate async workflows with state machines.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Visual workflow designer</li>
              <li>• Built-in retry and error handling</li>
              <li>• Wait states for delays</li>
              <li>• Saga pattern support</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-2">Amazon EventBridge</h3>
            <p className="text-sm text-text-secondary mb-2">Serverless event bus for event-driven architectures.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Schema registry for events</li>
              <li>• Content-based filtering</li>
              <li>• Archive and replay events</li>
              <li>• Cross-account delivery</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-2">Amazon SNS</h3>
            <p className="text-sm text-text-secondary mb-2">Pub/sub messaging for fanout patterns.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Push to SQS, Lambda, HTTP</li>
              <li>• Message filtering</li>
              <li>• FIFO topics available</li>
              <li>• SMS and email delivery</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-2">Amazon Kinesis</h3>
            <p className="text-sm text-text-secondary mb-2">Real-time streaming data at scale.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Data Streams: custom consumers</li>
              <li>• Firehose: load to S3/Redshift</li>
              <li>• Sharding for parallelism</li>
              <li>• 24h-365d retention</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
