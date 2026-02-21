import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function reactDevCjsPlugin() {
  const nm = path.resolve(__dirname, 'node_modules')
  const redirects = new Map([
    [path.join(nm, 'react', 'index.js'),       `module.exports = require('./cjs/react.development.js');`],
    [path.join(nm, 'react', 'jsx-runtime.js'), `module.exports = require('./cjs/react-jsx-runtime.development.js');`],
    [path.join(nm, 'react-dom', 'index.js'),   `module.exports = require('./cjs/react-dom.development.js');`],
    [path.join(nm, 'scheduler', 'index.js'),   `module.exports = require('./cjs/scheduler.development.js');`],
  ])
  return {
    name: 'react-dev-cjs',
    enforce: 'pre',
    load(id) { return redirects.get(id) ?? null },
  }
}

export default defineConfig({
  plugins: [reactDevCjsPlugin(), react()],
})
