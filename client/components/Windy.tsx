import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    windyInit: (
      options: Record<string, any>,
      callback: (windyAPI: any) => void
    ) => void
  }
  const L: any
}

interface WindyProps {
  coordinates: { lat: number; lng: number } | null
}

const apiKey = 'KWp1v5jd8qR6BpQwSozw9F2oGVcUmhK6'

function Windy({ coordinates }: WindyProps) {
  const windyRef = useRef(null)
  const [windyAPI, setWindyAPI] = useState<any>(null)

  useEffect(() => {
    if (!windyRef.current) return

    const options = {
      key: apiKey,
      verbose: true,
      lat: coordinates?.lat ?? -38.6,
      lon: coordinates?.lng ?? 178.0,
      zoom: 11,
    }

    window.windyInit(options, (windyApi) => {
      setWindyAPI(windyApi)
    })
  }, [])

  useEffect(() => {
    if (windyAPI) {
      const { map } = windyAPI
      map.setView([coordinates!.lat, coordinates!.lng], 11)
    }
  }, [coordinates, windyAPI])

  return <div ref={windyRef} id="windy"></div>
}
export default Windy
