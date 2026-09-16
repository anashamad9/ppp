'use client'
import React from 'react'
import CodeBlock from "@/components/code-block"
import { Braces } from 'lucide-react'

const RESPONSE_JSON = `{
  "mcpServers": {
    "atmet-crm": {
      "transport": "http",
      "url": "https://mcp.atmet.pro/crm",
      "tools": ["contacts.search", "deals.update"]
    },
    "workspace-files": {
      "transport": "stdio",
      "command": "npx",
      "args": ["@atmet/mcp-files"],
      "scope": ["read:drive", "write:reports"]
    }
  }
}`

export default function CodeBlockIllustration() {
    return (
        <div className="bg-card shadow-black/6.5 relative z-10 overflow-hidden rounded-2xl border border-black/10 px-1 pb-1 shadow-lg backdrop-blur">
            <div className="relative h-10">
                <div className="flex h-full items-center gap-1">
                    <button className="text-foreground/75 relative z-10 flex h-8 items-center gap-1.5 rounded-lg px-3 font-mono text-xs outline-none first:rounded-tl-xl">
                        <Braces className="size-3 text-amber-600" />
                        mcp.config.json
                    </button>
                </div>
                <div className="bg-card absolute -bottom-px left-4 top-1 w-[153px] rounded-t-xl border-x border-t border-black/10">
                    <div className="bg-card absolute -right-4 bottom-0 size-4">
                        <div className="bg-card absolute inset-0 rounded-bl-xl border-b border-l border-black/10"></div>
                    </div>
                </div>
            </div>

            <div className="h-56 rounded-xl border border-black/20 bg-[#101114] sm:h-64">
                <div className="scheme-dark h-full overflow-hidden">
                    <CodeBlock
                        code={RESPONSE_JSON}
                        lang="json"
                        theme="dark"
                        maxHeight={256}
                        lineNumbers
                        className="-mx-1 [&_code]:text-[11px] [&_pre]:h-full [&_pre]:min-h-full [&_pre]:rounded-xl [&_pre]:border-none [&_pre]:!bg-transparent [&_pre]:pb-0"
                    />
                </div>
            </div>
        </div>
    )
}
