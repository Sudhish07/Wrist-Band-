import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

function MapPage() {
  const lat = 10.02
  const lng = 76.3

  return (
    <div className="container">
      <h1>User Location</h1>

      <div className="map">
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[lat, lng]}>
            <Popup>User Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default MapPage
