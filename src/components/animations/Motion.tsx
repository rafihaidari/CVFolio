import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionProps {
    children: ReactNode
    className?: string
    delay?: number
}

export const FadeIn = ({ children, className, delay = 0 }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
)

export const StaggerContainer = ({ children, className, delay = 0 }: MotionProps) => (
    <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: delay,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.div>
)

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4 }}
        className={className}
    >
        {children}
    </motion.div>
)

export const RevealMask = ({ children, className, delay = 0 }: MotionProps) => (
    <div className={`relative overflow-hidden ${className}`}>
        <motion.div
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    </div>
)
