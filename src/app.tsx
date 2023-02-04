import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'
const modules = import.meta.glob('./functions/**/*.ts')
export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* test every folder in the functions folder */}
      {Object.keys(modules).map((key) => {
        const module = modules[key]
        return (
          <div>
            <h1>{key}</h1>
            <button onClick={() => module().then((m : any) => m.default())}>
              Run
            </button>
          </div>
        )
      })}
    </>
  )
}
