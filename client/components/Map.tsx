import { useRef, useEffect } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { createMapLibreGlMapController } from '@maptiler/geocoding-control/maplibregl-controller'
import type { MapController } from '@maptiler/geocoding-control/types'

import { MaplibreLegendControl } from '@watergis/maplibre-gl-legend'

interface MapTilerProps {
  setCoordinates: (coords: { lat: number; lng: number } | null) => void
  initialCoordinates?: { lat: number; lng: number } | null
  setMapController: (controller: MapController | null) => void
}

function MapTiler({
  setCoordinates,
  setMapController,
  initialCoordinates,
}: MapTilerProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const zoom = 14

  maptilersdk.config.apiKey = 'aRttS83mbQ8qdXahgTPf'

  useEffect(() => {
    if (map.current) return

    const center = initialCoordinates ?? { lat: -38.656, lng: 178.015 }

    map.current = new maptilersdk.Map({
      container: mapContainer.current as HTMLElement,
      style: '8eeb818c-c20a-45e2-9e8c-ea10590ce10a',
      center: [center.lng, center.lat],
      zoom: zoom,
      terrain: true,
      terrainControl: true,
      pitch: 70,
      bearing: -100.86,
      maxPitch: 85,
      maxZoom: 25,
    })

    const controller = createMapLibreGlMapController(map.current, maptilersdk)
    setMapController(controller)

    map.current.on('load', () => {
      const targets = {
        Contour: 'Contours',
        'Doc recreational hunting permit areas': 'Public Hunting-spots',
        'gizzy-layer': 'Gisborne Satelite',

        Satellite: 'satellite',
      }
      const options = {
        showDefault: true,
        showCheckbox: true,
        onlyRendered: false,
        reverseOrder: true,
      }
      const legendControl = new MaplibreLegendControl(targets, options)
      map.current?.addControl(
        legendControl as unknown as maptilersdk.IControl,
        'top-right'
      )
    })

    map.current.on('load', () => {
      map.current?.addSource('tms-source', {
        type: 'raster',
        tiles: [
          'https://tiles-cdn.koordinates.com/services;key=74deadc977294b07a253636d74f9c9de/tiles/v4/layer=118823/EPSG:3857/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
      })
      map.current?.addLayer({
        id: 'gizzy-layer',
        type: 'raster',
        source: 'tms-source',
        paint: {},
        layout: {
          visibility: 'none',
        },
      })
    })

    map.current.on('click', () => {
      console.log('map clciked', map.current)
    })

    console.log(map.current)

    map.current.on('moveend', () => {
      const center = map.current?.getCenter()
      if (center) {
        const lat = center.lat
        const lng = center.lng
        setCoordinates({ lat, lng })
      }
    })
  }, [initialCoordinates, setCoordinates, setMapController])

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  )
}

export default MapTiler
