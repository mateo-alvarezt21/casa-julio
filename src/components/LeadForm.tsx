import { CheckCircle2, Send, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { zones } from '../data/casaSelva'
import { interestLabels, submitLead } from '../lib/leads'
import type { LeadInterest } from '../types/showroom'

interface LeadFormProps {
  zoneId: string | null
  onClearZone: () => void
}

const inputClass =
  'w-full rounded-[4px] border border-fern bg-night px-4 py-3 text-mist placeholder:text-stone/60 focus:border-wood focus:outline-none'

export function LeadForm({ zoneId, onClearZone }: LeadFormProps) {
  const [interest, setInterest] = useState<LeadInterest>('visit')
  const [error, setError] = useState<string | null>(null)
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)
  const zone = zones.find((candidate) => candidate.id === zoneId)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()

    if (name.length < 2) return setError('Escribe tu nombre.')
    if (phone.replace(/\D/g, '').length < 7) return setError('Escribe un teléfono válido.')
    setError(null)

    const url = submitLead({
      name,
      phone,
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      interest,
      zoneId,
    })
    setWhatsappUrl(url)
    window.open(url, '_blank', 'noopener')
  }

  if (whatsappUrl) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[4px] border border-fern bg-forest p-8" role="status">
        <CheckCircle2 className="size-10 text-leaf" />
        <h3 className="font-display text-3xl">¡Gracias! Ya casi está.</h3>
        <p className="text-stone">
          Abrimos WhatsApp con tu mensaje listo. Si no se abrió, usa el botón para enviarlo y un asesor te responderá pronto.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-wood px-6 py-3 font-semibold text-night transition-colors hover:bg-mist"
        >
          Abrir WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[4px] border border-fern bg-forest p-6 sm:p-8" noValidate>
      <fieldset>
        <legend className="mb-3 text-sm text-stone">¿Qué te gustaría?</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(interestLabels) as LeadInterest[]).map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setInterest(option)}
              aria-pressed={interest === option}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                interest === option ? 'border-wood bg-wood/10 text-wood' : 'border-fern text-stone hover:border-stone'
              }`}
            >
              {interestLabels[option]}
            </button>
          ))}
        </div>
      </fieldset>

      {zone && (
        <p className="flex items-center gap-2 self-start rounded-full bg-moss py-1.5 pr-2 pl-4 text-sm">
          Espacio de interés: <strong className="font-semibold text-wood">{zone.name}</strong>
          <button type="button" onClick={onClearZone} className="rounded-full p-1 hover:bg-fern" aria-label="Quitar espacio de interés">
            <X className="size-3.5" />
          </button>
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          Nombre
          <input name="name" autoComplete="name" required className={inputClass} placeholder="Tu nombre" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Teléfono / WhatsApp
          <input name="phone" type="tel" autoComplete="tel" required className={inputClass} placeholder="300 123 4567" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        Correo <span className="text-stone">(opcional)</span>
        <input name="email" type="email" autoComplete="email" className={inputClass} placeholder="tu@correo.com" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Mensaje <span className="text-stone">(opcional)</span>
        <textarea name="message" rows={3} className={inputClass} placeholder="¿Cuándo te gustaría visitarla?" />
      </label>

      {error && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-wood px-6 py-3.5 font-semibold text-night transition-colors hover:bg-mist"
      >
        <Send className="size-4" />
        Enviar por WhatsApp
      </button>
      <p className="text-xs text-stone/70">Usamos tus datos solo para contactarte sobre esta propiedad.</p>
    </form>
  )
}
