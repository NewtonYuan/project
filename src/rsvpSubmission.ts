export async function submitRsvp(endpoint: string, formData: FormData) {
  const formSubmit = new URL(endpoint).hostname === 'formsubmit.co'
  const body = new FormData()
  formData.forEach((value, key) => body.append(key, value))

  if (formSubmit) {
    const name = String(body.get('name') ?? '').replace(/[\r\n]+/g, ' ').trim()
    const attendance = String(body.get('attendance') ?? '')
    body.set('_subject', `Wedding RSVP: ${name} — ${attendance}`)
    body.set('_template', 'table')
    body.set('_honey', String(body.get('_gotcha') ?? ''))
    body.delete('_gotcha')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: formSubmit
      ? { Accept: 'application/json', 'Content-Type': 'application/json' }
      : { Accept: 'application/json' },
    body: formSubmit ? JSON.stringify(Object.fromEntries(body)) : body,
    signal: AbortSignal.timeout(20_000),
  })

  const result = await response.json()
  if (!response.ok || (formSubmit
    ? result.success !== true && result.success !== 'true'
    : result.ok !== true)) {
    throw new Error('RSVP submission was not accepted')
  }
}
