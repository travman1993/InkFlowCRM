import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

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

function makeEntry(exports, pkg) {
  return `import _m from '${pkg}';const{${exports.join(',')}}=_m;export{${exports.join(',')}};export default _m;`
}

function forceDevCjsPlugin() {
  const nm = path.resolve(__dirname, 'node_modules')
  const redirects = new Map([
    [path.join(nm, 'react/index.js'),       [path.join(nm, 'react'),     './cjs/react.development.js']],
    [path.join(nm, 'react/jsx-runtime.js'), [path.join(nm, 'react'),     './cjs/react-jsx-runtime.development.js']],
    [path.join(nm, 'react-dom/index.js'),   [path.join(nm, 'react-dom'), './cjs/react-dom.development.js']],
    [path.join(nm, 'scheduler/index.js'),   [path.join(nm, 'scheduler'), './cjs/scheduler.development.js']],
  ])
  return {
    name: 'force-dev-cjs',
    setup(build) {
      build.onLoad({ filter: /node_modules[\\/](react|react-dom|scheduler)[\\/][^/\\]+\.js$/ }, args => {
        const r = redirects.get(args.path)
        if (!r) return null
        return { contents: `module.exports = require('${r[1]}');`, loader: 'js', resolveDir: r[0] }
      })
    },
  }
}

async function prebundleReact() {
  mkdirSync(vendorDir, { recursive: true })
  const opts = {
    bundle: true,
    format: 'esm',
    platform: 'browser',
    define: { 'process.env.NODE_ENV': '"production"' },
    plugins: [forceDevCjsPlugin()],
    logLevel: 'silent',
  }
  await Promise.all([
    build({ ...opts, stdin: { contents: makeEntry(REACT_EXPORTS, 'react'), resolveDir: __dirname }, outfile: `${vendorDir}/react.js` }),
    build({ ...opts, stdin: { contents: makeEntry(JSX_RUNTIME_EXPORTS, 'react/jsx-runtime'), resolveDir: __dirname }, external: ['react'], outfile: `${vendorDir}/react-jsx-runtime.js` }),
    build({ ...opts, stdin: { contents: makeEntry(REACT_DOM_EXPORTS, 'react-dom'), resolveDir: __dirname }, external: ['react'], outfile: `${vendorDir}/react-dom.js` }),
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
