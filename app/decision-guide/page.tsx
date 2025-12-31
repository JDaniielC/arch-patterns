'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'

const decisionFactors = [
  {
    id: 'latency',
    title: 'Latency & Response Time',
    question: 'How fast must the system respond to user requests?',
    icon: '⚡',
    options: [
      {
        level: 'Real-time (<100ms)',
        recommendation: 'Sync, Request/Response',
        patterns: ['Synchronous APIs', 'Caching (ElastiCache)', 'Edge computing (CloudFront, Lambda@Edge)'],
        awsServices: ['API Gateway', 'ElastiCache', 'CloudFront', 'DynamoDB DAX'],
        avoid: ['Long async chains', 'Multiple service hops', 'Cold start sensitive Lambda'],
      },
      {
        level: 'Near real-time (<1s)',
        recommendation: 'Sync with async fallback',
        patterns: ['Sync for reads', 'Async for writes', 'CQRS for optimization'],
        awsServices: ['API Gateway', 'Lambda', 'SQS', 'DynamoDB'],
        avoid: ['Synchronous distributed transactions', 'Blocking on external services'],
      },
      {
        level: 'Eventually consistent (seconds-minutes)',
        recommendation: 'Async, Event-Driven',
        patterns: ['Event-driven', 'Choreography', 'Background processing'],
        awsServices: ['EventBridge', 'SQS', 'SNS', 'Step Functions'],
        avoid: ['User-blocking operations', 'Sync calls to slow services'],
      },
      {
        level: 'Batch (minutes-hours)',
        recommendation: 'Fully Async',
        patterns: ['Batch processing', 'ETL pipelines', 'Scheduled jobs'],
        awsServices: ['Step Functions', 'Batch', 'Glue', 'EMR'],
        avoid: ['Real-time expectations', 'Synchronous processing'],
      },
    ],
  },
  {
    id: 'failure',
    title: 'Failure Impact & Tolerance',
    question: 'What happens when a component fails?',
    icon: '💥',
    options: [
      {
        level: 'Zero tolerance (financial, healthcare)',
        recommendation: 'Orchestration + Sagas',
        patterns: ['Saga with compensation', 'Orchestration', 'Transactional outbox'],
        awsServices: ['Step Functions', 'DynamoDB Transactions', 'RDS Multi-AZ'],
        avoid: ['Fire-and-forget', 'At-most-once delivery', 'Single points of failure'],
      },
      {
        level: 'Graceful degradation acceptable',
        recommendation: 'Circuit breakers + DLQ',
        patterns: ['Circuit breaker', 'Bulkhead', 'Retry with backoff', 'Dead-letter queues'],
        awsServices: ['SQS DLQ', 'Lambda destinations', 'App Mesh (circuit breaker)'],
        avoid: ['Cascading failures', 'Unbounded retries'],
      },
      {
        level: 'Partial failures OK',
        recommendation: 'Choreography + Eventual consistency',
        patterns: ['Choreography', 'Event sourcing', 'Idempotent consumers'],
        awsServices: ['EventBridge', 'SNS/SQS', 'Kinesis'],
        avoid: ['Strong consistency requirements', 'Synchronous chains'],
      },
      {
        level: 'Best effort sufficient',
        recommendation: 'Fire-and-forget',
        patterns: ['Async notifications', 'Logging', 'Analytics'],
        awsServices: ['SNS', 'Kinesis Firehose', 'CloudWatch'],
        avoid: ['Critical business logic', 'Financial transactions'],
      },
    ],
  },
  {
    id: 'domain',
    title: 'Domain Stability',
    question: 'How often do business requirements change?',
    icon: '🏗️',
    options: [
      {
        level: 'Highly volatile (startup, new product)',
        recommendation: 'Monolith or Modular Monolith',
        patterns: ['Monolith', 'Modular monolith', 'Simple boundaries'],
        awsServices: ['Elastic Beanstalk', 'App Runner', 'Lambda monolith'],
        avoid: ['Premature microservices', 'Complex distributed systems', 'Rigid contracts'],
      },
      {
        level: 'Evolving (known core, changing edges)',
        recommendation: 'Modular Monolith + Satellite services',
        patterns: ['Core as monolith', 'Extract stable domains', 'Event-driven edges'],
        awsServices: ['ECS', 'Lambda', 'EventBridge'],
        avoid: ['Big bang rewrites', 'Tight coupling between changing parts'],
      },
      {
        level: 'Stable core, new features',
        recommendation: 'Microservices for new, monolith for core',
        patterns: ['Strangler fig', 'New features as services', 'API gateway facade'],
        awsServices: ['API Gateway', 'ECS/EKS', 'Lambda'],
        avoid: ['Touching stable systems unnecessarily', 'Shared databases'],
      },
      {
        level: 'Mature and stable',
        recommendation: 'Microservices / Domain services',
        patterns: ['Bounded contexts', 'Domain-driven design', 'Independent deployments'],
        awsServices: ['EKS', 'ECS', 'Service mesh (App Mesh)'],
        avoid: ['Monolithic thinking', 'Cross-service transactions'],
      },
    ],
  },
  {
    id: 'team',
    title: 'Team Autonomy',
    question: 'How independent should teams be in development and deployment?',
    icon: '👥',
    options: [
      {
        level: 'Single team',
        recommendation: 'Monolith',
        patterns: ['Monolith', 'Shared codebase', 'Unified deployment'],
        awsServices: ['Elastic Beanstalk', 'ECS single service', 'Lambda'],
        avoid: ['Unnecessary service boundaries', 'Complex infrastructure'],
      },
      {
        level: 'Few teams, shared ownership',
        recommendation: 'Modular Monolith',
        patterns: ['Module ownership', 'Shared deployment', 'Internal APIs'],
        awsServices: ['ECS', 'CodePipeline shared', 'Shared RDS'],
        avoid: ['Service proliferation', 'Complex inter-team dependencies'],
      },
      {
        level: 'Multiple teams, some dependencies',
        recommendation: 'Service-based with shared platform',
        patterns: ['Team-owned services', 'Shared platform team', 'API contracts'],
        awsServices: ['ECS/EKS', 'API Gateway', 'EventBridge'],
        avoid: ['Breaking API changes', 'Uncoordinated deployments'],
      },
      {
        level: 'Full autonomy (you build it, you run it)',
        recommendation: 'Microservices',
        patterns: ['Full ownership', 'Independent deployments', 'Decentralized data'],
        awsServices: ['EKS', 'Separate AWS accounts', 'Service mesh'],
        avoid: ['Centralized bottlenecks', 'Shared databases', 'Deployment gates'],
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operational Maturity',
    question: 'What is your DevOps and observability capability?',
    icon: '🔧',
    options: [
      {
        level: 'Basic (manual deployments, limited monitoring)',
        recommendation: 'Managed services, Monolith',
        patterns: ['PaaS', 'Managed databases', 'Simple architecture'],
        awsServices: ['Elastic Beanstalk', 'RDS', 'Amplify', 'App Runner'],
        avoid: ['Kubernetes', 'Complex microservices', 'Self-managed infrastructure'],
      },
      {
        level: 'Intermediate (CI/CD, basic monitoring)',
        recommendation: 'Serverless or Containers with managed orchestration',
        patterns: ['Lambda', 'ECS Fargate', 'CloudWatch dashboards'],
        awsServices: ['Lambda', 'ECS Fargate', 'CloudWatch', 'X-Ray basic'],
        avoid: ['Self-managed Kubernetes', 'Complex service mesh'],
      },
      {
        level: 'Advanced (full CI/CD, distributed tracing)',
        recommendation: 'Microservices with observability',
        patterns: ['Container orchestration', 'Distributed tracing', 'Centralized logging'],
        awsServices: ['EKS', 'X-Ray', 'CloudWatch Container Insights', 'OpenSearch'],
        avoid: ['Black box services', 'Missing correlation IDs'],
      },
      {
        level: 'Expert (SRE practices, chaos engineering)',
        recommendation: 'Full microservices with service mesh',
        patterns: ['Service mesh', 'Chaos engineering', 'Advanced traffic management'],
        awsServices: ['EKS + Istio', 'App Mesh', 'FIS (Fault Injection)', 'Prometheus/Grafana'],
        avoid: ['Over-simplification', 'Missing runbooks'],
      },
    ],
  },
  {
    id: 'scale',
    title: 'Scale Requirements',
    question: 'What are your throughput and scaling needs?',
    icon: '📈',
    options: [
      {
        level: 'Low (< 100 req/s)',
        recommendation: 'Simple architecture',
        patterns: ['Monolith', 'Single database', 'Vertical scaling'],
        awsServices: ['Elastic Beanstalk', 'RDS', 'Lambda'],
        avoid: ['Over-engineering', 'Premature optimization'],
      },
      {
        level: 'Medium (100-1000 req/s)',
        recommendation: 'Horizontal scaling with caching',
        patterns: ['Load balancing', 'Read replicas', 'Caching layer'],
        awsServices: ['ALB', 'ElastiCache', 'RDS read replicas', 'Auto Scaling'],
        avoid: ['Single points of bottleneck', 'Session affinity'],
      },
      {
        level: 'High (1000-10000 req/s)',
        recommendation: 'Distributed architecture',
        patterns: ['Microservices', 'Event-driven', 'Database sharding'],
        awsServices: ['EKS/ECS', 'DynamoDB', 'Kinesis', 'ElastiCache cluster'],
        avoid: ['Synchronous everywhere', 'Single database'],
      },
      {
        level: 'Massive (> 10000 req/s)',
        recommendation: 'Full distributed + Edge',
        patterns: ['Global distribution', 'CQRS', 'Event sourcing', 'Cell-based architecture'],
        awsServices: ['CloudFront', 'Global Accelerator', 'DynamoDB Global Tables', 'Multi-region'],
        avoid: ['Centralized anything', 'Single region'],
      },
    ],
  },
]

const quickDecisionMatrix = [
  {
    scenario: 'MVP / Startup with small team',
    recommendation: 'Serverless Monolith',
    architecture: 'Lambda + API Gateway + DynamoDB',
    reasoning: 'Fast iteration, low ops overhead, pay-per-use',
  },
  {
    scenario: 'Growing startup, 2-3 teams',
    recommendation: 'Modular Monolith on Containers',
    architecture: 'ECS Fargate + RDS + EventBridge',
    reasoning: 'Structure without distributed complexity',
  },
  {
    scenario: 'Enterprise, multiple teams, stable domains',
    recommendation: 'Microservices',
    architecture: 'EKS + Service Mesh + Event-Driven',
    reasoning: 'Team autonomy, independent scaling, resilience',
  },
  {
    scenario: 'High-traffic consumer app',
    recommendation: 'Serverless + Edge',
    architecture: 'CloudFront + Lambda@Edge + DynamoDB',
    reasoning: 'Global scale, auto-scaling, low latency',
  },
  {
    scenario: 'Financial / Healthcare (compliance)',
    recommendation: 'Orchestrated Services',
    architecture: 'Step Functions + ECS + RDS + Full audit',
    reasoning: 'Traceability, transactions, compliance',
  },
  {
    scenario: 'Real-time data processing',
    recommendation: 'Streaming Architecture',
    architecture: 'Kinesis + Lambda + DynamoDB/OpenSearch',
    reasoning: 'High throughput, ordered processing, analytics',
  },
]

const patternTradeoffs = [
  {
    pattern: 'Synchronous',
    pros: ['Simple', 'Immediate feedback', 'Easy debugging'],
    cons: ['Tight coupling', 'Cascading failures', 'Limited scale'],
    bestFor: 'User-facing reads, simple CRUD',
  },
  {
    pattern: 'Asynchronous',
    pros: ['Loose coupling', 'Resilience', 'Better scale'],
    cons: ['Eventual consistency', 'Complex debugging', 'Message ordering'],
    bestFor: 'Background jobs, notifications, integrations',
  },
  {
    pattern: 'Orchestration',
    pros: ['Clear workflow', 'Central error handling', 'Visibility'],
    cons: ['Single point of failure', 'Orchestrator bottleneck'],
    bestFor: 'Complex sagas, multi-step transactions',
  },
  {
    pattern: 'Choreography',
    pros: ['No SPOF', 'Loose coupling', 'Team autonomy'],
    cons: ['Hard to trace', 'Complex failure handling', 'Event storms'],
    bestFor: 'Simple workflows, autonomous services',
  },
  {
    pattern: 'Monolith',
    pros: ['Simple deployment', 'Easy debugging', 'Low latency'],
    cons: ['Scale limitations', 'Team conflicts', 'Technology lock-in'],
    bestFor: 'Small teams, unclear domains, MVPs',
  },
  {
    pattern: 'Microservices',
    pros: ['Team autonomy', 'Independent scaling', 'Technology freedom'],
    cons: ['Operational complexity', 'Network latency', 'Data consistency'],
    bestFor: 'Large teams, stable domains, scale needs',
  },
]

export default function DecisionGuidePage() {
  return (
    <TopicPageLayout topicId="decision-guide">
      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">How to Use This Guide</h2>
        <p className="text-text-secondary mb-4">
          Architecture decisions should be driven by your specific context, not trends. Evaluate each factor below
          to find patterns that match your requirements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-purple-500 mb-2">1. Assess</h3>
            <p className="text-sm text-text-secondary">Evaluate your current situation for each decision factor.</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-purple-500 mb-2">2. Match</h3>
            <p className="text-sm text-text-secondary">Find patterns that align with your constraints and goals.</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-purple-500 mb-2">3. Validate</h3>
            <p className="text-sm text-text-secondary">Consider trade-offs and validate with your team.</p>
          </div>
        </div>
      </motion.section>

      {/* Quick Decision Matrix */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Quick Decision Matrix</h2>
        <p className="text-text-secondary mb-6">
          Common scenarios and recommended starting points.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickDecisionMatrix.map((item) => (
            <div
              key={item.scenario}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-semibold text-sm mb-2">{item.scenario}</h3>
              <div className="text-purple-500 font-medium mb-2">{item.recommendation}</div>
              <code className="text-xs text-[#FF9900] block mb-3 p-2 bg-background rounded">
                {item.architecture}
              </code>
              <p className="text-xs text-text-secondary">{item.reasoning}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Decision Factors */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Decision Factors</h2>
        <p className="text-text-secondary mb-6">
          Evaluate each factor to determine the right patterns for your system.
        </p>
        <div className="space-y-6">
          {decisionFactors.map((factor) => (
            <div
              key={factor.id}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{factor.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{factor.title}</h3>
                  <p className="text-sm text-text-secondary">{factor.question}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {factor.options.map((option, index) => (
                  <div
                    key={option.level}
                    className="p-4 rounded-lg bg-background"
                  >
                    <h4 className="font-medium text-sm mb-2 text-purple-500">{option.level}</h4>
                    <div className="text-xs font-medium text-[#FF9900] mb-3">
                      → {option.recommendation}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-medium text-text-secondary mb-1">Patterns:</div>
                        <div className="flex flex-wrap gap-1">
                          {option.patterns.map((p) => (
                            <span key={p} className="text-xs px-1.5 py-0.5 bg-surface rounded">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-text-secondary mb-1">AWS:</div>
                        <div className="flex flex-wrap gap-1">
                          {option.awsServices.map((s) => (
                            <span key={s} className="text-xs px-1.5 py-0.5 bg-[#FF9900]/10 text-[#FF9900] rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-red-500 mb-1">Avoid:</div>
                        <ul className="text-xs text-text-secondary space-y-0.5">
                          {option.avoid.map((a) => (
                            <li key={a}>• {a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Pattern Trade-offs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Pattern Trade-offs Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Pattern</th>
                <th className="text-left py-3 px-4 font-medium text-green-500">Pros</th>
                <th className="text-left py-3 px-4 font-medium text-red-500">Cons</th>
                <th className="text-left py-3 px-4 font-medium text-purple-500">Best For</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {patternTradeoffs.map((item) => (
                <tr key={item.pattern} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">{item.pattern}</td>
                  <td className="py-3 px-4">
                    <ul className="space-y-1">
                      {item.pros.map((p) => (
                        <li key={p} className="text-xs">+ {p}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4">
                    <ul className="space-y-1">
                      {item.cons.map((c) => (
                        <li key={c} className="text-xs">- {c}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 text-xs">{item.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* AWS Decision Tree */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">AWS Service Decision Tree</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-3">Compute: How to run your code?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary mb-2">
                  <strong>Lambda</strong> if: Short-lived, event-driven, variable load, &lt;15min execution
                </p>
                <p className="text-text-secondary mb-2">
                  <strong>ECS Fargate</strong> if: Containers, no cluster management, predictable load
                </p>
                <p className="text-text-secondary">
                  <strong>EKS</strong> if: K8s expertise, complex orchestration, multi-cloud strategy
                </p>
              </div>
              <div>
                <p className="text-text-secondary mb-2">
                  <strong>App Runner</strong> if: Simple web apps, minimal config, from source/image
                </p>
                <p className="text-text-secondary mb-2">
                  <strong>Elastic Beanstalk</strong> if: Traditional apps, lift-and-shift, PaaS experience
                </p>
                <p className="text-text-secondary">
                  <strong>EC2</strong> if: Full control needed, specific OS/hardware, legacy apps
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-3">Messaging: How to communicate?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary mb-2">
                  <strong>SQS</strong> if: Point-to-point, decoupling, buffering, exactly-once (FIFO)
                </p>
                <p className="text-text-secondary mb-2">
                  <strong>SNS</strong> if: Fanout to multiple consumers, push notifications
                </p>
                <p className="text-text-secondary">
                  <strong>EventBridge</strong> if: Event routing, schema registry, AWS integrations
                </p>
              </div>
              <div>
                <p className="text-text-secondary mb-2">
                  <strong>Kinesis</strong> if: High-throughput streaming, ordering, replay needed
                </p>
                <p className="text-text-secondary mb-2">
                  <strong>MSK (Kafka)</strong> if: Kafka ecosystem, existing Kafka expertise
                </p>
                <p className="text-text-secondary">
                  <strong>MQ</strong> if: Legacy protocols (AMQP, MQTT), migration from RabbitMQ
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-background">
            <h3 className="font-medium text-[#FF9900] mb-3">Data: Where to store?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary mb-2">
                  <strong>DynamoDB</strong> if: Key-value/document, serverless, single-digit ms latency
                </p>
                <p className="text-text-secondary mb-2">
                  <strong>RDS/Aurora</strong> if: Relational, complex queries, transactions, SQL
                </p>
                <p className="text-text-secondary">
                  <strong>ElastiCache</strong> if: Caching, session store, sub-ms latency
                </p>
              </div>
              <div>
                <p className="text-text-secondary mb-2">
                  <strong>OpenSearch</strong> if: Full-text search, log analytics, dashboards
                </p>
                <p className="text-text-secondary mb-2">
                  <strong>S3</strong> if: Object storage, data lake, static assets
                </p>
                <p className="text-text-secondary">
                  <strong>DocumentDB</strong> if: MongoDB compatibility, document workloads
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Red Flags */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">Architecture Red Flags</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
            <h3 className="font-semibold text-red-500 mb-4">Warning Signs</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <span><strong>Distributed monolith:</strong> Microservices that must deploy together</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <span><strong>Sync chains:</strong> Service A → B → C → D all synchronous</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <span><strong>Shared DB:</strong> Multiple services writing to same tables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <span><strong>No observability:</strong> Can&apos;t trace requests across services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <span><strong>Premature optimization:</strong> Microservices for a 3-person team</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <h3 className="font-semibold text-green-500 mb-4">Good Signs</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Independent deployments:</strong> Teams can ship without coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Graceful degradation:</strong> Failures don&apos;t cascade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Clear boundaries:</strong> Services own their data and logic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Observable:</strong> Distributed tracing, centralized logs, metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span><strong>Right-sized:</strong> Complexity matches team and domain needs</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Key Questions Checklist */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Pre-Decision Checklist</h2>
        <p className="text-text-secondary mb-6">
          Answer these questions before finalizing your architecture decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-purple-500 mb-3">Technical Questions</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>□ What is the acceptable latency for critical paths?</li>
              <li>□ What consistency level do we need? (Strong vs Eventual)</li>
              <li>□ What is the expected peak load? Growth rate?</li>
              <li>□ What are the data retention and compliance requirements?</li>
              <li>□ Do we need multi-region or single-region?</li>
              <li>□ What is our recovery time objective (RTO)?</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-purple-500 mb-3">Organizational Questions</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>□ How many teams will work on this system?</li>
              <li>□ What is the team&apos;s experience with distributed systems?</li>
              <li>□ Do we have dedicated DevOps/SRE support?</li>
              <li>□ What is our budget for infrastructure vs development?</li>
              <li>□ How often do we expect requirements to change?</li>
              <li>□ What is our time-to-market pressure?</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
