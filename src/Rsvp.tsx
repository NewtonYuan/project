import { useState, type FormEvent, type ReactNode } from 'react'

const endpoint = import.meta.env.VITE_RSVP_ENDPOINT?.trim()
const fieldClass = 'body-copy mt-2 w-full rounded-xl border border-ink/25 bg-white px-4 py-3 text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink'

type RsvpProps = {
  children: ReactNode
}

export default function Rsvp({ children }: RsvpProps) {
  const [attendance, setAttendance] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

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
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="wedding-title font-title font-bold">RSVP</h2>
        <p className="body-copy mx-auto mt-7 max-w-xl">We’d love to celebrate with you.</p>
        <div className="rsvp-layout mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
          <div className="rsvp-photo">
            <img src="/images/rsvp-portrait.jpg" alt="Newton and Annie together beneath Annie’s veil" width="1600" height="2400" loading="lazy" />
          </div>
          <div className="rsvp-response rounded-xl border border-ink/10 bg-cream p-6 text-left sm:p-8 lg:p-10">
            {status === 'success' ? (
              <div role="status" className="py-8 text-center">
                <h3 className="content-title">Thank you!</h3>
                <p className="body-copy mx-auto mt-4 max-w-lg">Your reply has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="form-label block" htmlFor="rsvp-name">Full name *
                    <input id="rsvp-name" name="name" type="text" autoComplete="name" required maxLength={120} className={fieldClass} />
                  </label>
                  <label className="form-label block" htmlFor="rsvp-email">Email *
                    <input id="rsvp-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} />
                  </label>
                </div>

                <fieldset className="mt-8">
                  <legend className="form-label">Attending? *</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[{ value: 'Yes', label: 'I’ll be there' }, { value: 'No', label: 'Can’t make it' }].map((choice) => (
                      <label key={choice.value} className={`rsvp-button rsvp-choice gap-2${attendance === choice.value ? ' is-active' : ''}`}>
                        <input type="radio" name="attendance" value={choice.value} required checked={attendance === choice.value} onChange={() => setAttendance(choice.value)} className="sr-only" />
                        {attendance === choice.value && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="size-6 shrink-0" aria-hidden="true"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" /></svg>}
                        <span>{choice.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="mt-6 form-label block" htmlFor="rsvp-dietary">Dietary needs or allergies
                  <textarea id="rsvp-dietary" name="dietary_requirements" rows={2} disabled={attendance === 'No'} maxLength={1000} className={`${fieldClass} disabled:opacity-50`} />
                </label>

                <label className="mt-6 form-label block" htmlFor="rsvp-message">Message (optional)
                  <textarea id="rsvp-message" name="message" rows={2} maxLength={1000} className={fieldClass} />
                </label>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="rsvp-website">Leave this field blank</label>
                  <input id="rsvp-website" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                {status === 'error' && <p role="alert" className="body-copy mt-6">We couldn’t send your reply. Please try again; your answers are still here.</p>}

                <button type="submit" disabled={!endpoint || status === 'sending'} className={`rsvp-button mt-8 inline-flex gap-3${status === 'sending' ? ' is-active' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="size-6 shrink-0" aria-hidden="true"><path d="M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
                  <span>{status === 'sending' ? 'Sending…' : 'Send reply'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      {children}
    </section>
  )
}
