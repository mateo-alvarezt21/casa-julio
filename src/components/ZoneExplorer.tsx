import { Check, MessageCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { floors, zones } from '../data/casaSelva'
import { trackEvent } from '../lib/analytics'
import { mediaAlt, thumbUrl } from '../lib/media'
import type { Zone } from '../types/showroom'
import { FloorPlan } from './FloorPlan'
import { Lightbox } from './Lightbox'
import { ZoneCard } from './ZoneCard'
import { ZoneFeature } from './ZoneFeature'

interface ZoneExplorerProps {
  zone: Zone
  onSelectZone: (zoneId: string) => void
  onInterested: (zoneId: string) => void
}

const sortedFloors = [...floors].sort((a, b) => a.sortOrder - b.sortOrder)

const galleryIdsOf = (zone: Zone) => [...zone.mediaIds, ...(zone.lightVariants?.map((variant) => variant.mediaId) ?? [])]

export function ZoneExplorer({ zone, onSelectZone, onInterested }: ZoneExplorerProps) {
  const featureRef = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<{ zoneId: string; mediaId: string } | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const floor = sortedFloors.find((candidate) => candidate.id === zone.floorId)!
  const floorZones = zones.filter((candidate) => candidate.floorId === floor.id)
  const sideZones = floorZones.filter((candidate) => candidate.id !== zone.id).slice(0, 2)
  const stripZones = zones.filter((candidate) => candidate.id !== zone.id && !sideZones.includes(candidate))
  const galleryIds = galleryIdsOf(zone)
  const variantImageId = variant?.zoneId === zone.id ? variant.mediaId : null

  const selectZone = (zoneId: string) => {
    onSelectZone(zoneId)
    trackEvent('zone_open', { zoneId })
    // Bring the featured card into view when the pick happened far from it (strip, plan on mobile).
    requestAnimationFrame(() => {
      const top = featureRef.current?.getBoundingClientRect().top ?? 0
      if (top < 0 || top > window.innerHeight * 0.4) featureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const selectFloor = (floorId: string) => {
    const firstZone = zones.find((candidate) => candidate.floorId === floorId)
    if (!firstZone) return
    onSelectZone(firstZone.id)
    trackEvent('floor_change', { floorId })
  }

  return (
    <section id="recorrido" className="scroll-mt-20 px-4 pt-24 pb-24 sm:px-8 lg:px-[72px]" aria-labelledby="explorer-title">
      <div className="mx-auto flex max-w-[1296px] flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.32em] text-wood uppercase">Recorrido por zonas</p>
            <h2 id="explorer-title" className="mt-3 font-display text-5xl leading-none sm:text-7xl">
              {zones.length} espacios,
              <br />
              <span className="text-wood italic">un solo bosque.</span>
            </h2>
          </div>
          <div className="inline-flex gap-1 self-start rounded-full border border-mist/20 p-1.5 sm:self-auto" role="tablist" aria-label="Pisos">
            {sortedFloors.map((candidate) => {
              const isActive = candidate.id === floor.id
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  key={candidate.id}
                  onClick={() => selectFloor(candidate.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:px-6 ${
                    isActive ? 'bg-mist text-night' : 'text-mist/70 hover:text-mist'
                  }`}
                >
                  {candidate.shortLabel}
                </button>
              )
            })}
          </div>
        </div>

        <div ref={featureRef} className="grid scroll-mt-24 gap-6 lg:h-[640px] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <ZoneFeature
            key={zone.id}
            zone={zone}
            variantImageId={variantImageId}
            onSelectVariant={(mediaId) => setVariant(mediaId ? { zoneId: zone.id, mediaId } : null)}
            onOpenGallery={(mediaId) => setLightboxIndex(Math.max(0, galleryIds.indexOf(mediaId)))}
          />
          <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:gap-6">
            {sideZones.map((candidate) => (
              <ZoneCard key={candidate.id} zone={candidate} size="side" onSelect={selectZone} />
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6">
          <div className="flex flex-col gap-6">
            <p className="max-w-2xl text-lg leading-relaxed text-mist/75">{zone.description}</p>
            <ul className="flex flex-wrap gap-2">
              {zone.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-1.5 rounded-full border border-mist/15 px-3.5 py-1.5 text-sm">
                  <Check className="size-3.5 text-leaf" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-2" aria-label="Fotos del espacio">
              {zone.mediaIds.map((id, index) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setLightboxIndex(index)}
                  className="h-20 w-28 shrink-0 overflow-hidden rounded-[4px] opacity-80 transition-opacity hover:opacity-100"
                  aria-label={`Ampliar foto ${index + 1} de ${zone.name}`}
                >
                  <img src={thumbUrl(id)} alt={mediaAlt(id)} className="size-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onInterested(zone.id)}
              className="flex items-center gap-2 self-start rounded-full border border-wood px-6 py-3 text-sm font-semibold text-wood transition-colors hover:bg-wood hover:text-night"
            >
              <MessageCircle className="size-4" />
              Me interesa este espacio
            </button>
          </div>

          <div>
            <p className="mb-3 text-xs tracking-[0.24em] text-mist/60 uppercase">Plano · {floor.label}</p>
            <div className="overflow-hidden rounded-[4px] border border-mist/10 bg-forest">
              <FloorPlan floor={floor} zones={floorZones} selectedZoneId={zone.id} onSelectZone={selectZone} />
            </div>
            <p className="mt-2 text-xs text-mist/50">Plano esquemático, no a escala.</p>
          </div>
        </div>

        <div className="border-t border-mist/15 pt-10">
          <h3 className="font-display text-3xl">Más espacios</h3>
          <ul className="scrollbar-thin mt-6 grid auto-cols-[minmax(160px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-3 lg:auto-cols-[calc((100%-4rem)/5)]">
            {stripZones.map((candidate) => (
              <li key={candidate.id}>
                <ZoneCard zone={candidate} size="strip" onSelect={selectZone} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox imageIds={galleryIds} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </section>
  )
}
