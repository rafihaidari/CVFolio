import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200 dark:border-white/10 py-8 text-center text-xs text-slate-500 dark:text-white/60">
      <p>
        © {new Date().getFullYear()} Rafi Haidari — Crafted with React, Vite and Tailwind
      </p>
      <p className="mt-2">
        Open source on{' '}
        <a
          href="https://github.com/rafihaidari/CVFolio"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-slate-700 dark:text-white/80 hover:underline"
        >
          <FaGithub className="text-xs" />
          GitHub
        </a>
      </p>
    </footer>
  )
}



