import { useMemo } from 'react'

type Snippet = {
  code: string
  style: React.CSSProperties
  delay?: string
}

export default function CodeOverlay() {
  const snippets = useMemo<Snippet[]>(
    () => [
      {
        code: `const fetchUser = async (id: string) => {
  const res = await fetch('/api/users/' + id)
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}`,
        style: { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, transform: 'rotate(-3deg)' },
        delay: '0s',
      },
      {
        code: `export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-3 py-1.5 rounded-md bg-indigo-500 text-white">
      {children}
    </button>
  )
}`,
        style: { bottom: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, transform: 'rotate(2deg)' },
        delay: '1s',
      },
      {
        code: `const tailwind = {
  theme: { extend: { animation: { float: 'float 6s ease-in-out infinite' } } }
}`,
        style: { top: `${Math.random() * 100}%`, right: `${Math.random() * 100}%`, transform: 'rotate(4deg)' },
        delay: '0.5s',
      },
      {
        code: `type Experience = { company: string; role: string; period: string }`,
        style: { bottom: `${Math.random() * 100}%`, right: `${Math.random() * 100}%`, transform: 'rotate(-5deg)' },
        delay: '1.8s',
      },
      {
        code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((v) => !v)
  return { on, toggle }
}`,
        style: { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, transform: 'rotate(-1deg)' },
        delay: '0.9s',
      },
    ],
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {snippets.map((s, i) => (
        <pre
          key={i}
          className="select-none font-mono text-[10px] md:text-xs leading-relaxed whitespace-pre text-white/10 md:text-white/15 blur-[0.2px] animate-float"
          style={{ position: 'absolute', ...s.style, animationDelay: s.delay }}
        >
          {s.code}
        </pre>
      ))}
    </div>
  )
}


