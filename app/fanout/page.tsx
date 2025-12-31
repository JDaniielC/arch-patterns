'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import FanoutDiagram from '@/components/diagrams/FanoutDiagram'
import CodeBlock from '@/components/ui/CodeBlock'
import ComparisonTable from '@/components/ui/ComparisonTable'
import { codeExamples } from '@/lib/content'

const comparisonItems = [
  { aspect: 'Publisher Knowledge', left: 'Knows all consumers', right: 'Knows only the topic' },
  { aspect: 'Adding Consumers', left: 'Modify publisher code', right: 'Just subscribe to topic' },
  { aspect: 'Delivery Order', left: 'Sequential', right: 'Parallel/Independent' },
  { aspect: 'Failure Handling', left: 'Publisher must handle', right: 'Per-queue retries' },
  { aspect: 'Scalability', left: 'Limited by publisher', right: 'Highly scalable' },
  { aspect: 'Message Durability', left: 'If publisher fails, lost', right: 'Persisted in queues' },
  { aspect: 'Complexity', left: 'Simple initially', right: 'More infrastructure' },
]

export default function FanoutPage() {
  return (
    <TopicPageLayout topicId="fanout">
      {/* Interactive Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Interactive Diagram</h2>
        <p className="text-text-secondary mb-6">
          See how fanout patterns distribute messages to multiple consumers simultaneously.
        </p>
        <FanoutDiagram />
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Comparison</h2>
        <ComparisonTable
          leftTitle="Direct Messaging"
          rightTitle="Fanout Pattern"
          items={comparisonItems}
          leftColor="#f59e0b"
          rightColor="#ec4899"
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
            <h3 className="text-sm font-medium text-warning mb-3">Direct Messaging</h3>
            <CodeBlock
              code={codeExamples.fanout.direct}
              language="typescript"
              title="direct-notify.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-pink-500 mb-3">Fanout Pattern</h3>
            <CodeBlock
              code={codeExamples.fanout.fanout}
              language="typescript"
              title="fanout-publish.ts"
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
        <h2 className="text-xl font-semibold mb-4">When to Use Fanout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-pink-500 mb-3">Best Use Cases:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Multi-channel notifications (email, SMS, push)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Event broadcasting to multiple services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Real-time updates to multiple clients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Audit logging and analytics pipelines</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-text-secondary mb-3">Common Implementations:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>AWS SNS + SQS for cloud-native fanout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>RabbitMQ fanout exchanges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Apache Kafka topics with consumer groups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Redis Pub/Sub for real-time messaging</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Fanout Patterns */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Fanout Delivery Patterns</h2>
        <p className="text-text-secondary mb-6">
          Different mechanisms for distributing messages to multiple consumers, each with unique trade-offs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pub/Sub */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-pink-500">Pub/Sub (Publish/Subscribe)</h3>
            <p className="text-text-secondary text-sm mb-4">
              Publishers send messages to topics, subscribers receive copies of all messages.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm mb-4">
              <li className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span><strong>Push-based:</strong> Broker pushes to all subscribers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span><strong>Fire-and-forget:</strong> No message persistence (typically)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">•</span>
                <span><strong>Real-time:</strong> Low latency delivery</span>
              </li>
            </ul>
            <div className="text-xs text-text-secondary bg-background rounded p-2">
              <strong>Examples:</strong> Redis Pub/Sub, Google Cloud Pub/Sub, AWS SNS
            </div>
          </div>

          {/* Streams + Consumer Groups */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-purple-500">Streams + Consumer Groups</h3>
            <p className="text-text-secondary text-sm mb-4">
              Persistent log of events with parallel processing via consumer groups.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm mb-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span><strong>Persistent:</strong> Messages stored, replayable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span><strong>Partitioned:</strong> Parallel consumers per group</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span><strong>Offset tracking:</strong> Resume from last position</span>
              </li>
            </ul>
            <div className="text-xs text-text-secondary bg-background rounded p-2">
              <strong>Examples:</strong> Apache Kafka, AWS Kinesis, Redis Streams
            </div>
          </div>

          {/* Event Notifications + Pull */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-cyan-500">Event Notification + Pull</h3>
            <p className="text-text-secondary text-sm mb-4">
              Light notification triggers consumers to pull full data when ready.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm mb-4">
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span><strong>Thin events:</strong> Just ID/type, not full payload</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span><strong>Consumer control:</strong> Pull when ready to process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span><strong>Fresh data:</strong> Always get latest state on pull</span>
              </li>
            </ul>
            <div className="text-xs text-text-secondary bg-background rounded p-2">
              <strong>Examples:</strong> S3 Event Notifications, Database CDC, GitHub webhooks + API
            </div>
          </div>

          {/* Webhook Fanout */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-green-500">Webhook Fanout</h3>
            <p className="text-text-secondary text-sm mb-4">
              HTTP callbacks to registered endpoints when events occur.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>HTTP-based:</strong> Simple integration, any language</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>External consumers:</strong> Cross-organization delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>Retry logic:</strong> Handle failures with exponential backoff</span>
              </li>
            </ul>
            <div className="text-xs text-text-secondary bg-background rounded p-2">
              <strong>Examples:</strong> Stripe webhooks, GitHub webhooks, Slack events API
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pattern Comparison */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Choosing the Right Pattern</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Pattern</th>
                <th className="text-left py-3 px-4 font-medium">Persistence</th>
                <th className="text-left py-3 px-4 font-medium">Delivery</th>
                <th className="text-left py-3 px-4 font-medium">Best For</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-pink-500 font-medium">Pub/Sub</td>
                <td className="py-3 px-4">No (ephemeral)</td>
                <td className="py-3 px-4">Push, real-time</td>
                <td className="py-3 px-4">Live updates, chat, notifications</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-purple-500 font-medium">Streams</td>
                <td className="py-3 px-4">Yes (log)</td>
                <td className="py-3 px-4">Pull, batched</td>
                <td className="py-3 px-4">Event sourcing, analytics, replay</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-cyan-500 font-medium">Notify + Pull</td>
                <td className="py-3 px-4">At source</td>
                <td className="py-3 px-4">Push + Pull</td>
                <td className="py-3 px-4">Large payloads, fresh data needs</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-green-500 font-medium">Webhooks</td>
                <td className="py-3 px-4">With retries</td>
                <td className="py-3 px-4">Push (HTTP)</td>
                <td className="py-3 px-4">External integrations, APIs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Advanced Concepts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold mb-4">Advanced Concepts</h2>
        <p className="text-text-secondary mb-6">
          Critical patterns for building reliable, scalable messaging systems at scale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Backpressure */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-orange-500">Backpressure</h3>
            <p className="text-text-secondary text-sm mb-4">
              Flow control mechanism when consumers can&apos;t keep up with producers.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Strategies:</h4>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Drop:</strong> Discard messages when buffer full (lossy)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Buffer:</strong> Queue messages until consumer ready</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Throttle:</strong> Slow down producer rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Sample:</strong> Process only every Nth message</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <h4 className="text-xs font-medium mb-2">Pull vs Push:</h4>
                <p className="text-xs text-text-secondary">
                  <strong>Pull-based</strong> (Kafka) has natural backpressure - consumers fetch at their pace.
                  <strong> Push-based</strong> (RabbitMQ) needs explicit flow control mechanisms.
                </p>
              </div>
            </div>
          </div>

          {/* Schema Registry */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-500">Schema Registry</h3>
            <p className="text-text-secondary text-sm mb-4">
              Centralized schema management for message contracts between producers and consumers.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Validation:</strong> Reject invalid messages at publish time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Evolution:</strong> Manage backward/forward compatibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Documentation:</strong> Single source of truth for contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Efficiency:</strong> Schema ID instead of full schema per message</span>
                  </li>
                </ul>
              </div>
              <div className="text-xs text-text-secondary bg-background rounded p-2">
                <strong>Tools:</strong> Confluent Schema Registry, AWS Glue, Apicurio, buf.build
              </div>
            </div>
          </div>

          {/* Schema Evolution */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-indigo-500">Schema Evolution</h3>
            <p className="text-text-secondary text-sm mb-4">
              Strategies for changing message schemas without breaking consumers.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span><strong>Backward compatible:</strong> New schema can read old data (add optional fields)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span><strong>Forward compatible:</strong> Old schema can read new data (ignore unknown fields)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span><strong>Full compatible:</strong> Both directions work (safest)</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-background">
              <p className="text-xs text-text-secondary">
                <strong>Formats:</strong> Avro (best evolution), Protobuf (efficient), JSON Schema (readable)
              </p>
            </div>
          </div>

          {/* Message Ordering */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-teal-500">Message Ordering</h3>
            <p className="text-text-secondary text-sm mb-4">
              Guarantees about the order in which messages are delivered and processed.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-teal-500">•</span>
                <span><strong>No ordering:</strong> Messages arrive in any order (highest throughput)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500">•</span>
                <span><strong>Partition ordering:</strong> Order within a partition key (Kafka)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500">•</span>
                <span><strong>FIFO:</strong> Strict global order (lowest throughput)</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-background">
              <p className="text-xs text-text-secondary">
                <strong>Tip:</strong> Use partition keys (e.g., user_id, order_id) to maintain order where it matters while scaling horizontally.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* AWS Fanout Patterns */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4">AWS Fanout Architectures</h2>
        <p className="text-text-secondary mb-6">
          Common AWS patterns for implementing fanout at scale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">SNS + SQS Fanout</h3>
            <p className="text-text-secondary text-sm mb-4">
              The classic AWS fanout pattern for reliable message distribution.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4">
              <code className="text-xs text-[#FF9900]">Producer → SNS Topic → SQS Queues → Lambda/ECS</code>
            </div>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Each subscriber gets its own queue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Independent retry and DLQ per consumer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Message filtering at SNS level</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">EventBridge Fanout</h3>
            <p className="text-text-secondary text-sm mb-4">
              Modern event-driven fanout with content-based routing.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4">
              <code className="text-xs text-[#FF9900]">Producer → EventBridge → Rules → Targets</code>
            </div>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Up to 5 targets per rule (300+ rules)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Content-based filtering on any field</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Archive and replay capabilities</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Kinesis Fanout</h3>
            <p className="text-text-secondary text-sm mb-4">
              High-throughput streaming with multiple consumers.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4">
              <code className="text-xs text-[#FF9900]">Producer → Kinesis Stream → Consumer Groups</code>
            </div>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Enhanced fan-out: dedicated throughput per consumer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Up to 20 consumers with enhanced fan-out</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Firehose for S3/Redshift delivery</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">S3 Event Notifications</h3>
            <p className="text-text-secondary text-sm mb-4">
              Fanout triggered by object storage events.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4">
              <code className="text-xs text-[#FF9900]">S3 Bucket → EventBridge/SNS → Multiple Targets</code>
            </div>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Trigger on PUT, DELETE, COPY events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Filter by prefix and suffix</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span>Use EventBridge for richer routing</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Delivery Guarantees */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Delivery Guarantees</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-red-500 mb-2">At-Most-Once</h3>
            <p className="text-sm text-text-secondary mb-2">
              Fire and forget. Message may be lost but never duplicated.
            </p>
            <p className="text-xs text-text-secondary">
              <strong>Use for:</strong> Metrics, logs, non-critical updates
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-yellow-500 mb-2">At-Least-Once</h3>
            <p className="text-sm text-text-secondary mb-2">
              Retry until acknowledged. Message may be duplicated but never lost.
            </p>
            <p className="text-xs text-text-secondary">
              <strong>Use for:</strong> Most cases. Consumers must be idempotent.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-green-500 mb-2">Exactly-Once</h3>
            <p className="text-sm text-text-secondary mb-2">
              Each message processed exactly once. Requires transactional support.
            </p>
            <p className="text-xs text-text-secondary">
              <strong>Use for:</strong> Financial transactions, critical state changes
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-text-secondary">
            <strong className="text-yellow-500">Pro tip:</strong> True exactly-once is hard. Most systems achieve it via at-least-once delivery + idempotent consumers (using unique message IDs to deduplicate).
          </p>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
