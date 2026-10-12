import { useCallback, useEffect, useState } from 'react'
import { zones } from '../data/casaSelva'

const PARAM = 'zone'
const DEFAULT_ZONE_ID = 'living'

function readZoneFromUrl() {
  const id = new URLSearchParams(window.location.search).get(PARAM)
  return zones.some((zone) => zone.id === id) ? id! : DEFAULT_ZONE_ID
}

/** Selected zone, mirrored in `?zone=` so any zone can be shared as a deep link. */
export function useSelectedZone() {
  const [zoneId, setZoneId] = useState(readZoneFromUrl)

  useEffect(() => {
    const onPopState = () => setZoneId(readZoneFromUrl())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const selectZone = useCallback((id: string) => {
    setZoneId(id)
    const url = new URL(window.location.href)
    url.searchParams.set(PARAM, id)
    window.history.replaceState(null, '', url)
  }, [])

  const zone = zones.find((candidate) => candidate.id === zoneId)!
  return { zone, selectZone }
}
