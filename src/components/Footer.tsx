export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 py-8 text-center text-xs text-white/60">
      <p>
        © {new Date().getFullYear()} Rafi Haidari — Crafted with React, Vite and Tailwind
      </p>
      <p className="mt-2">
        Open source on{' '}
        <a
          href="https://github.com/rafihaidari/CVFolio"
          target="_blank"
          rel="noreferrer"
          className="text-white/80 hover:underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  )
}



