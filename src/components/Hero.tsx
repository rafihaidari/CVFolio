import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Header */}
        <div className="mt-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>
          <p className="mt-2 text-lg md:text-xl text-white/80">{profile.headline}</p>
          {profile.location && (
            <p className="mt-1 text-sm text-white/60">{profile.location}</p>
          )}
          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/70">{profile.about}</p>
        </div>

        {/* CV header does not include marketing cards */}
      </div>
    </section>
  )
}


