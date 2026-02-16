import { profile } from '../../data/profile'
import { ObfuscatedEmail, ObfuscatedPhone } from '../contact/Obfuscated'
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa'
import { StaggerContainer, StaggerItem, FadeIn } from '../animations/Motion'

export default function ContactSection() {
  const { links, contact } = profile
  return (
    <section id="contact" className="relative py-16">
      <div className="mx-auto max-w-5xl px-4">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Get in touch</h2>
        </FadeIn>

        <StaggerContainer className="mt-8 flex flex-wrap gap-4">
          {links.linkedin && (
            <StaggerItem>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-6 py-3 text-sm font-bold text-slate-700 dark:text-white/90 backdrop-blur shadow-lg hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <FaLinkedin className="text-xl text-indigo-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </StaggerItem>
          )}
          {links.github && (
            <StaggerItem>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-6 py-3 text-sm font-bold text-slate-700 dark:text-white/90 backdrop-blur shadow-lg hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <FaGithub className="text-xl text-indigo-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                GitHub
              </a>
            </StaggerItem>
          )}
          {links.emailParts && (
            <StaggerItem>
              <ObfuscatedEmail
                user={links.emailParts.user}
                domain={links.emailParts.domain}
                className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-6 py-3 text-sm font-bold text-slate-700 dark:text-white/90 backdrop-blur shadow-lg hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                label={
                  <span className="flex items-center gap-2">
                    <FaEnvelope className="text-xl text-indigo-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                    Email
                  </span>
                }
              />
            </StaggerItem>
          )}
          {contact?.phoneParts && (
            <StaggerItem>
              <ObfuscatedPhone
                parts={contact.phoneParts}
                className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-6 py-3 text-sm font-bold text-slate-700 dark:text-white/90 backdrop-blur shadow-lg hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                label={
                  <span className="flex items-center gap-2">
                    <FaPhone className="text-xl text-indigo-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                    Call
                  </span>
                }
              />
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>
  )
}



