import { Play } from 'lucide-react'
import { floors } from '../data/casaSelva'
import { imageUrl, mediaAlt, thumbUrl } from '../lib/media'
import { zoneNumber } from '../lib/zones'
import type { Zone } from '../types/showroom'

interface ZoneCardProps {
  zone: Zone
  size: 'side' | 'strip'
  onSelect: (zoneId: string) => void
}

/** Clickable photo card for a zone: the two cards beside the featured zone, or one in the bottom strip. */
export function ZoneCard({ zone, size, onSelect }: ZoneCardProps) {
  const coverId = zone.mediaIds[0]
  const floorLabel = floors.find((floor) => floor.id === zone.floorId)?.shortLabel

  if (size === 'strip') {
    return (
      <button type="button" onClick={() => onSelect(zone.id)} className="group flex w-full flex-col gap-3 text-left">
        <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-forest">
          <img
            src={thumbUrl(coverId)}
            alt={mediaAlt(coverId)}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {zone.videoId && (
            <span className="absolute right-2 bottom-2 flex size-7 items-center justify-center rounded-full bg-night/60 backdrop-blur">
              <Play className="size-3 fill-current" />
            </span>
          )}
        </span>
        <span className="text-[15px] leading-snug transition-colors group-hover:text-wood">{zone.name}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(zone.id)}
      className="group relative block min-h-[220px] w-full flex-1 overflow-hidden rounded-[4px] bg-forest text-left"
    >
      <img
        src={imageUrl(coverId)}
        alt={mediaAlt(coverId)}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,17,14,0.85)_0%,rgba(11,17,14,0)_60%)]" />
      <span className="absolute bottom-6 left-7 right-7">
        <span className="block text-xs tracking-[0.28em] text-leaf uppercase">
          {zoneNumber(zone.id)} · {floorLabel}
        </span>
        <span className="mt-1 block font-display text-[2rem] leading-tight transition-colors group-hover:text-wood">
          {zone.name}
        </span>
      </span>
    </button>
  )
}
