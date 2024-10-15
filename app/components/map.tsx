// /app/components/Map.tsx
import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void
}

export function Map({ onLocationSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
    })

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 }, // Center of India
          zoom: 5,
        })

        map.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            onLocationSelect(e.latLng.lat(), e.latLng.lng())
          }
        })
      }
    })
  }, [onLocationSelect])

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
}
