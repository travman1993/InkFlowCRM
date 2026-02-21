import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'
import { createRequire } from 'module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vendorDir = path.resolve(__dirname, '.vendor')
const _require = createRequire(import.meta.url)

function makeEntry(pkg, externals = []) {
  const exports = Object.keys(_require(pkg)).filter(k => k !== 'default')
  const externalDecls = externals.map(e => `import _ext_${e.replace(/[^a-z]/gi, '_')} from '${e}';`).join('\n')
  return `
${externalDecls}
import _mod from '${pkg}';
const { ${exports.join(', ')} } = _mod;
export { ${exports.join(', ')} };
export default _mod;
`
}

async function prebundleReact() {
  mkdirSync(vendorDir, { recursive: true })
  const opts = {
    bundle: true,
    format: 'esm',
    platform: 'browser',
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'silent',
  }
  await Promise.all([
    build({ ...opts, stdin: { contents: makeEntry('react'), resolveDir: __dirname }, outfile: `${vendorDir}/react.js` }),
    build({ ...opts, stdin: { contents: makeEntry('react/jsx-runtime', ['react']), resolveDir: __dirname }, external: ['react'], outfile: `${vendorDir}/react-jsx-runtime.js` }),
    build({ ...opts, stdin: { contents: makeEntry('react-dom', ['react']), resolveDir: __dirname }, external: ['react'], outfile: `${vendorDir}/react-dom.js` }),
  ])
}

export default defineConfig(async ({ command }) => {
  if (command === 'build') await prebundleReact()

  const alias = command === 'build' ? {
    'react/jsx-runtime': `${vendorDir}/react-jsx-runtime.js`,
    'react-dom/client': `${vendorDir}/react-dom.js`,
    'react-dom': `${vendorDir}/react-dom.js`,
    'react': `${vendorDir}/react.js`,
  } : {}

  return {
    plugins: [react()],
    resolve: { alias },
  }
})
