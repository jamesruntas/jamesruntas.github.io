---
title: "A Free, Open Source Plex Alternative That Actually Installs Like Plex"
date: "2026-03-20"
excerpt: "The tools to replace Plex already exist. The gap is purely in packaging."
---

## The Problem

### Starting Point: The Data Privacy Awakening

For most people, the path to self-hosted media starts the same way. You're paying Google, Apple, or Amazon a monthly fee to store your photos and videos. The price keeps creeping up, the storage limits feel arbitrary, and somewhere in the back of your mind you know that a company with an advertising business model is sitting on your entire photo library.

The alternative storing everything yourself on hardware you own sounds appealing in principle. No subscriptions, no storage limits, no third party with access to your data. Your files, on your drives, in your home.

The problem is getting there.

---

### Attempt 1: Plex

Plex is the obvious first stop. It's been around since 2009, has polished apps on every platform, and the setup experience is genuinely good — download an installer, point it at your media folders, done. For years it was free and it worked.

Then the core feature that makes a home media server actually useful moved behind a Plex Pass subscription. The photo management app they released to compete with Google Photos is widely regarded as poor. The product has drifted toward a hybrid streaming service, away from its roots as a self-hosted tool.

For someone trying to escape subscription-based media storage, discovering that the most accessible self-hosted solution also requires a subscription is a frustrating dead end.

---

### Attempt 2: Building Your Own

The free alternatives to Plex are excellent:

- **Immich** — a self-hosted Google Photos replacement with face recognition, map view, and a polished mobile app
- **Jellyfin** — a fully free, open source Plex fork with no paywalls and no tracking
- **Syncthing** — automatic file sync between devices over any network
- **Tailscale** — encrypted remote access without port forwarding or dynamic DNS

On paper, these four tools together do everything Plex does and more, for free, forever. In practice, getting them working together requires:

- Installing and configuring Docker Desktop on Windows
- Understanding Docker Compose files and volume mounts
- Configuring WSL2 memory limits to prevent RAM exhaustion
- Setting up Tailscale and diagnosing relay vs direct connections
- Debugging Windows reserved character issues in filenames from iOS
- Understanding the difference between Immich's upload folder and external libraries
- Writing and scheduling Robocopy scripts for redundant backups
- Configuring firewall rules for each service port

This is not a weekend afternoon. This is a multi-day project that requires comfort with terminals, networking concepts, and Docker a skillset that most people trying to leave Google Photos simply don't have. Further, leaving Google Photos requires a VERY cumbersome process. Google has implemented anti-competitive practices that makes extracting your data painful. You request zip files of your media that are emailed to you within a few minutes. However, they intially seperate the jpg/mp4s from the metadata, which are JSON files. Someone even made a script, GPTH (Google Photos Takeout Helper) that goes and reconciles the JSON into the media files. 

> The tools are free. The knowledge to use them is not.

---

## The Gap in the Market

### What Plex Proved

Plex demonstrated conclusively that there is significant consumer demand for a self-hosted media server with a polished install experience. Millions of people have paid for Plex Pass. The market is real and validated.

### What the Free Alternatives Got Wrong

The homelab community runs almost exclusively on Linux. Docker is native, terminals are comfortable, and the idea of a one-click installer is somewhat foreign to the culture. As a result, every major free alternative assumes a level of technical knowledge that excludes the mainstream consumer market.

CasaOS and Umbrel solve this for Linux, they wrap multiple services in a clean dashboard with one-click installs. Nothing equivalent exists for Windows, which is the operating system on the vast majority of consumer PCs.

### The Specific Gap

**A free, open source alternative to Plex that installs as simply as Plex.**

Not a new media server. Not new technology. The underlying tools already exist and are mature. The gap is purely in packaging and user experience.

The person who builds a Plex-style installer for Jellyfin + Immich + Syncthing + Tailscale with a companion iOS app wins by default. Because Jellyfin already technically outperforms Plex. Immich already outperforms any photo tool Plex has ever offered. The only thing Plex has is the install experience and brand recognition.

### Demand Signals

- Plex Pass pricing changes triggered significant user backlash and migration discussions across Reddit, Hacker News, and tech forums
- The r/selfhosted and r/homelab communities are large and growing but skew heavily technical
- Google Photos storage price increases in 2021 drove millions of users to seek alternatives
- Apple iCloud's pricing and privacy practices are ongoing friction points for iPhone users
- No mainstream Windows-native self-hosted media solution exists
- Growing distrust in Apple and Google data privacy
- Significantly reduced cost and access to TB-sized SSDs
- Growing number of tech-savvy Gen-Z with gaming PCs with ample storage

---

## The Proposed Solution

A two-component product: a **Windows desktop app** and an **iOS companion app** that delivers the full self-hosted media server experience with a Plex-level install experience, at no cost.

### User Experience Vision

**Windows:** Download a single `.exe`. Run it. Point it at your media folders. Done. No terminal, no Docker, no networking knowledge. Everything runs as a native Windows service in the background.

**iOS:** Download the app. Open it. Scan a QR code shown by the Windows app. Done. Photos start syncing automatically. Your full media library is accessible from anywhere.

**First-time setup target: under 10 minutes.**

---

## Technical Architecture

### Design Principles

- **No Docker dependency** — Docker is a technical barrier for mainstream users. All components run natively on Windows.
- **No terminal required** — setup and configuration happen entirely through a GUI
- **No router configuration** — remote access works out of the box without port forwarding
- **Single installer** — one `.exe` installs and configures everything
- **Open source** — free forever, no paywalls, no premium tiers

---

### Component Breakdown

#### 1. Photo & Video Indexing *(replacing Immich)*

Rather than bundling Immich — which requires Docker and a Linux environment — build a lightweight native Windows equivalent using proven open source libraries.

| Tool | Purpose | Licence |
|------|---------|---------|
| SQLite | Zero-config embedded database, stores file index, metadata, thumbnails | Public domain |
| ExifTool | Battle-tested metadata extraction from HEIC, MOV, JPEG, RAW | Artistic |
| libvips | Fast thumbnail generation, handles every major image format | LGPL |
| GPTH | extracts and reconciles google takeout media | open source|

**What it does:**
- Watches the media folder for new files
- Extracts metadata on arrival
- Generates thumbnails for fast browsing
- Exposes a JSON API that the iOS app consumes
- Drag and Drop Google Takeout ZIP into the system

**GPTH Iteration 1:**
I also want to implement the GPTH in this solution. The good news is that I can implement this securely, with no access to users google account, or dealing with API. After digging around, the only viable solution is to require users to go through the zip email process, and then they can drag/drop into the windows app where the reconciliation is performed. I poked around for an equivalent iCloud migration, and it may be possible to do iCloud migration on the mobile device, rather than windows. Which is ideal. 
 

*Engineering effort: 3–4 weeks for a solid implementation.*

---

#### 2. Movie & TV Library *(replacing Jellyfin)*

Jellyfin's core job is scanning video files, scraping metadata, and streaming. Each of these is individually straightforward.

| Tool | Purpose | Licence |
|------|---------|---------|
| FFmpeg | Industry standard video transcoding and streaming | LGPL |
| TMDB API | Free API for posters, descriptions, cast, ratings, episode info | Free |

**What it does:**
- Scans configured folders for video files
- Matches filenames against TMDB to identify movies and TV episodes
- Fetches and caches metadata and artwork
- Streams video to the iOS app via HTTP, transcoding on the fly if needed

*Engineering effort: 4–6 weeks for solid metadata matching and streaming.*

---

#### 3. File Sync *(replacing Syncthing)*

**Option A — Embed Syncthing binary**
Syncthing is written in Go and ships as a single binary. Bundle it inside the Windows installer and manage it as a background service. On iOS, the Syncthing Go library can be compiled via gomobile. MPL-2.0 licence, permissive, no AGPL complications.

**Option B — Custom sync protocol**
A simpler HTTPS-based push from iOS to the Windows server. Less robust than Syncthing (no delta sync, no conflict resolution) but much less complexity. Viable for V1 where the use case is one-directional, iPhone uploads to PC.

**Recommendation:** Custom sync protocol for V1 (simpler, faster to build), migrate to embedded Syncthing for V2.

---

#### 4. Remote Access *(replacing Tailscale)*

**tsnet** Tailscale's open source Go library that embeds Tailscale networking directly into an application. BSD-3 licence, fully permissive.

Both the Windows app and iOS app embed tsnet. They find each other automatically using Tailscale's coordination server. The user still needs a Tailscale account but authentication happens inside the app no separate Tailscale install, no terminal, no router configuration.

*Alternative for V2: Build a custom coordination server and remove the Tailscale account dependency entirely.*

---

### Full Stack Summary

**Windows Application**

| Component | Technology | Licence |
|-----------|-----------|---------|
| App framework | Go + Wails (web UI in a native window) | MIT |
| Photo indexing | SQLite + ExifTool + libvips | Public domain / LGPL |
| Media serving | FFmpeg + TMDB API | LGPL / Free |
| File sync | Custom HTTPS (V1), Syncthing (V2) | — / MPL-2.0 |
| Remote access | tsnet (Tailscale library) | BSD-3 |
| Installer | Inno Setup | Free |

**iOS Application**

| Component | Technology |
|-----------|-----------|
| Framework | Swift + SwiftUI |
| Photo browser | Custom SwiftUI |
| Media player | AVPlayer (native iOS) |
| File sync | Custom HTTPS upload (V1) |
| Remote access | tsnet via gomobile |
| Background operation | Network Extension (VPN entitlement) |

### Licence Compatibility

Every component in the proposed stack is compatible with both open source distribution and commercial use. The deliberate decision to build native replacements for Immich (AGPL) and Jellyfin (GPL) avoids licence complications that would otherwise require open sourcing the entire product or negotiating commercial licences.

---

## What Needs to Be Built

### Phase 1 — Windows Core *(2–3 months)*

The foundation. A working Windows service that indexes media and serves it locally.

- [ ] File watcher and indexer (ExifTool + SQLite)
- [ ] Thumbnail generation pipeline (libvips)
- [ ] JSON API for photo/video browsing
- [ ] FFmpeg streaming endpoint
- [ ] TMDB metadata scraper
- [ ] Basic dashboard UI (Wails + React)
- [ ] Inno Setup installer

**Success criteria:** A non-technical user can install the app and browse their media library in a local browser within 10 minutes.

---

### Phase 2 — Remote Access + iOS MVP *(2–3 months)*

Connect the iPhone to the Windows server from anywhere.

- [ ] tsnet integration on Windows side
- [ ] iOS app — basic photo browser (SwiftUI)
- [ ] iOS app — basic video player (AVPlayer)
- [ ] QR code pairing flow
- [ ] Photo upload from iOS to Windows (HTTPS)
- [ ] Background upload via Network Extension

**Success criteria:** A non-technical user can view their home photo library and stream a movie from their phone while on mobile data.

---

### Phase 3 — Polish + Sync *(2–3 months)*

Make it feel like a product, not a project.

- [ ] Automatic background photo sync (Syncthing embedded)
- [ ] Face detection and grouping
- [ ] Search by date, location, content
- [ ] Shared albums
- [ ] Auto-update mechanism for the Windows service
- [ ] Onboarding flow refinement
- [ ] Performance optimisation for large libraries

**Success criteria:** The experience is indistinguishable from a commercial product.

---

## What This Is Not

**Not a new media server.** The underlying technology is mature and proven. This is a packaging and UX problem.

**Not trying to beat Plex on features.** Plex has a decade head start on features. The differentiator is price (free) and privacy — your data never leaves your home.

**Not for the homelab community.** They already know how to use Jellyfin. This is for the person who tried Plex, found out it costs money, Googled the free alternatives, saw the Docker requirements, and gave up.
