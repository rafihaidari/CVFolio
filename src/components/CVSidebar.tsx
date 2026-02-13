import avatarUrl from '../assets/images/Rafi-Haidari.jpeg'
import { profile } from '../data/profile'
import { ObfuscatedEmail, ObfuscatedPhone } from './contact/Obfuscated'
import { useState } from 'react'
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt
} from 'react-icons/fa'

export default function CVSidebar() {
  const { links, skills, contact, languages, certifications } = profile
  const [showAllSkills, setShowAllSkills] = useState(false)

  return (
    <aside className="relative md:sticky md:top-8 self-start">
      <div className="h-full md:h-[calc(100vh-6rem)]">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm">
          {/* Header */}
          <div className="p-3 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-[3px] bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 shadow-glow">
                <img
                  src={avatarUrl}
                  alt="Rafi Haidari"
                  className="h-20 w-20 rounded-full object-cover object-center"
                  loading="eager"
                />
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-white/90">Software Engineer</div>
                {contact?.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/60">
                    <FaMapMarkerAlt className="text-indigo-500 dark:text-sky-400" />
                    <span>{contact.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="min-h-0 flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-white/10">
            {/* Contact */}
            <section className="p-5">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/50">Contact</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-white/80">
                {contact?.phoneParts && (
                  <li className="flex items-center gap-2.5">
                    <FaPhone className="text-indigo-500 dark:text-sky-400/80 text-xs shrink-0" />
                    <ObfuscatedPhone
                      parts={contact.phoneParts}
                      className="hover:underline"
                      label={contact.phoneParts.join(' ')}
                    />
                  </li>
                )}
                {links.emailParts && (
                  <li className="flex items-center gap-2.5">
                    <FaEnvelope className="text-indigo-500 dark:text-sky-400/80 text-xs shrink-0" />
                    <ObfuscatedEmail
                      user={links.emailParts.user}
                      domain={links.emailParts.domain}
                      className="hover:underline"
                      label={`${links.emailParts.user} [at] ${links.emailParts.domain.replace(/\./g, ' [dot] ')}`}
                    />
                  </li>
                )}
                {links.linkedin && (
                  <li className="flex items-center gap-2.5">
                    <FaLinkedin className="text-indigo-500 dark:text-sky-400/80 text-xs shrink-0" />
                    <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                      LinkedIn
                    </a>
                  </li>
                )}
                {links.github && (
                  <li className="flex items-center gap-2.5">
                    <FaGithub className="text-indigo-500 dark:text-sky-400/80 text-xs shrink-0" />
                    <a href={links.github} target="_blank" rel="noreferrer" className="hover:underline">
                      GitHub
                    </a>
                  </li>
                )}
              </ul>
            </section>

            {/* Skills */}
            <section className="p-5">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/50">Skills</h3>
              <div
                className={
                  "relative mt-3 flex flex-wrap gap-2 overflow-hidden transition-[max-height] duration-500 ease-in-out " +
                  (showAllSkills ? "overflow-y-auto pr-2 scrollbar-hide" : "[mask-image:linear-gradient(to_bottom,black,black,transparent)]")
                }
                style={{ maxHeight: showAllSkills ? 320 : 120 }}
              >
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-1 text-xs text-slate-600 dark:text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => setShowAllSkills((v) => !v)}
                  className={
                    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-1.5 text-xs font-semibold transition-all " +
                    (showAllSkills
                      ? "border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 text-slate-600 dark:text-white/90 hover:bg-slate-50 dark:hover:bg-white/10"
                      : "bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white shadow-md dark:shadow-glow hover:scale-[1.02]")
                  }
                >
                  {showAllSkills ? "Show less" : "Show more"}
                </button>
              </div>
            </section>

            {/* Projects */}
            {profile.projects && profile.projects.length > 0 && (
              <section className="p-5">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/50">Projects</h3>
                <div className="mt-3 space-y-4">
                  {profile.projects.map((category) => (
                    <div key={category.title}>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-white/40 mb-2">
                        {category.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="group flex items-center justify-between text-sm text-slate-600 dark:text-white/80 hover:text-indigo-600 dark:hover:text-white transition-colors"
                            >
                              <span>{item.name}</span>
                              <FaExternalLinkAlt
                                size={10}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 dark:text-sky-400"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section className="p-5">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/50">Languages</h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-white/80">
                  {languages.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section className="p-5">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/50">Certifications</h3>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-white/80">
                  {certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}


