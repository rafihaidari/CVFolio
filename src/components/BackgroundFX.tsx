export default function BackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient wash */}
      <div
        className="absolute -inset-[15%] bg-[length:200%_200%] opacity-20 blur-3xl animate-gradient-x"
        style={{
          backgroundImage:
            'linear-gradient(110deg, rgba(59,130,246,0.6), rgba(56,189,248,0.6), rgba(16,185,129,0.6))',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px, 32px 32px',
          backgroundPosition: '0 0, 0 0',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12),_transparent_60%)]" />

      {/* Gradient blobs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-500/40 via-sky-400/40 to-emerald-400/40 blur-2xl animate-blob mix-blend-screen" />
      <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-pink-500/40 via-fuchsia-400/40 to-indigo-400/40 blur-2xl animate-blob [animation-delay:2s] mix-blend-screen" />
      <div className="absolute bottom-[-60px] left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-400/40 via-rose-400/40 to-purple-400/40 blur-2xl animate-blob [animation-delay:4s] mix-blend-screen" />

      {/* Stars / particles */}
      <Stars count={90} />
    </div>
  )
}

function Stars({ count = 60 }: { count?: number }) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const top = Math.random() * 100
    const left = Math.random() * 100
    const size = Math.random() * 2 + 1
    const delay = Math.random() * 5
    return { id: i, top, left, size, delay }
  })

  return (
    <div className="absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-twinkle"
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



