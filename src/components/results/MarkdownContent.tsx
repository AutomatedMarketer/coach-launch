'use client'

import ReactMarkdown from 'react-markdown'

/**
 * SECURITY NOTE: react-markdown strips raw HTML by default, preventing XSS
 * from AI-generated or user-edited content. Do NOT add the rehype-raw plugin
 * as it would allow stored XSS via embedded HTML in markdown content.
 * If raw HTML rendering is ever needed, sanitize with DOMPurify first.
 */

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-white mt-6 mb-3 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold text-white mt-5 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold text-slate-200 mt-4 mb-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-sm font-semibold text-slate-300 mt-3 mb-1">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-slate-300 mb-3 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside ml-5 mb-3 space-y-1 text-slate-300">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-5 mb-3 space-y-1 text-slate-300">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-slate-300 leading-relaxed">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-amber-300/80">{children}</em>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-amber-400/40 pl-4 my-3 text-slate-400 italic">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="border-slate-700/50 my-4" />
        ),
        code: ({ children }) => (
          <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded text-xs font-mono">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
