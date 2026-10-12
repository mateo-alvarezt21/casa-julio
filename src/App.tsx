import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LeadForm } from './components/LeadForm'
import { PropertySheet } from './components/PropertySheet'
import { ShareDialog } from './components/ShareDialog'
import { ZoneExplorer } from './components/ZoneExplorer'
import { property } from './data/casaSelva'
import { useSelectedZone } from './hooks/useSelectedZone'
import { trackEvent } from './lib/analytics'
import { whatsappChatUrl } from './lib/whatsapp'

export default function App() {
  const { zone, selectZone } = useSelectedZone()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [leadZoneId, setLeadZoneId] = useState<string | null>(null)

  useEffect(() => {
    trackEvent('page_view', { path: window.location.search })
  }, [])

  const openShare = () => {
    setIsShareOpen(true)
    trackEvent('share_open')
  }

  const openZone = (zoneId: string) => {
    selectZone(zoneId)
    trackEvent('zone_open', { zoneId })
    document.getElementById('recorrido')?.scrollIntoView({ behavior: 'smooth' })
  }

  const showInterest = (zoneId: string) => {
    setLeadZoneId(zoneId)
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header onShare={openShare} />
      <main>
        <Hero onOpenZone={openZone} />
        <ZoneExplorer zone={zone} onSelectZone={selectZone} onInterested={showInterest} />
        <PropertySheet />

        <section id="contacto" className="scroll-mt-20 px-4 py-24 sm:px-8 lg:px-[72px]" aria-labelledby="contact-title">
          <div className="mx-auto grid max-w-[1296px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
            <div>
              <p className="text-xs font-medium tracking-[0.32em] text-wood uppercase">Contacto</p>
              <h2 id="contact-title" className="mt-3 font-display text-5xl leading-none sm:text-7xl">
                Conócela
                <br />
                <span className="text-wood italic">en persona.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-mist/70">
                Agenda una visita privada o pide el precio y las condiciones. Te respondemos por WhatsApp.
              </p>
            </div>
            <LeadForm zoneId={leadZoneId} onClearZone={() => setLeadZoneId(null)} />
          </div>
        </section>
      </main>

      <footer className="border-t border-fern px-4 py-8 pb-24 text-center text-sm text-stone sm:px-8">
        {property.name} · Showroom virtual · Imágenes reales de la propiedad
      </footer>

      <a
        href={whatsappChatUrl(`Hola, quiero información sobre ${property.name}.`)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { zoneId: zone.id })}
        className="fixed right-4 bottom-4 z-30 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-night shadow-lg shadow-black/40 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
        aria-label="Escribir por WhatsApp"
      >
        <MessageCircle className="size-6" />
      </a>

      {isShareOpen && <ShareDialog onClose={() => setIsShareOpen(false)} />}
    </>
  )
}
