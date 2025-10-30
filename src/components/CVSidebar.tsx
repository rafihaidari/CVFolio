import avatarUrl from '../assets/images/Rafi-Haidari.jpeg'
import { profile } from '../data/profile'
import { ObfuscatedEmail, ObfuscatedPhone } from './contact/Obfuscated'

export default function CVSidebar() {
  const { links, skills, contact, languages, certifications } = profile
  return (
    <aside className="relative space-y-6">
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="rounded-full p-[3px] bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 shadow-glow">
          <img
            src={avatarUrl}
            alt="Rafi Haidari"
            className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover object-center"
            loading="eager"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {contact?.location && <li>{contact.location}</li>}
          {contact?.phoneParts && (
            <li>
              <ObfuscatedPhone parts={contact.phoneParts} className="hover:underline" label={contact.phoneParts.join(' ')} />
            </li>
          )}
          {links.emailParts && (
            <li>
              <ObfuscatedEmail user={links.emailParts.user} domain={links.emailParts.domain} className="hover:underline" label={`${links.emailParts.user} [at] ${links.emailParts.domain.replace(/\./g, ' [dot] ')}`} />
            </li>
          )}
          {links.linkedin && (
            <li>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            </li>
          )}
          {links.github && (
            <li>
              <a href={links.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            </li>
          )}
        </ul>
      </div>

      {/* Skills */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-white/90">Skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-white/90">Languages</h3>
          <ul className="mt-3 space-y-1 text-sm text-white/80">
            {languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-white/90">Certifications</h3>
          <ul className="mt-3 space-y-1 text-sm text-white/80 list-disc pl-5">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Education moved to main content under Experience */}
    </aside>
  )
}


