import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from 'motion/react'
import Countdown from './Countdown'
import Rsvp from './Rsvp'
import EnvelopeIntro from './EnvelopeIntro'
import { navigation, questions } from './weddingContent'
import DayTimeline from './DayTimeline'
import { AboutUs, OurTeam, DressCode, FoodAndBeverage } from './InformationSections'

// Add the remaining details once they are confirmed.
const wedding = {
  names: 'Annie Zheng & Newton Yuan',
  shortNames: 'Annie & Newton',
  date: '22 March 2027',
  venue: 'Markovina Vineyard Estate',
  address: '84 Old Railway Road, Kumeū, Auckland 0892',
  location: 'Kumeū, Auckland',
  mapLink: 'https://share.google/QKBnTvsm91UBQ8idZ',
  directionsLink: 'https://www.google.com/maps/dir/?api=1&destination=Markovina+Vineyard+Estate%2C+84+Old+Railway+Road%2C+Kumeu%2C+Auckland',
  mapEmbed: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sMarkovina+Vineyard+Estate,+84+Old+Railway+Road,+Kumeu,+Auckland',
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M7 5h12v12" /></svg>
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

export default function App() {
  const [invitationOpening, setInvitationOpening] = useState(false)
  const [invitationOpened, setInvitationOpened] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const heroProgress = useTransform(scrollY, (scroll) => {
    const shrinkRatio = window.innerWidth <= 1024 ? 0.26 : 0.34
    return Math.min(Math.max(scroll, 0) / (window.innerHeight * (1 - shrinkRatio)), 1)
  })

  useEffect(() => {
    if (invitationOpened) {
      mainRef.current?.focus({ preventScroll: true })
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [invitationOpened])

  return (
    <>
    {!invitationOpened && <EnvelopeIntro opening={invitationOpening} onOpen={() => setInvitationOpening(true)} onComplete={() => setInvitationOpened(true)} />}
    {invitationOpening && <motion.div
      className="min-h-svh overflow-x-clip bg-cream text-ink"
      inert={!invitationOpened}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 2.3, duration: reduceMotion ? 0.2 : 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>

      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-6 px-6 py-3 sm:min-h-[88px] md:px-10 lg:px-14">
          <a href="#top" onClick={() => setMenuOpen(false)} className="font-title text-3xl font-bold tracking-[-0.04em]">{wedding.shortNames}</a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
            {navigation.map((item) => <a key={item.href} href={item.href} onClick={item.href === '#rsvp' ? () => setRsvpOpen(true) : undefined} className="text-base transition-colors hover:underline">{item.label}</a>)}
          </nav>
          <a href="#rsvp" onClick={() => setRsvpOpen(true)} className="rsvp-button hidden sm:inline-flex"><span>RSVP</span></a>
          <button type="button" className={`mobile-menu-toggle shrink-0 xl:hidden${menuOpen ? ' is-open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
        <AnimatePresence initial={false}>
        {menuOpen && <motion.nav id="mobile-navigation" aria-label="Mobile navigation"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-full overflow-hidden border-y border-ink/10 bg-cream shadow-lg xl:hidden">
          <div className="max-h-[calc(100svh-var(--navbar-height))] overflow-y-auto px-6 py-4">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => { setMenuOpen(false); if (item.href === '#rsvp') setRsvpOpen(true) }} className="block border-b border-ink/10 py-3 text-lg last:border-0">{item.label}</a>)}
          </div>
        </motion.nav>}
        </AnimatePresence>
      </header>

      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <motion.section id="top" style={{ '--hero-progress': reduceMotion ? 0 : heroProgress } as MotionStyle} className="hero-section">
          <div className="hero-layout relative mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-14">
          <Reveal className="hero-copy relative z-10 max-w-2xl">
            <p className="hero-invitation font-sans font-normal">You are invited to</p>
            <h1 className="font-title text-[clamp(4.8rem,9vw,9rem)] font-medium leading-[0.82] tracking-[-0.07em]">Our <span className="block font-bold">Wedding</span></h1>
            <p className="mt-8 font-title text-3xl font-bold md:text-4xl">{wedding.shortNames}</p>
            <div className="hero-photo mx-auto mt-6 w-full md:hidden">
              <img src="/images/couple-hero.jpg" alt="Annie and Newton in their wedding outfits, holding a bouquet together" width="4672" height="7008" fetchPriority="high" className="block h-full w-full object-cover object-center" />
            </div>
            <ul className="hero-details mt-7 flex flex-col gap-3 text-lg text-ink">
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hero-detail-icon" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
                <span>{wedding.date}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hero-detail-icon" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <span>{wedding.location}</span>
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#rsvp" onClick={() => setRsvpOpen(true)} className="rsvp-button inline-flex"><span>RSVP</span></a>
            </div>
          </Reveal>
          <div className="hero-photo mx-auto hidden w-full md:block lg:ml-auto">
            <img src="/images/couple-hero.jpg" alt="Annie and Newton in their wedding outfits, holding a bouquet together" width="4672" height="7008" fetchPriority="high" className="block h-full w-full object-cover object-center" />
          </div>
          </div>
        </motion.section>

        <Countdown />

        <AboutUs />
        <OurTeam />

        <section id="the-day" className="scroll-mt-8 px-6 py-24 md:px-10 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-3xl">
              <h2 className="font-title text-6xl font-bold leading-[0.9] tracking-[-0.05em] md:text-8xl">The day <span className="font-medium">itself</span></h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-ink">From the first hello to the last dance.</p>
            </Reveal>
            <DayTimeline />
            <div className="mt-12 text-center">
              <a href="#rsvp" onClick={() => setRsvpOpen(true)} className="rsvp-button inline-flex"><span>Let us know if you can come</span></a>
            </div>
          </div>
        </section>

        <DressCode />

        <section id="venue" className="scroll-mt-8 bg-blush px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            <div className="grid gap-5">
            <div className="venue-photo w-full overflow-hidden border border-ink/20 bg-cream">
              <img
                src="/images/markovina-venue.png"
                alt="Markovina Vineyard Estate garden and buildings beside a flowering tree"
                width="2880"
                height="1350"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div id="location" className="scroll-mt-28">
              <iframe
                title="Interactive map of Markovina Vineyard Estate in Kumeū"
                src={wedding.mapEmbed}
                className="venue-map block w-full border border-ink/20 bg-cream"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            </div>
            <Reveal>
              <h2 className="font-title text-6xl font-bold leading-[0.92] tracking-[-0.05em] md:text-8xl">A place to <span className="font-medium">remember</span></h2>
              <h3 className="mt-8 font-sans text-3xl font-normal">{wedding.venue}</h3>
              <address className="mt-3 text-lg leading-8 not-italic">{wedding.address}<br />New Zealand</address>
              <p className="mt-5 text-lg leading-8">Pan and zoom the <a href="#location" className="underline underline-offset-4">map</a> to explore the area and plan your journey.</p>
              <a href={wedding.mapLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 border-b border-ink pb-1 text-lg hover:underline">Open in Google Maps <ArrowIcon /></a>
            </Reveal>
          </div>
        </section>

        <section id="travel" className="scroll-mt-8 px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="font-title text-6xl font-bold leading-[0.92] tracking-[-0.05em] md:text-8xl">Getting <span className="font-medium">there</span></h2>
              <p className="mt-7 text-lg leading-8 text-ink">Plan your journey to Markovina Vineyard Estate.</p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
              {[
                { title: 'Directions', body: 'Markovina Vineyard Estate is at 84 Old Railway Road in Kumeū. Open the map for a route from your location.' },
                { title: 'Transport & parking', body: 'We recommend driving yourself. Markovina has a large on-site car park with space for up to 100 cars, with additional parking along Old Railway Road just outside the venue.' },
              ].map((item) => <Reveal key={item.title} className="border border-ink/20 p-7 md:p-9">
                <h3 className="font-sans text-3xl font-normal">{item.title}</h3>
                <p className="mt-4 text-lg leading-8 text-ink">{item.body}</p>
                {item.title === 'Transport & parking' && <>
                  <p className="mt-4 text-lg leading-8">There is a speed camera along the journey — please drive within the speed limit.</p>
                  <p className="mt-4 text-lg leading-8">If you plan on drinking, we strongly advise taking an Uber or carpooling with a responsible driver. Please arrange your own transport to and from the venue.</p>
                </>}
                {item.title === 'Directions' && <a href={wedding.directionsLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-lg underline underline-offset-4">Get directions <ArrowIcon /></a>}
              </Reveal>)}
            </div>
          </div>
        </section>

        <FoodAndBeverage onRsvp={() => setRsvpOpen(true)} />

        <section id="questions" className="scroll-mt-8 px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
            <Reveal>
              <h2 className="font-title text-6xl font-bold leading-[0.92] tracking-[-0.05em] md:text-8xl">A few <span className="font-medium">questions</span></h2>
              <p className="mt-7 max-w-sm text-lg leading-8 text-ink">A few things to know before celebrating with us.</p>
            </Reveal>
            <div className="border-t border-ink/20">
              {questions.map(({ question, answer, link }, index) => {
                const isOpen = openQuestion === index
                const panelId = `faq-answer-${index}`
                const buttonId = `faq-question-${index}`

                return <div key={question} className="border-b border-ink/20">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenQuestion(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-sans text-2xl font-normal md:text-3xl"
                    >
                      {question}
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} className="shrink-0 text-2xl" aria-hidden="true">+</motion.span>
                    </button>
                  </h3>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.38, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-xl space-y-4 pb-7 pr-8 pt-1 text-lg leading-8 text-ink">
                      {answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      {link && <a href={link.href} onClick={link.href === '#rsvp' ? () => setRsvpOpen(true) : undefined} className="inline-block underline underline-offset-4">{link.label}</a>}
                    </div>
                  </motion.div>
                </div>
              })}
            </div>
          </div>
        </section>

        <Rsvp open={rsvpOpen} onToggle={() => setRsvpOpen((open) => !open)}>
          <footer className="shrink-0 pt-12 text-center text-base text-ink">
            <p className="font-title text-2xl font-bold tracking-normal">{wedding.names}</p>
            <p className="mt-2">{wedding.date} · {wedding.location}</p>
          </footer>
        </Rsvp>
      </main>
    </motion.div>}
    </>
  )
}
