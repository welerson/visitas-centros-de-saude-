import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { HealthCenter, Coordinates, VTR } from '../types';
import { PinIcon, PoliceCarIcon } from './Icons';

interface MapComponentProps {
  healthCenters: HealthCenter[];
  currentLocation: Coordinates | null;
  selectedVTR: VTR;
}

const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const createDivIcon = (iconComponent: React.ReactElement, size: [number, number]) => {
  return L.divIcon({
    html: renderToStaticMarkup(iconComponent),
    className: 'leaflet-div-icon',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]], // Anchor at bottom-center
    popupAnchor: [0, -size[1]],
  });
};

const MapComponent: React.FC<MapComponentProps> = ({ healthCenters, currentLocation, selectedVTR }) => {
  
  const icons = useMemo(() => ({
    unvisited: createDivIcon(<PinIcon color="#4f46e5" />, [32, 32]), // Indigo 600
    visited: createDivIcon(<PinIcon color="#16a34a" />, [32, 32]), // Green 600
    current: createDivIcon(<PoliceCarIcon color={selectedVTR === VTR.Alfa ? '#facc15' : '#38bdf8'} />, [40, 40]), // Yellow-400 or Sky-400
  }), [selectedVTR]);

  return (
    <MapContainer center={[currentLocation?.lat ?? -19.811, currentLocation?.lng ?? -43.979]} zoom={14} scrollWheelZoom={true} className="z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {healthCenters.map((center) => (
        <Marker
          key={center.id}
          position={[center.lat, center.lng]}
          icon={center.visited ? icons.visited : icons.unvisited}
        >
          <Popup>
            <div className="font-sans font-bold">{center.nome}</div>
            {center.visited && center.visitedBy && center.visitedAt && (
                <div className="text-sm">
                    Última visita: {center.visitedBy} em {center.visitedAt.toLocaleTimeString('pt-BR')}
                </div>
            )}
          </Popup>
        </Marker>
      ))}

      {currentLocation && (
        <Marker 
            position={[currentLocation.lat, currentLocation.lng]} 
            icon={icons.current}
            zIndexOffset={1000}
        >
            <Popup>{selectedVTR}</Popup>
        </Marker>
      )}

      {currentLocation && <RecenterAutomatically lat={currentLocation.lat} lng={currentLocation.lng} />}
    </MapContainer>
  );
};

export default MapComponent;