import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HealthCenter, Coordinates, VTR, Visit } from './types';
import { HEALTH_CENTERS_DATA, PROXIMITY_THRESHOLD_METERS, INITIAL_CENTER } from './constants';
import { calculateDistance } from './services/locationService';
import { generateVisitReport } from './services/pdfService';
import MapComponent from './components/MapComponent';
import { PdfIcon, CheckCircleIcon, AlertTriangleIcon, TargetIcon } from './components/Icons';

const getInitialHealthCenters = (): HealthCenter[] =>
  HEALTH_CENTERS_DATA.map((center, index) => ({
    ...center,
    id: index,
    visited: false,
  }));

function App() {
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>(getInitialHealthCenters());
  const [visits, setVisits] = useState<Visit[]>([]);
  const [vehicleLocations, setVehicleLocations] = useState<{ [key in VTR]?: Coordinates }>({
    [VTR.Alfa]: INITIAL_CENTER,
    [VTR.Bravo]: { lat: INITIAL_CENTER.lat + 0.005, lng: INITIAL_CENTER.lng + 0.005 }, // Start slightly offset
  });
  const [selectedVTR, setSelectedVTR] = useState<VTR>(VTR.Alfa);
  const [nearbyCenter, setNearbyCenter] = useState<HealthCenter | null>(null);
  const [nextRecommendedCenter, setNextRecommendedCenter] = useState<HealthCenter | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const currentLocation = vehicleLocations[selectedVTR] ?? null;

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setVehicleLocations(prev => ({
          ...prev,
          [selectedVTR]: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }));
        setLocationError(null);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        setLocationError(`Erro de localização: ${error.message}.`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [selectedVTR]); // Rerun when the controlled VTR changes

  useEffect(() => {
    if (!currentLocation) return;

    let closestUnvisitedCenter: HealthCenter | null = null;
    let minDistanceToUnvisited = Infinity;
    let foundNearbyCenter: HealthCenter | null = null;
    
    // Proximity check for ANY center based on the controlled vehicle
    for (const center of healthCenters) {
        const distance = calculateDistance(currentLocation, center);
        if (distance <= PROXIMITY_THRESHOLD_METERS) {
            if (!foundNearbyCenter || distance < calculateDistance(currentLocation, foundNearbyCenter)) {
                foundNearbyCenter = center;
            }
        }
    }

    // Recommendation for UNVISITED centers
    healthCenters
      .filter(c => !c.visited)
      .forEach(center => {
        const distance = calculateDistance(currentLocation, center);
        if (distance < minDistanceToUnvisited) {
          minDistanceToUnvisited = distance;
          closestUnvisitedCenter = center;
        }
      });

    setNearbyCenter(foundNearbyCenter);
    setNextRecommendedCenter(closestUnvisitedCenter);

  }, [currentLocation, healthCenters]);

  const handleMarkAsVisited = useCallback(() => {
    if (!nearbyCenter || !currentLocation) return;

    const now = new Date();
    const newVisit: Visit = {
      viatura: selectedVTR,
      centroSaude: nearbyCenter.nome,
      timestamp: now,
      latitude: currentLocation.lat,
      longitude: currentLocation.lng,
    };

    setVisits(prev => [...prev, newVisit]);
    setHealthCenters(prev =>
      prev.map(center =>
        center.id === nearbyCenter.id
          ? { ...center, visited: true, visitedBy: selectedVTR, visitedAt: now }
          : center
      )
    );
  }, [nearbyCenter, currentLocation, selectedVTR]);

  const handleRestartShift = () => {
    setVisits([]);
    setHealthCenters(getInitialHealthCenters());
    setNearbyCenter(null);
    setNextRecommendedCenter(null);
  };

  const unvisitedCenters = useMemo(() => {
    return healthCenters.filter(c => !c.visited).sort((a,b) => a.nome.localeCompare(b.nome));
  }, [healthCenters]);
  
  const sortedVisits = useMemo(() => {
    return [...visits].reverse();
  }, [visits]);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-800 font-sans">
      <header className="bg-slate-900 shadow-lg p-3 flex flex-col sm:flex-row justify-between items-center z-20 text-white gap-3">
        <h1 className="text-xl font-bold text-yellow-400">GCMBH - Monitoramento Venda Nova</h1>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start">
            <label htmlFor="vtr-select" className="text-xs text-slate-400 mb-1">Controlando:</label>
            <select
              id="vtr-select"
              value={selectedVTR} 
              onChange={e => setSelectedVTR(e.target.value as VTR)}
              className="bg-slate-700 border border-slate-600 rounded-md px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value={VTR.Alfa}>VTR Alfa</option>
              <option value={VTR.Bravo}>VTR Bravo</option>
            </select>
          </div>
          <button
            onClick={() => generateVisitReport(visits)}
            disabled={visits.length === 0}
            className="self-end flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            <PdfIcon />
            Baixar PDF
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative">
          {locationError && (
             <div className="absolute top-0 left-0 w-full h-full bg-slate-900/80 z-10 flex items-center justify-center p-4">
                 <p className="text-red-400 text-center font-semibold">{locationError}</p>
             </div>
          )}
          <MapComponent 
            healthCenters={healthCenters} 
            vehicleLocations={vehicleLocations}
            controlledVehicleLocation={currentLocation} 
            selectedVTR={selectedVTR} 
          />
        </div>
        
        <aside className="w-full md:w-1/3 h-1/2 md:h-full flex flex-col bg-slate-900 p-4 overflow-y-auto">
          {nearbyCenter && (
            <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 mb-4 text-center">
              <p className="font-bold text-green-300 mb-2">Você está próximo do ponto!</p>
              <h3 className="text-lg text-white font-semibold mb-3">{nearbyCenter.nome}</h3>
              <button
                onClick={handleMarkAsVisited}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
              >
                Marcar como Visitado ({selectedVTR})
              </button>
            </div>
          )}
          {nextRecommendedCenter && !nearbyCenter && (
             <div className="bg-blue-900/50 border border-blue-500 rounded-lg p-4 mb-4">
               <h3 className="text-lg font-bold text-blue-300 mb-2 flex items-center"><TargetIcon/>Próxima Visita Recomendada</h3>
               <p className="text-white text-md">{nextRecommendedCenter.nome}</p>
             </div>
          )}

          <div className="flex-grow">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-green-400 mb-2 flex items-center"><CheckCircleIcon/>Histórico de Visitas ({visits.length})</h2>
              <ul className="space-y-1 text-sm text-slate-300 max-h-40 overflow-y-auto pr-2">
                {sortedVisits.map((v, i) => (
                    <li key={i} className="truncate">
                        {v.centroSaude} - {v.viatura} às {v.timestamp.toLocaleTimeString('pt-BR')}
                    </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-yellow-400 mb-2 flex items-center"><AlertTriangleIcon/>Não Visitados ({unvisitedCenters.length})</h2>
              <ul className="space-y-1 text-sm text-slate-300">
                {unvisitedCenters.map(c => <li key={c.id} className="truncate">{c.nome}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700">
            <button
              onClick={handleRestartShift}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Reiniciar Turno
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;