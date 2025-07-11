import { redirect } from 'next/navigation';

import { FlightRoutes } from '@/app/flights/routes';

export default function AddPage() {
  redirect(FlightRoutes.TRAVEL_INFORMATION);
}
