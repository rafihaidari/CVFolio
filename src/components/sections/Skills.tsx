import { profile } from '../../data/profile'

export default function SkillsSection() {
  const row = [...profile.skills, ...profile.skills]
  return (
    <section id="skills" className="relative py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold">Skills</h2>
        <div className="mt-6 overflow-hidden">
          <div className="flex min-w-[200%] gap-3 animate-marquee">
            {row.map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur-sm hover:bg-white/10"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



