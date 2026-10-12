import { Expand, Pause, Play } from 'lucide-react'
import { useRef, useState, type SyntheticEvent } from 'react'
import { floors } from '../data/casaSelva'
import { trackEvent } from '../lib/analytics'
import { imageUrl, mediaAlt, videoPosterUrl, videoUrl } from '../lib/media'
import { zoneNumber } from '../lib/zones'
import type { Zone } from '../types/showroom'

interface ZoneFeatureProps {
  zone: Zone
  /** Image chosen from the light variants; replaces the video while set. */
  variantImageId: string | null
  /** Null goes back to the video. */
  onSelectVariant: (mediaId: string | null) => void
  onOpenGallery: (mediaId: string) => void
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** The big card of the explorer: the selected zone's video loops muted, with its title over it. */
export function ZoneFeature({ zone, variantImageId, onSelectVariant, onOpenGallery }: ZoneFeatureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion())
  const showVideo = Boolean(zone.videoId) && !variantImageId
  const imageId = variantImageId ?? zone.mediaIds[0]
  const floorLabel = floors.find((floor) => floor.id === zone.floorId)?.label

  const togglePlaying = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => undefined)
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  // Some browsers skip autoplay on the first load; start the clip once it has data.
  const onCanPlay = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (isPlaying && event.currentTarget.paused) event.currentTarget.play().catch(() => setIsPlaying(false))
  }

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[4px] bg-forest sm:min-h-[520px] lg:h-full">
      {showVideo ? (
        <video
          key={zone.videoId}
          ref={videoRef}
          src={videoUrl(zone.videoId!)}
          poster={videoPosterUrl(zone.videoId!)}
          autoPlay={isPlaying}
          muted
          loop
          playsInline
          onCanPlay={onCanPlay}
          onPlay={() => trackEvent('video_play', { zoneId: zone.id })}
          className="absolute inset-0 size-full object-cover"
          aria-label={`Video: ${zone.name}`}
        />
      ) : (
        <img key={imageId} src={imageUrl(imageId)} alt={mediaAlt(imageId)} className="absolute inset-0 size-full object-cover" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,17,14,0.88)_0%,rgba(11,17,14,0)_55%)]" />

      {zone.lightVariants && (
        <div className="absolute top-4 right-4 left-4 flex flex-wrap justify-end gap-2 sm:top-5 sm:right-5 sm:left-5" role="group" aria-label="Color de luces">
          {zone.videoId && variantImageId && (
            <button
              type="button"
              onClick={() => onSelectVariant(null)}
              className="flex items-center gap-2 rounded-full border border-mist/30 bg-night/40 px-3.5 py-1.5 text-sm backdrop-blur-md hover:border-mist/70"
            >
              <Play className="size-3 fill-current" />
              Video
            </button>
          )}
          {zone.lightVariants.map((variant) => {
            const isActive = variantImageId === variant.mediaId
            return (
              <button
                type="button"
                key={variant.mediaId}
                onClick={() => {
                  onSelectVariant(variant.mediaId)
                  trackEvent('light_variant', { zoneId: zone.id, variant: variant.label })
                }}
                aria-pressed={isActive}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm backdrop-blur-md ${
                  isActive ? 'border-mist bg-night/70' : 'border-mist/30 bg-night/40 hover:border-mist/70'
                }`}
              >
                <span className="size-2.5 rounded-full" style={{ background: variant.swatch, boxShadow: `0 0 10px ${variant.swatch}` }} />
                Luces {variant.label.toLowerCase()}
              </button>
            )
          })}
        </div>
      )}

      <div className="absolute right-5 bottom-5 left-5 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:right-10 sm:bottom-10 sm:left-10">
        <div>
          <p className="text-xs tracking-[0.28em] text-leaf uppercase">
            {zoneNumber(zone.id)} · {floorLabel}
          </p>
          <h3 className="mt-2 font-display text-[2.5rem] leading-[1.05] sm:text-[3.5rem]">{zone.name}</h3>
          <p className="mt-2 text-base text-mist/80 sm:text-[17px]">{zone.tagline}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          {showVideo && (
            <button
              type="button"
              onClick={togglePlaying}
              className="flex size-14 items-center justify-center rounded-full border border-mist/60 bg-night/40 backdrop-blur transition-colors hover:border-mist sm:size-[72px]"
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            >
              {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenGallery(imageId)}
            className="flex size-14 items-center justify-center rounded-full border border-mist/60 bg-night/40 backdrop-blur transition-colors hover:border-mist sm:size-[72px]"
            aria-label="Ver galería de fotos"
          >
            <Expand className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
