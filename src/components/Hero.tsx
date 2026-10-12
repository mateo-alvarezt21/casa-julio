import { ArrowRight, Pause, Play } from 'lucide-react'
import { heroReel, property } from '../data/casaSelva'
import { formatNumber, formatPrice, formatPriceShort } from '../lib/format'
import { useHeroReel } from '../hooks/useHeroReel'
import { videoPosterUrl, videoUrl } from '../lib/media'

const operationLabel = { sale: 'En venta', rent: 'En arriendo' } as const

const { specs } = property
const heroStats = [
  specs.builtAreaM2 && { label: 'Construidos', value: `${formatNumber(specs.builtAreaM2)} m²` },
  specs.lotAreaM2 && { label: 'Lote', value: `${formatNumber(specs.lotAreaM2)} m²` },
  specs.bedrooms && { label: 'Habitaciones', value: String(specs.bedrooms) },
  specs.bathrooms && { label: 'Baños', value: property.specNotes?.bathrooms ? `${specs.bathrooms} + 1` : String(specs.bathrooms) },
].filter((stat): stat is { label: string; value: string } => Boolean(stat))

interface HeroProps {
  onOpenZone: (zoneId: string) => void
}

export function Hero({ onOpenZone }: HeroProps) {
  const reel = useHeroReel(heroReel.length)
  const current = heroReel[reel.index]

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0" aria-hidden="true">
        {heroReel.map((item, index) => {
          const isActive = index === reel.index
          const shouldLoad = isActive || index === reel.nextIndex
          return (
            <video
              key={item.videoId}
              ref={reel.registerVideo(index)}
              src={shouldLoad ? videoUrl(item.videoId) : undefined}
              poster={videoPosterUrl(item.videoId)}
              muted
              playsInline
              autoPlay={isActive && reel.isPlaying}
              preload={shouldLoad ? 'auto' : 'none'}
              onCanPlay={isActive ? reel.onCanPlay : undefined}
              onTimeUpdate={isActive ? reel.onTimeUpdate : undefined}
              onEnded={isActive ? reel.next : undefined}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-[1400ms] ease-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )
        })}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,17,14,0.6)_0%,rgba(11,17,14,0.05)_32%,rgba(11,17,14,0.4)_62%,#0b110e_100%)]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 pt-28 pb-10 sm:px-8 lg:px-[72px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-medium tracking-[0.32em] text-wood uppercase">
              {operationLabel[property.operation]} · {property.location.city}
            </p>
            <h1 id="hero-title" className="font-display text-[5.5rem] leading-[0.88] tracking-[-0.03em] sm:text-[8rem] lg:text-[11rem]">
              {property.name.split(' ')[0]}
              <br />
              <span className="pl-[0.7em] italic">{property.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="max-w-[32rem] text-lg leading-relaxed text-mist/80">
              Hacienda de dos niveles en 9.000 m² de bosque tropical. Un paisajismo hecho con tres viveros completos.
            </p>
          </div>

          <div className="flex w-full flex-col gap-5 rounded-[4px] border border-wood/35 bg-night/60 p-7 backdrop-blur-md sm:max-w-[360px]">
            <div>
              <p className="text-xs tracking-[0.24em] text-mist/60 uppercase">Precio</p>
              <p className="mt-1.5 font-display text-[2.75rem] leading-none text-wood">{formatPriceShort(property.price)}</p>
              <p className="mt-1.5 text-sm text-mist/60">{formatPrice(property.price, property.currency)} COP</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 border-t border-mist/15 pt-5">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-[1.75rem] leading-tight">{stat.value}</dd>
                  <dt className="text-xs text-mist/60">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <a
              href="#recorrido"
              className="flex justify-center rounded-full bg-wood py-4 font-semibold text-night transition-colors hover:bg-mist"
            >
              Recorrer la casa
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-mist/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={reel.togglePlaying}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-mist/40 transition-colors hover:border-mist"
              aria-label={reel.isPlaying ? 'Pausar videos' : 'Reproducir videos'}
            >
              {reel.isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
            </button>
            <div aria-live="polite">
              <p className="text-xs tracking-[0.24em] text-leaf uppercase">
                {String(reel.index + 1).padStart(2, '0')} / {String(heroReel.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={() => onOpenZone(current.zoneId)}
                className="group flex items-center gap-2 font-display text-2xl"
              >
                {current.label}
                <ArrowRight className="size-4 text-wood transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="flex gap-1.5" role="group" aria-label="Videos de la portada">
            {heroReel.map((item, index) => (
              <button
                type="button"
                key={item.videoId}
                onClick={() => reel.goTo(index)}
                className="group relative h-8 w-7 sm:w-10"
                aria-label={`Ver video: ${item.label}`}
                aria-current={index === reel.index}
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden bg-mist/25 group-hover:bg-mist/50">
                  <span
                    className="block h-full bg-wood"
                    style={{ width: index < reel.index ? '100%' : index === reel.index ? `${reel.progress * 100}%` : '0%' }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
