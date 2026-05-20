import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { profile } from '../data/profile'

interface SchedulerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SchedulerModal({ isOpen, onClose }: SchedulerModalProps) {
  const isDarkMode = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const currentTheme = isDarkMode ? 'dark' : 'light'

  useEffect(() => {
    if (!isOpen) return
    ;(async function () {
      const cal = await getCalApi({ origin: import.meta.env.VITE_CALCOM_ORIGIN || 'https://cal.com' } as any)
      cal('ui', {
        theme: 'light', 
        styles: {
          branding: { brandColor: import.meta.env.VITE_CALCOM_BRAND_COLOR || '#4f46e5' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view'
      })
    })()
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!profile.scheduler?.link) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-12 md:pt-24 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl pointer-events-auto"
            >
              {/* Floating Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full p-2 bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all backdrop-blur-md"
              >
                <FaTimes size={18} />
              </button>

              {/* Scheduler Content */}
              <div className="min-h-[600px] h-[85vh] md:h-[750px] bg-white">
                <Cal
                  calLink={profile.scheduler.link}
                  calOrigin={import.meta.env.VITE_CALCOM_ORIGIN || 'https://cal.com'}
                  style={{ width: '100%', height: '100%', background: 'transparent' }}
                  config={{
                    layout: 'month_view',
                    theme: 'light',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
