'use client';

import StatusComponent from '@/components/status-component';
import { useBookingFormData } from '@/contexts/flightFormContext';
import useGetFlightBySlug from '@/hooks/useGetFlightBySlug';

import TravelDetails from '../travel-details';

import AdditionalServicesSection from './additional-services-details';
import CostSummarySection from './summary-costs-card';
import TravelersDetailsCard from './travelers-details-card';

const SummaryConfirmationForm = () => {
  const { getCombinedData } = useBookingFormData();
  const bookingFormData = getCombinedData()!;

  const { data: flight, isLoading: isLoadingFlight } = useGetFlightBySlug(
    bookingFormData?.flight_class || '',
  );

  if (isLoadingFlight) {
    return (
      <StatusComponent
        title="Cargando información del vuelo..."
        description="Por favor, espera mientras se cargan los datos."
        type="loading"
      />
    );
  }

  if (!flight) return null;

  return (
    <div className="space-y-6">
      <TravelDetails
        {...{
          departure_date: bookingFormData?.departure_date,
          return_date: bookingFormData?.return_date,
          ...flight,
        }}
      />

      <TravelersDetailsCard
        travelers={bookingFormData.travelers}
        numberOfTravelers={bookingFormData.numberOfTravelers}
      />

      <AdditionalServicesSection
        services={{
          travelInsurance: bookingFormData.travelInsurance,
          preferentialSeats: bookingFormData.preferentialSeats,
          specialAssistance: bookingFormData.specialAssistance,
          specialAssistanceNote: bookingFormData.specialAssistanceNote,
        }}
      />

      <CostSummarySection
        travelers={bookingFormData.travelers}
        numberOfTravelers={bookingFormData.numberOfTravelers}
        flightPriceUSD={flight.priceUSD}
      />
    </div>
  );
};

export default SummaryConfirmationForm;
