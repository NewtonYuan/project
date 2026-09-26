import { useEffect, useState } from 'react'
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
    let timeout: number

    function tick() {
      setRemaining(timeLeft())
      if (Date.now() < targetTime) {
        timeout = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 10)
      }
    }

    tick()
    return () => window.clearTimeout(timeout)
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

function FlipUnit({ label, value }: { label: string; value: string }) {
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
      </div>
      <span className="flip-label">{label}</span>
    </div>
  )
}

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
        <h2 id="countdown-title" className="countdown-title">Countdown</h2>
        <div className="countdown-grid" role="timer" aria-live="off" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds until 22 March 2027 at 2:30 pm NZDT`}>
          {units.map((unit) => <FlipUnit key={unit.label} {...unit} />)}
        </div>
        <p className="countdown-date">{remaining.complete ? 'The day is here' : '22 March 2027 · 2:30 pm NZDT'}</p>
      </div>
    </section>
  )
}
