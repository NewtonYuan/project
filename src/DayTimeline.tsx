import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { schedule } from './weddingContent'
import './day-timeline.css'

export default function DayTimeline() {
  const timeline = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start center', 'end center'] })
  const markerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setActive(Math.min(schedule.length - 1, Math.floor(progress * schedule.length)))
  })

  return <div ref={timeline} className="day-timeline">
    <motion.span className="day-timeline-marker" aria-hidden="true" style={{ top: markerTop }} />
    <ol className="day-timeline-list">
    {schedule.map((event, index) => <li key={event.title} className={`day-timeline-item${active === index ? ' is-active' : ''}`}>
      <p className="day-timeline-time font-title">{event.time}</p>
      <motion.div className="day-timeline-event"
        initial={reducedMotion ? false : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <h3 className="font-title">{event.title}</h3>
      </motion.div>
    </li>)}
    </ol>
  </div>
}
