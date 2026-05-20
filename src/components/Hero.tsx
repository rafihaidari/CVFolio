import { profile } from '../data/profile'
import logoUrl from '../assets/images/rafi-logo.svg'
import { motion } from 'framer-motion'
import { RevealMask } from './animations/Motion'
import { useEffect, useState } from 'react'
import { FaCalendarPlus } from 'react-icons/fa'

export default function Hero() {
  const headlineWords = profile.headline.split(' ')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Header */}
        <div className="mt-6 flex flex-col items-start gap-4">
          {!isMobile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-emerald-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ) : (
            <div className="group relative">
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-emerald-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </div>
          )}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight flex items-center gap-2">
              <motion.img
                initial={isMobile ? { opacity: 0.5 } : { x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src={logoUrl}
                alt="Rafi Logo"
                className="relative h-12 w-auto object-contain dark:brightness-110 mr-2 ov"
              />
              <motion.div
                initial={isMobile ? { height: 44 } : { height: 0 }}
                animate={{ height: 44 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="h-11 w-1 bg-gradient-to-t from-indigo-600 via-sky-600 to-emerald-600 dark:from-indigo-300 dark:via-sky-300 dark:to-emerald-300 rounded-full"
              />
              <RevealMask delay={0.5}>
                <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 dark:from-indigo-300 dark:via-sky-300 dark:to-emerald-300 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </RevealMask>
            </h1>
            <div className="mt-2 flex flex-wrap gap-x-[0.4em] text-lg md:text-xl font-medium text-slate-700 dark:text-white/80 border-b border-dotted border-slate-200 dark:border-slate-700 pb-1 w-fit">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.2 }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                className="inline-block w-[2px] h-[1.2em] bg-indigo-500 dark:bg-sky-400 align-middle"
              />
            </div>
            <motion.p
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-4 max-w-2xl text-base md:text-lg text-slate-600 dark:text-white/70"
            >
              {profile.about}
            </motion.p>
            
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="/book"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-indigo-500/25 active:scale-95"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <FaCalendarPlus className="text-lg" />
                <span>Book a Session</span>
              </a>
              

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


