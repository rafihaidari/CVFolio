import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200 dark:border-white/10 py-8 text-center text-xs text-slate-500 dark:text-white/60">
      <p>
        © {new Date().getFullYear()} Rafi Haidari — Crafted with React, Vite and Tailwind
      </p>
    </footer>
  )
}



