import { m as motion, useReducedMotion } from 'motion/react'

export const invitationTiming = {
  sealDuration: 0.18,
  flapDelay: 0.18,
  flapDuration: 0.62,
  zoomDelay: 0.8,
  zoomDuration: 1.05,
  curtainDelay: 1.8,
  curtainDuration: 1.5,
  revealDelay: 1.8,
  revealDuration: 1.4,
}

type Props = {
  exiting: boolean
  onContinue: () => void
  onComplete: () => void
}

function InvitationComposition({ opening, reducedMotion }: { opening: boolean; reducedMotion: boolean }) {
  return <span className="invitation-composition" aria-hidden="true">
    <motion.span className="invitation-heading" initial={false}
      animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.2 }}>
      <span className="invitation-kicker">From,</span>
      <span className="invitation-names">Newton <span>&amp;</span> Annie</span>
    </motion.span>
    <motion.span className="invitation-scene" initial={false}
      style={{ willChange: opening && !reducedMotion ? 'transform, opacity' : undefined }}
      animate={{
        transform: opening && !reducedMotion ? 'translate3d(0, -32px, 0) scale(7)' : 'translate3d(0, 0, 0) scale(1)',
        opacity: opening ? 0 : 1,
      }}
      transition={{
        transform: { delay: opening && !reducedMotion ? invitationTiming.zoomDelay : 0, duration: reducedMotion ? 0 : invitationTiming.zoomDuration, ease: [0.4, 0, 0.7, 0.3] },
        opacity: { delay: opening && !reducedMotion ? invitationTiming.zoomDelay + 0.45 : 0, duration: reducedMotion ? 0.2 : 0.6, ease: 'easeInOut' },
      }}>
      <span className="invitation-envelope-back" />
      <svg className="invitation-envelope-front" viewBox="0 0 500 312" fill="none">
        <path d="M0 0 250 178 500 0V312H0Z" fill="var(--invitation-paper)" />
        <path d="M0 312 184 130M316 130 500 312" stroke="var(--palette-sand)" />
        <path d="M.5 1V311.5H499.5V1" stroke="var(--palette-sand)" strokeOpacity=".65" />
      </svg>
      <span className="invitation-envelope-flap">
        <motion.svg className="invitation-flap-paper" viewBox="0 0 500 180" fill="none"
          initial={false}
          animate={{ transform: opening && !reducedMotion ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
          transition={{ delay: opening && !reducedMotion ? invitationTiming.flapDelay : 0, duration: reducedMotion ? 0 : invitationTiming.flapDuration, ease: 'easeInOut' }}>
          <path d="M0 0H500L259 174Q250 181 241 174Z" fill="var(--invitation-paper)" />
          <path d="M0 0 241 174Q250 181 259 174L500 0" stroke="var(--palette-sand)" />
        </motion.svg>
      </span>
      <motion.span className="invitation-seal" initial={false}
        animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : invitationTiming.sealDuration }}>
        <img src="/images/wedding-logo.png" alt="" width="512" height="512" />
      </motion.span>
    </motion.span>
    <motion.span className="invitation-prompt" initial={false}
      animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.2 }}>
      <span className="invitation-prompt-title">Click anywhere to continue</span>
    </motion.span>
  </span>
}

export default function EnvelopeIntro({ exiting, onContinue, onComplete }: Props) {
  const reduceMotion = useReducedMotion()

  return <motion.button
    type="button"
    className={`envelope-intro${exiting ? ' is-opening' : ''}`}
    aria-label={exiting ? 'Opening Newton and Annie’s wedding website' : 'Open Newton and Annie’s wedding invitation'}
    aria-disabled={exiting}
    aria-busy={exiting}
    data-lenis-prevent
    onClick={() => { if (!exiting) onContinue() }}
    onKeyDown={(event) => { if (event.repeat && (event.key === 'Enter' || event.key === ' ')) event.preventDefault() }}
  >
    {(['left', 'right'] as const).map(side => <motion.span
      key={side}
      className={`invitation-curtain invitation-curtain-${side}`}
      aria-hidden="true"
      initial={false}
      animate={{
        transform: exiting && !reduceMotion ? `translate3d(${side === 'left' ? '-104%' : '104%'}, 0, 0)` : 'translate3d(0, 0, 0)',
        opacity: exiting && reduceMotion ? 0 : 1,
      }}
      transition={{
        delay: exiting && !reduceMotion ? invitationTiming.curtainDelay : 0,
        duration: reduceMotion ? 0.22 : invitationTiming.curtainDuration,
        ease: 'easeOut',
      }}
      onAnimationComplete={() => { if (exiting && side === 'right') onComplete() }}
    />)}
    <InvitationComposition opening={exiting} reducedMotion={!!reduceMotion} />
  </motion.button>
}
