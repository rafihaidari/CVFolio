import { profile } from '../../data/profile'

export default function EducationSection() {
  const { education } = profile
  if (!education || education.length === 0) return null
  return (
    <section id="education" className="relative py-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold">Education</h2>
        <div className="mt-6 grid gap-4">
          {education.map((e) => (
            <article
              key={e.degree}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-white font-semibold">{e.degree}</h3>
                <span className="text-xs text-white/60">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-white/70">{e.institution}</p>
              {e.details && e.details.length > 0 && (
                <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-white/80">
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


