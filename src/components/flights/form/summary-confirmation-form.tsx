'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { FlightRoutes } from '@/app/flights/routes';
import { TravelBookingFormSchema } from '@/components/flights/form/schemas';
import StatusComponent from '@/components/status-component';
import { useBookingFormData } from '@/contexts/flightFormContext';
import useGetFlightBySlug from '@/hooks/useGetFlightBySlug';

import TravelDetails from '../travel-details';

import AdditionalServicesSection from './additional-services-details';
import NavigationButtons from './navigation-buttons';
import { getStepById, FlightStepIds } from './steps';
import CostSummarySection from './summary-costs-card';
import TravelersDetailsCard from './travelers-details-card';

const step = getStepById(FlightStepIds.SUMMARY_CONFIRMATION);

const SummaryConfirmationForm = () => {
  const { getCombinedData, clearData } = useBookingFormData();
  const router = useRouter();
  const bookingFormData = getCombinedData()!;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: flight, isLoading: isLoadingFlight } = useGetFlightBySlug(
    bookingFormData?.flight_class || '',
  );

  const handleConfirmBooking = async () => {
    try {
      if (!bookingFormData) return;

      // Zod validation
      const result = TravelBookingFormSchema.safeParse(bookingFormData);

      if (!result.success) {
        toast.error('Datos inválidos', {
          description: result.error.issues.map(e => e.message).join('\n'),
        });
        return;
      }

      setIsSubmitting(true);

      // Simulation of sending data to the server
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('¡Reserva confirmada!', {
        description: 'Tu reserva ha sido procesada exitosamente.',
      });

      // clean up form data
      clearData();

      router.push(FlightRoutes.TRAVEL_INFORMATION);
    } catch (_error) {
      toast.error('Error al confirmar la reserva', {
        description: 'Por favor, intenta nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <NavigationButtons
        beforeRoute={step?.beforeRoute}
        nextLabel="Confirmar Reserva"
        backLabel="Volver"
        isNextEnabled={!isSubmitting}
        isLoading={isSubmitting}
        onNext={handleConfirmBooking}
      />
    </div>
  );
};

export default SummaryConfirmationForm;
