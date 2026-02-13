import { profile } from '../../data/profile'
import { ObfuscatedEmail, ObfuscatedPhone } from '../contact/Obfuscated'
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa'

export default function ContactSection() {
  const { links, contact } = profile
  return (
    <section id="contact" className="relative py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold">Get in touch</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
            >
              <FaLinkedin className="text-sky-400" />
              LinkedIn
            </a>
          )}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
            >
              <FaGithub className="text-sky-400" />
              GitHub
            </a>
          )}
          {links.emailParts && (
            <ObfuscatedEmail
              user={links.emailParts.user}
              domain={links.emailParts.domain}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              label={
                <span className="flex items-center gap-2">
                  <FaEnvelope className="text-sky-400" />
                  Email
                </span>
              }
            />
          )}
          {contact?.phoneParts && (
            <ObfuscatedPhone
              parts={contact.phoneParts}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              label={
                <span className="flex items-center gap-2">
                  <FaPhone className="text-sky-400" />
                  Call
                </span>
              }
            />
          )}
        </div>
      </div>
    </section>
  )
}



