import { profile } from '../data/profile'
import logoUrl from '../assets/images/rafi-logo.svg'

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Header */}
        <div className="mt-6 flex flex-col items-start gap-4">
          <div className="group relative">
            <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-emerald-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight flex items-center gap-2">
              <img
                src={logoUrl}
                alt="Rafi Logo"
                className="relative h-12 w-auto object-contain dark:brightness-110 mr-2 opacity-50 ov"
              />
              <div className="h-11 w-1 bg-gradient-to-t from-indigo-600 via-sky-600 to-emerald-600 dark:from-indigo-300 dark:via-sky-300 dark:to-emerald-300 rounded-full" />
              <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 dark:from-indigo-300 dark:via-sky-300 dark:to-emerald-300 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            <p className="mt-2 text-lg md:text-xl text-slate-700 dark:text-white/80 border-b border-dotted border-slate-200 dark:border-slate-700 pb-1 w-fit">{profile.headline}</p>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-600 dark:text-white/70">{profile.about}</p>
          </div>
        </div>

        {/* CV header does not include marketing cards */}
      </div>
    </section>
  )
}


