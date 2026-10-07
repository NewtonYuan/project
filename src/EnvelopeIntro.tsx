import { motion, useReducedMotion } from 'motion/react'

type Props = {
  opening: boolean
  onOpen: () => void
  onComplete: () => void
}

export default function EnvelopeIntro({ opening, onOpen, onComplete }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      className={`envelope-intro${opening ? ' is-opening' : ''}`}
      aria-label="Open Annie and Newton’s wedding invitation"
      aria-disabled={opening}
      data-lenis-prevent
      onClick={() => { if (!opening) onOpen() }}
      initial={false}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ delay: opening && !reduceMotion ? 1.65 : 0, duration: reduceMotion ? 0.2 : 0.65 }}
      onAnimationComplete={() => { if (opening) onComplete() }}
    >
      <span className="invitation-composition" aria-hidden="true">
        <motion.span className="invitation-heading" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.18 }}>
          <span className="invitation-kicker">Sealed with love from,</span>
          <span className="invitation-names">Annie &<br />Newton</span>
        </motion.span>
        <span className="envelope">
          <span className="envelope-back" />
          <motion.span
            className="envelope-letter"
            animate={{ y: opening && !reduceMotion ? '-68%' : '0%' }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="envelope-letter-kicker">You are invited</span>
            <span className="envelope-letter-names">Annie & Newton</span>
            <span className="envelope-letter-date">22 MARCH 2027</span>
          </motion.span>
          <svg className="envelope-front" viewBox="0 0 400 267" fill="none">
            <defs>
              <filter id="envelope-paper">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer><feFuncA type="linear" slope="0.13" /></feComponentTransfer>
                <feBlend in="SourceGraphic" mode="multiply" />
              </filter>
              <linearGradient id="envelope-blush" x1="0" y1="0" x2="400" y2="267" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--palette-blush)" /><stop offset="1" stopColor="color-mix(in srgb, var(--palette-blush) 88%, var(--palette-sand))" />
              </linearGradient>
            </defs>
            <path d="M0 0 200 156 400 0V267H0Z" fill="url(#envelope-blush)" filter="url(#envelope-paper)" />
            <path d="M0 267 146 114M254 114 400 267" stroke="var(--site-text)" strokeOpacity=".15" />
            <path d="M0 266H400" stroke="var(--site-text)" strokeOpacity=".1" />
          </svg>
          <span className="envelope-flap">
            <svg viewBox="0 0 400 158" fill="none">
              <path d="M0 0H400Q398 20 385 34L211 149Q200 158 189 149L15 34Q2 20 0 0Z" fill="url(#envelope-blush)" filter="url(#envelope-paper)" />
              <path d="M0 0Q2 20 15 34L189 149Q200 158 211 149L385 34Q398 20 400 0" stroke="var(--site-text)" strokeOpacity=".2" strokeWidth="1.5" />
            </svg>
          </span>
          <motion.span
            className="envelope-seal"
            animate={{ opacity: opening ? 0 : 1, scale: opening && !reduceMotion ? 0.85 : 1 }}
            transition={{ duration: 0.18 }}
          ><span>AN</span></motion.span>
        </span>
        <motion.span className="invitation-hint" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.18 }}>Click anywhere to open</motion.span>
      </span>
    </motion.button>
  )
}
