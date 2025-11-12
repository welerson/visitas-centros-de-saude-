
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HealthCenter extends Coordinates {
  id: number;
  nome: string;
  visited: boolean;
  visitedBy?: VTR;
  visitedAt?: Date;
}

export enum VTR {
  Alfa = "VTR Alfa",
  Bravo = "VTR Bravo",
}

export interface Visit {
  viatura: VTR;
  centroSaude: string;
  timestamp: Date;
  latitude: number;
  longitude: number;
}
