'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import CodeBlock from '@/components/ui/CodeBlock'
import { codeExamples } from '@/lib/content'

const hybridExamples = [
  {
    title: 'Modular Monolith + Event-Driven',
    description: 'Single deployment with internal event bus for module communication. Best of both worlds: deployment simplicity with loose coupling.',
    patterns: ['Monolith', 'Event-Driven', 'Choreography'],
    color: '#22c55e',
    useCase: 'Mid-size applications that need structure but not the complexity of distributed systems.',
    pros: ['Simple deployment', 'Low latency (in-process)', 'Easy debugging', 'Can extract to microservices later'],
    cons: ['Single point of failure', 'Must scale entire app', 'Shared database'],
  },
  {
    title: 'Microservices + Saga Orchestration',
    description: 'Distributed services coordinated by a central saga orchestrator for complex workflows with compensation.',
    patterns: ['Microservices', 'Orchestration', 'Sagas'],
    color: '#8b5cf6',
    useCase: 'Complex business transactions spanning multiple services that need reliable rollback.',
    pros: ['Clear workflow visibility', 'Centralized error handling', 'Easy to add compensation logic'],
    cons: ['Orchestrator can become bottleneck', 'Single point of failure for workflows', 'More complex than choreography'],
  },
  {
    title: 'Monolith API + Serverless Workers',
    description: 'Core API as a traditional monolith with Lambda functions handling async processing tasks.',
    patterns: ['Monolith', 'Serverless', 'Async'],
    color: '#f59e0b',
    useCase: 'Applications with heavy background processing (PDF generation, image processing, emails).',
    pros: ['Cost-effective (pay per execution)', 'Auto-scaling for spikes', 'Simple core API', 'No infrastructure for workers'],
    cons: ['Cold start latency', 'Vendor lock-in', '15-min execution limit', 'Debugging across boundaries'],
  },
  {
    title: 'Event Sourcing + CQRS',
    description: 'Events as the source of truth with separate read and write models optimized for their use cases.',
    patterns: ['Event Sourcing', 'CQRS', 'Event-Driven'],
    color: '#06b6d4',
    useCase: 'Systems requiring full audit trails, temporal queries, or complex read optimization.',
    pros: ['Complete audit history', 'Replay events for debugging', 'Optimized read models', 'Time-travel queries'],
    cons: ['Eventual consistency', 'Complex to implement', 'Storage growth', 'Learning curve'],
  },
]

const realWorldExamples = [
  {
    company: 'Netflix',
    architecture: 'Microservices + Choreography + CQRS',
    description: 'Hundreds of microservices communicating via events, with specialized read models for recommendations.',
  },
  {
    company: 'Shopify',
    architecture: 'Modular Monolith + Event-Driven',
    description: 'Started as Rails monolith, evolved to modular monolith with internal events before selective extraction.',
  },
  {
    company: 'Uber',
    architecture: 'Microservices + Orchestration + Serverless',
    description: 'Domain services orchestrated for ride workflows, with Lambda for notifications and analytics.',
  },
  {
    company: 'Stripe',
    architecture: 'Monolith Core + Microservices Edge',
    description: 'Core payment processing as monolith for consistency, edge services for integrations.',
  },
]

const cqrsGuidelines = [
  {
    title: 'Command Side',
    description:
      'Writes hit a slim aggregate that validates intent and appends events to the store. Think API → Lambda → Kinesis stream acting as the single writer.',
  },
  {
    title: 'Query Side',
    description:
      'Independent projections subscribe to the event stream and build read models (DynamoDB, OpenSearch, PostgreSQL) optimized for UX latency or analytics.',
  },
  {
    title: 'Consistency Contract',
    description:
      'Clients expect eventual consistency: commands return fast, while reads catch up via the projection lag you expose with status badges or webhooks.',
  },
  {
    title: 'Operational Guardrails',
    description:
      'Backfill jobs and replay tools let you rebuild read models when schemas change, so keep replay scripts versioned alongside the diagram code.',
  },
]

export default function HybridPatternsPage() {
  return (
    <TopicPageLayout topicId="hybrid-patterns">
      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Why Hybrid Architectures?</h2>
        <p className="text-text-secondary mb-4">
          Real-world systems rarely fit into a single architectural pattern. The best architectures combine
          multiple patterns strategically, using each where it provides the most value.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-teal-500 mb-2">Pragmatic</h3>
            <p className="text-sm text-text-secondary">Use the right tool for each problem instead of forcing one pattern everywhere.</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-teal-500 mb-2">Evolutionary</h3>
            <p className="text-sm text-text-secondary">Start simple and adopt more complex patterns only when needed.</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-teal-500 mb-2">Context-Aware</h3>
            <p className="text-sm text-text-secondary">Different parts of your system may have different requirements.</p>
          </div>
        </div>
      </motion.section>

      {/* Hybrid Pattern Examples */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Common Hybrid Combinations</h2>
        <div className="space-y-6">
          {hybridExamples.map((example, index) => (
            <div
              key={example.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: example.color }}>
                    {example.title}
                  </h3>
                  <p className="text-text-secondary text-sm mt-1">{example.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {example.patterns.map((pattern) => (
                    <span
                      key={pattern}
                      className="px-2 py-1 text-xs rounded-full bg-background border border-border"
                    >
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-background mb-4">
                <span className="text-xs font-medium text-text-secondary">Best for: </span>
                <span className="text-sm">{example.useCase}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-green-500 mb-2">Advantages</h4>
                  <ul className="space-y-1">
                    {example.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-green-500">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-500 mb-2">Trade-offs</h4>
                  <ul className="space-y-1">
                    {example.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-red-500">-</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
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
            <h3 className="text-sm font-medium text-green-500 mb-3">Modular Monolith + Events</h3>
            <CodeBlock
              code={codeExamples.hybridPatterns.monolithWithEvents}
              language="typescript"
              title="order-module.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-purple-500 mb-3">Microservices + Saga Orchestration</h3>
            <CodeBlock
              code={codeExamples.hybridPatterns.microservicesOrchestration}
              language="typescript"
              title="order-saga.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-warning mb-3">Monolith + Lambda Workers</h3>
            <CodeBlock
              code={codeExamples.hybridPatterns.lambdaWithMonolith}
              language="typescript"
              title="hybrid-processing.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-cyan-500 mb-3">Event Sourcing + CQRS</h3>
            <CodeBlock
              code={codeExamples.hybridPatterns.eventSourcingCQRS}
              language="typescript"
              title="event-sourcing.ts"
            />
          </div>
        </div>
      </motion.section>

      {/* CQRS Explanation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">How CQRS Fits In</h2>
        <p className="text-text-secondary text-sm mb-6">
          Command Query Responsibility Segregation (CQRS) splits the write and read responsibilities so each can scale
          independently. In this project&apos;s diagrams, the command side owns the canonical event log while read models serve
          dashboards, APIs, or search experiences tuned for their access patterns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {cqrsGuidelines.map((item) => (
            <div key={item.title} className="p-4 rounded-lg bg-background">
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
          <div>
            <h3 className="font-semibold mb-2 text-green-500">Use CQRS when you need:</h3>
            <ul className="space-y-1">
              <li>Audit trails or time-travel queries</li>
              <li>Different throughput/latency targets for writes vs reads</li>
              <li>Multiple read APIs (GraphQL, search, analytics) from the same source of truth</li>
              <li>Safe experimentation on projections without risking the write workload</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-red-500">Avoid CQRS when:</h3>
            <ul className="space-y-1">
              <li>Your domain is CRUD-heavy with simple joins</li>
              <li>The team cannot operate replay pipelines or versioned events</li>
              <li>Consistency must be strictly immediate for all consumers</li>
              <li>You lack tooling to observe projection lag and DLQs</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Real World Examples */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Real-World Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {realWorldExamples.map((example) => (
            <div
              key={example.company}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-semibold text-lg mb-1">{example.company}</h3>
              <p className="text-sm text-teal-500 mb-2">{example.architecture}</p>
              <p className="text-sm text-text-secondary">{example.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Decision Guide */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Choosing Your Architecture Mix</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium mb-2">1. Start with your constraints</h3>
            <p className="text-sm text-text-secondary">
              Team size, expertise, timeline, budget, and compliance requirements should guide your initial choices.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium mb-2">2. Identify hot spots</h3>
            <p className="text-sm text-text-secondary">
              Which parts of your system have the most complex logic, highest load, or strictest requirements? These may need different patterns.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium mb-2">3. Plan for evolution</h3>
            <p className="text-sm text-text-secondary">
              Design boundaries that allow you to change patterns later. A modular monolith with events can become microservices when needed.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium mb-2">4. Keep it boring where possible</h3>
            <p className="text-sm text-text-secondary">
              Use complex patterns only where they solve real problems. Simple CRUD operations don&apos;t need event sourcing.
            </p>
          </div>
        </div>
      </motion.section>

      {/* AWS Reference Architectures */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">AWS Reference Architectures</h2>
        <p className="text-text-secondary mb-6">
          Common hybrid architecture patterns implemented on AWS.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">API + Lambda Workers</h3>
            <p className="text-text-secondary text-sm mb-4">
              Synchronous API with async background processing.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4 text-xs">
              <div className="text-[#FF9900] mb-2">Sync Path:</div>
              <code>API Gateway → Lambda → DynamoDB → Response</code>
              <div className="text-[#FF9900] mt-3 mb-2">Async Path:</div>
              <code>DynamoDB Streams → Lambda → SQS → Worker Lambda</code>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">ECS + Step Functions Saga</h3>
            <p className="text-text-secondary text-sm mb-4">
              Containerized services with orchestrated workflows.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4 text-xs">
              <div className="text-[#FF9900] mb-2">Services:</div>
              <code>ALB → ECS Fargate (Order, Payment, Inventory)</code>
              <div className="text-[#FF9900] mt-3 mb-2">Orchestration:</div>
              <code>Step Functions → Service APIs → Compensation</code>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Event Sourcing on AWS</h3>
            <p className="text-text-secondary text-sm mb-4">
              Events as source of truth with CQRS projections.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4 text-xs">
              <div className="text-[#FF9900] mb-2">Write Side:</div>
              <code>API → Lambda → Kinesis (Event Store)</code>
              <div className="text-[#FF9900] mt-3 mb-2">Read Side:</div>
              <code>Kinesis → Lambda → DynamoDB/OpenSearch</code>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Multi-Region Active-Active</h3>
            <p className="text-text-secondary text-sm mb-4">
              Global distribution with eventual consistency.
            </p>
            <div className="p-3 rounded-lg bg-background mb-4 text-xs">
              <div className="text-[#FF9900] mb-2">Routing:</div>
              <code>Route 53 (Latency) → CloudFront → ALB</code>
              <div className="text-[#FF9900] mt-3 mb-2">Data Sync:</div>
              <code>DynamoDB Global Tables / Aurora Global</code>
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold mb-4">AWS Service Selection Guide</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium">Pattern</th>
                  <th className="text-left py-2 px-3 font-medium">Compute</th>
                  <th className="text-left py-2 px-3 font-medium">Messaging</th>
                  <th className="text-left py-2 px-3 font-medium">Data</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary text-xs">
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3 text-[#FF9900]">Serverless First</td>
                  <td className="py-2 px-3">Lambda, Step Functions</td>
                  <td className="py-2 px-3">EventBridge, SQS</td>
                  <td className="py-2 px-3">DynamoDB, S3</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3 text-[#FF9900]">Container-Based</td>
                  <td className="py-2 px-3">ECS/EKS Fargate</td>
                  <td className="py-2 px-3">SNS/SQS, MSK</td>
                  <td className="py-2 px-3">RDS, ElastiCache</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-3 text-[#FF9900]">High Throughput</td>
                  <td className="py-2 px-3">EKS, EC2</td>
                  <td className="py-2 px-3">Kinesis, MSK</td>
                  <td className="py-2 px-3">Aurora, OpenSearch</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-[#FF9900]">Lift & Shift</td>
                  <td className="py-2 px-3">Elastic Beanstalk, EC2</td>
                  <td className="py-2 px-3">Amazon MQ</td>
                  <td className="py-2 px-3">RDS, ElastiCache</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Pattern Compatibility Matrix */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold mb-4">Pattern Compatibility</h2>
        <p className="text-text-secondary mb-6">
          Some patterns work better together than others. Here are common and effective combinations:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
            <h3 className="font-medium text-green-500 mb-2">Works Well Together</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Microservices + Choreography</li>
              <li>Monolith + Internal Events</li>
              <li>Serverless + Event-Driven</li>
              <li>CQRS + Event Sourcing</li>
              <li>Sagas + Orchestration</li>
            </ul>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
            <h3 className="font-medium text-yellow-500 mb-2">Use with Caution</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Microservices + Shared Database</li>
              <li>Event Sourcing + Simple CRUD</li>
              <li>Choreography + Complex Workflows</li>
              <li>Serverless + Long-running Tasks</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
            <h3 className="font-medium text-red-500 mb-2">Usually Problematic</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Distributed + Synchronous Everything</li>
              <li>Microservices + Tight Coupling</li>
              <li>Event Sourcing + No Snapshots (at scale)</li>
              <li>Choreography + No Observability</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
