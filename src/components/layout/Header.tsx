'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/questionnaire': 'Questionnaire',
  '/generate': 'Generating Your Launch Kit',
  '/results': 'Your Marketing Package',
}

interface HeaderProps {
  title?: string
}

export function Header({ title }: HeaderProps) {
  const pathname = usePathname()

  const derivedTitle =
    title ||
    Object.entries(pageTitles).find(([path]) =>
      pathname.startsWith(path)
    )?.[1] ||
    'Dashboard'

  return (
    <header className="flex h-10 items-center border-b border-white/5 px-6">
      <p className="text-sm font-medium text-slate-400">{derivedTitle}</p>
    </header>
  )
}
