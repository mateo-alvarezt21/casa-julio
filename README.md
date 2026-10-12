# Virtual Showroom — pilot (Casa Selva)

Zone-based virtual showroom for real estate: schematic floor plan with clickable zones,
per-zone photo gallery + drone video, property sheet, WhatsApp lead capture, broker links
and QR sharing. Roadmap step 1 of the product.

## Commands

```bash
npm install
npm run dev          # http://localhost:5180
npm run build
npm run lint
MEDIA_SOURCE_DIR="C:/Users/Chingoteo/Downloads/contenido" node scripts/build-media.mjs   # [--force]
```

Copy `.env.example` to `.env` and set `VITE_WHATSAPP_NUMBER` (digits only, e.g. `573001234567`).

## Structure

```
scripts/
  media-manifest.mjs   # raw DJI file → web asset id (photos, video stills, clips)
  build-media.mjs      # ffmpeg pipeline → public/media/<slug>/{img,thumb,video}
src/
  types/showroom.ts    # domain model; mirrors future Supabase tables
  data/casaSelva.ts    # property, floors, zones (plan rectangles, media ids)
  lib/                 # media urls, analytics, leads, broker ref, WhatsApp links
  hooks/useSelectedZone.ts   # selected zone ⇄ ?zone= deep link
  components/          # Hero, ZoneExplorer, FloorPlan (SVG), ZonePanel, PropertySheet, LeadForm, ShareDialog
```

## URL parameters

- `?zone=<zoneId>` — opens the showroom on a zone (shared links and QR keep it).
- `?ref=<broker-code>` — tags analytics events and leads with the broker's code.

## Moving to Supabase (step 3)

| Local source | Table |
|---|---|
| `property` | `properties` |
| `floors` | `floors` |
| `zones` | `zones` |
| `media` | `media` (files in Storage) |
| `lib/leads.ts` → `saveLead` | `leads` (+ n8n webhook to WhatsApp/CRM) |
| `lib/analytics.ts` → `persist` | `events` |

## Gaussian splat (step 2)

`Zone.splatUrl` is reserved for a splat scene per zone. The kitchen clips
(`DJI_..._0196_D`, `DJI_..._0197_D`) are the best current candidates.

## Deploy (Docker / Coolify)

Multi-stage `Dockerfile`: Node 24 builds the Vite app, Nginx serves `dist/` on port **80**
(SPA fallback, long cache for `/assets` and `/media`, byte-range video streaming).

```bash
docker build --build-arg VITE_WHATSAPP_NUMBER=573001234567 -t casa-julio .
docker run -p 8080:80 casa-julio
```

In Coolify: new resource → this GitHub repo → Build Pack **Dockerfile** → Ports Exposes `80`.
Add `VITE_WHATSAPP_NUMBER` as an environment variable marked **Build Variable** (Vite inlines it at build time).
