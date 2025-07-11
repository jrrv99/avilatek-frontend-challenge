import type {
  RawFlight,
  NormalizedFlight,
  Destination,
} from '@/types/flights.types';

/**
 * Utility function to create a slug (URL-friendly string) from a given text.
 * Converts text to lowercase, replaces spaces with dashes, and removes invalid characters.
 */
export const createSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

/**
 * Function to normalize raw flight data into a structured format.
 * Adds unique IDs, slugs for destination and class, and a timestamp for creation.
 */
export const normalizeFlights = (rawFlights: RawFlight[]): NormalizedFlight[] =>
  rawFlights.map((flight, index) => ({
    // Generate a unique ID using destination, class, and index.
    id: `${createSlug(flight.destination)}-${createSlug(flight.class)}-${index}`,
    destination: flight.destination,
    destinationSlug: createSlug(flight.destination), // Slugified destination name.
    class: flight.class,
    classSlug: createSlug(flight.class), // Slugified flight class.
    priceUSD: flight.priceUSD,
    createdAt: new Date().toISOString(), // Timestamp for when the flight was normalized.
  }));

/**
 * Function to extract destination data from normalized flights.
 * Groups flights by destination and calculates aggregated data like price range and available classes.
 */
export const extractDestinations = (
  flights: NormalizedFlight[],
): Destination[] => {
  // Create a map to group flights by destination slug.
  const destinationMap = new Map<
    string,
    {
      flights: NormalizedFlight[];
      prices: number[];
      classes: Set<string>;
    }
  >();

  // Iterate over flights to populate the destination map.
  flights.forEach(flight => {
    const key = flight.destinationSlug; // Use destination slug as the key.
    if (!destinationMap.has(key)) {
      // Initialize the destination entry if it doesn't exist.
      destinationMap.set(key, {
        flights: [],
        prices: [],
        classes: new Set(),
      });
    }

    // Retrieve the destination entry and update its data.
    const dest = destinationMap.get(key)!;
    dest.flights.push(flight); // Add the flight to the list.
    dest.prices.push(flight.priceUSD); // Add the flight price to the list.
    dest.classes.add(flight.class); // Add the flight class to the set.
  });

  // Convert the map entries into an array of destination objects.
  return Array.from(destinationMap.entries()).map(([slug, data]) => ({
    id: slug, // Destination slug as the unique ID.
    name: data.flights[0].destination, // Use the name from the first flight.
    slug, // Destination slug.
    flightCount: data.flights.length, // Total number of flights for this destination.
    minPrice: Math.min(...data.prices),
    maxPrice: Math.max(...data.prices),
    availableClasses: Array.from(data.classes), // List of unique flight classes.
  }));
};
