---
title: "Plex Alternative Iteration 1: The Google Migration Problem"
date: "2026-03-20"
excerpt: "Getting it out is a known pain point and an opportunity to deliver immediate value on day one of the app."
---

## Current Migration Flow
1. Navigate to takeout.google.com and figure out which options to select
2. Wait hours or days for Google to prepare the export
3. Download multiple ZIPs, sometimes 20+ for large libraries, up to 70GB
4. Extract each ZIP manually
5. Install and run GPTH (a command line Python tool) to reconcile metadata
6. Manually move processed files into the right folder
7. Hope nothing went wrong

Most non-technical users either don't know GPTH exists or can't use it. They end up importing photos with wrong dates, losing GPS data, or giving up entirely.

---

### Proposed Solution
Four steps requiring zero technical knowledge and zero Google API access:
1. Guided Takeout request. An in-app walkthrough with annotated screenshots showing exactly what to select on takeout.google.com. The user can't get it wrong.
2. Drag and drop all ZIPs at once. The user selects their entire Takeout download folder. The app finds the ZIPs, extracts them, and handles everything from there.
3. Automated JSON reconciliation. The GPTH metadata logic: reading each .json sidecar, embedding original dates and GPS back into the media file, removing duplicates. Can run natively inside the app, silently, with a progress bar.
4. Preview before import. Before touching anything, show the user exactly what will be imported. Flag duplicates against their existing library. Show files with missing or suspicious dates. Let them review and confirm. Never auto-delete anything.

---


### Why Takeout Over API-Based Migration
Connecting directly to Google Photos via API sounds cleaner but has real problems:

1. Requires OAuth, API keys, and ongoing Google dependency
2. Subject to Google's API terms of service and rate limits
3. Google can revoke access or change the API at any time
4. Raises legitimate privacy questions about what the app does with Google credentials

The Takeout approach sidesteps all of these. No API access, no Google credentials, zero ToS risk, works entirely offline. The app never connects to Google at all. The user retrieves their own data, hands it to the app, and the app processes it entirely offline.
"Drop your Takeout folder here and we'll handle the rest" is a 10x better experience than what even technical users go through today.

---

### Phase 1 Addition Takeout Importer
This belongs in Phase 1, not as a later feature. It's the migration path every new user needs:

 ZIP detection and extraction from a dropped folder
 Native GPTH-equivalent JSON reconciliation engine
 Duplicate detection against existing library
 Import preview UI with per-file flagging
 Progress tracking for large libraries (80GB+ takes time)

 ---