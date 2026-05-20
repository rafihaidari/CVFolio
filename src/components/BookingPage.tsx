import { useEffect, useState } from 'react'
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaClock, 
  FaGlobe, 
  FaUser, 
  FaEnvelope, 
  FaRegCommentDots, 
  FaChevronLeft, 
  FaChevronRight, 
  FaCheckCircle, 
  FaSpinner,
  FaExclamationCircle,
  FaUserPlus,
  FaCopy,
  FaCheck
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'
import logoUrl from '../assets/images/rafi-logo.svg'
import { fetchAvailableSlots, createBooking, Slot } from '../utils/calcom'

const POPULAR_TIMEZONES = [
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
  { value: 'Europe/Berlin', label: 'Central European Time (Berlin, Paris)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (London)' },
  { value: 'America/New_York', label: 'Eastern Time (New York, Toronto)' },
  { value: 'America/Chicago', label: 'Central Time (Chicago)' },
  { value: 'America/Denver', label: 'Mountain Time (Denver)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (Los Angeles)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (Tokyo)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (Kolkata)' },
  { value: 'Asia/Kabul', label: 'Afghanistan Time (Kabul)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (Sydney)' },
]

export default function BookingPage() {
  // Parsing username and event slug
  const schedulerLink = profile.scheduler?.link || 'haidari/30min'
  const parts = schedulerLink.split('/')
  const username = parts[0] || 'haidari'
  const eventTypeSlug = parts[1] || '30min'

  // Selected timeZone
  const [selectedTimeZone, setSelectedTimeZone] = useState(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Berlin'
  })

  // Date and months
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  // Data loading states
  const [slotsData, setSlotsData] = useState<Record<string, Slot[]>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Booking Form Modal State
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [pendingSlotStart, setPendingSlotStart] = useState<string | null>(null)
  const [bookingName, setBookingName] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingNotes, setBookingNotes] = useState('')
  const [bookingGuests, setBookingGuests] = useState<string[]>([])
  const [showGuestsInput, setShowGuestsInput] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [bookingResult, setBookingResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  // Build full timezones list with browser detected tz
  const timezonesList = (() => {
    const hasDetected = POPULAR_TIMEZONES.some(tz => tz.value === selectedTimeZone)
    if (hasDetected) return POPULAR_TIMEZONES
    return [{ value: selectedTimeZone, label: `Local Time (${selectedTimeZone})` }, ...POPULAR_TIMEZONES]
  })()

  // Format date to YYYY-MM-DD in selected timezone
  const formatDateInTimeZone = (date: Date, tz: string): string => {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      return formatter.format(date) // e.g. "2026-05-20"
    } catch (e) {
      // Fallback in case of standard timezone failure
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      return offsetDate.toISOString().split('T')[0] || ''
    }
  }

  // Format slot time ISO string to human readable hh:mm AM/PM in selected timezone
  const formatTimeInTimeZone = (isoString: string, tz: string): string => {
    try {
      const date = new Date(isoString)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      return formatter.format(date)
    } catch (e) {
      return new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }
  }

  // Fetch slots whenever active month or timezone changes
  useEffect(() => {
    if (!username || !eventTypeSlug) return

    let isSubscribed = true
    const loadSlots = async () => {
      setLoading(true)
      setError(null)

      const startYear = currentMonth.getFullYear()
      const startMonth = currentMonth.getMonth()

      // Fetch range starting today (or 1st of month if currentMonth is in the future)
      const today = new Date()
      let fetchStart = new Date(startYear, startMonth, 1)
      if (startYear === today.getFullYear() && startMonth === today.getMonth()) {
        fetchStart = today
      }
      
      // Fetch up to the end of the next month (~60 days) to make navigation instant
      const fetchEnd = new Date(startYear, startMonth + 2, 0)

      try {
        const response = await fetchAvailableSlots(
          username,
          eventTypeSlug,
          fetchStart.toISOString(),
          fetchEnd.toISOString(),
          selectedTimeZone
        )

        if (isSubscribed) {
          if (response.status === 'success' && response.data) {
            setSlotsData(response.data)
          } else {
            setError(response.error || 'Unable to retrieve available slots.')
          }
          setLoading(false)
        }
      } catch (err: any) {
        if (isSubscribed) {
          setError(err.message || 'Failed to fetch slots.')
          setLoading(false)
        }
      }
    }

    loadSlots()

    return () => {
      isSubscribed = false
    }
  }, [currentMonth, selectedTimeZone, username, eventTypeSlug])

  // Month navigation logic
  const todayDate = new Date()
  const isPrevMonthDisabled = 
    currentMonth.getFullYear() < todayDate.getFullYear() ||
    (currentMonth.getFullYear() === todayDate.getFullYear() && currentMonth.getMonth() <= todayDate.getMonth())

  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  // Generate Calendar Days Grid
  const getDaysGrid = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    // First day of currentMonth
    const firstDayIndex = new Date(year, month, 1).getDay()
    // Total days in currentMonth
    const totalDays = new Date(year, month + 1, 0).getDate()
    // Total days in previous month
    const prevMonthTotalDays = new Date(year, month, 0).getDate()

    const grid = []

    // Preceding month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      grid.push({
        day: prevMonthTotalDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthTotalDays - i),
      })
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      grid.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      })
    }

    // Next month filler days to complete rows (7 columns)
    const remaining = (7 - (grid.length % 7)) % 7
    for (let i = 1; i <= remaining; i++) {
      grid.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      })
    }

    return grid
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const getSlotsForDate = (date: Date) => {
    const dateKey = formatDateInTimeZone(date, selectedTimeZone)
    return slotsData[dateKey] || []
  }

  const hasSlots = (date: Date) => {
    return getSlotsForDate(date).length > 0
  }

  // Book submission handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingName || !bookingEmail || !selectedSlot) return

    setBookingStatus('loading')
    setError(null)

    // Parse guest emails from the guest inputs array
    const guestEmails = bookingGuests
      .map(e => e.trim())
      .filter(e => e.length > 0 && e.includes('@'))

    try {
      const result = await createBooking({
        username,
        eventTypeSlug,
        start: selectedSlot.start,
        attendee: {
          name: bookingName,
          email: bookingEmail,
          timeZone: selectedTimeZone,
        },
        notes: bookingNotes || undefined,
        guests: guestEmails.length > 0 ? guestEmails : undefined,
      })

      if (result.status === 'success') {
        setBookingStatus('success')
        setBookingResult(result.data)
        setIsBookingModalOpen(false) // Close the modal

        // Filter out the booked slot from slotsData
        if (selectedDate) {
          const dateKey = formatDateInTimeZone(selectedDate, selectedTimeZone)
          setSlotsData(prev => {
            const daySlots = prev[dateKey] || []
            return {
              ...prev,
              [dateKey]: daySlots.filter(s => s.start !== selectedSlot.start)
            }
          })
        }
      } else {
        setBookingStatus('error')
        setError(result.error || 'Failed to complete booking. Please try again.')
      }
    } catch (err: any) {
      setBookingStatus('error')
      setError(err.message || 'An error occurred during booking.')
    }
  }

  // Copy meeting details helper
  const handleCopyDetails = () => {
    if (!selectedDate || !selectedSlot) return
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    const timeStr = formatTimeInTimeZone(selectedSlot.start, selectedTimeZone)
    
    let text = `Meeting Confirmed!\nDate: ${dateStr}\nTime: ${timeStr} (${selectedTimeZone})`
    if (bookingResult?.location) {
      text += `\nMeeting Link: ${bookingResult.location}`
    }
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Selected date details
  const selectedSlots = selectedDate ? getSlotsForDate(selectedDate) : []
  const formattedMonthTitle = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="relative min-h-dvh text-slate-900 dark:text-white flex flex-col pt-4 md:pt-6 pb-16">
      {/* Top Header */}
      <header className="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-8 py-3 flex items-center justify-between">
        <a 
          href="/" 
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs md:text-sm font-bold text-slate-700 dark:text-white/80 transition-all hover:bg-slate-100 dark:hover:bg-white/10 hover:-translate-x-0.5 shadow-sm"
        >
          <FaArrowLeft className="text-indigo-500 dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Portfolio</span>
        </a>

        <div className="flex items-center gap-2">
          <img src={logoUrl} alt="Logo" className="h-6 w-auto opacity-75 dark:brightness-110" />
          <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 relative mx-auto w-full max-w-5xl px-4 md:px-6 py-2 flex flex-col justify-center">
        {/* Floating header */}
        <div className="text-center max-w-2xl mx-auto mb-6 mt-2 md:mt-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Schedule a Session
          </h2>
          <p className="mt-3 text-xs md:text-sm text-slate-500 dark:text-white/60 max-w-md mx-auto">
            Book a direct {eventTypeSlug === '30min' ? '30-minute' : 'consultation'} slot on my calendar. No registration required.
          </p>
        </div>

        {/* Fancier single-layer Glass Frame */}
        <div className="relative rounded-3xl border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden p-3 md:p-6 flex-1 flex flex-col transition-all duration-300">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-20" style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.3), rgba(56,189,248,0.2), rgba(16,185,129,0.2))' }} />

          {bookingStatus === 'success' ? (
            /* Success confirmation card */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 max-w-md mx-auto"
            >
              <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-500 mb-6 dark:bg-emerald-500/20">
                <FaCheckCircle size={56} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Booking Confirmed!</h3>
              <p className="text-sm text-slate-500 dark:text-white/70 mb-8">
                Your session is scheduled and details have been sent to <span className="font-semibold text-slate-800 dark:text-white">{bookingEmail}</span>.
              </p>

              <div className="w-full text-left rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 space-y-4 shadow-inner mb-8">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-indigo-500 dark:text-sky-400 shrink-0" size={16} />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/45">Date</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-white/95">
                      {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock className="text-indigo-500 dark:text-sky-400 shrink-0" size={16} />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/45">Time</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-white/95">
                      {selectedSlot && formatTimeInTimeZone(selectedSlot.start, selectedTimeZone)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaGlobe className="text-indigo-500 dark:text-sky-400 shrink-0" size={16} />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/45">Timezone</div>
                    <div className="text-xs text-slate-600 dark:text-white/80">{selectedTimeZone}</div>
                  </div>
                </div>

                {bookingResult?.location && (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-white/5">
                    <div className="text-xs text-slate-500 dark:text-white/60">
                      Meeting Link: <a href={bookingResult.location} target="_blank" rel="noreferrer" className="text-indigo-500 dark:text-sky-400 hover:underline break-all">{bookingResult.location}</a>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 dark:border-white/5">
                  <button
                    type="button"
                    onClick={handleCopyDetails}
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/80 rounded-xl transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <FaCheck className="text-emerald-500" />
                        <span>Copied Details!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy />
                        <span>Copy Details</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <a 
                  href="/"
                  className="flex-1 text-center font-bold text-xs md:text-sm rounded-xl py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-700 dark:text-white"
                >
                  Return Home
                </a>
                <button 
                  onClick={() => {
                    setBookingStatus('idle')
                    setSelectedSlot(null)
                    setSelectedDate(null)
                    setBookingName('')
                    setBookingEmail('')
                    setBookingNotes('')
                    setBookingGuests([])
                    setShowGuestsInput(false)
                    setCopied(false)
                  }}
                  className="flex-1 font-bold text-xs md:text-sm rounded-xl py-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white shadow-md hover:scale-[1.02] transition-all"
                >
                  Book Another
                </button>
              </div>
            </motion.div>
          ) : (
            /* Scheduling Layout Grid */
            <div className="grid md:grid-cols-[1.2fr,1fr] gap-6 md:gap-8 flex-1 min-h-[500px]">
              
              {/* Calendar Grid Pane */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-extrabold text-lg md:text-xl text-slate-900 dark:text-white">{formattedMonthTitle}</h3>
                  <div className="flex items-center gap-1">
                    <button 
                      disabled={isPrevMonthDisabled}
                      onClick={handlePrevMonth}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/80 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/80 transition-all active:scale-95"
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Days labels */}
                <div className="grid grid-cols-7 text-center mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, index) => (
                    <span key={index} className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase py-1">{d}</span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1.5 flex-1 relative min-h-[280px]">
                  {loading && (
                    <div className="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
                      <FaSpinner className="animate-spin text-indigo-500 dark:text-sky-400" size={32} />
                    </div>
                  )}

                  {getDaysGrid().map((cell, index) => {
                    const available = hasSlots(cell.date) && cell.isCurrentMonth && !isPast(cell.date)
                    const isPicked = selectedDate && 
                      cell.date.getDate() === selectedDate.getDate() &&
                      cell.date.getMonth() === selectedDate.getMonth() &&
                      cell.date.getFullYear() === selectedDate.getFullYear() &&
                      cell.isCurrentMonth
                    
                    const activeToday = isToday(cell.date)

                    return (
                      <button
                        key={index}
                        disabled={!cell.isCurrentMonth || isPast(cell.date)}
                        onClick={() => {
                          if (available) {
                            setSelectedDate(cell.date)
                          }
                        }}
                        className={`
                          relative rounded-xl p-2 md:p-3 aspect-square flex flex-col items-center justify-center text-xs md:text-sm font-semibold transition-all
                          ${!cell.isCurrentMonth ? 'text-slate-300 dark:text-white/10 pointer-events-none' : ''}
                          ${isPast(cell.date) && cell.isCurrentMonth ? 'text-slate-400 dark:text-white/20 cursor-not-allowed bg-slate-100/30 dark:bg-white/[0.01]' : ''}
                          ${cell.isCurrentMonth && !isPast(cell.date) && !available ? 'text-slate-500 dark:text-white/40 bg-slate-50/20 dark:bg-white/[0.02]' : ''}
                          ${available ? 'text-slate-900 dark:text-white hover:bg-indigo-500/10 dark:hover:bg-sky-500/10 cursor-pointer' : ''}
                          ${isPicked ? '!bg-indigo-500 dark:!bg-sky-500 !text-white shadow-glow' : ''}
                          ${activeToday && !isPicked ? 'border border-indigo-500/50 dark:border-sky-400/50' : ''}
                        `}
                      >
                        <span>{cell.day}</span>
                        {/* Glow indicators for available dates */}
                        {available && !isPicked && (
                          <span className="absolute bottom-1.5 md:bottom-2 w-1 h-1 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots Pane */}
              <div className="flex flex-col border-t md:border-t-0 md:border-l border-slate-200/50 dark:border-white/10 pt-6 md:pt-0 md:pl-6">
                
                {/* Timezone picker */}
                <div className="mb-4">
                  <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/50 tracking-wider flex items-center gap-1.5 mb-2">
                    <FaGlobe className="text-indigo-500 dark:text-sky-400" />
                    <span>Timezone</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTimeZone}
                      onChange={(e) => {
                        setSelectedTimeZone(e.target.value)
                        setSelectedDate(null)
                      }}
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/35 py-2.5 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-white/90 backdrop-blur-md appearance-none"
                    >
                      {timezonesList.map(tz => (
                        <option key={tz.value} value={tz.value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                          {tz.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 dark:text-white/40">
                      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Available time slots section */}
                <div className="flex-1 flex flex-col min-h-[220px]">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/50 tracking-wider flex items-center gap-1.5 mb-3 px-1">
                    <FaClock className="text-indigo-500 dark:text-sky-400" />
                    <span>Available Times</span>
                  </h4>

                  {error && (
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-500 p-4 text-xs flex items-start gap-2.5">
                      <FaExclamationCircle className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {!error && !selectedDate && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-white/20 dark:bg-white/[0.01]">
                      <FaCalendarAlt className="text-slate-300 dark:text-white/10 mb-3" size={28} />
                      <p className="text-xs text-slate-400 dark:text-white/40 max-w-[200px]">
                        Please select an available date from the calendar to browse open slots.
                      </p>
                    </div>
                  )}

                  {!error && selectedDate && selectedSlots.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-white/20 dark:bg-white/[0.01]">
                      <FaClock className="text-slate-300 dark:text-white/10 mb-3" size={28} />
                      <p className="text-xs text-slate-400 dark:text-white/40 max-w-[200px]">
                        No available slots left on this day. Try looking at other highlighted dates.
                      </p>
                    </div>
                  )}

                  {!error && selectedDate && selectedSlots.length > 0 && (
                    <div className="flex-1 overflow-y-auto max-h-[340px] pr-1 space-y-2 scrollbar-thin">
                      <div className="text-xs font-extrabold text-slate-500 dark:text-white/60 mb-2 px-1">
                        Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}:
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {selectedSlots.map((slot, index) => {
                          const formattedTime = formatTimeInTimeZone(slot.start, selectedTimeZone)
                          return (
                            <button
                              key={index}
                              disabled={pendingSlotStart === slot.start}
                              onClick={() => {
                                setPendingSlotStart(slot.start)
                                // Small defer so the disabled/spinner state renders first
                                setTimeout(() => {
                                  setSelectedSlot(slot)
                                  setIsBookingModalOpen(true)
                                  setPendingSlotStart(null)
                                }, 80)
                              }}
                              className={`rounded-xl border py-3 px-4 text-xs md:text-sm font-bold text-center transition-all shadow-sm flex items-center justify-center gap-2
                                ${
                                  pendingSlotStart === slot.start
                                    ? 'border-indigo-500/50 dark:border-sky-500/50 bg-indigo-500/10 dark:bg-sky-500/10 text-indigo-500 dark:text-sky-400 cursor-wait opacity-80'
                                    : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-white/90 hover:border-indigo-500 dark:hover:border-sky-400 hover:bg-indigo-500/5 dark:hover:bg-sky-500/5 active:scale-[0.98] cursor-pointer hover:shadow'
                                }
                              `}
                            >
                              {pendingSlotStart === slot.start ? (
                                <>
                                  <FaSpinner className="animate-spin shrink-0" size={12} />
                                  <span>{formattedTime}</span>
                                </>
                              ) : (
                                formattedTime
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* Booking Form Glass Modal */}
      <AnimatePresence>
        {isBookingModalOpen && selectedSlot && selectedDate && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (bookingStatus !== 'loading') setIsBookingModalOpen(false)
              }}
              className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl shadow-2xl p-6 text-slate-900 dark:text-white"
              >
                {/* Header detail */}
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Confirm Booking</h3>
                  <p className="text-xs text-slate-400 dark:text-white/50 mt-1">
                    Fill out the fields below to lock in your session slot.
                  </p>
                </div>

                {/* Date/Time info box */}
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4 mb-6 space-y-2">
                  <div className="flex items-center gap-2.5 text-xs">
                    <FaCalendarAlt className="text-indigo-500 dark:text-sky-400 shrink-0" />
                    <span className="font-bold text-slate-700 dark:text-white/80">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs">
                    <FaClock className="text-indigo-500 dark:text-sky-400 shrink-0" />
                    <span className="font-bold text-slate-700 dark:text-white/80">
                      {formatTimeInTimeZone(selectedSlot.start, selectedTimeZone)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] text-slate-400 dark:text-white/40">
                    <FaGlobe className="shrink-0" />
                    <span>{selectedTimeZone}</span>
                  </div>
                </div>

                {/* Form details */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/50 tracking-wider flex items-center gap-1.5 mb-1.5">
                      <FaUser className="text-indigo-500 dark:text-sky-400" />
                      <span>Full Name</span>
                    </label>
                    <input
                      required
                      disabled={bookingStatus === 'loading'}
                      type="text"
                      placeholder="John Doe"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-transparent py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/50 tracking-wider flex items-center gap-1.5 mb-1.5">
                      <FaEnvelope className="text-indigo-500 dark:text-sky-400" />
                      <span>Email Address</span>
                    </label>
                    <input
                      required
                      disabled={bookingStatus === 'loading'}
                      type="email"
                      placeholder="john.doe@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-transparent py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30"
                    />
                  </div>

                  {!showGuestsInput ? (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setShowGuestsInput(true)
                          setBookingGuests([''])
                        }}
                        className="text-xs font-semibold text-indigo-500 dark:text-sky-400 hover:text-indigo-600 dark:hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <FaUserPlus />
                        <span>Add Guests</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/50 tracking-wider flex items-center gap-1.5">
                          <FaUserPlus className="text-indigo-500 dark:text-sky-400" />
                          <span>Guests</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setShowGuestsInput(false)
                            setBookingGuests([])
                          }}
                          className="text-[10px] text-rose-500 hover:text-rose-600 transition-colors"
                        >
                          Remove All
                        </button>
                      </div>

                      <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                        {bookingGuests.map((guest, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              disabled={bookingStatus === 'loading'}
                              type="email"
                              placeholder="guest@example.com"
                              value={guest}
                              onChange={(e) => {
                                const newGuests = [...bookingGuests]
                                newGuests[idx] = e.target.value
                                setBookingGuests(newGuests)
                              }}
                              className="flex-1 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-transparent py-2.5 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30"
                            />
                            {bookingGuests.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setBookingGuests(bookingGuests.filter((_, i) => i !== idx))
                                }}
                                className="text-rose-500 hover:text-rose-600 p-1.5 text-lg font-bold"
                                title="Remove guest"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setBookingGuests([...bookingGuests, ''])}
                        className="text-[11px] font-bold text-indigo-500 dark:text-sky-400 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        + Add Another Guest
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-white/50 tracking-wider flex items-center gap-1.5 mb-1.5">
                      <FaRegCommentDots className="text-indigo-500 dark:text-sky-400" />
                      <span>Additional Notes</span>
                    </label>
                    <textarea
                      disabled={bookingStatus === 'loading'}
                      rows={2}
                      placeholder="Is there anything specific you would like to cover?"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-transparent py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 resize-none"
                    />
                  </div>

                  {bookingStatus === 'error' && error && (
                    <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 text-rose-500 p-3 text-xs flex items-start gap-2 shadow-sm">
                      <FaExclamationCircle className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      disabled={bookingStatus === 'loading'}
                      onClick={() => setIsBookingModalOpen(false)}
                      className="flex-1 font-bold text-xs md:text-sm border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl py-3 text-slate-700 dark:text-white text-center transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={bookingStatus === 'loading'}
                      className="flex-1 font-bold text-xs md:text-sm bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white rounded-xl py-3 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {bookingStatus === 'loading' ? (
                        <>
                          <FaSpinner className="animate-spin" size={14} />
                          <span>Scheduling...</span>
                        </>
                      ) : (
                        <span>Confirm Slot</span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
