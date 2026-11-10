# Birthday Website 💌

A personalizable digital gift: a loading screen, an optional PIN lock,
a gift-opening intro, hero, love letter, memory gallery, relationship
timeline, wish list, interactive surprises (virtual hug + secret
message + confetti), and a closing — with buttery-smooth motion
throughout and music controls that never autoplay with sound.

## 1. Running it locally

Dependencies are already installed in `node_modules`. If they're missing or you want to reinstall:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Production build (optional):

```bash
npm run build
npm run start
```

## 2. Changing the name, text, dates, and wishes

All editable text lives in one file: [data/content.ts](data/content.ts).
Replace the values inside the quotes, for example:

```ts
partnerName: "[PARTNER'S NAME]",       // -> "Alya"
senderName: "[YOUR NAME]",             // -> "Rangga"
age: "[AGE]",                          // -> "23"
birthdayDate: "[BIRTHDAY DATE]",       // -> "August 22nd"
relationshipStartDate: "[DATE YOU GOT TOGETHER]", // -> "February 14, 2023"
```

For the love letter, fill `loveLetterParagraphs` with several strings —
each string becomes one paragraph that fades in as it's scrolled into view:

```ts
loveLetterParagraphs: [
  "First paragraph...",
  "Second paragraph...",
],
```

For the timeline, wishes, hug message, and secret message, edit the
`timeline`, `wishes`, `hugMessage`, and `secretMessage` arrays in the same file.

A few more sections work the same way:

- `reasonsWhy` — a list of short reasons, each becomes one flip card.
- `distanceParagraphs` — a few paragraphs about the long distance part.
- `reunionBucketList` — a numbered list of things to do when you meet again.
- `sweetLines` — random sweet one liners, shown one at a time from a button.

To show a live "X days together" counter (real-time, updates every
second) in the Timeline section, fill in `relationshipStartDateISO` using
the `YYYY-MM-DD` format:

```ts
relationshipStartDateISO: "2023-02-14",
```

Leave it as `""` (empty) if you don't want to show this counter yet — a
small note will appear in its place instead of a broken layout.

## 3. Adding photos

1. Save the photo files into the [public/photos/](public/photos/) folder, e.g. `public/photos/1.jpg`.
2. In `data/content.ts`, fill in the matching `src` property with that path:

```ts
heroPhoto: { src: "/photos/hero.jpg", alt: "Photo of Alya", caption: "" },
galleryPhotos: [
  { src: "/photos/1.jpg", alt: "The day we first met", caption: "The day we first met" },
  ...
],
closingPhoto: { src: "/photos/closing.jpg", alt: "Closing photo", caption: "" },
```

If `src` is left empty (`""`) or the file can't be found, the site
automatically shows a tidy empty photo frame instead of a broken image.

**Videos work too.** Any of these slots (`heroPhoto`, `closingPhoto`, or a
`galleryPhotos` entry) can point at a video file instead — just use a
`.mp4`/`.webm`/`.mov`/`.m4v` path (e.g. `src: "/photos/hero.mp4"`) and it
automatically plays as a looping, muted "living photo" in the same frame,
pausing on its own for visitors with reduced motion enabled.

## 4. Adding background music

1. Save an audio file (mp3/ogg) into the [public/music/](public/music/) folder, e.g. `public/music/song.mp3`.
2. Fill in `songUrl` in `data/content.ts`:

```ts
songUrl: "/music/song.mp3",
songTitle: "Song Title — Artist",
```

`songUrl` also accepts a direct audio URL. The music will **never**
autoplay — the visitor has to press play manually, and pause/mute
controls are always available in the bottom-left corner.

## 5. Changing the colors

The color palette is defined as CSS variables near the top of
[app/globals.css](app/globals.css): `--color-cream` (the base), and four
cheerful accent colors — `--color-coral`, `--color-sun`,
`--color-turquoise`, `--color-pink` (plus their darker `-text` versions
used for text so contrast stays readable). Change the hex values to
shift the mood of the entire page at once. Each section (letter,
gallery, timeline, wishes, surprise) has a `section--coral` /
`section--pink` / `section--turquoise` / `section--sun` class on its
component to set that section's accent color.

## 6. Locking it with a PIN code

On load, the site shows a brief loading screen, then — only if you set a
PIN — a lock screen asking for a 4-digit code before it opens (a nice
way to make sure only the right person sees it). Set it in
`data/content.ts`:

```ts
accessPin: "1402", // e.g. a meaningful date, like Feb 14th
```

Leave it as `""` (the default) to skip the lock screen entirely and go
straight from loading to the "Open your gift" screen. Nothing is
remembered across visits — every time the page is opened fresh (a new
visit or a reload), it asks for the code again. Cracking it also sets
off a big confetti shower before unlocking 🎉.

## 7. How it looks when shared as a link (Open Graph) & favicon

The title, description, preview image (og:image), and favicon are
generated automatically via [app/layout.tsx](app/layout.tsx),
[app/opengraph-image.tsx](app/opengraph-image.tsx), and
[app/icon.tsx](app/icon.tsx) — the preview image already pulls
`partnerName` from `data/content.ts`, so when the link is shared on
WhatsApp/Instagram/etc. it shows a personalized preview card instead of
a blank one. When deploying to a real domain, set the
`NEXT_PUBLIC_SITE_URL` environment variable (e.g.
`https://happy-birthday-alya.vercel.app`) so the preview image resolves
to the correct absolute URL.

## Project structure

```
app/
  layout.tsx             - fonts, metadata, mounts SmoothScroll/CursorTrail
  globals.css             - all styling & animation
  page.tsx                - the loading → lock → intro → main stage flow
  opengraph-image.tsx     - preview image shown when the link is shared
  icon.tsx                 - favicon
components/
  LoadingScreen.tsx        - the brief opening loading screen
  PinScreen.tsx            - the optional PIN lock screen
  IntroScreen.tsx          - the "Open your gift" opening screen
  Hero.tsx                 - name, age, date, main photo
  LoveLetter.tsx           - love letter with reveal-on-scroll
  ReasonsWhy.tsx           - flip cards, a short reason on the back of each
  Gallery.tsx              - photo gallery + Lightbox.tsx (accessible lightbox)
  Timeline.tsx             - relationship timeline + DaysTogetherCounter.tsx + NextMeetupCountdown.tsx
  Distance.tsx             - a note about the long distance part
  ReunionList.tsx          - numbered list of things to do at the reunion
  Wishes.tsx               - the wish list
  Surprise.tsx             - virtual hug + secret message + sweet line generator + FloatingHearts/Confetti
  Closing.tsx              - closing, "watch again" button, & footer
  MusicPlayer.tsx          - play/pause/mute controls
  PhotoFrame.tsx           - photo frame with a fallback for empty photos
  Reveal.tsx               - bouncy scroll-reveal animation helper
  KineticText.tsx          - splits headlines into letters that tumble in
  SmoothScroll.tsx         - sets up Lenis inertia scrolling + GSAP sync
  CursorTrail.tsx          - little hearts/sparkles that follow the cursor (desktop)
  lenis-singleton.ts       - shared handle to the Lenis instance
  DaysTogetherCounter.tsx  - the real-time days-together counter
  icons.tsx                - SVG icons (no extra dependency)
data/
  content.ts       - THE ONLY place to edit name/text/dates/photos/music
public/
  photos/          - put photo files here
  music/           - put music files here
```

## Animation

This site leans hard into motion. Scrolling itself is buttery-smooth
inertia scrolling via [Lenis](https://lenis.darkroom.engineering)
([components/SmoothScroll.tsx](components/SmoothScroll.tsx)), synced to
GSAP's ticker so every scroll-triggered animation stays perfectly in
step. On top of that, [GSAP](https://gsap.com) drives:

- Bouncy scroll reveals with a bit of tumble/rotation in [components/Reveal.tsx](components/Reveal.tsx) (`fade`, `pop`, `bounce`, `wiggle` variants).
- Big kinetic headlines that pop in letter-by-letter in [components/KineticText.tsx](components/KineticText.tsx), used for the Hero name and every section title.
- The gift-opening sequence in [components/IntroScreen.tsx](components/IntroScreen.tsx).
- Floating hearts in [components/FloatingHearts.tsx](components/FloatingHearts.tsx) and a little heart/sparkle trail that follows the cursor in [components/CursorTrail.tsx](components/CursorTrail.tsx) (desktop only).
- The timeline line that "draws itself" while scrolling in [components/Timeline.tsx](components/Timeline.tsx).

Plus continuous idle wiggles (photo frames float, chips wobble, heart
icons beat) via plain CSS, and one gentle sparkle accent from
`lottie-react` ([components/Sparkle.tsx](components/Sparkle.tsx), its
animation data in [public/lottie/sparkle.json](public/lottie/sparkle.json))
around the name in the Hero and the closing title. All of it is
automatically reduced or disabled — including Lenis and the cursor
trail — if the visitor has `prefers-reduced-motion` enabled.

## Accessibility & performance notes

- Full keyboard navigation support (visible focus states, Escape closes the lightbox, ArrowLeft/ArrowRight navigate photos).
- Respects `prefers-reduced-motion`: animation is reduced/disabled automatically.
- Photos use lazy loading and `next/image` for performance.
- Buttons have a minimum 44px touch target, with tooltips on less-common icons.
