import { useState } from 'react'
import MapTiler from './Map'
import Nav from './Nav'
import Windy from './Windy'
import { MapController } from '@maptiler/geocoding-control/types'
import TimeWidget from './TimeWidget'

function App() {
  const [showMapTiler, setShowMapTiler] = useState(true)
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [mapController, setMapController] = useState<MapController | null>(null)

  return (
    <div className="App">
      <Nav
        mapController={mapController}
        setShowMapTiler={setShowMapTiler}
        showMapTiler={showMapTiler}
      />

      <div className="map-container">
        {showMapTiler ? (
          <MapTiler
            setCoordinates={setCoordinates}
            initialCoordinates={coordinates}
            setMapController={setMapController}
          />
        ) : (
          <Windy coordinates={coordinates} />
        )}

        <TimeWidget coordinates={coordinates} />
      </div>
    </div>
  )
}

export default App
