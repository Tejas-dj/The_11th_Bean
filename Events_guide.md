# Events — Content Guide

> **How to add a new event to the website.**
> Edit the file `data/events.ts` and add a new object to the `events` array.
> Every field is explained below with what to write and why it matters.

---

## Required Fields

### `id`

A unique short slug. No spaces — use hyphens.
Used internally to track which card is expanded, so it must be unique across all events.

```
id: 'jazz-night-july'
id: 'cupping-session-aug'
id: 'makers-market-sep'
```

---

### `title`

The event name. Keep it punchy — this is the big text on the card.

```
title: 'After Hours Jazz Night'
title: 'Saturday Cupping Session'
title: 'Estate to Cup — Chikmagalur Series'
```

---

### `type`

What category the event falls under. Pick exactly one of these three:

| Value           | Label shown on site | When to use                                         |
| --------------- | ------------------- | --------------------------------------------------- |
| `'at-the-bean'` | At The Bean         | Events happening at the cafe itself                 |
| `'collab'`      | Collab              | Co-hosted with another brand, space, or person      |
| `'pop-up'`      | Pop-Up              | One-day drop-ins — markets, guest appearances, etc. |

```
type: 'at-the-bean'
type: 'collab'
type: 'pop-up'
```

---

### `date`

The date of the event in `YYYY-MM-DD` format.
The site uses this for sorting (upcoming first, past events after) and for displaying the formatted date on the card.

```
date: '2025-07-19'
date: '2025-08-03'
```

---

### `time`

Start and end time. Use 12-hour format with an em-dash ( – ) between them.

```
time: '7:30 PM – 10:30 PM'
time: '10:00 AM – 12:00 PM'
time: '9:00 AM – 2:00 PM'
```

---

### `venue`

Where the event is. If it's at the cafe, use the standard form.
For collabs at another location, use the `×` format.

```
venue: 'The 11th Bean, Basavanagudi'
venue: 'The 11th Bean × Brahmagiri Estate, Basavanagudi'
venue: 'Koramangala Indoor Stadium × The 11th Bean'
```

---

### `description`

A 1–2 sentence teaser shown on the card **before** someone expands it.
It should hook — make someone want to read more.

```
description: 'Live jazz trio, low lighting, and the best espresso martini we've ever made.'
description: 'A guided sensory walkthrough of three single-origin beans. No jargon — just your palate.'
```

---

### `longDescription`

The full event write-up. This appears when someone clicks "Read more" on the card.
Use `\n\n` to break between paragraphs.
Write it like a story, not a press release — punchy sentences, honest voice, specific details.

**What to include:**

- What's actually happening (format, structure)
- Who's involved (guest, artist, estate, collaborator — name them)
- Practical info: capacity, what to bring, how to dress, what's available
- A note if it repeats or if there's a follow-up

```
longDescription: `The cafe after dark is a different beast.\n\nWe're partnering with a local jazz trio — piano, bass, brushed drums — for something rare in Basavanagudi. The music will be acoustic and unhurried. The bar will be open.\n\nLimited to 40 guests. Dress however you feel tonight.`
```

---

### `tags`

Short keywords shown as `#tag` pills on the card. Lowercase, no spaces.
Use 3–6 tags. Pick things that are genuinely searchable or descriptive.

```
tags: ['music', 'jazz', 'evening', 'bar']
tags: ['coffee', 'sensory', 'education', 'small-group']
tags: ['market', 'makers', 'outdoor', 'morning']
```

---

### `status`

Controls how the card looks and what buttons appear. Pick one:

| Value        | What it does                                                                    |
| ------------ | ------------------------------------------------------------------------------- |
| `'upcoming'` | Full colour card, RSVP button shows when expanded                               |
| `'sold-out'` | Full colour card + "Sold Out" badge, "Join Waitlist" button shows when expanded |
| `'past'`     | Card is desaturated + "Ended" badge, no RSVP button                             |

```
status: 'upcoming'
status: 'sold-out'
status: 'past'
```

> **Note:** The site does **not** auto-update status based on date. When an event ends, manually change `status` from `'upcoming'` to `'past'`.

---

### `accentColor`

The background colour of the card's top colour band. Use only from the brand palette:

| Color name    | Hex         | Feeling                        |
| ------------- | ----------- | ------------------------------ |
| Espresso      | `'#2A2320'` | Dark, dramatic, late-night     |
| Brick         | `'#A0674B'` | Warm, earthy, daytime sessions |
| Caramel       | `'#8B6D4A'` | Mellow, mid-range, markets     |
| Sage          | `'#B8B394'` | Calm, nature, estate collabs   |
| Rattan / Gold | `'#C8A96E'` | Bright, outdoorsy, sporty      |

```
accentColor: '#2A2320'
accentColor: '#A0674B'
accentColor: '#C8A96E'
```

---

## Optional Fields

### `mascot`

Path to one of the available mascot SVGs. Shown as a small watermark in the top-right of the colour band.
Leave out if none feels right — the card looks fine without it.

**Available mascots:**

```
/mascot/after_hours.svg      → evening / bar events
/mascot/tasting.svg          → cupping / coffee tasting
/mascot/morning.svg          → morning / market events
/mascot/game_night.svg       → community / social nights
/mascot/pickleball.svg       → sport / outdoor collabs
/mascot/Chikmagalur.svg      → estate / origin collabs
/mascot/podcast_host.svg     → panel / talk events
/mascot/pour_over.svg        → coffee-focused sessions
/mascot/blessed.svg          → general / celebratory
/mascot/namaste.svg          → welcome / community
/mascot/stressed.svg         → ??? (use sparingly)
/mascot/empty_cup.svg        → (reserved for empty state)
```

```
mascot: '/mascot/tasting.svg'
mascot: '/mascot/after_hours.svg'
// or leave out entirely:
mascot: undefined
```

---

### `rsvpLink`

The URL where people can RSVP or get tickets. Shown as a button inside the expanded card.

- If there's no link yet, use `'#rsvp-placeholder'` — a "RSVP link coming soon" note will appear automatically.
- For past events, set to `undefined` — no button is shown for past events anyway.

```
rsvpLink: 'https://insider.in/your-event-url'
rsvpLink: '#rsvp-placeholder'   // placeholder — update when link is ready
rsvpLink: undefined              // for past events
```

---

## Full Example Entry

```ts
{
  id: 'jazz-night-july',
  title: 'After Hours Jazz Night',
  type: 'at-the-bean',
  date: '2025-07-19',
  time: '7:30 PM – 10:30 PM',
  venue: 'The 11th Bean, Basavanagudi',
  description: 'Live jazz trio, low lighting, and the best espresso martini we\'ve ever made. An evening where the music and the coffee are equally considered.',
  longDescription: `The cafe after dark is a different beast.\n\nWe're partnering with a local jazz trio — piano, bass, and brushed drums — to bring something rare to Basavanagudi. The music will be acoustic, intimate, and unhurried. The bar will be open.\n\nLimited to 40 guests. The space will be rearranged to face the window-side stage. Bar-only seating available for walk-ins if there's room.\n\nDress: however you feel tonight.`,
  tags: ['music', 'jazz', 'evening', 'bar'],
  status: 'upcoming',
  accentColor: '#A0674B',
  mascot: '/mascot/after_hours.svg',
  rsvpLink: '#rsvp-placeholder',
},
```

---

## Checklist Before Adding an Event

- [ ] `id` is unique — no other event has the same slug
- [ ] `date` is in `YYYY-MM-DD` format
- [ ] `time` uses 12-hour format with `–` separator (not a plain dash)
- [ ] `description` is 1–2 sentences, hooks the reader
- [ ] `longDescription` has paragraphs separated by `\n\n`
- [ ] `accentColor` is from the brand palette (see table above)
- [ ] `status` is set correctly (`upcoming` / `sold-out` / `past`)
- [ ] `rsvpLink` is set to the real URL, a placeholder, or `undefined`
- [ ] When event ends → come back and change `status` to `'past'`
