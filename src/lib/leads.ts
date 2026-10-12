// Lead capture. The pilot stores leads locally and hands off to WhatsApp;
// swap `saveLead` for a Supabase insert (table: leads) + n8n webhook later.
import { property, zones } from '../data/casaSelva'
import type { Lead, LeadInterest } from '../types/showroom'
import { trackEvent } from './analytics'
import { getBrokerRef } from './brokerRef'
import { whatsappChatUrl } from './whatsapp'

const STORAGE_KEY = 'showroom.leads'

export const interestLabels: Record<LeadInterest, string> = {
  visit: 'Agendar una visita',
  price: 'Recibir precio y condiciones',
  info: 'Más información',
}

export type LeadInput = Pick<Lead, 'name' | 'phone' | 'email' | 'interest' | 'message' | 'zoneId'>

function saveLead(lead: Lead) {
  try {
    const leads: Lead[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    leads.push(lead)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  } catch {
    // The WhatsApp hand-off still delivers the lead if storage fails.
  }
}

function buildWhatsappMessage(lead: Lead) {
  const zoneName = zones.find((zone) => zone.id === lead.zoneId)?.name
  const lines = [
    `Hola, soy ${lead.name}. Me interesa ${property.name}.`,
    `Quiero: ${interestLabels[lead.interest].toLowerCase()}.`,
    zoneName && `Me gustó especialmente: ${zoneName}.`,
    lead.message && `Mensaje: ${lead.message}`,
    `Teléfono: ${lead.phone}`,
    lead.email && `Correo: ${lead.email}`,
    lead.brokerRef && `Código de asesor: ${lead.brokerRef}`,
  ]
  return lines.filter(Boolean).join('\n')
}

/** Persists the lead and returns the WhatsApp URL that completes the hand-off. */
export function submitLead(input: LeadInput): string {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    propertySlug: property.slug,
    brokerRef: getBrokerRef(),
    createdAt: new Date().toISOString(),
  }
  saveLead(lead)
  trackEvent('lead_submit', { interest: lead.interest, zoneId: lead.zoneId ?? '' })
  return whatsappChatUrl(buildWhatsappMessage(lead))
}
