import { useState, useEffect } from 'react'
import BackgroundFX from './components/BackgroundFX'
import CodeOverlay from './components/CodeOverlay'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ExperienceSection from './components/sections/Experience'
import ContactSection from './components/sections/Contact'
import CVSidebar from './components/CVSidebar'
import EducationSection from './components/sections/Education'
import ThemeToggle from './components/ThemeToggle'
import CustomCursor from './components/CustomCursor'
import BookingPage from './components/BookingPage'

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.pathname === '/book' ? 'book' : 'home'
  })

  useEffect(() => {
    // Intercept history.pushState and replaceState to dispatch a custom event
    const originalPushState = history.pushState
    history.pushState = function (...args) {
      originalPushState.apply(this, args)
      window.dispatchEvent(new Event('pushstate'))
    }

    const originalReplaceState = history.replaceState
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args)
      window.dispatchEvent(new Event('pushstate'))
    }

    const handleLocationChange = () => {
      setCurrentRoute(window.location.pathname === '/book' ? 'book' : 'home')
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('pushstate', handleLocationChange)

    // Intercept click events on standard local <a> elements to make them SPA transitions
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor && anchor.href) {
        const url = new URL(anchor.href)
        if (url.origin === window.location.origin) {
          const path = url.pathname
          if (path === '/' || path === '/book') {
            e.preventDefault()
            history.pushState({}, '', path)
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('pushstate', handleLocationChange)
      document.removeEventListener('click', handleAnchorClick)
      
      // Restore original functions
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  return (
    <div className="relative min-h-dvh text-white dark:text-white text-slate-900 transition-colors duration-300">
      <CustomCursor />
      <BackgroundFX />
      <ThemeToggle />
      
      {currentRoute === 'book' ? (
        <BookingPage />
      ) : (
        <>
          <CodeOverlay />
          <main className="relative mx-auto max-w-6xl px-4 md:px-8 pt-6 md:pt-12 pb-16">
            <div className="relative rounded-3xl border border-white/10 bg-white/10 dark:bg-white/[0.03] md:backdrop-blur-xl shadow-[0_10px_50px_-10px_rgba(0,0,0,0.5)] min-h-[calc(100vh-6rem)]">
              {/* subtle gradient border glow */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-20" style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.3), rgba(56,189,248,0.2), rgba(16,185,129,0.2))' }} />

              <div className="relative grid gap-6 md:grid-cols-[280px,1fr] p-5 md:p-10 md:px-7">
                <CVSidebar />
                <div className="min-w-0">
                  <Hero />
                  <ExperienceSection />
                  <EducationSection />
                  <ContactSection />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

