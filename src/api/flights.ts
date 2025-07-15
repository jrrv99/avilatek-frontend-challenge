import type {
  DestinationsResponse,
  FlightsResponse,
  NormalizedFlight,
} from '@/types/flights.types';

enum FlightsApi {
  GetFlights = '/api/flights/',
  GetFlightBySlug = '/api/flights/:slug/',
  GetDestinations = '/api/flights/destinations/',
  GetDestinationBySlug = '/api/flights/destinations/:slug/',
}

export const getDestinations = async (): Promise<DestinationsResponse> => {
  const response = await fetch(FlightsApi.GetDestinations);

  if (!response.ok) {
    throw new Error('Failed to fetch destinations');
  }

  return response.json() as Promise<DestinationsResponse>;
};

export const getDestinationBySlug = async (
  slug: string,
): Promise<FlightsResponse> => {
  const url = FlightsApi.GetDestinationBySlug.replace(':slug', slug);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch destination with slug: ${slug}`);
  }

  return response.json() as Promise<FlightsResponse>;
};

export const getFlightBySlug = async (
  slug: string,
): Promise<NormalizedFlight> => {
  const url = FlightsApi.GetFlightBySlug.replace(':slug', slug);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch flight with slug: ${slug}`);
  }

  return response.json() as Promise<NormalizedFlight>;
};
