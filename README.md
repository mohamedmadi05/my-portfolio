# Mohamed Madi — Portfolio Website

A premium, responsive personal portfolio for **Mohamed Madi**, a Digital Development
student and aspiring web developer based in Morocco.

Built with plain **HTML, CSS and JavaScript** — no framework, no build step, no
dependencies. Open `index.html` and it runs.

---

## Contents

```
mohamed-madi-portfolio/
├── index.html                  ← the page (semantic markup)
├── assets/
│   ├── css/styles.css          ← the design system (tokens + components)
│   ├── js/data.js              ← ALL editable content  ⭐ start here
│   ├── js/main.js              ← behaviour (nav, theme, filters, form)
│   ├── img/
│   │   ├── favicon.svg         ← MM monogram
│   │   ├── og-cover.png        ← social sharing image (1200×630)
│   │   ├── project-tamount.svg
│   │   ├── project-interactive.svg
│   │   └── project-portfolio.svg
│   └── CV-Mohamed-Madi.pdf     ← download target for “Download CV”
└── README.md
```

## Quick start

- **Just view it:** double-click `index.html`.
- **Serve it locally** (recommended, so the CV download and fonts behave exactly as in production):

  ```bash
  # Python 3
  python -m http.server 5173
  #   then open http://localhost:5173

  # or Node
  npx serve .
  ```

---

## 1. Editing content — `assets/js/data.js`

Everything you would normally want to change lives in one file. Edit a value,
refresh the page. No tools required.

| What | Where |
|---|---|
| Availability pill text | `SITE.availability` (set `enabled:false` to hide) |
| Contact form delivery | `SITE.formEndpoint` (see §4) |
| Social links | `SOCIALS` (empty `url` hides the icon) |
| Skills | `SKILLS` |
| “Learning next” goals | `LEARNING` |
| Projects | `PROJECTS` |
| Education timeline | `EDUCATION` |
| Languages | `LANGUAGES` |
| Interests | `INTERESTS` |

Prose that is not in a list (the About paragraphs, the Experience section, the hero
copy) lives directly in `index.html` and is clearly commented by section.

---

## 2. Projects — adding links, screenshots, and new projects

### Add a live demo / source link
In `data.js`, find the project and fill in its `links`:

```js
links: {
  live: "https://tamount-store.example.com",   // shows “View Project”
  code: "https://github.com/<user>/<repo>"     // shows “Source Code”
}
```

An empty string (`""`) **hides that button** — there are never dead links. When both
are empty the card shows “Live demo and source links coming soon.”

### Replace the placeholder art with a real screenshot
The three images in `assets/img/project-*.svg` are **temporary design mockups**,
labelled as such on the page. To use a real screenshot:

1. Save it as e.g. `assets/img/tamount-store.png` (landscape, ideally **1200×750**).
2. Point the project at it: `image: "assets/img/tamount-store.png"`.
3. Update the `alt` text in `main.js` if you like — it currently describes the image
   as a placeholder.

### Add a new project
Copy any object inside `PROJECTS` and edit it. It will appear automatically, and its
technologies will be added to the filter bar.

---

## 3. CV, GitHub and LinkedIn

- **CV** — replace `assets/CV-Mohamed-Madi.pdf` with an updated export. The filename
  can stay the same; if you rename it, update the `href` on the **Download CV** button
  in `index.html`.
- **LinkedIn** — already wired to the real profile in `SOCIALS`.
- **GitHub** — no profile was confirmed, so `url` is empty and the icon is hidden.
  Add your URL to reveal it:

  ```js
  { id: "github", label: "GitHub", url: "https://github.com/<user>", icon: "github" }
  ```

---

## 4. The contact form (important — read this)

The form is fully validated on the client, has loading / success / error states, and
**never fakes a success message**.

**Default behaviour (`formEndpoint` empty):** submitting opens the visitor's own email
app with the message pre-filled, and the page says so explicitly. Nothing is sent
silently.

**To send messages for real**, connect a form provider and paste its endpoint:

```js
// data.js
formEndpoint: "https://formspree.io/f/xxxxxxxx"
```

The form then `POST`s JSON and reports the provider's actual response. Any provider
that accepts a JSON `POST` works (Formspree, Getform, Basin, Web3Forms, Netlify Forms,
or your own endpoint). No code changes are needed.

> A static site has no server, so a provider — or your own backend — is required to
> deliver mail. That is the only thing this project cannot do on its own.

---

## 5. Deployment

This is a static site: publish the folder and you are done.

**Netlify** — drag the `mohamed-madi-portfolio` folder onto app.netlify.com/drop, or
connect a Git repo with build command *(none)* and publish directory `.`.

**Vercel** — `vercel` in the project folder; framework preset **Other**, output `.`.

**GitHub Pages** — push the folder to a repo, then Settings → Pages → deploy from
branch, root folder.

**Cloudflare Pages** — connect the repo, leave the build command empty, output `/`.

**After deploying** (recommended):
1. Update `<link rel="canonical">` and the `og:url` in `index.html` to the live URL.
2. Update `SITE.website` in `data.js`.
3. Re-share on LinkedIn — the OG image (`assets/img/og-cover.png`) will appear.

---

## 6. Honest content — what was and wasn't assumed

This build deliberately avoids inventing anything:

- **No fabricated experience.** The automotive workshop is presented as *seasonal work*,
  not a software role. There are no client projects, sales figures, metrics, or
  achievements that were not provided.
- **No invented skills.** Only the technologies you listed are shown as current skills.
  Anything aspirational (React, Node, APIs…) is quarantined in the clearly-labelled
  **“Learning next — goals, not current skills”** box.
- **Projects are labelled “Learning project.”** They are described as practical work,
  and their visuals are marked **Mockup**.
- **Language levels are untouched** (Tamazight native, Arabic advanced, English B2,
  French B1). The small 5-dot indicator is a *presentation* of those stated levels
  (Native 5, Advanced 4, B2 3, B1 2) — not an additional claim. Remove the `dots`
  field if you would rather show text only.
- **Education entries carry no grades, honours or awards**, because none were provided.

---

## 7. Features

- Sticky navigation with active-section highlighting and a working **mobile menu**.
- **Dark theme by default**, with a persistent **light/dark toggle** (saved to
  `localStorage`).
- Animated hero code editor, floating status cards, scroll-reveal on entry.
- **Project filtering** by technology.
- Accessible, validated contact form with real states.
- Back-to-top control, smooth scrolling, keyboard focus styles, skip link.
- Full `prefers-reduced-motion` support.
- SEO: descriptive title, meta description, canonical, Open Graph + Twitter cards,
  JSON-LD `Person` schema, MM-monogram favicon.

## 8. Browser support

Modern evergreen browsers (Chrome/Edge 111+, Firefox 113+, Safari 16.4+). The design
uses `color-mix()` for the skill-tile accents and `overflow: clip`; both degrade
gracefully on older engines.

## 9. Accessibility notes

Semantic landmarks, one `<h1>`, labelled form fields with `aria-invalid` + inline
errors, `aria-live` status region, visible focus rings, decorative SVGs hidden from
assistive tech, and no motion beyond the user's preference.
