import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vendorDir = path.resolve(__dirname, '.vendor')

// React 18 named exports — hardcoded so we don't need to require() React at config load time
const REACT_EXPORTS = [
  'Children', 'Component', 'Fragment', 'Profiler', 'PureComponent', 'StrictMode',
  'Suspense', 'cloneElement', 'createContext', 'createElement', 'createRef',
  'forwardRef', 'isValidElement', 'lazy', 'memo', 'startTransition',
  'useCallback', 'useContext', 'useDebugValue', 'useDeferredValue', 'useEffect',
  'useId', 'useImperativeHandle', 'useInsertionEffect', 'useLayoutEffect',
  'useMemo', 'useReducer', 'useRef', 'useState', 'useSyncExternalStore',
  'useTransition', 'version',
]
const REACT_DOM_EXPORTS = [
  'createPortal', 'createRoot', 'flushSync', 'hydrateRoot',
  'unmountComponentAtNode', 'unstable_batchedUpdates', 'version',
]
const JSX_RUNTIME_EXPORTS = ['Fragment', 'jsx', 'jsxs']

// Explicit re-export entry so Rollup sees proper named exports from the vendor file
function makeEntry(namedExports, pkg) {
  return `import _m from '${pkg}';const{${namedExports.join(',')}}=_m;export{${namedExports.join(',')}};export default _m;`
}

// Redirect bare package names to their production CJS files, bypassing the
// conditional-require index.js that Rollup can't handle (and dev files that
// have an IIFE eliminated by NODE_ENV=production define)
function useProdCjsPlugin() {
  const nm = path.resolve(__dirname, 'node_modules')
  const redirects = new Map([
    ['react',             path.join(nm, 'react',     'cjs', 'react.production.min.js')],
    ['react/jsx-runtime', path.join(nm, 'react',     'cjs', 'react-jsx-runtime.production.min.js')],
    ['react-dom',         path.join(nm, 'react-dom', 'cjs', 'react-dom.production.min.js')],
    ['scheduler',         path.join(nm, 'scheduler', 'cjs', 'scheduler.production.min.js')],
  ])
  return {
    name: 'use-prod-cjs',
    setup(build) {
      for (const [pkg, filePath] of redirects) {
        const filter = new RegExp(`^${pkg.replace('/', '\\/')}$`)
        build.onResolve({ filter }, () => ({ path: filePath }))
      }
    },
  }
}

async function prebundleReact() {
  mkdirSync(vendorDir, { recursive: true })
  const opts = {
    bundle: true,
    format: 'esm',
    platform: 'browser',
    plugins: [useProdCjsPlugin()],
    logLevel: 'silent',
  }
  await Promise.all([
    build({
      ...opts,
      stdin: { contents: makeEntry(REACT_EXPORTS, 'react'), resolveDir: __dirname },
      outfile: `${vendorDir}/react.js`,
    }),
    build({
      ...opts,
      stdin: { contents: makeEntry(JSX_RUNTIME_EXPORTS, 'react/jsx-runtime'), resolveDir: __dirname },
      external: ['react'],
      outfile: `${vendorDir}/react-jsx-runtime.js`,
    }),
    build({
      ...opts,
      stdin: { contents: makeEntry(REACT_DOM_EXPORTS, 'react-dom'), resolveDir: __dirname },
      external: ['react'],
      outfile: `${vendorDir}/react-dom.js`,
    }),
  ])
}

export default defineConfig(async ({ command }) => {
  if (command === 'build') await prebundleReact()

  const alias = command === 'build' ? {
    'react/jsx-runtime': `${vendorDir}/react-jsx-runtime.js`,
    'react-dom/client':  `${vendorDir}/react-dom.js`,
    'react-dom':         `${vendorDir}/react-dom.js`,
    'react':             `${vendorDir}/react.js`,
  } : {}

  return {
    plugins: [react()],
    resolve: { alias },
  }
})
