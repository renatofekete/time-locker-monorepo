import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngBoundsExpression } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const locations = [
  { id: 1, name: "Izolirka", lat: 45.7712, lng: 18.61311 },
  { id: 2, name: "Muzej Slavonije", lat: 45.56067, lng: 18.6995 },
];

const FitBounds = ({ bounds }: { bounds: LatLngBoundsExpression }) => {
  const map = useMap();
  map.fitBounds(bounds);
  return null;
};

const MapView = () => {
  const bounds: [number, number][] = locations.map((loc) => [loc.lat, loc.lng]);
  return (
    <MapContainer style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitBounds bounds={bounds} />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
