import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Extract the IIFE body from a React-family development CJS file.
// These files wrap all their code (including exports) in:
//   if (process.env.NODE_ENV !== "production") { (function() { BODY })(); }
// By returning just BODY as the module content, require() calls and
// exports.xxx assignments are at the module's top level, which lets
// Rollup's commonjs plugin handle them correctly.
function extractIIFEBody(filePath) {
  const lines = readFileSync(filePath, 'utf8').split('\n')

  // Find the first `(function() {` line — the outer IIFE opening
  let openLine = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith('(function() {')) {
      openLine = i
      break
    }
  }
  if (openLine === -1) return null

  // Find the last `})();` line — the outer IIFE closing (inner IIFEs close before this)
  let closeLine = -1
  for (let i = lines.length - 1; i > openLine; i--) {
    if (lines[i].trim() === '})();') {
      closeLine = i
      break
    }
  }
  if (closeLine === -1) return null

  return "'use strict';\n" + lines.slice(openLine + 1, closeLine).join('\n')
}

function reactDevCjsPlugin() {
  const nm = path.resolve(__dirname, 'node_modules')
  const redirects = new Map([
    [path.join(nm, 'react', 'index.js'),       path.join(nm, 'react',     'cjs', 'react.development.js')],
    [path.join(nm, 'react', 'jsx-runtime.js'), path.join(nm, 'react',     'cjs', 'react-jsx-runtime.development.js')],
    [path.join(nm, 'react-dom', 'index.js'),   path.join(nm, 'react-dom', 'cjs', 'react-dom.development.js')],
    [path.join(nm, 'scheduler', 'index.js'),   path.join(nm, 'scheduler', 'cjs', 'scheduler.development.js')],
  ])
  return {
    name: 'react-dev-cjs',
    enforce: 'pre',
    load(id) {
      const devFile = redirects.get(id)
      if (!devFile) return null
      return extractIIFEBody(devFile)
    },
  }
}

export default defineConfig(({ command }) => {
  const plugins = [react()]
  if (command === 'build') plugins.unshift(reactDevCjsPlugin())
  return { plugins }
})
