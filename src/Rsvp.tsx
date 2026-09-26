import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const endpoint = import.meta.env.VITE_RSVP_ENDPOINT?.trim()
const fieldClass = 'mt-2 w-full rounded-none border border-ink/35 bg-cream px-4 py-3 text-lg text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink'

type RsvpProps = {
  open: boolean
  onToggle: () => void
}

export default function Rsvp({ open, onToggle }: RsvpProps) {
  const [attendance, setAttendance] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const reduceMotion = useReducedMotion()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!endpoint || status === 'sending') return

    const form = event.currentTarget
    setStatus('sending')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('RSVP submission failed')

      form.reset()
      setAttendance('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="scroll-mt-8 bg-blush px-6 py-24 text-center text-ink md:px-10 lg:py-36">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-title text-7xl font-semibold leading-none tracking-[-0.05em] md:text-[8rem]">RSVP</h2>
        <p className="mx-auto mt-7 max-w-xl text-xl leading-9">We’d love to celebrate with you. Let us know if you can make it.</p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="rsvp-form-panel"
          onClick={onToggle}
          className="mt-9 inline-flex cursor-pointer items-center justify-center gap-5 bg-ink px-9 py-5 text-lg text-cream transition-colors hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {open ? 'Close RSVP form' : 'Open RSVP form'}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} aria-hidden="true">↓</motion.span>
        </button>

        <motion.div
          id="rsvp-form-panel"
          aria-hidden={!open}
          inert={!open}
          initial={false}
          animate={open
            ? { height: 'auto', opacity: 1, display: 'block' }
            : { height: 0, opacity: 0, transitionEnd: { display: 'none' } }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="mt-10 border border-ink/25 bg-cream p-6 text-left sm:p-10">
            {status === 'success' ? (
              <div role="status" className="py-8 text-center">
                <h3 className="font-title text-4xl font-semibold sm:text-5xl">Thank you for replying</h3>
                <p className="mx-auto mt-4 max-w-lg text-lg leading-8">Your RSVP has been sent. We look forward to celebrating with you.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 cursor-pointer border-b border-ink pb-1 text-lg">Send another response</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-title text-4xl font-semibold sm:text-5xl">Your reply</h3>
                <p className="mt-3 text-lg leading-8">Please respond for the people named on your invitation. Fields marked * are required.</p>

                {!endpoint && <p className="mt-6 border-l-2 border-ink bg-blush px-5 py-4 text-lg leading-8" role="status">Form preview: replies are not being collected yet. The send button will be enabled once the response inbox is connected.</p>}

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <label className="block text-lg" htmlFor="rsvp-name">Your full name *
                    <input id="rsvp-name" name="name" type="text" autoComplete="name" required maxLength={120} className={fieldClass} />
                  </label>
                  <label className="block text-lg" htmlFor="rsvp-email">Email address *
                    <input id="rsvp-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} />
                  </label>
                </div>

                <fieldset className="mt-8">
                  <legend className="text-lg">Will you be joining us? *</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[{ value: 'Yes', label: 'Joyfully accepts' }, { value: 'No', label: 'Regretfully declines' }].map((choice) => (
                      <label key={choice.value} className={`flex cursor-pointer items-center gap-3 border px-5 py-4 text-lg transition-colors ${attendance === choice.value ? 'border-ink bg-blush' : 'border-ink/35 hover:bg-blush/50'}`}>
                        <input type="radio" name="attendance" value={choice.value} required checked={attendance === choice.value} onChange={() => setAttendance(choice.value)} className="size-5 accent-ink" />
                        {choice.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <motion.div
                  aria-hidden={attendance !== 'Yes'}
                  inert={attendance !== 'Yes'}
                  initial={false}
                  animate={attendance === 'Yes'
                    ? { height: 'auto', opacity: 1, display: 'block' }
                    : { height: 0, opacity: 0, transitionEnd: { display: 'none' } }}
                  transition={{ duration: reduceMotion ? 0 : 0.38, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 pt-8">
                    <label className="block text-lg" htmlFor="rsvp-party">Names of everyone attending in your party *
                      <span className="mt-1 block text-base leading-7">Please include only people named on your invitation.</span>
                      <textarea id="rsvp-party" name="attending_names" rows={3} required={attendance === 'Yes'} disabled={attendance !== 'Yes'} maxLength={500} className={fieldClass} />
                    </label>
                    <label className="block text-lg" htmlFor="rsvp-dietary">Dietary requirements or allergies
                      <span className="mt-1 block text-base leading-7">Please include the relevant person’s name with each requirement.</span>
                      <textarea id="rsvp-dietary" name="dietary_requirements" rows={3} disabled={attendance !== 'Yes'} maxLength={1000} className={fieldClass} />
                    </label>
                  </div>
                </motion.div>

                <motion.div
                  aria-hidden={attendance !== 'No'}
                  inert={attendance !== 'No'}
                  initial={false}
                  animate={attendance === 'No'
                    ? { height: 'auto', opacity: 1, display: 'block' }
                    : { height: 0, opacity: 0, transitionEnd: { display: 'none' } }}
                  transition={{ duration: reduceMotion ? 0 : 0.38, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-8">
                    <label className="block text-lg" htmlFor="rsvp-declining-party">Names of everyone declining in your party *
                      <span className="mt-1 block text-base leading-7">Please include only people named on your invitation.</span>
                      <textarea id="rsvp-declining-party" name="declining_names" rows={3} required={attendance === 'No'} disabled={attendance !== 'No'} maxLength={500} className={fieldClass} />
                    </label>
                  </div>
                </motion.div>

                <label className="mt-8 block text-lg" htmlFor="rsvp-message">A note for us (optional)
                  <textarea id="rsvp-message" name="message" rows={3} maxLength={1000} className={fieldClass} />
                </label>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="rsvp-website">Leave this field blank</label>
                  <input id="rsvp-website" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                {status === 'error' && <p role="alert" className="mt-6 border-l-2 border-ink bg-blush px-5 py-4 text-lg leading-8">We couldn’t send your reply. Please try again; your answers are still here.</p>}

                <button type="submit" disabled={!endpoint || status === 'sending'} className="mt-8 inline-flex cursor-pointer items-center justify-center bg-ink px-9 py-4 text-lg text-cream transition-colors hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-45">
                  {status === 'sending' ? 'Sending…' : 'Send RSVP'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
