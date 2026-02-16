import { useMemo } from 'react'

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient wash - simplified for performance */}
      <div
        className="absolute -inset-[15%] bg-[length:200%_200%] opacity-10 dark:opacity-20 blur-3xl animate-gradient-half"
        style={{
          backgroundImage:
            'linear-gradient(110deg, rgba(59,130,246,0.2), rgba(56,189,248,0.2), rgba(16,185,129,0.2))',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 40px 40px',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_70%)]" />

      {/* Gradient blobs - using transform for better performance than top/left */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/20 to-emerald-400/20 dark:from-indigo-500/30 dark:via-sky-400/30 dark:to-emerald-400/30 blur-3xl animate-blob will-change-transform mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-pink-500/20 via-fuchsia-400/20 to-indigo-400/20 dark:from-pink-500/30 dark:via-fuchsia-400/30 dark:to-indigo-400/30 blur-3xl animate-blob [animation-delay:2s] will-change-transform mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-60px] left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-400/20 via-rose-400/20 to-purple-400/20 dark:from-amber-400/30 dark:via-rose-400/30 dark:to-purple-400/30 blur-3xl animate-blob [animation-delay:4s] will-change-transform mix-blend-multiply dark:mix-blend-screen" />

      {/* Stars / particles */}
      <Stars />
    </div>
  )
}

function Stars() {
  const stars = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 1,
      delay: Math.random() * 5,
    }))
  }, [])

  return (
    <div className="absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-slate-400/10 dark:bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}



