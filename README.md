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

## Background music

`src/BackgroundMusic.tsx` plays the supplied “Love is A Choice” by Kris Bowers
from `public/audio/love-is-a-choice.mp3`. Playback starts directly from the
invitation click, loops at 25% volume, and does not load audio before that click.
The floating button mutes or unmutes without restarting the song and remembers
the visitor's mute preference in local storage. If playback is blocked, the
button lets the visitor start it manually.

## Performance

Photos use responsive, lossless WebP copies through `src/responsiveImage.ts`.
The original images remain available as full-resolution fallbacks. Couple-card
copies match the existing 4:3 crop and object position, so image framing stays
the same. Other portraits retain their original framing and colour profiles.

At the tested 1280px desktop viewport and 1x pixel density, profile, wedding-party,
and venue photos total about 2.4 MB instead of 22.6 MB. Larger displays can
select larger variants or the originals. The production JavaScript bundle is
about 375 KB (119 KB gzip), down from 418 KB (132 KB gzip), using Motion's
animation features without its unused layout/drag features.

The countdown pauses updates when the tab is hidden, catches up on return, and
only rerenders cards whose values change. Music quality and scrolling settings
are unchanged.

To regenerate image copies with Python and Pillow, run
`python scripts/optimize-images.py`. The script verifies lossless decoding
against every prepared image and skips copies larger than the originals.

## RSVP responses

The individual RSVP form collects name, email, attendance, dietary needs, and
an optional message. It sends replies through [FormSubmit](https://formsubmit.co/)
to `newtonkme@gmail.com`, without a server, API key, or service account. Guests
stay on the website. The subject includes the guest's name and attendance, and
email replies can be sent to the guest's supplied address.

Before sharing the website with guests:

1. Submit a test RSVP from the website. FormSubmit will send its activation
   email to `newtonkme@gmail.com` on first use.
2. Open that email (check spam too) and confirm the form.
3. Submit another test RSVP and verify the actual reply email arrives. Delivery
   has not been confirmed until this final check succeeds.

No environment variable is required for the default inbox. To change the
endpoint, set `VITE_RSVP_ENDPOINT` using `.env.example` locally or in hosting
configuration and rebuild. Formspree `https://formspree.io/f/...` overrides
remain supported. These endpoints are public; never put an email password or
secret API key in a `VITE_` variable.

Requests time out after 20 seconds. Failed requests and provider rejections keep
the guest's answers for retry. The hidden spam field is mapped for each service.
Run `npm run test:rsvp` on Node 22.6+ to check request formatting and rejection
handling with mocked requests; the tests never send real emails.

The single-page site in `src/App.tsx` has sections for the invitation, day
schedule, venue, directions and travel, accommodations, dress code, FAQs,
registry guidance, and RSVP. The hero uses responsive `public/images/couple-hero-*.webp` images; the venue section uses
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

- RSVP deadline and a Formspree endpoint for collecting responses.
- Digital gift contribution details closer to the day.

The countdown remains set to guest arrival at 2:30 pm NZDT; the ceremony begins
at 3:00 pm. The original venue details, envelope opening, and upward website
fade are preserved. Accommodation advice and the former personal-note section
have been removed.
