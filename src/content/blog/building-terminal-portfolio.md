---
title: "Building My Portfolio: From Terminal UI to Custom Domain"
date: "2026-03-12"
excerpt: "How I built a terminal-themed portfolio with Astro, GitHub Pages, Cloudflare"
tags: ["Astro", "GitHub Pages", "Cloudflare"]
---

# Building My Portfolio: From Terminal UI to Custom Domain

When I decided to rebuild my portfolio, I wanted something that felt genuinely interesting, not another portfolio site as I had previously made throughout the years. As someone who spends most of their professional life evaluating technical R&D, I wanted the portfolio itself to feel like a technical artifact, something I could add modules to over time, not just a online resume, but a breathing website of cool stuff.

I came across the [Georgian AI Lab site](https://lab.georgian.io/) and immediately loved the concept: a fake terminal UI where the navigation is a file tree and content renders like a markdown preview pane. The color palette also reminded me of 80s personal computing.  

---

## The Design System

1. Keep sidebar navigation simple — one `.md` file per section
2. The traffic lights and breadcrumb sell the illusion without getting in the way of content
3. Monospace fonts everywhere makes even plain paragraphs feel intentional

---

## Why Astro?

For a portfolio with a blog, Astro is the ideal choice:

- **Zero JS by default** — ships static HTML, as fast as possible
- **Native Markdown support** — blog posts are just `.md` files with frontmatter
- **GitHub Pages friendly** — static output, no server required
- **Familiar syntax** — if you know HTML and CSS, you're 90% there

The project structure ended up clean and intuitive:

```
src/
  layouts/
    Base.astro          ← terminal window chrome wrapping every page
  pages/
    index.astro         ← about
    projects.astro
    experience.astro
    contact.astro
    blog/
      index.astro       ← accordion blog listing
  content/
    blog/
      *.md              ← blog posts live here
  styles/
    global.css          ← CSS variables, Solarized palette, typography
```

---

## Hosting: GitHub Pages

GitHub Pages is free, reliable, and deploys automatically via GitHub Actions on every `git push`. The deploy workflow does three things on every push to `main`:

1. Checks out the repo and sets up Node 22
2. Runs `npm run build` to generate the static `dist/` folder
3. Deploys the build artifact to GitHub Pages

One gotcha: Astro now requires **Node 22** minimum. The GitHub Actions default was Node 20, which caused an initial build failure. A one-line change in the workflow fixed it.

---

## Custom Domain: Squarespace + Cloudflare

The domain `jamesruntas.ca` was registered through **Squarespace Domains**. Rather than using Squarespace's default DNS, I moved management to **Cloudflare** for better performance, free SSL, and email routing.

In Cloudflare DNS I added four **A records** pointing to GitHub's Pages servers and one **CNAME** pointing `www` to `jamesruntas.github.io`. GitHub provisions the SSL certificate automatically once the DNS check passes.

### Free Custom Email

Rather than paying for Google Workspace, I used **Cloudflare Email Routing** to get `me@jamesruntas.ca` for free. It forwards inbound mail to my personal Gmail. To also *send* from the address inside Gmail, I used Gmail's **Send mail as** feature with Google's SMTP server and an App Password.

One tip nobody tells you: when Google shows you the 16-character App Password formatted as `abcd efgh ijkl mnop`, enter it **without spaces**. That cost me a few minutes in google forums/articles.


## The Honest Summary

The total cost of this portfolio: **~$15/yr CAD** for the optional custom domain. Everything else hosting, SSL, DNS, email routing is free. The build took a single session of 1 hour from blank page to live site. Could I have used an AI website for everything and completed this instantly? yes, but I wanted to mess around. 

---

