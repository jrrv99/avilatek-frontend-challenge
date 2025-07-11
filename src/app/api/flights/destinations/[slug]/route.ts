import { NextResponse } from 'next/server';

import { flightService } from '@/services/flight.service';

/**
 * Defines the structure of the route parameters.
 * `slug` is expected to be a unique identifier for a destination.
 */
interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * Handles GET requests for fetching destination and its related flights.
 *
 * - Extracts the `slug` from the route parameters.
 * - Fetches the destination details using the `slug`.
 * - If the destination is not found, returns a 404 response.
 * - Fetches flights associated with the destination.
 * - Returns the destination details, flights, and the total number of flights.
 *
 * If any error occurs during the process, it returns a 500 response with an error message.
 */
export async function GET(
  _request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    const { slug } = await params;

    const destination = await flightService.getDestinationBySlug(slug); // Fetch destination details.

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 },
      );
    }

    const flights = await flightService.getFlightsByDestination(slug);

    // Return the destination details, flights, and the total number of flights.
    return NextResponse.json({
      destination,
      flights,
      total: flights.length,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch destination data' },
      { status: 500 },
    );
  }
}
