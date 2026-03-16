import { cpSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dest = resolve(__dirname, 'src', 'lib', 'claude', 'templates')

// If templates already exist (e.g. committed or already copied), skip
if (existsSync(dest)) {
  const files = readdirSync(dest).filter(f => f.endsWith('.md') && f !== 'README.md')
  if (files.length > 0) {
    console.log('Templates already present at', dest, `(${files.length} files)`)
    process.exit(0)
  }
}

// Copy from framework directory (local dev)
const src = resolve(__dirname, '..', 'framework', 'generation-templates')
if (!existsSync(src)) {
  console.error('Source templates not found at', src)
  console.error('Make sure framework/generation-templates/ exists or templates are already in src/lib/claude/templates/')
  process.exit(1)
}

mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })
console.log('Templates copied to', dest)
