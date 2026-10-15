import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m as motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from 'motion/react'
import Countdown from './Countdown'
import Rsvp from './Rsvp'
import EnvelopeIntro, { invitationTiming } from './EnvelopeIntro'
import { navigation, questions } from './weddingContent'
import DayTimeline from './DayTimeline'
import { AboutUs, OurTeam, DressCode } from './InformationSections'
import BackgroundMusic, { type BackgroundMusicHandle } from './BackgroundMusic'
import { responsiveImage } from './responsiveImage'

// Add the remaining details once they are confirmed.
const wedding = {
  names: 'Newton Yuan & Annie Zheng',
  shortNames: 'Newton & Annie',
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

function SendIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="size-6 shrink-0" aria-hidden="true"><path d="M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

export default function App() {
  const [websiteRevealing, setWebsiteRevealing] = useState(false)
  const [invitationOpened, setInvitationOpened] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const musicRef = useRef<BackgroundMusicHandle>(null)
  const faqListRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
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
    const root = document.documentElement
    const previousOverflowY = root.style.overflowY
    root.style.overflowY = 'hidden'
    return () => { root.style.overflowY = previousOverflowY }
  }, [invitationOpened])

  useEffect(() => {
    if (!invitationOpened || !faqListRef.current) return
    const list = faqListRef.current

    // Reserve room for the longest answer so vertical centering stays stable.
    function measureAnswers() {
      const rows = Array.from(list.children)
      const collapsedHeight = rows.reduce((height, row) => {
        const button = row.querySelector('button')
        return height + (button?.getBoundingClientRect().height ?? 0) + parseFloat(getComputedStyle(row).borderBottomWidth)
      }, parseFloat(getComputedStyle(list).borderTopWidth))
      const answerHeight = Math.max(0, ...Array.from(list.querySelectorAll('.faq-answer-content'), (answer) => answer.getBoundingClientRect().height))
      list.style.setProperty('--faq-list-height', `${Math.ceil(collapsedHeight + answerHeight)}px`)
    }

    const observer = new ResizeObserver(measureAnswers)
    list.querySelectorAll('.faq-question, .faq-answer-content').forEach((element) => observer.observe(element))
    measureAnswers()
    return () => observer.disconnect()
  }, [invitationOpened])

  useEffect(() => {
    if (!invitationOpened || !mainRef.current) return

    const main = mainRef.current
    const header = document.querySelector('header')
    const targets = navigation.map(({ href }) => ({ href, section: document.querySelector(href) }))
    let frame = 0

    function updateActiveSection() {
      frame = 0
      const headerHeight = header?.getBoundingClientRect().height ?? 0
      const readingLine = headerHeight + (window.innerHeight - headerHeight) * 0.2
      let current = ''

      for (const { href, section } of targets) {
        if (section && section.getBoundingClientRect().top <= readingLine) current = href
      }

      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = navigation[navigation.length - 1].href
      }
      setActiveSection(current)
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }

    const observer = new ResizeObserver(scheduleUpdate)
    observer.observe(main)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    updateActiveSection()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.cancelAnimationFrame(frame)
    }
  }, [invitationOpened])

  return (
    <>
    <BackgroundMusic ref={musicRef} visible={websiteRevealing} />
    {!invitationOpened && <EnvelopeIntro exiting={websiteRevealing} onContinue={() => {
      musicRef.current?.start()
      setWebsiteRevealing(true)
    }} onComplete={() => setInvitationOpened(true)} />}
    <div
      className="min-h-svh overflow-x-clip bg-cream text-ink"
      inert={!invitationOpened}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>

      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-6 px-6 py-3 sm:min-h-[88px] md:px-10 lg:px-14">
          <a href="#top" onClick={() => setMenuOpen(false)} aria-label="Newton & Annie — home" className="inline-flex shrink-0 items-center gap-3">
            <img src="/images/wedding-logo.png" alt="" width="512" height="512" className="size-14 object-contain sm:size-16" />
            <span className="brand-name hidden sm:inline">{wedding.shortNames}</span>
          </a>
          <nav aria-label="Primary navigation" className="ml-auto hidden items-center gap-5 xl:flex">
            {navigation.map((item) => <a key={item.href} href={item.href} aria-current={activeSection === item.href ? 'location' : undefined} className="nav-link small-copy">{item.label}</a>)}
          </nav>
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
          {navigation.map((item) => <a key={item.href} href={item.href} aria-current={activeSection === item.href ? 'location' : undefined} onClick={() => setMenuOpen(false)} className="nav-link small-copy block border-b border-ink/10 py-3 last:border-0">{item.label}</a>)}
          </div>
        </motion.nav>}
        </AnimatePresence>
      </header>

      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <motion.section id="top" style={{ '--hero-progress': reduceMotion ? 0 : heroProgress } as MotionStyle} className="hero-section">
          <motion.div className="hero-layout relative mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-14"
            initial={false}
            animate={{ opacity: websiteRevealing ? 1 : 0, transform: websiteRevealing || reduceMotion ? 'translate3d(0, 0, 0)' : 'translate3d(0, 32px, 0)' }}
            transition={{ delay: reduceMotion ? 0 : invitationTiming.revealDelay, duration: reduceMotion ? 0.2 : invitationTiming.revealDuration, ease: [0.22, 1, 0.36, 1] }}>
          <Reveal className="hero-copy relative z-10 max-w-2xl">
            <p className="hero-invitation body-copy">You are invited to</p>
            <h1 className="wedding-title font-title font-medium">Our <span className="block font-bold">Wedding</span></h1>
            <p className="hero-names card-title mt-8">{wedding.shortNames}</p>
            <div className="hero-photo mx-auto mt-6 w-full md:hidden">
              <img src="/images/couple-hero-1200.webp" srcSet="/images/couple-hero-720.webp 720w, /images/couple-hero-1200.webp 1200w" sizes="(min-width: 768px) 440px, 85vw" alt="Newton and Annie in their wedding outfits, holding a bouquet together" width="1200" height="1800" decoding="async" fetchPriority="high" className="block h-full w-full object-cover object-center" />
            </div>
            <ul className="hero-details body-copy mt-7 flex flex-col gap-3 text-ink">
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hero-detail-icon" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
                <span>{wedding.date}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hero-detail-icon" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <span>{wedding.location}</span>
              </li>
            </ul>
            <div className="hero-actions mt-10 flex flex-wrap gap-3">
              <a href="#rsvp" className="rsvp-button inline-flex gap-3"><SendIcon /><span>RSVP</span></a>
            </div>
          </Reveal>
          <div className="hero-photo mx-auto hidden w-full md:block lg:ml-auto">
            <img src="/images/couple-hero-1200.webp" srcSet="/images/couple-hero-720.webp 720w, /images/couple-hero-1200.webp 1200w" sizes="(min-width: 768px) 440px, 85vw" alt="Newton and Annie in their wedding outfits, holding a bouquet together" width="1200" height="1800" decoding="async" fetchPriority="high" className="block h-full w-full object-cover object-center" />
          </div>
          </motion.div>
        </motion.section>

        <Countdown />

        <AboutUs />
        <OurTeam />

        <section id="the-day" className="scroll-mt-8 px-6 py-24 md:px-10 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="wedding-title text-center font-title font-bold">The day <span className="font-medium">itself</span></h2>
            </Reveal>
            <div className="day-details-grid mt-14 grid items-start gap-16 lg:grid-cols-2">
              <DayTimeline />
              <DressCode />
            </div>
          </div>
        </section>

        <section id="venue" className="scroll-mt-8 bg-blush px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="wedding-title text-center font-title font-bold">A place to <span className="font-medium">remember</span></h2>
            </Reveal>
            <div className="mt-16 grid items-center gap-10 md:mt-20 md:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
            <div className="venue-photo w-full overflow-hidden border border-ink/20 bg-cream">
              <img
                {...responsiveImage('/images/markovina-venue.png', '(min-width: 1280px) 600px, (min-width: 768px) 46vw, 90vw')}
                alt="Markovina Vineyard Estate garden and buildings beside a flowering tree"
                width="2880"
                height="1350"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <Reveal>
              <h3 className="content-title">{wedding.venue}</h3>
              <address className="body-copy mt-3 not-italic">{wedding.address}<br />New Zealand</address>
              <p className="body-copy mt-5">Pan and zoom the <a href="#location" className="underline underline-offset-4">map</a> to explore the area and plan your journey.</p>
              <a href={wedding.mapLink} target="_blank" rel="noopener noreferrer" className="body-copy mt-7 inline-flex items-center gap-3 border-b border-ink pb-1 hover:underline">Open in Google Maps <ArrowIcon /></a>
            </Reveal>
            <Reveal>
              <div id="travel" className="scroll-mt-28">
                <h3 className="content-title">Transport &amp; Parking</h3>
                <div className="body-copy mt-5 space-y-5">
                <p>We recommend driving yourself. Markovina has a large on-site car park with space for up to 100 cars, with additional parking along Old Railway Road just outside the venue.</p>
                <p>If you plan on drinking, we strongly advise taking an Uber or carpooling with a responsible driver. Please arrange your own transport to and from the venue.</p>
                <p>Alternatively, you're welcome to leave your car at the venue overnight and collect it the following morning by 11:00am.</p>
                </div>
              </div>
            </Reveal>
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
          </div>
        </section>


        <section id="questions" className="scroll-mt-8 bg-cream px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
            <Reveal>
              <h2 className="wedding-title text-center font-title font-medium md:text-left">A few <span className="block font-bold md:inline">questions</span></h2>
            </Reveal>
            <div ref={faqListRef} className="faq-list border-t border-ink/20">
              {questions.map(({ question, answer, link, emphasis }, index) => {
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
                      className="faq-question flex w-full cursor-pointer items-center justify-between gap-6 text-left"
                    >
                      {question}
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} className="shrink-0 text-2xl" aria-hidden="true">+</motion.span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={`faq-answer${isOpen ? ' is-open' : ''}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                    <div className="faq-answer-content body-copy max-w-xl space-y-4 pb-7 pr-8 pt-1 text-ink">
                      {answer.map((paragraph) => {
                        const emphasisIndex = emphasis ? paragraph.indexOf(emphasis.text) : -1
                        return <p key={paragraph}>{emphasis && emphasisIndex >= 0 ? <>
                          {paragraph.slice(0, emphasisIndex)}
                          <strong className={emphasis.underline ? 'underline underline-offset-4' : undefined}>{emphasis.text}</strong>
                          {paragraph.slice(emphasisIndex + emphasis.text.length)}
                        </> : paragraph}</p>
                      })}
                      {link && <a href={link.href} className="inline-block underline underline-offset-4">{link.label}</a>}
                    </div>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </section>

        <Rsvp>
          <footer className="wedding-footer small-copy shrink-0 text-center text-ink">
            <p className="brand-name flex items-center justify-center gap-3">
              <img src="/images/wedding-logo.png" alt="" width="512" height="512" className="size-[1em] shrink-0 object-contain" />
              <span>{wedding.names}</span>
            </p>
            <p className="mt-2">{wedding.date} · {wedding.location}</p>
          </footer>
        </Rsvp>
      </main>
    </div>
    </>
  )
}
