import { NextResponse } from 'next/server';

import { flightService } from '@/services/flight.service';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    const { slug } = await params;

    const flight = await flightService.getFlightBySlug(slug);

    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    return NextResponse.json(flight);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch flight data' },
      { status: 500 },
    );
  }
}
