import { property } from '../data/casaSelva'
import { formatNumber, formatPrice } from '../lib/format'
import { imageUrl } from '../lib/media'
import type { PropertySpecs } from '../types/showroom'

const specConfig: Array<{ key: keyof PropertySpecs; label: string; unit?: string }> = [
  { key: 'builtAreaM2', label: 'Área construida', unit: 'm²' },
  { key: 'lotAreaM2', label: 'Lote', unit: 'm²' },
  { key: 'bedrooms', label: 'Habitaciones' },
  { key: 'bathrooms', label: 'Baños' },
  { key: 'parkingSpots', label: 'Parqueaderos' },
  { key: 'floors', label: 'Niveles' },
]

export function PropertySheet() {
  const specs = specConfig.filter((spec) => property.specs[spec.key] !== null)

  return (
    <section id="la-casa" className="scroll-mt-20 bg-forest px-4 py-24 sm:px-8 lg:px-[72px]" aria-labelledby="sheet-title">
      <div className="mx-auto max-w-[1296px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-[72px]">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-medium tracking-[0.32em] text-wood uppercase">La hacienda</p>
            <h2 id="sheet-title" className="font-display text-3xl leading-[1.3] sm:text-[2.15rem]">
              “La casa con mejor decoración del norte de Medellín. Cada espacio está pensado al milímetro.”
            </h2>
            <p className="text-lg leading-relaxed text-mist/72">{property.summary}</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.24em] text-mist/60 uppercase">Precio</p>
                <p className="mt-1 font-display text-[2.4rem] leading-tight text-wood sm:text-5xl">{formatPrice(property.price, property.currency)}</p>
              </div>
              <a
                href="#contacto"
                className="rounded-full border border-wood px-6 py-3 text-sm font-semibold text-wood transition-colors hover:bg-wood hover:text-night"
              >
                Pedir condiciones
              </a>
            </div>

            <dl className="grid grid-cols-2 border-t border-mist/15">
              {specs.map(({ key, label, unit }) => (
                <div key={key} className="border-b border-mist/15 py-5 pr-4">
                  <dt className="text-sm text-mist/60">{label}</dt>
                  <dd className="font-display text-3xl">
                    {formatNumber(property.specs[key]!)}
                    {unit && ` ${unit}`}
                    {property.specNotes?.[key] && <span className="ml-2 font-sans text-sm text-mist/60">{property.specNotes[key]}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            {property.specsDisclaimer && <p className="-mt-4 text-xs text-mist/50">{property.specsDisclaimer}</p>}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[72px]">
          <div>
            <h3 className="text-xs font-medium tracking-[0.32em] text-wood uppercase">Lo que la hace única</h3>
            <ul className="mt-6 flex flex-col">
              {property.features.map((feature) => (
                <li key={feature} className="border-t border-mist/10 py-3 text-[17px] last:border-b">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start">
            <img
              src={imageUrl('aerial-garden')}
              alt="Vista aérea de los jardines"
              className="col-span-2 aspect-[16/9] w-full rounded-[4px] object-cover"
              loading="lazy"
            />
            <img src={imageUrl('pool-lights-blue')} alt="Piscina iluminada" className="aspect-[4/5] w-full rounded-[4px] object-cover" loading="lazy" />
            <img src={imageUrl('master-bath-tub')} alt="Baño de la suite con tina" className="aspect-[4/5] w-full rounded-[4px] object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
