import { GeocodingControl } from '@maptiler/geocoding-control/react'
import type { MapController } from '@maptiler/geocoding-control/types'
import '@maptiler/geocoding-control/style.css'
import logo from '../../images/Logo.png'
// import '../custom-geocoding-control.css'

interface NavProps {
  mapController: MapController | null
  setShowMapTiler: (show: boolean) => void
  showMapTiler: boolean
}

function Nav({ mapController, setShowMapTiler, showMapTiler }: NavProps) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="weka maps logo"></img>
      </div>
      <div className="navbar-search">
        {mapController && (
          <GeocodingControl
            apiKey={'aRttS83mbQ8qdXahgTPf'}
            mapController={mapController}
          />
        )}
      </div>
      <div className="navbar-buttons">
        <button onClick={() => setShowMapTiler(!showMapTiler)}>
          {showMapTiler ? 'Show Windy' : 'Show MapTiler'}
        </button>
      </div>
    </nav>
  )
}

export default Nav
