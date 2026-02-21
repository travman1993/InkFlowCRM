import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, readFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vendorDir = path.resolve(__dirname, '.vendor')

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

function makeEntry(namedExports, pkg) {
  return `import _m from '${pkg}';const{${namedExports.join(',')}}=_m;export{${namedExports.join(',')}};export default _m;`
}

const nm = path.resolve(__dirname, 'node_modules')
const devFiles = {
  'react':             path.join(nm, 'react',     'cjs', 'react.development.js'),
  'react/jsx-runtime': path.join(nm, 'react',     'cjs', 'react-jsx-runtime.development.js'),
  'react-dom':         path.join(nm, 'react-dom', 'cjs', 'react-dom.development.js'),
  'scheduler':         path.join(nm, 'scheduler', 'cjs', 'scheduler.development.js'),
}

// Redirect specific bare package names to their .development.js CJS files.
// Only the listed packages are intercepted; anything not in the list (e.g. 'react'
// in the jsx-runtime build) falls through to the external/default resolver.
function makeDevPlugin(packages) {
  return {
    name: 'use-dev-cjs',
    setup(b) {
      for (const pkg of packages) {
        const filter = new RegExp(`^${pkg.replace('/', '\\/')}$`)
        b.onResolve({ filter }, () => ({ path: devFiles[pkg] }))
      }
    },
  }
}

// The .development.js files wrap ALL their exports in:
//   if (process.env.NODE_ENV !== "production") { (function() { ... })(); }
// With define: NODE_ENV="production" esbuild eliminates the IIFE — React exports nothing.
// Fix: change the FIRST (outer) occurrence to `if (true)` so the IIFE always executes.
// Inner dev-only checks are still eliminated by define.
function stripDevWrapperPlugin() {
  return {
    name: 'strip-dev-wrapper',
    setup(b) {
      b.onLoad(
        { filter: /cjs\/(react|react-dom|react-jsx-runtime|scheduler)\.development\.js$/ },
        args => {
          const contents = readFileSync(args.path, 'utf8')
          const patched = contents.replace(
            `if (process.env.NODE_ENV !== "production") {`,
            `if (true) {`
          )
          return { contents: patched, loader: 'js' }
        }
      )
    },
  }
}

async function prebundleReact() {
  mkdirSync(vendorDir, { recursive: true })
  const shared = {
    bundle: true,
    format: 'esm',
    platform: 'browser',
    define: { 'process.env.NODE_ENV': '"production"' },
    minify: true,
    logLevel: 'silent',
  }
  await Promise.all([
    build({
      ...shared,
      plugins: [makeDevPlugin(['react']), stripDevWrapperPlugin()],
      stdin: { contents: makeEntry(REACT_EXPORTS, 'react'), resolveDir: __dirname },
      outfile: `${vendorDir}/react.js`,
    }),
    build({
      ...shared,
      // 'react' is external so it stays as an import in the output;
      // Vite alias maps it to .vendor/react.js at Rollup build time.
      external: ['react'],
      plugins: [makeDevPlugin(['react/jsx-runtime']), stripDevWrapperPlugin()],
      stdin: { contents: makeEntry(JSX_RUNTIME_EXPORTS, 'react/jsx-runtime'), resolveDir: __dirname },
      outfile: `${vendorDir}/react-jsx-runtime.js`,
    }),
    build({
      ...shared,
      external: ['react'],
      plugins: [makeDevPlugin(['react-dom', 'scheduler']), stripDevWrapperPlugin()],
      stdin: { contents: makeEntry(REACT_DOM_EXPORTS, 'react-dom'), resolveDir: __dirname },
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
