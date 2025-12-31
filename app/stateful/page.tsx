'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import StatefulDiagram from '@/components/diagrams/StatefulDiagram'
import CodeBlock from '@/components/ui/CodeBlock'
import ComparisonTable from '@/components/ui/ComparisonTable'
import { codeExamples } from '@/lib/content'

const comparisonItems = [
  { aspect: 'State Location', left: 'Server memory', right: 'Client token / External store' },
  { aspect: 'Horizontal Scaling', left: 'Difficult (sticky sessions)', right: 'Easy (any server)' },
  { aspect: 'Server Failure', left: 'Session lost', right: 'No impact' },
  { aspect: 'Memory Usage', left: 'High (per user)', right: 'Low (no session storage)' },
  { aspect: 'Load Balancing', left: 'Complex (affinity)', right: 'Simple (round robin)' },
  { aspect: 'Token Size', left: 'Small session ID', right: 'Larger JWT payload' },
  { aspect: 'Revocation', left: 'Easy (delete session)', right: 'Complex (token blacklist)' },
]

export default function StatefulPage() {
  return (
    <TopicPageLayout topicId="stateful">
      {/* Interactive Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Interactive Diagram</h2>
        <p className="text-text-secondary mb-6">
          Compare how stateful and stateless architectures handle user sessions.
        </p>
        <StatefulDiagram />
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Comparison</h2>
        <ComparisonTable
          leftTitle="Stateful"
          rightTitle="Stateless"
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
            <h3 className="text-sm font-medium text-warning mb-3">Stateful (Session-based)</h3>
            <CodeBlock
              code={codeExamples.stateful.stateful}
              language="typescript"
              title="session-server.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-success mb-3">Stateless (JWT-based)</h3>
            <CodeBlock
              code={codeExamples.stateful.stateless}
              language="typescript"
              title="stateless-server.ts"
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
            <h3 className="font-medium text-warning mb-3">Use Stateful when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Need real-time session management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Immediate session revocation is critical</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>Small user base with low scaling needs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>WebSocket connections or long-polling</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-success mb-3">Use Stateless when:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Building highly scalable APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Microservices architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Serverless / FaaS environments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Mobile and SPA applications</span>
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
        <h2 className="text-xl font-semibold mb-4">AWS State Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Stateful Solutions</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>ElastiCache (Redis):</strong> In-memory session store with replication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>DynamoDB:</strong> Session table with TTL for auto-expiry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>ALB Sticky Sessions:</strong> Route to same target (not recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>API Gateway WebSocket:</strong> Managed connection state</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Stateless Solutions</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Cognito:</strong> Managed JWT tokens with user pools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>API Gateway + Lambda:</strong> Stateless by design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>CloudFront:</strong> Edge caching, no origin state needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Lambda@Edge:</strong> Stateless compute at edge locations</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold mb-4">AWS Session Patterns</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-background">
              <h4 className="font-medium text-[#FF9900] mb-2">Cognito + JWT</h4>
              <p className="text-xs text-text-secondary">Fully stateless. Tokens contain claims. Use for SPAs and mobile apps.</p>
            </div>
            <div className="p-4 rounded-lg bg-background">
              <h4 className="font-medium text-[#FF9900] mb-2">ElastiCache Sessions</h4>
              <p className="text-xs text-text-secondary">External session store. Sub-ms latency. Use for high-traffic web apps.</p>
            </div>
            <div className="p-4 rounded-lg bg-background">
              <h4 className="font-medium text-[#FF9900] mb-2">DynamoDB Sessions</h4>
              <p className="text-xs text-text-secondary">Serverless session store. TTL auto-cleanup. Use with Lambda.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
