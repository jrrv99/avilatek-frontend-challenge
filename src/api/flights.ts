import type {
  DestinationsResponse,
  FlightsResponse,
} from '@/types/flights.types';

enum FlightsApi {
  GetFlights = '/api/flights/',
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
