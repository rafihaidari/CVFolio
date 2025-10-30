import BackgroundFX from './components/BackgroundFX'
import CodeOverlay from './components/CodeOverlay'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ExperienceSection from './components/sections/Experience'
import ContactSection from './components/sections/Contact'
import CVSidebar from './components/CVSidebar'
import EducationSection from './components/sections/Education'

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden text-white">
      <BackgroundFX />
      <CodeOverlay />
      <main className="relative mx-auto max-w-6xl px-6 md:px-8 pt-8 md:pt-12 pb-16">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_50px_-10px_rgba(0,0,0,0.5)]">
          {/* subtle gradient border glow */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-30" style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.35), rgba(56,189,248,0.25), rgba(16,185,129,0.25))' }} />

          <div className="relative grid gap-8 md:grid-cols-[280px,1fr] p-6 md:p-10">
            <CVSidebar />
            <div>
              <Hero />
              <ExperienceSection />
              <EducationSection />
              <ContactSection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

