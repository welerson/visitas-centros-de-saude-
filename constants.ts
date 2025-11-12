
// FIX: Import `Coordinates` type to resolve missing type error.
import { HealthCenter, Coordinates } from './types';

export const HEALTH_CENTERS_DATA: Omit<HealthCenter, 'id' | 'visited'>[] = [
  { nome: "Centro de Saúde Santa Mônica", lat:-19.829344, lng: -43.976339 },
  { nome: "Centro de Saúde Mantiqueira", lat: -19.799358, lng: -43.979861 },
  { nome: "Centro de Saúde Rio Branco", lat: -19.814254, lng: -43.980278 },
  { nome: "Centro de Saúde Paraúna", lat: -19.802146, lng: -43.980373 },
  { nome: "Centro de Saúde Jardim Europa", lat: -19.800187, lng: -43.967083 },
  { nome: "Centro de Saúde Céu Azul", lat: -19.826790, lng: -44.002248 },
  { nome: "Centro de Saúde Minas Caixa", lat: -19.805076, lng: -43.957837 },
  { nome: "Centro de Saúde Nova York", lat: -19.793873, lng: -43.967963 },
  { nome: "Centro de Saúde Serra Verde", lat: -19.800475, lng: -43.984294 },
  { nome: "Centro de Saúde Santo Antônio", lat: -19.817550, lng: -43.958888 },
  { nome: "Centro de Saúde Copacabana", lat: -19.833916, lng: -43.986110 },
  { nome: "Centro de Saúde Jardim Leblon", lat: -19.825657, lng: -43.987602 },
  { nome: "Centro de Saúde Jardim Comerciários", lat: -19.787791, lng: -43.975886 },
  { nome: "Centro de Saúde Andradas", lat: -19.819354, lng: -43.963084 },
  { nome: "Centro de Saúde Lagoa", lat: -19.809123, lng: -44.001159 },
  { nome: "Centro de Saúde Piratininga", lat: -19.816158, lng: -43.992699 },
  { nome: "Centro de Saúde Alameda dos Ipês", lat: -19.817596, lng: -43.973891 },
  { nome: "Anexo Centro de Saúde Jardim Comerciários", lat: -19.787708, lng: -43.974937 }
];

export const INITIAL_CENTER: Coordinates = { lat: -19.811, lng: -43.979 };
export const PROXIMITY_THRESHOLD_METERS = 50;