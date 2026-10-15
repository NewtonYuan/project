import assert from 'node:assert/strict'
import test from 'node:test'
import { submitRsvp } from '../src/rsvpSubmission.ts'

function reply() {
  const form = new FormData()
  form.set('name', 'Test Guest')
  form.set('email', 'guest@example.com')
  form.set('attendance', 'Yes')
  form.set('dietary_requirements', 'Vegetarian')
  form.set('message', 'Looking forward to it!')
  form.set('_gotcha', '')
  return form
}

test('sends individual RSVP details to the configured inbox using FormSubmit JSON', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://formsubmit.co/ajax/newtonkme@gmail.com')
    assert.equal(options.method, 'POST')
    assert.equal(options.headers['Content-Type'], 'application/json')
    const payload = JSON.parse(options.body)
    assert.equal(payload.email, 'guest@example.com')
    assert.equal(payload.attendance, 'Yes')
    assert.equal(payload.dietary_requirements, 'Vegetarian')
    assert.equal(payload.message, 'Looking forward to it!')
    assert.equal(payload._subject, 'Wedding RSVP: Test Guest — Yes')
    assert.equal(payload._template, 'table')
    assert.equal(payload._honey, '')
    assert.ok(!('_gotcha' in payload))
    return Response.json({ success: 'true' })
  })
  const form = reply()
  await submitRsvp('https://formsubmit.co/ajax/newtonkme@gmail.com', form)
  assert.equal(form.get('name'), 'Test Guest')
})

test('rejects a provider rejection even when HTTP status is 200', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ success: 'false' }))
  await assert.rejects(submitRsvp('https://formsubmit.co/ajax/test@example.com', reply()))
})

test('rejects HTTP errors, malformed responses, and network failures', async (t) => {
  for (const failure of [
    () => Response.json({ success: true }, { status: 429 }),
    () => new Response('<html>Service unavailable</html>'),
    () => { throw new TypeError('Network unavailable') },
  ]) {
    const stub = t.mock.method(globalThis, 'fetch', async () => failure())
    await assert.rejects(submitRsvp('https://formsubmit.co/ajax/test@example.com', reply()))
    stub.mock.restore()
  }
})

test('keeps Formspree overrides compatible with their multipart format', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://formspree.io/f/test-form')
    assert.ok(options.body instanceof FormData)
    assert.equal(options.body.get('_gotcha'), '')
    assert.equal(options.body.get('attendance'), 'Yes')
    return Response.json({ ok: true })
  })
  await submitRsvp('https://formspree.io/f/test-form', reply())
})
