// types/flights.ts
export interface RawFlight {
  destination: string;
  class: 'Economy' | 'Business' | 'First Class';
  priceUSD: number;
}

export interface NormalizedFlight {
  id: string;
  destination: string;
  destinationSlug: string;
  class: 'Economy' | 'Business' | 'First Class';
  classSlug: string;
  priceUSD: number;
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country?: string;
  flightCount: number;
  minPrice: number;
  maxPrice: number;
  availableClasses: string[];
}

export interface FlightsResponse {
  flights: NormalizedFlight[];
  total: number;
  destination?: string;
}

export interface FlightsError {
  error: string;
  message?: string;
}

export interface DestinationsResponse {
  destinations: Destination[];
  total: number;
}
