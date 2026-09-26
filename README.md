# Wedding website

React + TypeScript + Vite + Tailwind CSS + Motion + Lenis.

## Development

```sh
npm install
npm run dev
```

## Validation and production build

```sh
npm run build
npm run preview
```

The build checks TypeScript and produces the static site in `dist/`.

## RSVP responses

The RSVP buttons open a form within the page. It asks for a name, email,
attendance, and the names of invited people accepting or declining. Guests
accepting can also add dietary needs. Both choices reveal their fields with a
smooth animation.
The form uses Formspree to collect submissions without a custom server. To
activate it:

1. Create a form at [Formspree](https://formspree.io/) and choose the email
   address that should receive RSVP notifications.
2. Copy `.env.example` to `.env` and set `VITE_RSVP_ENDPOINT` to the form's
   public `https://formspree.io/f/...` endpoint.
3. Restart the dev server, or set the same environment variable in your hosting
   provider before building. Send a test RSVP and confirm it appears in the
   Formspree inbox before sharing the site.

Until the endpoint is set, the form is a clearly labelled preview and its send
button is disabled. The endpoint is public by design; do not put secret API
keys in `VITE_` variables. The RSVP deadline has not yet been set.

The single-page site in `src/App.tsx` has sections for the invitation, day
schedule, venue, directions and travel, accommodations, dress code, FAQs,
registry guidance, and RSVP. Rectangles mark where photographs will go, except
for the venue section, which uses `public/images/markovina-venue.png`.
Motion reveals sections as they enter the viewport.

The countdown below the invitation uses four scorecard-style flip cards. Its
target is 22 March 2027 at 2:30 pm New Zealand daylight time (`NZDT`, UTC+13).
Change the target in `src/Countdown.tsx` if the event time changes. The timer
uses the visitor's clock but counts toward the same absolute instant in every
time zone, and the flip animation respects reduced-motion preferences.

Lenis handles smooth scrolling and anchor links. Lenis and Motion respect the
visitor's reduced-motion preference.

Fonts are bundled locally through Fontsource:

- `font-title`: Cormorant Infant (400 and 600) for headings.
- `font-sans font-light`: Lato Light (300) for readable information, navigation,
  and smaller headings; the body default.

## Colour palette

`src/theme.ts` is the source of truth for the six colours sampled from the
centre of the solid swatches in the Blush Fairytale reference image. The
values are passed to Tailwind through CSS custom properties at startup. The
site uses cream as its default background, blush for secondary sections, and
black for text; the other extracted colours remain available in the theme.

| Colour | Hex |
| --- | --- |
| Cream | `#FFF9F2` |
| Sand | `#D9C5A6` |
| Blush | `#E7C6C0` |
| Lavender | `#DACBE4` |
| Sage | `#B9C5AE` |
| Blue | `#166198` |

## Content to finish before sharing

Annie Zheng and Newton Yuan's names are now set. Markovina Vineyard Estate
has since been confirmed as the venue. Its address is from the venue's official
contact page, and the venue section includes an interactive Google Maps embed
plus the couple's shared map link. The countdown date and time were provided
separately. The site uses explicit placeholder labels for everything else.
Replace the remaining draft copy in `src/App.tsx` with confirmed details:

- Arrival, ceremony, and reception times; dress code.
- Parking, transport, and accommodation advice.
- Guest policies, wedding-day contact, and any gift registry.
- RSVP deadline and a Formspree endpoint for collecting responses.
- Real photos in place of the remaining image rectangles.

The guest-information sections follow guidance from [The Knot](https://www.theknot.com/content/free-wedding-website-faq), [Joy](https://withjoy.com/blog/what-to-include-on-your-wedding-website/), and [Zola](https://www.zola.com/expert-advice/how-to-write-your-wedding-website).
