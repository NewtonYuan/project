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
registry guidance, and RSVP. The hero uses `public/images/couple-hero.jpg`; the venue section uses
`public/images/markovina-venue.png`.
Motion reveals sections as they enter the viewport.

The countdown below the invitation uses four scorecard-style flip cards. Its
target is guest arrival on 22 March 2027 at 2:30 pm New Zealand daylight time (`NZDT`, UTC+13).
Change the target in `src/Countdown.tsx` if the event time changes. The timer
uses the visitor's clock but counts toward the same absolute instant in every
time zone, and the flip animation respects reduced-motion preferences.

Lenis handles smooth scrolling and anchor links. Lenis and Motion respect the
visitor's reduced-motion preference.

Fonts are bundled locally through Fontsource:

- `font-title`: Cormorant Infant (500 and 700) for headings.
- `font-sans font-normal`: Lato Regular (400) for readable information, navigation,
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

## Wedding information

Guest copy comes from the supplied Wedding Website Planning.pdf. The site now
includes About Us, Our Team, the seven-event schedule, dress-code inspiration,
venue and map, transport and parking, Food & Beverage, updated FAQs, and RSVP.
The hero uses the supplied couple portrait. All sections have a full-viewport
minimum height; expanding stories, FAQs, or the RSVP form can increase it.
The footer is part of the RSVP section.

Edit `src/weddingContent.ts` for the schedule, wedding party, navigation, and
FAQs. Edit `src/InformationSections.tsx` for the couple profiles, stories,
dress code, and food copy. The dress-code illustration is extracted from the
planning PDF and stored at `public/images/dress-code.jpg`.

Still to finish:

- Annie and Newton's individual love stories (up to 100 words each).
- Newton's MBTI, if it should be shown.
- Final food and beverage details.
- RSVP deadline and a Formspree endpoint for collecting responses.
- Digital gift contribution details closer to the day.

The countdown remains set to guest arrival at 2:30 pm NZDT; the ceremony begins
at 3:00 pm. The original venue details, envelope opening, and upward website
fade are preserved. Accommodation advice and the former personal-note section
have been removed.
