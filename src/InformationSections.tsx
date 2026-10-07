import { motion } from 'motion/react'
import { weddingParty } from './weddingContent'

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: 'easeOut' }} className={className}>{children}</motion.div>
}

const profileFactIcons = [
  'M155.7-72.59q-21.31 0-36.16-14.84-14.84-14.85-14.84-36.16v-189q0-34.43 23.14-59.84 23.14-25.42 56.86-28.77v-151.39q0-37.78 26.6-64.39 26.61-26.61 64.4-26.61h158.8v-52.5q-18-12.5-29-30.2-11-17.71-11-42.91 0-16.19 6.12-31.41 6.12-15.22 19.31-28.41l44.16-43.91q2.27-2.24 15.88-6.72 2.27 0 15.94 6.72l44.16 43.91q13.19 13.19 19.31 28.41 6.12 15.22 6.12 31.41 0 25.09-11 42.86t-29 30.25v52.5h158.8q37.79 0 64.4 26.61 26.6 26.61 26.6 64.39v151.39q33.72 3.35 56.86 28.77 23.14 25.41 23.14 59.84v189q0 21.31-14.84 36.16-14.85 14.84-36.16 14.84H155.7Zm120-331h408.6v-149H275.7v149Zm-80 240h568.6v-149H195.7v149Zm80-240h408.6-408.6Zm-80 240h568.6-568.6Zm579.6-240H184.7h590.6Z',
  'M162.87-111.87q-37.78 0-64.39-26.61t-26.61-64.39V-633.3q0-37.79 26.61-64.4 26.61-26.6 64.39-26.6h149.72v-80q0-37.79 26.61-64.4 26.6-26.6 64.39-26.6h152.82q37.79 0 64.39 26.6 26.61 26.61 26.61 64.4v80h149.72q37.78 0 64.39 26.6 26.61 26.61 26.61 64.4v430.43q0 37.78-26.61 64.39t-64.39 26.61H162.87Zm0-91h634.26V-633.3H162.87v430.43ZM403.59-724.3h152.82v-80H403.59v80ZM162.87-202.87V-633.3v430.43Z',
  'M647.91-434.17 558.8-291.39q-11 17.24-30.73 14.12-19.74-3.12-24.74-23.12l-27.76-111.04L207.59-143.7q-12.92 12.68-31.45 13.18t-32.21-13.18q-12.91-12.91-12.91-31.94t12.91-31.95l267.98-268.74-111.52-27.76q-20-5-23.12-24.74-3.12-19.74 14.12-30.74l142.78-88.34-12.47-168.26q-2-20.24 16.23-29.48 18.24-9.24 33.48 4l129.07 108.58 156.26-63.15q19.24-8 33.36 6.12 14.12 14.12 6.12 33.36l-63.15 156.02 108.58 128.55q13.24 15.24 4.12 33.47-9.12 18.24-29.36 16.24l-168.5-11.71Zm-520.13-270.4q-6.71-6.71-6.71-15.91 0-9.19 6.71-15.91l55.83-55.83q6.72-6.71 15.91-6.71 9.2 0 15.91 6.71l55.59 55.59q6.72 6.72 6.72 15.91 0 9.2-6.72 15.92l-55.82 55.82q-6.72 6.72-15.92 6.72-9.19 0-15.91-6.72l-55.59-55.59Zm427.94 255.59 46.08-75.17 88.7 6.52-57.37-67.65 33.57-82.18-82.18 33.33-67.89-56.37 6.76 87.93-75.41 46.61 85.93 21.05 21.81 85.93Zm149.08 321.2-55.82-55.59q-6.72-6.72-6.72-15.91 0-9.2 6.72-15.92l55.59-55.58q6.71-6.72 15.91-6.72 9.19 0 15.91 6.72l55.83 55.58q6.71 6.72 6.71 15.92 0 9.19-6.71 15.91l-55.59 55.59q-6.72 6.71-15.91 6.71-9.2 0-15.92-6.71ZM569.24-570.24Z',
]

export function AboutUs() {
  return <section id="about" className="scroll-mt-8 px-6 md:px-10">
    <div className="mx-auto max-w-6xl">
      <Reveal className="max-w-3xl"><h2 className="font-title text-6xl font-medium leading-[0.95] tracking-[-0.05em] md:text-8xl">The <b className="font-bold">Bride</b> and <b className="font-bold">Groom</b></h2></Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[
          { name: 'Annie', facts: ['Pisces · 2004 baby', 'Proud mother of Momo', 'ISFJ'] },
          { name: 'Newton', facts: ['Pisces · 2005 baby', 'Bread maker for Momo and Annie', 'MBTI · To be confirmed'] },
        ].map(({ name, facts }) => <Reveal key={name} className="border border-ink/20 p-7 md:p-9">
          <h3 className="font-title text-5xl">{name}</h3>
          <ul className="mt-5 space-y-3 text-lg leading-7">{facts.map((fact, index) => <li key={fact} className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="mt-0.5 size-6" aria-hidden="true"><path d={profileFactIcons[index]} /></svg>
            <span>{fact}</span>
          </li>)}</ul>
          <details className="mt-7 border-t border-ink/20 pt-5">
            <summary className="cursor-pointer text-lg">{name}’s side of the love story <span aria-hidden="true">🤫</span></summary>
            <p className="mt-4 text-lg leading-8">{name}’s story is coming soon.</p>
          </details>
        </Reveal>)}
      </div>
    </div>
  </section>
}

export function OurTeam() {
  return <section id="team" className="scroll-mt-8 bg-blush px-6 md:px-10">
    <div className="mx-auto max-w-6xl">
      <Reveal className="max-w-3xl">
        <h2 className="font-title text-6xl font-bold leading-[0.95] tracking-[-0.05em] md:text-8xl">Meet <span className="font-medium">our team</span></h2>
        <p className="mt-7 max-w-xl text-lg leading-8">If you have any questions on the day, please leave us alone and talk to these people instead :)</p>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {weddingParty.map(({ name, role }) => <Reveal key={name} className="border border-ink/20 px-5 py-6 md:p-8">
          <h3 className="font-title text-4xl md:text-5xl">{name}</h3><p className="mt-3 text-lg">{role}</p>
        </Reveal>)}
      </div>
    </div>
  </section>
}

export function DressCode() {
  return <section id="dress-code" className="scroll-mt-8 px-6 md:px-10">
    <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.7fr_1fr]">
      <Reveal>
        <h2 className="font-title text-6xl font-bold leading-[0.95] tracking-[-0.05em] md:text-8xl">Dress <span className="font-medium">code</span></h2>
        <p className="mt-7 text-2xl">Cocktail / Semi-Formal</p>
        <p className="mt-5 text-lg leading-8">We’d love for you to join us dressed in cocktail or semi-formal attire. Think elevated, stylish and wedding ready!</p>
        <p className="mt-4 text-lg leading-8">Elegant, colourful long dresses or satin dresses up to knee length; classic suits or smart, polished looks with ties optional.</p>
      </Reveal>
      <a href="/images/dress-code.jpg" target="_blank" rel="noopener noreferrer" aria-label="Open the dress code outfit inspiration image at full size">
        <img src="/images/dress-code.jpg" alt="Cocktail and semi-formal outfit inspiration: long floral and satin dresses, classic suits and polished looks with optional ties" width="1536" height="1024" loading="lazy" className="w-full border border-ink/10" />
      </a>
    </div>
  </section>
}

export function FoodAndBeverage({ onRsvp }: { onRsvp: () => void }) {
  return <section id="food" className="scroll-mt-8 bg-blush px-6 md:px-10">
    <div className="mx-auto max-w-6xl">
      <Reveal className="max-w-3xl">
        <h2 className="font-title text-6xl font-bold leading-[0.95] tracking-[-0.05em] md:text-8xl">Food <span className="font-medium">& beverage</span></h2>
        <p className="mt-7 text-2xl leading-8">Eat and drink to your heart’s content!</p>
        <p className="mt-5 text-lg leading-8">Food and beverages will be served throughout your time with us.</p>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal className="border-t border-ink/20 pt-6">
          <h3 className="font-title text-4xl">Dinner</h3>
          <p className="mt-4 text-lg leading-8">Dinner will be served buffet-style. Please let us know in advance if you have any dietary requirements or allergies.</p>
          <a href="#rsvp" onClick={onRsvp} className="mt-5 inline-block text-lg underline underline-offset-4">Share dietary requirements in your RSVP</a>
        </Reveal>
        <Reveal className="border-t border-ink/20 pt-6">
          <h3 className="font-title text-4xl">Dessert</h3>
          <p className="mt-4 text-lg leading-8">There will be a dessert bar after dinner, served as an informal, self-service buffet.</p>
        </Reveal>
      </div>
      <p className="mt-8 text-base">More food and beverage details will follow.</p>
    </div>
  </section>
}
