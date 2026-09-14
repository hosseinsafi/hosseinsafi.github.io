# hsafi.com

Jekyll rebuild of the personal site: neutral palette, one serif for headings,
a three-prompt "Ask" landing (who / what he works on / what's new), and an
`/updates/` feed for milestones and short notes.

## Before you deploy

1. **Photo is already included** — `assets/profile-photo.jpg` is copied from
   the existing repo, same path it used before, so nothing to do here. It's
   also reused as the Open Graph share image; swap in a wider 1200×630 image
   there later if you want a nicer link-preview.
2. **Spot-check the copy** in `index.html` and the two seed posts in `_posts/`
   against how you'd describe things today — everything numeric was
   deliberately stripped out, so if you want a figure back in, add it
   yourself rather than restoring the old text.
3. **The three old graphic PNGs** (`owc_graphic.png`, `6g_network_graphic.png`,
   `analytics_graphic.png`) are no longer referenced now that the Visual
   Identity section is gone. They're ~2MB each — fine to delete from the repo
   once you're happy with the new site, or leave them if you'd rather not
   touch history right now.

## Preview locally

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Add an update

Create a new file in `_posts/` named `YYYY-MM-DD-a-short-slug.md`:

```markdown
---
title: "Talk at some conference"
date: 2026-11-03
type: Talk          # optional — Milestone, Talk, Paper, Note, etc.
link: https://example.com/the-actual-source   # optional
---

One or two sentences on what this is. This text is what shows on the
`/updates/` page and, if it's the newest, in the "What's new?" tab on
the homepage.
```

Commit and push — GitHub Pages rebuilds automatically. The homepage always
shows the 3 most recent posts under "What's new?"; `/updates/` lists
everything, grouped by year. An RSS feed is generated automatically at
`/feed.xml`.

## Structure

```
_config.yml         site settings
index.html           homepage: hero, Ask, Work, Experience, Contact
updates.html          /updates/ — full list, grouped by year
_layouts/default.html  page shell (header, footer, fonts, CSS/JS includes)
_layouts/post.html     individual update page
_posts/                one file per update
assets/css/style.css   all styling
assets/js/ask.js       Ask tab switching + one-time typewriter effect
assets/js/main.js      email copy button
favicon.svg
```

## Deploying

This repo is `hosseinsafi.github.io` — a user Pages site, so GitHub already
builds and serves it from the root of `main` automatically. No Pages
settings to change. Keep `CNAME` as-is (it points at hsafi.com). Copy these
files into the repo, commit, and push to `main` — the live site updates in
a minute or two.
