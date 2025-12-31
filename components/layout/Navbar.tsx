'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, BookOpen } from 'lucide-react'

const topics = [
  { href: '/event-driven', label: 'Event-Driven' },
  { href: '/microservices', label: 'Microservices' },
  { href: '/choreography', label: 'Choreography' },
  { href: '/fanout', label: 'Fanout' },
  { href: '/stateful', label: 'Stateful' },
  { href: '/sync-async', label: 'Sync/Async' },
  { href: '/coupling', label: 'Coupling' },
  { href: '/hybrid-patterns', label: 'Hybrid' },
  { href: '/decision-guide', label: 'Decisions' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="font-bold text-lg">Arch Patterns</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === topic.href
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-border/50'
                }`}
              >
                {topic.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-border/50 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1">
              {topics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    pathname === topic.href
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-border/50'
                  }`}
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
