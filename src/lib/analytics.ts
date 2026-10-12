// Minimal visit analytics. Events are buffered in localStorage for the pilot;
// replace `persist` with a Supabase insert (table: events) for production.
import { getBrokerRef } from './brokerRef'

export type AnalyticsEvent =
  | 'page_view'
  | 'zone_open'
  | 'floor_change'
  | 'video_play'
  | 'light_variant'
  | 'share_open'
  | 'whatsapp_click'
  | 'lead_submit'

interface StoredEvent {
  name: AnalyticsEvent
  payload: Record<string, string>
  brokerRef: string | null
  at: string
}

const STORAGE_KEY = 'showroom.events'
const MAX_EVENTS = 500

function persist(event: StoredEvent) {
  try {
    const events: StoredEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    events.push(event)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)))
  } catch {
    // Storage can be unavailable (private mode); analytics must never break the page.
  }
}

export function trackEvent(name: AnalyticsEvent, payload: Record<string, string> = {}) {
  const event: StoredEvent = { name, payload, brokerRef: getBrokerRef(), at: new Date().toISOString() }
  if (import.meta.env.DEV) console.debug('[analytics]', name, payload)
  persist(event)
}
