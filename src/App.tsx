import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Countdown from './Countdown'
import Rsvp from './Rsvp'

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

const navigation = [
  { label: 'The day', href: '#the-day' },
  { label: 'Venue', href: '#venue' },
  { label: 'Travel', href: '#travel' },
  { label: 'Questions', href: '#questions' },
  { label: 'RSVP', href: '#rsvp' },
]

const schedule = [
  { title: 'Arrival', detail: 'Arrival time and welcome details will be added here.' },
  { title: 'Ceremony', detail: 'The ceremony time and location will appear here once confirmed.' },
  { title: 'Celebration', detail: 'Reception, dinner, and dancing details will follow.' },
]

const questions = [
  { question: 'When should I arrive?', answer: [
    'We’ll share a recommended arrival time once the day’s schedule is final. Please check your invitation for the confirmed ceremony time before making travel plans.',
    'The venue is in Kumeū, so allow time for your journey and for finding your way around when you arrive.',
  ] },
  { question: 'What should I wear?', answer: [
    'The dress code will be shared with your invitation. We’ll also add any practical notes about footwear or outdoor spaces here as the details are confirmed.',
    'If you are planning your outfit early, please check back before the day for the final guidance.',
  ] },
  { question: 'Can I bring a guest or children?', answer: [
    'Your invitation will list everyone included in your party. Please use those names when making your plans.',
    'If anything on your invitation is unclear, get in touch with us before arranging for an additional guest or children to attend.',
  ] },
  { question: 'Where should I stay?', answer: [
    'Nearby accommodation suggestions and any room block details will be added to the travel section if arrangements are made.',
    'Before booking, check the travel time to Markovina Vineyard Estate and think about how you’ll get back after the celebration.',
  ] },
  { question: 'Where is the venue?', answer: [
    'We’ll be at Markovina Vineyard Estate, 84 Old Railway Road, Kumeū, Auckland 0892.',
    'You can pan and zoom the map in the venue section, or open it in Google Maps for directions from your location.',
  ] },
  { question: 'Will there be parking or transport?', answer: [
    'Parking, drop-off, and any arranged transport details will be added once they are confirmed.',
    'For now, you can use the venue map to plan your route. Please check back closer to the date for arrival guidance.',
  ] },
  { question: 'Can you accommodate dietary requirements?', answer: [
    'We’ll explain how to share dietary requirements when RSVP details are ready. Menu and meal-choice information will be added here if it applies.',
    'Please wait for the instructions on your invitation so we can collect everyone’s details in one place.',
  ] },
  { question: 'Is there a gift registry?', answer: [
    'If we arrange a gift registry, we’ll add the details here. There is no registry information to follow yet.',
    'Your company on the day is what matters most, and we’ll make any gift guidance clear before the celebration.',
  ] },
  { question: 'How do I RSVP?', answer: [
    'Open the RSVP form at the bottom of this page to reply for the people named on your invitation. You can tell us whether you’ll attend and include any dietary requirements.',
    'The form itself will say whether replies are open. We’ll add a reply deadline once it is confirmed.',
  ] },
  { question: 'Who should I contact on the day?', answer: [
    'A wedding-day contact will be listed here once one is appointed. We’ll make it clear who to reach if you have a timing or travel question that day.',
    'For questions before then, please use the contact details on your invitation when they become available.',
  ] },
]

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M7 5h12v12" /></svg>
}

function PhotoPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div role="img" aria-label={`${label} image placeholder`} className={`photo-placeholder relative flex items-center justify-center overflow-hidden border border-ink/20 bg-blush ${className}`}>
      <span className="absolute inset-3 border border-ink/20" aria-hidden="true" />
      <span className="relative z-10 px-3 text-center text-base leading-snug text-ink">{label}<span className="block">Image placeholder</span></span>
    </div>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <div className="min-h-svh overflow-x-clip bg-cream text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>

      <header className="relative z-20 border-b border-ink/10 bg-cream/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-10 lg:px-14">
          <a href="#top" onClick={() => setMenuOpen(false)} className="font-title text-3xl font-semibold tracking-[-0.04em]">{wedding.shortNames}</a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => <a key={item.href} href={item.href} onClick={item.href === '#rsvp' ? () => setRsvpOpen(true) : undefined} className="text-base transition-colors hover:underline">{item.label}</a>)}
          </nav>
          <a href="#rsvp" onClick={() => setRsvpOpen(true)} className="hidden items-center gap-3 bg-ink px-5 py-3 text-base text-cream transition-colors hover:bg-ink/85 sm:inline-flex">RSVP <ArrowIcon /></a>
          <button type="button" className="flex size-10 items-center justify-center border border-ink/35 lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span className="text-xl leading-none">{menuOpen ? '×' : '☰'}</span>
          </button>
        </div>
        {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-y border-ink/10 bg-cream px-6 py-4 shadow-lg lg:hidden">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => { setMenuOpen(false); if (item.href === '#rsvp') setRsvpOpen(true) }} className="block border-b border-ink/10 py-3 text-lg last:border-0">{item.label}</a>)}
        </nav>}
      </header>

      <main id="main">
        <section id="top" className="relative mx-auto grid min-h-[min(820px,calc(100svh-82px))] max-w-7xl items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-14 lg:py-20">
          <Reveal className="relative z-10 max-w-2xl">
            <h1 className="font-title text-[clamp(4.3rem,8vw,8rem)] font-semibold leading-[0.82] tracking-[-0.07em]">A day <span className="block font-normal">together</span></h1>
            <p className="mt-9 font-sans text-2xl font-light leading-snug text-ink md:text-3xl">You are invited</p>
            <p className="mt-8 font-title text-3xl font-semibold md:text-4xl">{wedding.names}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-lg text-ink">
              <span>{wedding.date}</span><span className="hidden h-px w-7 bg-ink/40 sm:block" /><span>{wedding.location}</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#rsvp" onClick={() => setRsvpOpen(true)} className="inline-flex items-center gap-4 bg-ink px-7 py-4 text-base text-cream transition-colors hover:bg-ink/85">RSVP <ArrowIcon /></a>
              <a href="#the-day" className="inline-flex items-center gap-4 border border-ink px-7 py-4 text-base transition-colors hover:bg-ink hover:text-cream">Explore the day <ArrowIcon /></a>
            </div>
          </Reveal>
          <div className="relative mx-auto w-full max-w-[530px] pb-7 pl-7 lg:ml-auto lg:pb-12 lg:pl-12">
            <PhotoPlaceholder label="Couple portrait" className="aspect-[4/5] w-full" />
            <PhotoPlaceholder label="Little moment" className="absolute bottom-0 left-0 aspect-[4/5] w-[33%] border-[6px] border-cream shadow-xl" />
          </div>
        </section>

        <Countdown />

        <section id="the-day" className="scroll-mt-8 px-6 py-24 md:px-10 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="font-title text-6xl font-semibold leading-[0.9] tracking-[-0.05em] md:text-8xl">The day <span className="font-normal">itself</span></h2>
              <p className="mx-auto mt-7 max-w-lg text-lg leading-8 text-ink">A place for the moments that matter. The schedule below will be updated as plans are confirmed.</p>
            </Reveal>
            <div className="mt-16 grid border-t border-ink/20 md:grid-cols-3">
              {schedule.map((event) => <Reveal key={event.title} className="border-b border-ink/20 px-2 py-9 md:border-r md:px-8 md:py-12 md:last:border-r-0">
                <h3 className="font-sans text-3xl font-light">{event.title}</h3>
                <p className="mt-4 max-w-xs text-lg leading-8 text-ink">{event.detail}</p>
              </Reveal>)}
            </div>
            <Reveal className="mt-12 flex flex-col gap-3 border-l-2 border-ink bg-blush px-6 py-5 sm:flex-row sm:items-baseline sm:gap-8">
              <strong className="text-lg font-semibold">Dress code</strong>
              <span className="text-lg leading-8 text-ink">To be shared with your invitation.</span>
            </Reveal>
            <div className="mt-12 text-center">
              <a href="#rsvp" onClick={() => setRsvpOpen(true)} className="inline-flex items-center gap-4 border border-ink px-7 py-4 text-lg transition-colors hover:bg-ink hover:text-cream">Let us know if you can come <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section id="venue" className="scroll-mt-8 bg-blush px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            <div className="aspect-video w-full overflow-hidden border border-ink/20 bg-cream">
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
            <Reveal>
              <h2 className="font-title text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-8xl">A place to <span className="font-normal">remember</span></h2>
              <h3 className="mt-8 font-sans text-3xl font-light">{wedding.venue}</h3>
              <address className="mt-3 text-lg leading-8 not-italic">{wedding.address}<br />New Zealand</address>
              <p className="mt-5 text-lg leading-8">Use the map below to explore the area and plan your journey.</p>
              <a href={wedding.mapLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 border-b border-ink pb-1 text-lg hover:underline">Open in Google Maps <ArrowIcon /></a>
            </Reveal>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <iframe
              title="Interactive map of Markovina Vineyard Estate in Kumeū"
              src={wedding.mapEmbed}
              className="h-[420px] w-full border border-ink/20 bg-cream md:h-[540px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <p className="mt-4 text-lg">Pan and zoom the map, or <a href={wedding.mapLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">open it in Google Maps</a>.</p>
          </div>
        </section>

        <section id="travel" className="scroll-mt-8 px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="font-title text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-8xl">Getting <span className="font-normal">there</span></h2>
              <p className="mt-7 text-lg leading-8 text-ink">Everything you need for a comfortable trip will be collected here.</p>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                { title: 'Directions', body: 'Markovina Vineyard Estate is at 84 Old Railway Road in Kumeū. Open the map for a route from your location.' },
                { title: 'Transport', body: 'Shuttle or taxi guidance will appear here if arrangements are made.' },
                { title: 'Where to stay', body: 'Nearby accommodation and any room block details will be listed here.' },
              ].map((item) => <Reveal key={item.title} className="border border-ink/20 p-7 md:p-9">
                <h3 className="font-sans text-3xl font-light">{item.title}</h3>
                <p className="mt-4 text-lg leading-8 text-ink">{item.body}</p>
                {item.title === 'Directions' && <a href={wedding.directionsLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-lg underline underline-offset-4">Get directions <ArrowIcon /></a>}
              </Reveal>)}
            </div>
          </div>
        </section>

        <section className="bg-blush px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.75fr_1fr]">
            <Reveal className="max-w-xl">
              <h2 className="font-title text-6xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">The best part is <span className="font-normal">you</span></h2>
              <p className="mt-7 text-lg leading-8 text-ink">This space is for a personal note from the couple, a favourite memory, or simply a few words about celebrating together.</p>
            </Reveal>
            <PhotoPlaceholder label="Favourite memory" className="aspect-[6/5] w-full bg-cream" />
          </div>
        </section>

        <section id="questions" className="scroll-mt-8 px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
            <Reveal>
              <h2 className="font-title text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-8xl">A few <span className="font-normal">questions</span></h2>
              <p className="mt-7 max-w-sm text-lg leading-8 text-ink">Answers will be updated as plans fall into place.</p>
            </Reveal>
            <div className="border-t border-ink/20">
              {questions.map(({ question, answer }, index) => {
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
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-sans text-2xl font-light md:text-3xl"
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
                    </div>
                  </motion.div>
                </div>
              })}
            </div>
          </div>
        </section>

        <Rsvp open={rsvpOpen} onToggle={() => setRsvpOpen((open) => !open)} />
      </main>

      <footer className="bg-cream px-6 py-8 text-center text-base text-ink">
        <p className="font-title text-2xl font-semibold tracking-normal">{wedding.names}</p>
        <p className="mt-2">{wedding.date} · {wedding.location}</p>
      </footer>
    </div>
  )
}
