# Building a Self-Hosted Personal Media Server

**Tags:** homelab, self-hosting, networking, docker, automation  
**Date:** March 2026  

---
## The Final Stack

| Component | Tool | Purpose | Cost |
|---|---|---|---|
| iPhone sync | Syncthing + Möbius Sync | Auto-sync photos/videos over Wi-Fi | Free + ~$4 |
| Primary storage | SSD #1 | All media lives here | Hardware owned |
| Backup | Robocopy /E + Task Scheduler | Nightly non-destructive backup | Free |
| Redundant storage | SSD #2 | Backup drive, never deletes | Hardware owned |
| Google migration | Google Takeout + GPTH | One-time 80GB import with metadata | Free |
| Photo browsing | Immich (Docker) | Self-hosted Google Photos | Free |
| Media streaming | Jellyfin (Docker) | Self-hosted Netflix | Free |
| Remote access | Tailscale | Encrypted tunnel from anywhere | Free |

**Total ongoing cost: $0/month** (down from Google's storage subscription)

---

## What This Replaces

- ❌ Google Photos → ✅ Immich
- ❌ Netflix / streaming subscriptions → ✅ Jellyfin  
- ❌ iCloud backup → ✅ Syncthing

---
## The Problem

Like a lot of people, I'd been paying Google for expanded storage for years just to keep my iPhone photos and videos backed up. It worked fine, until it didn't. When I started running out of space again and faced yet another storage tier upgrade, I decided to stop paying indefinitely for something I could solve once with hardware I already owned.

I had two SSDs sitting in my daily-use PC with ample free space. The goal was simple on paper: get my media off Google, onto local storage, backed up redundantly, and accessible from my phone wherever I am. 

---

## Iteration 1: The Core Sync & Backup Problem

The first goal was: automate iPhone photo sync to the PC and create a redundant backup on the second SSD.

### Tools chosen
- **Syncthing** — open source, peer-to-peer file sync
- **Möbius Sync** — the iOS Syncthing client (~$5)
- **Robocopy** — Windows built-in file copy utility
- **Windows Task Scheduler** — to automate the nightly backup

### How it works
Syncthing runs as a background service on the PC. Möbius Sync runs on the iPhone. When both are on the same Wi-Fi network, new photos and videos sync automatically to a folder on SSD #1. Robocopy then mirrors that folder to SSD #2 on a nightly schedule.

### The first real challenge: Windows reserved characters
Almost immediately, certain files refused to sync. The error was:

---

## The Google Photos Migration

With the sync pipeline working, the next task was migrating 80GB of existing media from Google Photos. This involved a tool called **GPTH (Google Photos Takeout Helper)**  an open source utility that solves a non-obvious problem with Google Takeout exports.

When Google exports your library, it separates metadata from the actual files. Your photos come as JPGs, but the original date, GPS coordinates, and album info live in separate `.json` sidecar files. Import those JPGs without processing them first and every photo in your library shows today's date.

GPTH reads each sidecar file, embeds the metadata back into the photo or video, organizes everything into `YYYY/MM` folders, and removes duplicates. It's an essential step that isn't obvious from Google's export UI.

---

### Tailscale - the networking layer
Tailscale creates a private encrypted network (a "tailnet") between your devices over the internet. Install it on the PC and iPhone, sign in with the same account, and your PC gets a stable private IP address accessible from anywhere. no port forwarding, no dynamic DNS, no router configuration.

```

One interesting diagnostic moment: the initial connection worked but showed `relay "tor"` rather than `direct`. This means traffic was routing through Tailscale's Toronto relay server rather than directly between devices — adding latency. The cause is typically a router blocking UDP port 41641. For photo browsing and video streaming the relay is functional, though a direct connection is preferable. Fixing it requires a port forwarding rule on the router, which is optional.

```
### Immich - self-hosted Google Photos
Immich is a free, open source, self-hosted photo management application that runs in Docker. The mobile app is genuinely excellent - face recognition, map view, memories, shared albums. It's the closest thing to Google Photos without Google.

Getting Immich configured correctly took a few iterations:

**The external library problem** - the goal was to point Immich at the existing `C:\PhoneMedia` folder rather than having it import and duplicate everything. But Immich won't let you use its upload folder as an external library simultaneously. The solution was to separate the two concerns in the config:

---

## Iteration 3: The Full Media Server

Once Tailscale was working and Immich was running, the logical extension became obvious: Tailscale doesn't just expose Immich - it exposes the entire PC. My movies and tv shows could be served over exactly the same tunnel.

### Jellyfin - self-hosted Netflix
Jellyfin is a free, open source media server. No subscription, no tracking, no paywalls. It automatically pulls in posters, descriptions, ratings, and subtitles for your local movie and TV collection, presenting them in a polished Netflix-style interface.

Setup was a single Docker command:

```powershell
docker run -d `
  --name jellyfin `
  --restart unless-stopped `
  -p 8096:8096 `
  -v "C:\Docker\jellyfin\config:/config" `
  -v "C:\Docker\jellyfin\cache:/cache" `
  -v "F:\Movies & TV:/media/movies" `
  jellyfin/jellyfin
```

### Plex sucks 
Plex was briefly considered as a simpler all-in-one alternative for photos, videos, movies and tv. Research quickly revealed that Plex has moved its remote streaming features behind a paid subscription and its photo management app had overwhelmingly negative reviews. Jellyfin has no tiers, no paywalls, and is entirely community-driven.

---

## An Unexpected Gotcha: Docker Memory Usage

After getting everything running, Task Manager showed **VmmemWSL** consuming 16GB of RAM before Immich and Jellyfin were even fully configured. This is a well-known Docker Desktop on Windows quirk that isn't obvious until you notice it.

The actual Docker container usage was only 3.35GB. The VM was holding onto the rest as a buffer.

### The fix — .wslconfig
WSL2 respects a config file placed in your Windows user profile folder:

```ini
# C:\Users\YourName\.wslconfig
[wsl2]
memory=6GB
processors=2
swap=2GB
```

Restart Docker Desktop from the system tray. VmmemWSL drops to the capped value immediately.

### Sizing guidance
Since actual container usage was 3.35GB, 6GB gives comfortable headroom for Immich's machine learning jobs (face recognition runs periodically and spikes memory) and Jellyfin transcoding, without wasting RAM on a PC used for other tasks daily.

Worth noting: the biggest memory consumer inside Docker is **Immich's machine learning container**, which runs the AI models for face detection and smart photo search. If you don't need those features, disabling that container entirely in `docker-compose.yml` saves more space.

---

## Key Takeaways

If you're running out of Google storage and have a PC with spare drives, this stack is worth the setup time. The total cost after the initial configuration is zero, your data never leaves your home network, and the experience is genuinely close to the commercial alternatives it replaces.

The hardest part isn't any individual step - it's knowing which tools to reach for and how they fit together. Hopefully this writeup saves someone else that discovery time.

---