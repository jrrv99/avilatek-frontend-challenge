import { NextResponse } from 'next/server';

import { flightService } from '@/services/flight.service';
import type { DestinationsResponse } from '@/types/flights.types';

/**
 * Handles GET requests to fetch flight destinations.
 *
 * This function retrieves a list of destinations from the flight service,
 * formats the response with the total count of destinations.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const destinations = await flightService.getDestinations();

    const response: DestinationsResponse = {
      destinations,
      total: destinations.length,
    };

    return NextResponse.json(response);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch destinations data' },
      { status: 500 },
    );
  }
}
