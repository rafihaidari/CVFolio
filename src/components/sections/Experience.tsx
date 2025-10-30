import { profile } from '../../data/profile'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function ExperienceSection() {
  const previewCount = 3
  const [showAll, setShowAll] = useState(false)
  const all = profile.experiences
  const items = showAll ? all : all.slice(0, previewCount)

  // Refs to animate height
  const containerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [targetHeight, setTargetHeight] = useState<number | undefined>(undefined)

  // Compute collapsed height (height of first N cards + gaps)
  const collapsedHeight = useMemo(() => {
    if (!innerRef.current) return undefined
    const children = Array.from(innerRef.current.children) as HTMLElement[]
    if (children.length === 0) return 0
    const slice = children.slice(0, Math.min(previewCount, children.length))
    const total = slice.reduce((acc, el) => acc + el.offsetHeight, 0)
    // Approximate gap: Tailwind gap-4 ⇒ 1rem (16px) between items
    const gaps = (slice.length - 1) * 16
    return total + gaps
  }, [innerRef.current, showAll, all.length])

  const fullHeight = useMemo(() => {
    return innerRef.current ? innerRef.current.scrollHeight : undefined
  }, [innerRef.current, all.length])

  // Update target height on toggle and on layout changes
  useEffect(() => {
    const apply = () => {
      const next = showAll ? fullHeight : collapsedHeight
      setTargetHeight(next)
    }
    apply()
    const onResize = () => apply()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [showAll, fullHeight, collapsedHeight])

  return (
    <section id="experience" className="relative py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
        <div
          ref={containerRef}
          className={
            "relative mt-8 overflow-hidden transition-[max-height] duration-500 ease-in-out " +
            (!showAll ? "[mask-image:linear-gradient(to_bottom,black,black,transparent)]" : "[mask-image:none]")
          }
          style={{ maxHeight: targetHeight ? `${targetHeight}px` : undefined }}
        >
          <div ref={innerRef} className="grid gap-4">
            {all.map((exp, idx) => (
              <article
                key={`${exp.company}-${exp.role}`}
                className={
                  "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-opacity duration-300 " +
                  (!showAll && idx === Math.min(previewCount, all.length) - 1 ? "opacity-75" : "opacity-100")
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-white font-semibold">{exp.role}</h3>
                  <span className="text-xs text-white/60">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-white/70">{exp.company}</p>
                <p className="mt-3 text-sm text-white/80">{exp.summary}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => setShowAll((v) => !v)}
            className={
              "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all " +
              (showAll
                ? "border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
                : "bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white shadow-glow hover:scale-[1.02]")
            }
          >
            {showAll ? "Show less" : "Read more"}
          </button>
        </div>
      </div>
    </section>
  )
}



