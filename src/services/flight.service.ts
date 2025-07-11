import type {
  RawFlight,
  NormalizedFlight,
  Destination,
} from '@/types/flights.types';
import { normalizeFlights, extractDestinations } from '@/utils/flightAdapter';

class FlightService {
  private rawFlights: RawFlight[] = [];
  private normalizedFlights: NormalizedFlight[] = [];
  private destinations: Destination[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetches raw flight data from the external API. Uses caching to avoid unnecessary requests.
   * If the cache is valid, it returns the cached data. Otherwise, it fetches new data,
   * normalizes it, extracts destinations, and updates the cache timestamp.
   * @returns A promise that resolves to an array of raw flight data.
   */
  private async fetchRawFlights(): Promise<RawFlight[]> {
    const now = Date.now();

    // Use cache if available and not expired
    if (
      this.rawFlights.length > 0 &&
      now - this.lastFetch < this.CACHE_DURATION
    ) {
      return this.rawFlights;
    }

    const response = await fetch(
      'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json',
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    this.rawFlights = await response.json();
    this.normalizedFlights = normalizeFlights(this.rawFlights);
    this.destinations = extractDestinations(this.normalizedFlights);
    this.lastFetch = now;

    return this.rawFlights;
  }

  /**
   * Returns the raw flight data. Ensures the data is fetched and cached before returning.
   * @returns A promise that resolves to an array of raw flight data.
   */
  async getRawFlights(): Promise<RawFlight[]> {
    await this.fetchRawFlights();
    return this.rawFlights;
  }

  /**
   * Returns all normalized flight data. Ensures the data is fetched and cached before returning.
   * @returns A promise that resolves to an array of normalized flight data.
   */
  async getAllFlights(): Promise<NormalizedFlight[]> {
    await this.fetchRawFlights();
    return this.normalizedFlights;
  }

  /**
   * Filters and returns flights that match the given destination slug.
   * @param destinationSlug - The slug of the destination to filter flights by.
   * @returns A promise that resolves to an array of flights for the specified destination.
   */
  async getFlightsByDestination(
    destinationSlug: string,
  ): Promise<NormalizedFlight[]> {
    await this.fetchRawFlights();
    return this.normalizedFlights.filter(
      flight => flight.destinationSlug === destinationSlug,
    );
  }

  /**
   * Filters and returns flights that match the given flight class.
   * @param flightClass - The slug of the flight class to filter flights by.
   * @returns A promise that resolves to an array of flights for the specified class.
   */
  async getFlightsByClass(flightClass: string): Promise<NormalizedFlight[]> {
    await this.fetchRawFlights();
    return this.normalizedFlights.filter(
      flight => flight.classSlug === flightClass,
    );
  }

  /**
   * Returns all available destinations extracted from the flight data.
   * Ensures the data is fetched and cached before returning.
   * @returns A promise that resolves to an array of destinations.
   */
  async getDestinations(): Promise<Destination[]> {
    await this.fetchRawFlights();
    return this.destinations;
  }

  /**
   * Finds and returns a destination by its slug. If no destination matches, returns null.
   * @param slug - The slug of the destination to find.
   * @returns A promise that resolves to the destination object or null if not found.
   */
  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    await this.fetchRawFlights();
    return this.destinations.find(dest => dest.slug === slug) || null;
  }
}

export const flightService = new FlightService();
