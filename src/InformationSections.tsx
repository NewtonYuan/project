import { useState } from 'react'
import { m as motion } from 'motion/react'
import { loveStories, weddingParty } from './weddingContent'
import { responsiveImage } from './responsiveImage'

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: 'easeOut' }} className={className}>{children}</motion.div>
}

const profileFactIcons = [
  'M155.7-72.59q-21.31 0-36.16-14.84-14.84-14.85-14.84-36.16v-189q0-34.43 23.14-59.84 23.14-25.42 56.86-28.77v-151.39q0-37.78 26.6-64.39 26.61-26.61 64.4-26.61h158.8v-52.5q-18-12.5-29-30.2-11-17.71-11-42.91 0-16.19 6.12-31.41 6.12-15.22 19.31-28.41l44.16-43.91q2.27-2.24 15.88-6.72 2.27 0 15.94 6.72l44.16 43.91q13.19 13.19 19.31 28.41 6.12 15.22 6.12 31.41 0 25.09-11 42.86t-29 30.25v52.5h158.8q37.79 0 64.4 26.61 26.6 26.61 26.6 64.39v151.39q33.72 3.35 56.86 28.77 23.14 25.41 23.14 59.84v189q0 21.31-14.84 36.16-14.85 14.84-36.16 14.84H155.7Zm120-331h408.6v-149H275.7v149Zm-80 240h568.6v-149H195.7v149Zm80-240h408.6-408.6Zm-80 240h568.6-568.6Zm579.6-240H184.7h590.6Z',
  'M162.87-111.87q-37.78 0-64.39-26.61t-26.61-64.39V-633.3q0-37.79 26.61-64.4 26.61-26.6 64.39-26.6h149.72v-80q0-37.79 26.61-64.4 26.6-26.6 64.39-26.6h152.82q37.79 0 64.39 26.6 26.61 26.61 26.61 64.4v80h149.72q37.78 0 64.39 26.6 26.61 26.61 26.61 64.4v430.43q0 37.78-26.61 64.39t-64.39 26.61H162.87Zm0-91h634.26V-633.3H162.87v430.43ZM403.59-724.3h152.82v-80H403.59v80ZM162.87-202.87V-633.3v430.43Z',
  'M647.91-434.17 558.8-291.39q-11 17.24-30.73 14.12-19.74-3.12-24.74-23.12l-27.76-111.04L207.59-143.7q-12.92 12.68-31.45 13.18t-32.21-13.18q-12.91-12.91-12.91-31.94t12.91-31.95l267.98-268.74-111.52-27.76q-20-5-23.12-24.74-3.12-19.74 14.12-30.74l142.78-88.34-12.47-168.26q-2-20.24 16.23-29.48 18.24-9.24 33.48 4l129.07 108.58 156.26-63.15q19.24-8 33.36 6.12 14.12 14.12 6.12 33.36l-63.15 156.02 108.58 128.55q13.24 15.24 4.12 33.47-9.12 18.24-29.36 16.24l-168.5-11.71Zm-520.13-270.4q-6.71-6.71-6.71-15.91 0-9.19 6.71-15.91l55.83-55.83q6.72-6.71 15.91-6.71 9.2 0 15.91 6.71l55.59 55.59q6.72 6.72 6.72 15.91 0 9.2-6.72 15.92l-55.82 55.82q-6.72 6.72-15.92 6.72-9.19 0-15.91-6.72l-55.59-55.59Zm427.94 255.59 46.08-75.17 88.7 6.52-57.37-67.65 33.57-82.18-82.18 33.33-67.89-56.37 6.76 87.93-75.41 46.61 85.93 21.05 21.81 85.93Zm149.08 321.2-55.82-55.59q-6.72-6.72-6.72-15.91 0-9.2 6.72-15.92l55.59-55.58q6.71-6.72 15.91-6.72 9.19 0 15.91 6.72l55.83 55.58q6.71 6.72 6.71 15.92 0 9.19-6.71 15.91l-55.59 55.59q-6.72 6.71-15.91 6.71-9.2 0-15.92-6.71ZM569.24-570.24Z',
]

function CoupleProfileCard({ name, fullName, facts }: { name: string; fullName: string; facts: string[] }) {
  const [flipped, setFlipped] = useState(false)
  const accentClass = name === 'Annie' ? 'bride-title' : 'groom-title'

  return <div className={`couple-profile ${flipped ? 'is-flipped' : ''}`}>
    <button
      type="button"
      className="couple-profile-toggle"
      aria-label={flipped ? `Back to ${fullName}’s profile` : `Read ${name}’s love story`}
      aria-pressed={flipped}
      onClick={() => setFlipped(value => !value)}
    />
    <div className="couple-profile-inner">
      <div className="profile-card couple-profile-face couple-profile-front" aria-hidden={flipped} inert={flipped}>
        <div className={`profile-card-photo profile-card-photo--${name.toLowerCase()}`}>
          <img {...responsiveImage(`/images/${name.toLowerCase()}.jpg`, '(min-width: 1232px) 564px, (min-width: 768px) calc(50vw - 52px), calc(100vw - 48px)')} alt={fullName} loading="lazy" />
        </div>
        <div className="profile-card-content">
          <h3 className="card-title">{fullName}</h3>
          <ul className="body-copy mt-5 space-y-3">{facts.map((fact, index) => <li key={fact} className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="mt-0.5 size-6" aria-hidden="true"><path d={profileFactIcons[index]} /></svg>
            <span>{fact}</span>
          </li>)}</ul>
          <p className={`couple-profile-hint small-copy ${accentClass}`}>Click to read my love story <span aria-hidden="true">↗</span></p>
        </div>
      </div>
      <div className="profile-card couple-profile-face couple-profile-back" aria-hidden={!flipped} inert={!flipped}>
        <div className="couple-profile-story" data-lenis-prevent role="region" aria-label={`${name}’s love story`} tabIndex={flipped ? 0 : -1}>
          <p className={`small-copy mb-4 ${accentClass}`}>{name}’s side</p>
          <h3 className="content-title">{name === 'Annie' ? 'Her love story' : 'His love story'}</h3>
          <div className="body-copy mt-7 space-y-4">
            {loveStories[name].map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <button type="button" className={`couple-profile-hint small-copy ${accentClass}`} onClick={() => setFlipped(false)}><span aria-hidden="true">↶</span> Back to my profile</button>
      </div>
    </div>
  </div>
}

export function AboutUs() {
  return <section id="about" className="scroll-mt-8 px-6 md:px-10">
    <div className="mx-auto max-w-6xl">
      <Reveal className="hidden max-w-3xl md:block"><h2 className="wedding-title font-title font-medium"><b className="bride-title font-bold">Bride</b> <span className="font-normal">&amp;</span> <b className="groom-title font-bold">Groom</b></h2></Reveal>
      <div className="grid gap-12 md:mt-10 md:grid-cols-2 md:gap-6">
        {[
          { name: 'Annie', fullName: 'Annie Zheng', facts: ['Pisces · 2004 baby', 'Proud mother of Momo', 'ISFJ-T'] },
          { name: 'Newton', fullName: 'Newton Yuan', facts: ['Pisces · 2005 baby', 'Bread maker for Momo and Annie', 'ESTJ-A'] },
        ].map(({ name, fullName, facts }) => <Reveal key={name}>
          <h2 className={`wedding-title mb-8 text-center font-title font-bold md:hidden ${name === 'Annie' ? 'bride-title' : 'groom-title'}`}>{name === 'Annie' ? 'Bride' : 'Groom'}</h2>
          <CoupleProfileCard name={name} fullName={fullName} facts={facts} />
        </Reveal>)}
      </div>
    </div>
  </section>
}

export function OurTeam() {
  return <section id="team" className="scroll-mt-8 bg-blush px-6 md:px-10">
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <h2 className="wedding-title text-center font-title font-bold md:text-left">Meet <span className="font-medium">our team</span></h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {weddingParty.map(({ name, role, photo }) => <Reveal key={name} className="profile-card team-profile-card">
          <div className="team-profile-photo">
            {photo ? <img {...responsiveImage(photo, '(min-width: 1024px) 150px, (min-width: 768px) 22vw, 40vw')} alt={name} loading="lazy" /> : <span aria-hidden="true">{name.charAt(0)}</span>}
          </div>
          <div className="team-profile-content">
            <h3 className={`card-title ${role === 'Best Man' || role === 'Groomsman' ? 'groom-title' : 'bride-title'}`}>{name}</h3>
            <p className="team-profile-role small-copy">{role}</p>
          </div>
        </Reveal>)}
      </div>
      <p className="body-copy mt-7 text-center md:text-left">If you have any questions on the day, please leave us alone and talk to these people instead :)</p>
    </div>
  </section>
}

export function DressCode() {
  return <aside id="dress-code" aria-labelledby="dress-code-title" className="min-w-0 scroll-mt-28">
      <Reveal>
        <h3 id="dress-code-title" className="content-title">Dress <span className="font-medium">code</span></h3>
        <p className="body-copy mt-5"><strong>Cocktail / Semi-Formal</strong></p>
        <p className="body-copy mt-5">We’d love for you to join us dressed in cocktail or semi-formal attire. Think elevated, stylish and wedding ready!</p>
        <p className="body-copy mt-4">Elegant, colourful long dresses or satin dresses up to knee length; classic suits or smart, polished looks with ties optional.</p>
      <a href="/images/dress-code.jpg" target="_blank" rel="noopener noreferrer" aria-label="Open the dress code outfit inspiration image at full size" className="mt-6 block">
        <img {...responsiveImage('/images/dress-code.jpg', '(min-width: 1280px) 580px, (min-width: 1024px) 45vw, 90vw')} alt="Cocktail and semi-formal outfit inspiration: long floral and satin dresses, classic suits and polished looks with optional ties" loading="lazy" className="w-full rounded-xl border border-ink/10" />
      </a>
      </Reveal>
  </aside>
}
