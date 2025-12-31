'use client'

import { motion } from 'framer-motion'
import TopicPageLayout from '@/components/ui/TopicPageLayout'
import CouplingDiagram from '@/components/diagrams/CouplingDiagram'
import CodeBlock from '@/components/ui/CodeBlock'
import ComparisonTable from '@/components/ui/ComparisonTable'
import { codeExamples } from '@/lib/content'

const comparisonItems = [
  { aspect: 'Dependencies', left: 'Concrete classes', right: 'Interfaces/Abstractions' },
  { aspect: 'Testability', left: 'Hard (real services)', right: 'Easy (mock/stub)' },
  { aspect: 'Flexibility', left: 'Low (hard to change)', right: 'High (swap implementations)' },
  { aspect: 'Reusability', left: 'Low', right: 'High' },
  { aspect: 'Change Impact', left: 'Ripples through code', right: 'Isolated changes' },
  { aspect: 'Initial Setup', left: 'Simple', right: 'More upfront work' },
  { aspect: 'Maintenance', left: 'Harder over time', right: 'Easier over time' },
]

export default function CouplingPage() {
  return (
    <TopicPageLayout topicId="coupling">
      {/* Interactive Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Interactive Diagram</h2>
        <p className="text-text-secondary mb-6">
          See how tight coupling creates rigid dependencies, while loose coupling enables flexibility.
        </p>
        <CouplingDiagram />
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Comparison</h2>
        <ComparisonTable
          leftTitle="Tight Coupling"
          rightTitle="Loose Coupling"
          items={comparisonItems}
          leftColor="#f43f5e"
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
            <h3 className="text-sm font-medium text-red-500 mb-3">Tight Coupling</h3>
            <CodeBlock
              code={codeExamples.coupling.tight}
              language="typescript"
              title="tight-coupling.ts"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-success mb-3">Loose Coupling</h3>
            <CodeBlock
              code={codeExamples.coupling.loose}
              language="typescript"
              title="loose-coupling.ts"
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
        <h2 className="text-xl font-semibold mb-4">Achieving Loose Coupling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-accent mb-3">Techniques:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong>Dependency Injection</strong> - Pass dependencies in constructor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong>Interfaces</strong> - Depend on abstractions, not concretions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong>Events/Messaging</strong> - Communicate via events, not direct calls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong>Service Locator</strong> - Lookup dependencies at runtime</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-success mb-3">Benefits:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Unit tests with mock dependencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Swap implementations without code changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Parallel development by different teams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>Easier refactoring and maintenance</span>
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
        <h2 className="text-xl font-semibold mb-4">Loose Coupling on AWS</h2>
        <p className="text-text-secondary mb-6">
          AWS provides several services that enable loose coupling between components.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">Messaging Services</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>SQS:</strong> Decouple producers from consumers with queues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>SNS:</strong> Pub/sub decouples publishers from subscribers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>EventBridge:</strong> Event-driven decoupling with rules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>MQ:</strong> Managed ActiveMQ/RabbitMQ for legacy</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#FF9900]">API Abstraction</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>API Gateway:</strong> Abstracts backend implementations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>AppSync:</strong> GraphQL layer over multiple data sources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>Cloud Map:</strong> Service discovery without hardcoded URLs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9900]">•</span>
                <span><strong>App Mesh:</strong> Service mesh abstracts network details</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30">
          <h4 className="font-medium text-[#FF9900] mb-2">AWS Coupling Anti-Patterns to Avoid</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Direct Lambda-to-Lambda invocations (use SQS/SNS instead)</li>
            <li>• Hardcoded service endpoints (use Cloud Map or Parameter Store)</li>
            <li>• Shared databases between services (use events for data sync)</li>
            <li>• Synchronous chains of API calls (use Step Functions or async patterns)</li>
          </ul>
        </div>
      </motion.section>
    </TopicPageLayout>
  )
}
