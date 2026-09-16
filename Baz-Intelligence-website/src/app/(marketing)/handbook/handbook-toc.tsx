'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export type TocSection = {
  id: string
  text: string
  children: Array<{
    id: string
    text: string
  }>
}

export function HandbookToc({ sections }: { sections: TocSection[] }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  return (
    <nav className="max-h-[calc(100vh-8rem)] space-y-1 overflow-auto pr-4">
      {sections.map((section) => {
        const isOpen = Boolean(openSections[section.id])
        const hasChildren = section.children.length > 0

        if (!hasChildren) {
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block rounded-md px-2 py-1.5 text-sm leading-5 font-light text-black/55 transition-colors hover:bg-site-gray-surface hover:text-black dark:text-white/55 dark:hover:text-white"
            >
              {section.text}
            </a>
          )
        }

        return (
          <div key={section.id} className="rounded-md">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${section.id}-children`}
              onClick={() => {
                setOpenSections((current) => ({
                  ...current,
                  [section.id]: !current[section.id],
                }))
              }}
              className="flex w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-sm leading-5 font-light text-black/60 transition-colors hover:bg-site-gray-surface hover:text-black dark:text-white/58 dark:hover:text-white"
            >
              <ChevronRight
                className={`mt-0.5 size-3.5 shrink-0 transition-transform duration-200 ease-out ${
                  isOpen ? 'rotate-90' : ''
                }`}
              />
              <span>{section.text}</span>
            </button>
            <div
              id={`${section.id}-children`}
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-1 pt-1 pb-1 pl-5">
                  {section.children.map((child) => (
                    <a
                      key={child.id}
                      href={`#${child.id}`}
                      className="block rounded-md px-2 py-1.5 text-sm leading-5 font-light text-black/48 transition-colors hover:bg-site-gray-surface hover:text-black dark:text-white/48 dark:hover:text-white"
                    >
                      {child.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
