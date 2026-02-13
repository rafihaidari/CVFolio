import { useEffect, useState } from 'react'
import { FaMoon, FaSun, FaGithub } from 'react-icons/fa'

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark'
        }
        return 'dark'
    })

    useEffect(() => {
        const root = window.document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
            <a
                href="https://github.com/rafihaidari/CVFolio"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-white/80 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                aria-label="GitHub Repository"
            >
                <FaGithub className="h-4 w-4" />
            </a>

            <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-yellow-400 backdrop-blur-xl transition-all hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                    <FaSun className="h-5 w-5" />
                ) : (
                    <FaMoon className="h-5 w-5" />
                )}
            </button>
        </div>
    )
}
