import { profile } from '../../data/profile'
import { FaGraduationCap, FaUniversity, FaCalendarAlt } from 'react-icons/fa'
import { StaggerContainer, StaggerItem, FadeIn } from '../animations/Motion'

export default function EducationSection() {
  const { education } = profile
  if (!education || education.length === 0) return null
  return (
    <section id="education" className="relative py-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Education</h2>
        </FadeIn>

        <StaggerContainer className="mt-6 grid gap-4">
          {education.map((e) => (
            <StaggerItem
              key={e.degree}
              className="relative overflow-hidden group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-slate-900 dark:text-white font-semibold flex items-center gap-2">
                  <FaGraduationCap className="text-indigo-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                  {e.degree}
                </h3>
                <span className="text-xs text-slate-500 dark:text-white/60 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-slate-400 dark:text-white/40" />
                  {e.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-700 dark:text-white/70 flex items-center gap-2">
                <FaUniversity className="text-slate-400 dark:text-white/40 text-xs" />
                {e.institution}
              </p>
              {e.details && e.details.length > 0 && (
                <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-white/80">
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}


