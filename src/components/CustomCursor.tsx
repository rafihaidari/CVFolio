import { useEffect, useState, useRef } from 'react'
import faviconUrl from '../assets/images/favicon.png'

interface Particle {
    id: number
    x: number
    y: number
    char: string
    color: string
    life: number
}

const CODE_CHARS = ['<js>', '<ts>', '<py>', '<html', '<css>', '<react>', '<next>', '<node>', '<db>', '<git>', '{', '}', '</>', '=>', ';', '(', ')', '[]', '&&', '||', '!=']
const COLORS = ['#818cf8', '#38bdf8', '#10b981', '#f472b6', '#fbbf24']

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 })
    const [isHovering, setIsHovering] = useState(false)
    const [particles, setParticles] = useState<Particle[]>([])
    const particleId = useRef(0)
    const lastPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })

            const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y)

            if (dist > 25) {
                spawnParticle(e.clientX, e.clientY)
                lastPos.current = { x: e.clientX, y: e.clientY }
            }

            // Check if hovering interactive elements
            const target = e.target as HTMLElement
            const isInteractive = target.closest('a, button, [role="button"]') !== null
            setIsHovering(isInteractive)
        }

        const spawnParticle = (x: number, y: number) => {
            const id = particleId.current++
            const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)] || ''
            const color = COLORS[Math.floor(Math.random() * COLORS.length)] || '#818cf8'

            const newParticle: Particle = {
                id,
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                char,
                color,
                life: 1
            }

            setParticles(prev => [...prev.slice(-15), newParticle])
        }

        const interval = setInterval(() => {
            setParticles(prev =>
                prev
                    .map(p => ({ ...p, life: p.life - 0.05, y: p.y - 0.5 }))
                    .filter(p => p.life > 0)
            )
        }, 50)

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Particles */}
            {particles.map(p => (
                <span
                    key={p.id}
                    className="absolute text-[10px] font-mono font-bold transition-opacity whitespace-nowrap"
                    style={{
                        left: p.x,
                        top: p.y,
                        color: p.color,
                        opacity: p.life,
                        transform: `scale(${p.life + 0.5}) rotate(${p.life * 360}deg)`,
                    }}
                >
                    {p.char}
                </span>
            ))}

            {/* Main Cursor Center (Favicon) */}
            <div
                className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 mix-blend-normal transition-transform duration-200 ease-out"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
                }}
            >
                <img
                    src={faviconUrl}
                    alt=""
                    className="h-full w-full object-contain dark:brightness-110"
                />
            </div>

            {/* Outer Ring */}
            <div
                className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/30 dark:border-white/30 transition-all duration-300 ease-out"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
                    opacity: isHovering ? 0.5 : 1,
                }}
            />
        </div>
    )
}
