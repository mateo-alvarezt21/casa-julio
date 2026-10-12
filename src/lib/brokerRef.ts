// Broker attribution: links like https://.../?ref=juan-perez tag every event
// and lead from that visit with the broker's code.
const STORAGE_KEY = 'showroom.brokerRef'
const REF_PATTERN = /^[a-z0-9-]{2,40}$/i

export function captureBrokerRef() {
  const ref = new URLSearchParams(window.location.search).get('ref')
  if (!ref || !REF_PATTERN.test(ref)) return
  try {
    sessionStorage.setItem(STORAGE_KEY, ref.toLowerCase())
  } catch {
    // Ignore storage failures; attribution is best-effort.
  }
}

export function getBrokerRef(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}
