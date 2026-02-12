import { profile, Experience } from '../../data/profile'
import { useEffect, useRef, useState } from 'react'

interface ExperienceCardProps {
  exp: Experience
  idx: number
  showAll: boolean
  itemsCount: number
}

function ExperienceCard({ exp, idx, showAll, itemsCount }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article
      key={`${exp.company}-${exp.role}`}
      className={
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-opacity duration-300 " +
        (!showAll && idx === itemsCount - 1 ? "opacity-75" : "opacity-100")
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-white font-semibold">{exp.role}</h3>
        <span className="text-xs text-white/60">{exp.period}</span>
      </div>
      <p className="mt-1 text-sm text-white/70">{exp.company}</p>
      <p className="mt-3 text-sm text-white/80">{exp.summary}</p>

      {exp.description && (
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            {isExpanded ? "Show less details" : "Read more details"}
          </button>
          <div
            className={
              "overflow-hidden transition-all duration-300 ease-in-out " +
              (isExpanded ? "mt-3 opacity-100" : "max-h-0 opacity-0")
            }
          >
            <p className="text-sm text-white/70 leading-relaxed">
              {exp.description}
            </p>
          </div>
        </div>
      )}

      {exp.skills && exp.skills.length > 0 && (
        <div className="mt-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-nowrap gap-2">
              {exp.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-white/60 transition-colors hover:border-white/20 hover:bg-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default function ExperienceSection() {
  const previewCount = 4
  const [showAll, setShowAll] = useState(false)
  const all = profile.experiences
  const items = showAll ? all : all.slice(0, previewCount)

  // Refs to animate height
  const containerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  // Update container height when toggling
  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return

    const updateHeight = () => {
      if (innerRef.current) {
        containerRef.current!.style.maxHeight = `${innerRef.current.scrollHeight}px`
      }
    }

    // Small delay to allow DOM to update
    setTimeout(updateHeight, 0)

    const onResize = () => updateHeight()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [showAll, items.length])

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
        >
          <div ref={innerRef} className="grid gap-4">
            {items.map((exp, idx) => (
              <ExperienceCard
                key={`${exp.company}-${exp.role}`}
                exp={exp}
                idx={idx}
                showAll={showAll}
                itemsCount={items.length}
              />
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



