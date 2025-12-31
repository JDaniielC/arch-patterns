'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import MicroservicesDiagram from '@/components/diagrams/MicroservicesDiagram'
import CodeBlock from '@/components/ui/CodeBlock'
import ComparisonTable from '@/components/ui/ComparisonTable'
import { codeExamples } from '@/lib/content'

const comparisonItems = [
  { aspect: 'Deployment', left: 'Single unit', right: 'Independent services' },
  { aspect: 'Scaling', left: 'Vertical (bigger machine)', right: 'Horizontal (more instances)' },
  { aspect: 'Technology', left: 'Single stack', right: 'Polyglot (mix languages)' },
  { aspect: 'Team Structure', left: 'Single team', right: 'Team per service' },
  { aspect: 'Complexity', left: 'Low initial', right: 'High (distributed systems)' },
  { aspect: 'Data Management', left: 'Shared database', right: 'Per-service or shared DB' },
  { aspect: 'Failure Impact', left: 'Entire app fails', right: 'Partial degradation' },
]

export default function MicroservicesPage() {
  return (
    <TopicPageLayout topicId="microservices">
      {/* Interactive Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Interactive Diagram</h2>
        <p className="text-text-secondary mb-6">
          Compare how a monolithic application differs from a microservices architecture.
        </p>
        <MicroservicesDiagram />
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Comparison</h2>
        <ComparisonTable
          leftTitle="Monolithic"
          rightTitle="Microservices"
          items={comparisonItems}
          leftColor="#f59e0b"
          rightColor="#3b82f6"
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
            <h3 className="text-sm font-medium text-warning mb-3">Monolithic</h3>
            <CodeBlock
              code={codeExamples.microservices.monolithic}
              language="typescript"
              title="order-controller.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-accent mb-3">Microservices</h3>
            <CodeBlock
              code={codeExamples.microservices.microservices}
              language="typescript"
              title="order-service.ts"
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
            <h3 className="font-medium text-warning mb-3">Use Monolithic when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Starting a new project (start simple)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Small team with limited resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Domain is not well understood yet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Rapid prototyping and MVP development</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-accent mb-3">Use Microservices when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Application has clear domain boundaries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Different parts need different scaling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Multiple teams working independently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Need for technology diversity</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Architecture Styles */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Architecture Styles</h2>
        <p className="text-text-secondary mb-6">
          Different architectural approaches from simple to distributed systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Traditional Monolith */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-warning">Traditional Monolith</h3>
            <p className="text-text-secondary text-sm mb-4">
              Single deployable unit with all components tightly coupled.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Single codebase, single deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Shared memory and resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Examples: Rails, Django, Spring Boot apps</span>
              </li>
            </ul>
          </div>

          {/* Modular Monolith */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-green-500">Modular Monolith</h3>
            <p className="text-text-secondary text-sm mb-4">
              Single deployment with well-defined internal module boundaries.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>Modules communicate via defined interfaces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>Easier to extract into microservices later</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>Best of both: simplicity + structure</span>
              </li>
            </ul>
          </div>

          {/* Microservices */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-accent">Microservices</h3>
            <p className="text-text-secondary text-sm mb-4">
              Independent services communicating over network protocols.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Independent deployment and scaling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>REST, gRPC, or message queues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Examples: Netflix, Uber, Amazon</span>
              </li>
            </ul>
          </div>

          {/* Serverless / FaaS */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-purple-500">Serverless / FaaS</h3>
            <p className="text-text-secondary text-sm mb-4">
              Event-driven functions that scale automatically to zero.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Pay-per-execution pricing model</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Auto-scaling, no server management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Examples: AWS Lambda, Azure Functions, Vercel</span>
              </li>
            </ul>
          </div>

          {/* Service-Oriented Architecture */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-cyan-500">SOA (Service-Oriented)</h3>
            <p className="text-text-secondary text-sm mb-4">
              Enterprise services with centralized governance and ESB.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>Enterprise Service Bus (ESB) for routing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>SOAP/XML protocols, WSDL contracts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>Heavier governance than microservices</span>
              </li>
            </ul>
          </div>

          {/* Hybrid */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-red-500">Hybrid Architecture</h3>
            <p className="text-text-secondary text-sm mb-4">
              Mix of patterns based on specific domain needs.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Core as monolith, satellites as services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Lambda for async tasks, monolith for API</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Pragmatic approach for real-world systems</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Modular Monolith Deep Dive */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-border bg-surface p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Modular Monolith: The Middle Ground</h2>
        <p className="text-text-secondary mb-6">
          A modular monolith combines the deployment simplicity of a monolith with the organizational benefits of microservices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-green-500 mb-3">Key Principles</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>Strong module boundaries:</strong> Each module owns its domain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>Public interfaces:</strong> Modules expose only what&apos;s needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>No shared state:</strong> Modules don&apos;t access each other&apos;s DB tables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span><strong>Internal events:</strong> Async communication between modules</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-green-500 mb-3">Migration Path</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">1.</span>
                <span>Start with a well-structured monolith</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">2.</span>
                <span>Identify and enforce module boundaries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">3.</span>
                <span>Replace direct calls with interfaces/events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">4.</span>
                <span>Extract modules to services when needed</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* AWS Services */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold mb-4">AWS Deployment Options</h2>
        <p className="text-text-secondary mb-6">
          AWS provides multiple options for deploying both monolithic and microservices architectures.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-[#FF9900] mb-2">Amazon ECS</h3>
            <p className="text-sm text-text-secondary mb-3">Container orchestration for Docker workloads.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Fargate: Serverless containers</li>
              <li>• EC2: Self-managed clusters</li>
              <li>• Service discovery built-in</li>
              <li>• ALB/NLB integration</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-[#FF9900] mb-2">Amazon EKS</h3>
            <p className="text-sm text-text-secondary mb-3">Managed Kubernetes for complex microservices.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• K8s-native tooling (Helm, Istio)</li>
              <li>• Fargate or EC2 nodes</li>
              <li>• Multi-AZ high availability</li>
              <li>• AWS App Mesh for service mesh</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-[#FF9900] mb-2">AWS Lambda</h3>
            <p className="text-sm text-text-secondary mb-3">Serverless functions for event-driven microservices.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Zero infrastructure management</li>
              <li>• Pay per invocation</li>
              <li>• Auto-scaling to zero</li>
              <li>• 15-min max execution</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-[#FF9900] mb-2">AWS App Runner</h3>
            <p className="text-sm text-text-secondary mb-3">Simplified container deployment for web apps.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• From source or container image</li>
              <li>• Auto-scaling and load balancing</li>
              <li>• No infrastructure config</li>
              <li>• Great for simple microservices</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-[#FF9900] mb-2">Elastic Beanstalk</h3>
            <p className="text-sm text-text-secondary mb-3">PaaS for monolithic applications.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Supports multiple platforms</li>
              <li>• Managed scaling and updates</li>
              <li>• Good for lift-and-shift</li>
              <li>• Environment management</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-[#FF9900] mb-2">API Gateway</h3>
            <p className="text-sm text-text-secondary mb-3">Managed API layer for microservices.</p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• REST, HTTP, and WebSocket</li>
              <li>• Authentication and throttling</li>
              <li>• Request/response transforms</li>
              <li>• Direct integrations to AWS</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold mb-4">AWS Microservices Supporting Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-background">
              <h4 className="font-medium text-[#FF9900] text-sm mb-1">Service Discovery</h4>
              <p className="text-xs text-text-secondary">Cloud Map, ECS Service Discovery</p>
            </div>
            <div className="p-3 rounded-lg bg-background">
              <h4 className="font-medium text-[#FF9900] text-sm mb-1">Service Mesh</h4>
              <p className="text-xs text-text-secondary">App Mesh, EKS + Istio</p>
            </div>
            <div className="p-3 rounded-lg bg-background">
              <h4 className="font-medium text-[#FF9900] text-sm mb-1">Observability</h4>
              <p className="text-xs text-text-secondary">X-Ray, CloudWatch, OpenSearch</p>
            </div>
            <div className="p-3 rounded-lg bg-background">
              <h4 className="font-medium text-[#FF9900] text-sm mb-1">Secrets</h4>
              <p className="text-xs text-text-secondary">Secrets Manager, Parameter Store</p>
            </div>
          </div>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
