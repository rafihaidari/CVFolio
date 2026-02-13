import { profile, Experience } from '../../data/profile'
import { useEffect, useRef, useState } from 'react'
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

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
        "relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur-sm transition-opacity duration-300 " +
        (!showAll && idx === itemsCount - 1 ? "opacity-75" : "opacity-100")
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-slate-900 dark:text-white font-semibold flex items-center gap-2">
          <FaBriefcase className="text-indigo-500 dark:text-sky-400 text-xs" />
          {exp.role}
        </h3>
        <span className="text-xs text-slate-500 dark:text-white/60 flex items-center gap-1.5">
          <FaCalendarAlt className="text-slate-400 dark:text-white/40" />
          {exp.period}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
        <p className="text-sm text-slate-700 dark:text-white/70 font-medium">{exp.company}</p>
        {exp.location && (
          <p className="text-xs text-slate-500 dark:text-white/50 flex items-center gap-1">
            <FaMapMarkerAlt />
            {exp.location}
          </p>
        )}
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-white/80">{exp.summary}</p>

      {exp.description && (
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-indigo-600 dark:text-sky-400 hover:text-indigo-500 dark:hover:text-sky-300 transition-colors"
          >
            {isExpanded ? "Show less details" : "Read more details"}
          </button>
          <div
            className={
              "overflow-hidden transition-all duration-300 ease-in-out " +
              (isExpanded ? "mt-3 opacity-100" : "max-h-0 opacity-0")
            }
          >
            <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">
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
                  className="whitespace-nowrap rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-white/60 transition-colors hover:border-indigo-200 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10"
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
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Experience</h2>
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
                ? "border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 text-slate-600 dark:text-white/90 hover:bg-slate-50 dark:hover:bg-white/10"
                : "bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white shadow-md dark:shadow-glow hover:scale-[1.02]")
            }
          >
            {showAll ? "Show less" : "Read more"}
          </button>
        </div>
      </div>
    </section>
  )
}



