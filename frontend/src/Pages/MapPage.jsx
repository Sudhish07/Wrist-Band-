import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

const DEVICE_LAT = 10.5131464
const DEVICE_LON = 76.2020035
const DEVICE_LOCATION_URL = "https://goo.gl/maps/twrwH1LJfYBB66uG6"

function MapPage() {
  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1>User Location</h1>
        <p>Current location view</p>
      </div>

      <div className="map-page-actions">
        <a
          href={DEVICE_LOCATION_URL}
          target="_blank"
          rel="noreferrer"
          className="location-btn"
        >
          Open in Maps
        </a>
      </div>

      <div className="map">
        <MapContainer
          center={[DEVICE_LAT, DEVICE_LON]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[DEVICE_LAT, DEVICE_LON]}>
            <Popup>
              Device Location <br />
              Lat: {DEVICE_LAT} <br />
              Lng: {DEVICE_LON}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default MapPage
