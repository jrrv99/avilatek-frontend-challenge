import { NextResponse } from 'next/server';

import { flightService } from '@/services/flight.service';
import type { FlightsResponse } from '@/types/flights.types';

/**
 * Handles GET requests to fetch flight data.
 *
 * This function processes query parameters from the request URL to determine
 * how to fetch and format flight data. It supports fetching raw flight data,
 * filtering by destination or class, or returning all flights. The response
 * includes metadata like the total number of flights and the destination filter (if applied).
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const responseStyle = searchParams.get('response_style') || 'normalized';
    const destination = searchParams.get('destination');
    const flightClass = searchParams.get('class');

    let flights;

    // Fetch raw flight data if requested
    if (responseStyle === 'raw') {
      flights = await flightService.getRawFlights();
      return NextResponse.json(flights);
    }

    // Fetch flights filtered by destination or class, or fetch all flights
    if (destination) {
      flights = await flightService.getFlightsByDestination(destination);
    } else if (flightClass) {
      flights = await flightService.getFlightsByClass(flightClass);
    } else {
      flights = await flightService.getAllFlights();
    }

    const response: FlightsResponse = {
      flights,
      total: flights.length,
      destination: destination || undefined,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch flights data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
