import { memo, useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './countdown.css'

// 22 March 2027, 2:30 pm New Zealand daylight time (UTC+13).
const targetTime = Date.parse('2027-03-22T14:30:00+13:00')

function timeLeft() {
  const secondsLeft = Math.max(0, Math.ceil((targetTime - Date.now()) / 1000))

  return {
    days: Math.floor(secondsLeft / 86_400),
    hours: Math.floor((secondsLeft % 86_400) / 3_600),
    minutes: Math.floor((secondsLeft % 3_600) / 60),
    seconds: secondsLeft % 60,
    complete: secondsLeft === 0,
  }
}

function useCountdown() {
  const [remaining, setRemaining] = useState(timeLeft)

  useEffect(() => {
    let timeout: number | undefined

    function tick() {
      setRemaining(timeLeft())
      if (!document.hidden && Date.now() < targetTime) {
        timeout = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 10)
      }
    }

    function resumeWhenVisible() {
      window.clearTimeout(timeout)
      if (!document.hidden) tick()
    }

    if (!document.hidden) tick()
    document.addEventListener('visibilitychange', resumeWhenVisible)
    return () => {
      window.clearTimeout(timeout)
      document.removeEventListener('visibilitychange', resumeWhenVisible)
    }
  }, [])

  return remaining
}

type FlipFrame = {
  current: string
  previous: string
  flipping: boolean
  sequence: number
}

function DigitHalf({ value, position, className = '' }: { value: string; position: 'upper' | 'lower'; className?: string }) {
  return (
    <div className={`flip-half flip-${position} ${className}`}>
      <span className="flip-digit">
        <span className="flip-digits">
          {Array.from(value, (digit, index) => <span key={index}>{digit}</span>)}
        </span>
      </span>
    </div>
  )
}

const FlipUnit = memo(function FlipUnit({ label, value }: { label: string; value: string }) {
  const [frame, setFrame] = useState<FlipFrame>({ current: value, previous: value, flipping: false, sequence: 0 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setFrame((previous) => previous.current === value
      ? previous
      : { current: value, previous: previous.current, flipping: true, sequence: previous.sequence + 1 })
  }, [value])

  useEffect(() => {
    if (!frame.flipping) return
    const sequence = frame.sequence
    const timeout = window.setTimeout(() => {
      setFrame((previous) => previous.sequence === sequence ? { ...previous, flipping: false } : previous)
    }, 680)
    return () => window.clearTimeout(timeout)
  }, [frame.flipping, frame.sequence])

  const animate = frame.flipping && !reducedMotion

  return (
    <div className="flip-unit" data-unit={label.toLowerCase()} aria-hidden="true">
      <div className="flip-card-frame">
      <div className="flip-card">
        <div className="flip-display">
          <DigitHalf value={frame.current} position="upper" />
          <DigitHalf value={animate ? frame.previous : frame.current} position="lower" />
          {animate && (
            <div key={frame.sequence}>
              <DigitHalf value={frame.previous} position="upper" className="flip-away" />
              <DigitHalf value={frame.current} position="lower" className="flip-arrive" />
            </div>
          )}
        </div>
        <span className="flip-label">{label}</span>
      </div>
      </div>
    </div>
  )
})

export default function Countdown() {
  const remaining = useCountdown()
  const units = [
    { label: 'Days', value: String(remaining.days) },
    { label: 'Hours', value: String(remaining.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(remaining.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(remaining.seconds).padStart(2, '0') },
  ]

  return (
    <section id="countdown" className="countdown-section" aria-labelledby="countdown-title">
      <div className="countdown-content">
        <h2 id="countdown-title" className="countdown-title wedding-title font-bold">Countdown</h2>
        <div className="countdown-grid" role="timer" aria-live="off" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds until 22 March 2027 at 2:30 pm NZDT`}>
          {units.map((unit) => <FlipUnit key={unit.label} {...unit} />)}
        </div>
        {remaining.complete ? <p className="countdown-date">The day is here</p> : <ul className="countdown-details">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M285.64-413.04q-12.34-12.32-12.34-30.53t12.32-30.67q12.32-12.46 30.54-12.46 18.21 0 30.55 12.46 12.33 12.46 12.33 30.67t-12.32 30.53q-12.32 12.32-30.53 12.32t-30.55-12.32Zm163.83 0q-12.34-12.32-12.34-30.53t12.32-30.67q12.32-12.46 30.53-12.46 18.22 0 30.55 12.46 12.34 12.46 12.34 30.67t-12.32 30.53q-12.32 12.32-30.53 12.32-18.22 0-30.55-12.32Zm163.82 0q-12.33-12.32-12.33-30.53t12.32-30.67q12.32-12.46 30.53-12.46t30.55 12.46q12.34 12.46 12.34 30.67t-12.32 30.53q-12.32 12.32-30.54 12.32-18.21 0-30.55-12.32ZM202.87-71.87q-37.78 0-64.39-26.61t-26.61-64.39v-554.26q0-37.78 26.61-64.39t64.39-26.61H240v-37.37q0-17.96 12.46-30.29 12.45-12.34 30.41-12.34t30.29 12.34q12.34 12.33 12.34 30.29v37.37h309v-37.37q0-17.96 12.46-30.29 12.45-12.34 30.41-12.34t30.29 12.34Q720-863.46 720-845.5v37.37h37.13q37.78 0 64.39 26.61t26.61 64.39v554.26q0 37.78-26.61 64.39t-64.39 26.61H202.87Zm0-91h554.26V-560H202.87v397.13Zm0-477.13h554.26v-77.13H202.87V-640Zm0 0v-77.13V-640Z" /></svg>
            <span>22 March 2027</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M523.59-497.91v-137.31q0-18.52-12.58-31.05Q498.43-678.8 480-678.8t-31.01 12.53q-12.58 12.53-12.58 31.05v153.5q0 9.2 3.36 17.55 3.36 8.36 10.08 15.04l128.17 128.17q12.2 12.2 30.39 12.2 18.2 0 30.63-12.2 12.44-12.19 12.44-30.63 0-18.43-12.44-30.87L523.59-497.91ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z" /></svg>
            <span>2:30 pm NZDT</span>
          </li>
        </ul>}
      </div>
    </section>
  )
}
