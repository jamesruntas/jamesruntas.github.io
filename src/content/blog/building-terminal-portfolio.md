---
title: "Building a terminal-themed portfolio with Astro"
date: "2025-03-01"
excerpt: "Why I rebuilt my portfolio to look like an IDE, and what I learned along the way."
tags: ["Astro", "Design", "Portfolio"]
---

# Building a terminal-themed portfolio with Astro

When I decided to rebuild my portfolio, I wanted something that felt genuinely *me* — not another card-grid-on-white-background developer site.

I came across the [Georgian AI Lab site](https://lab.georgian.io/) and immediately loved the concept: a fake terminal UI where the navigation is a file tree and content renders like a markdown preview pane. For a developer portfolio, the meta is perfect.

## Why Astro?

Astro is ideal for a portfolio + blog setup for a few reasons:

- **Zero JS by default** — static HTML, fast as possible
- **Native Markdown support** — blog posts are just `.md` files
- **GitHub Pages friendly** — static output, no server needed
- **Familiar syntax** — if you know HTML and CSS, you're 90% there

## The design system

The colour palette is **Solarized Light** — a warm cream background with carefully chosen accent colours that are easy on the eyes. I paired it with:

- `Press Start 2P` for pixel-art hero headings
- `JetBrains Mono` for all body text — keeping the terminal feel consistent

## What I learned

The biggest challenge was making the layout feel genuinely like an IDE without being annoying to use. A few decisions that helped:

1. Keep the sidebar navigation simple — one file per section
2. The fake traffic lights and breadcrumb sell the illusion without getting in the way
3. Monospace fonts everywhere makes even plain paragraphs feel intentional

Overall, this was one of the most fun projects I've built. The constraint of "make it look like a terminal" forced creative decisions I wouldn't have made otherwise.

---

*Thanks for reading. If you have questions, [reach out](/contact).*
