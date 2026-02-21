import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Fixes: "Could not resolve ./cjs/react*.js from ./cjs/react*.js?commonjs-external"
// Rollup's CJS plugin creates virtual ?commonjs-external modules for React's
// conditional requires, but can't resolve relative paths from virtual locations.
// This plugin intercepts those resolutions and returns the correct absolute path.
function fixCommonjsExternal() {
  return {
    name: 'fix-commonjs-external',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!importer?.endsWith('?commonjs-external')) return null
      if (!id.startsWith('./cjs/')) return null

      const filename = path.basename(id)
      const nodeModules = path.resolve(__dirname, 'node_modules')

      let pkg
      if (filename.startsWith('react-dom')) pkg = 'react-dom'
      else if (filename.startsWith('react')) pkg = 'react'
      else if (filename.startsWith('scheduler')) pkg = 'scheduler'
      else return null

      const resolved = path.resolve(nodeModules, pkg, 'cjs', filename)
      return existsSync(resolved) ? resolved : null
    },
  }
}

export default defineConfig({
  plugins: [fixCommonjsExternal(), react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
