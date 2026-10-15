import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export const invitationTiming = {
  fadeDuration: 0.6,
  revealDelay: 0.1,
  revealDuration: 1.1,
}

type Props = {
  exiting: boolean
  onContinue: () => void
  onComplete: () => void
}

function LetterContent() {
  return <span className="invitation-letter-content">
    <img className="invitation-letter-logo" src="/images/wedding-logo.png" alt="" width="512" height="512" />
    <span className="invitation-letter-kicker">You are invited to</span>
    <span className="invitation-letter-names">Our Wedding</span>
    <span className="invitation-letter-date">22 March 2027</span>
    <span className="invitation-letter-place">Markovina Vineyard Estate</span>
  </span>
}

export default function EnvelopeIntro({ exiting, onContinue, onComplete }: Props) {
  const reduceMotion = useReducedMotion()
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [letterReady, setLetterReady] = useState(false)
  const ready = envelopeOpened && (letterReady || reduceMotion)
  const busy = exiting || (envelopeOpened && !ready)

  function handleClick() {
    if (busy) return
    if (!envelopeOpened) setEnvelopeOpened(true)
    else if (ready) onContinue()
  }

  return (
    <motion.button
      type="button"
      className={`envelope-intro${envelopeOpened ? ' is-opening' : ''}${ready ? ' is-letter-ready' : ''}`}
      aria-label={ready ? 'Continue to Newton and Annie’s wedding website' : 'Open Newton and Annie’s wedding invitation'}
      aria-disabled={busy}
      aria-busy={busy}
      data-lenis-prevent
      onClick={handleClick}
      onKeyDown={(event) => { if (event.repeat && (event.key === 'Enter' || event.key === ' ')) event.preventDefault() }}
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.2 : invitationTiming.fadeDuration }}
      onAnimationComplete={() => { if (exiting) onComplete() }}
    >
      <span className="invitation-composition" aria-hidden="true">
        <span className="invitation-heading">
          <span className="invitation-kicker">From,</span>
          <span className="invitation-names">Newton <span>&amp;</span> Annie</span>
        </span>

        <span className="invitation-scene">
          <span className="invitation-envelope-back" />

          <span className="invitation-letter" onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && event.animationName === 'invitation-letter-rise') setLetterReady(true)
          }}>
            <LetterContent />
          </span>

          <svg className="invitation-envelope-front" viewBox="0 0 500 312" fill="none">
            <path d="M0 0 250 178 500 0V312H0Z" fill="var(--invitation-paper)" />
            <path d="M0 312 184 130M316 130 500 312" stroke="var(--palette-sand)" strokeWidth="1" />
            <path d="M.5 1V311.5H499.5V1" stroke="var(--palette-sand)" strokeOpacity=".65" />
          </svg>

          <span className="invitation-envelope-flap">
            <svg className="invitation-flap-paper" viewBox="0 0 500 180" fill="none">
              <path d="M0 0H500L259 174Q250 181 241 174Z" fill="var(--invitation-paper)" />
              <path d="M0 0 241 174Q250 181 259 174L500 0" stroke="var(--palette-sand)" strokeWidth="1" />
            </svg>
          </span>

          <span className="invitation-seal">
            <img src="/images/wedding-logo.png" alt="" width="512" height="512" />
          </span>
        </span>

        <span className="invitation-prompt">
          <span className="invitation-prompt-title">Click anywhere to continue</span>
        </span>
      </span>
      {ready && <motion.span
        className="invitation-reading-view"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
      >
        <span className="invitation-reading-card"><LetterContent /></span>
        <span className="invitation-reading-prompt invitation-prompt-title">Click anywhere to continue</span>
      </motion.span>}
    </motion.button>
  )
}
