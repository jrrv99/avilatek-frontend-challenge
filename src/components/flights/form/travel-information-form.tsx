'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import RHFCalendarPopover from '@/components/rhf/rhf-calendar-popover';
import RHFSimpleSelect from '@/components/rhf/rhf-simple-select';
import StatusComponent from '@/components/status-component';
import ErrorMessage from '@/components/ui/error-message';
import LoadingMessage from '@/components/ui/loading-message';
import ReloadButton from '@/components/ui/reload-button';
import { useBookingFormData } from '@/contexts/flightFormContext';
import useGetDestinationBySlug from '@/hooks/useGetDestinationBySlug';
import useGetDestinations from '@/hooks/useGetDestinations';

import NavigationButtons from './navigation-buttons';
import { travelInformationSchema } from './schemas';
import { getStepById, FlightStepIds } from './steps';

const step = getStepById(FlightStepIds.TRAVEL_INFORMATION);

const TravelInformationForm = () => {
  const { data: bookingFormData, updateStepData } = useBookingFormData();

  const {
    data,
    isLoading: isLoadingDestinations,
    error: destinationError,
    refetch: refetchDestinations,
  } = useGetDestinations();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: bookingFormData[FlightStepIds.TRAVEL_INFORMATION] || {},
    resolver: zodResolver(travelInformationSchema),
  });

  const onChangeDestination = (_value: string) => {
    setValue('flight_class', '');
  };

  const selectedDestinationSlug = watch('departure');

  const {
    data: flights,
    isLoading: isLoadingFlights,
    error: flightsError,
    refetch: refetchFlights,
  } = useGetDestinationBySlug(selectedDestinationSlug);

  if (destinationError) {
    return (
      <StatusComponent
        title={destinationError.message}
        type="error"
        isLoading={isLoadingDestinations}
        onReload={refetchDestinations}
      />
    );
  }

  if (isLoadingDestinations) {
    return (
      <StatusComponent
        title="Cargando destinos..."
        description="Por favor, espera mientras se cargan los destinos disponibles."
        type="loading"
      />
    );
  }

  if (!data?.destinations || data.total === 0) {
    return (
      <StatusComponent
        title="No hay destinos disponibles"
        description="Actualmente no hay destinos disponibles para reservar vuelos."
        type="empty"
        isLoading={isLoadingDestinations}
        reloadLabel="Recargar Destinos"
        onReload={refetchDestinations}
      />
    );
  }

  const destinationOptions = data.destinations.map(destination => ({
    value: destination.slug,
    label: `${destination.name} (${destination.availableClasses.join(', ')})`,
  }));

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(formData => {
        updateStepData(FlightStepIds.TRAVEL_INFORMATION, formData);
      })}
    >
      {data?.destinations && (
        <div className="grid grid-cols-2 items-end gap-x-6 gap-y-3 max-md:grid-cols-1">
          <RHFSimpleSelect
            control={control}
            name="departure"
            label="Destino"
            placeholder="Selecciona un destino"
            options={destinationOptions}
            onChange={onChangeDestination}
          />

          {isLoadingFlights && <LoadingMessage message="Buscando Vuelos..." />}

          {flightsError && (
            <div className="flex flex-row items-end gap-x-1">
              <ErrorMessage message={(flightsError as Error).message} />
              <ReloadButton
                isLoading={isLoadingFlights}
                onClick={refetchFlights}
              />
            </div>
          )}

          {flights && (
            <div className="flex flex-row items-end gap-x-1">
              <RHFSimpleSelect
                control={control}
                name="flight_class"
                label="Clase de vuelo"
                placeholder="Selecciona una clase de vuelo"
                options={flights.flights.map(flight => ({
                  value: flight.id,
                  label: `${flight.class} - ${flight.priceUSD}$`,
                }))}
              />
              <ReloadButton onClick={refetchFlights} />
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 items-end gap-x-6 gap-y-3 max-md:grid-cols-1">
        <RHFCalendarPopover
          control={control}
          name="departure_date"
          label="Fecha de salida"
          placeholder="Selecciona una fecha"
        />
        <RHFCalendarPopover
          control={control}
          name="return_date"
          label="Fecha de regreso"
          placeholder="Selecciona una fecha"
        />
      </div>

      <NavigationButtons
        beforeRoute={step?.beforeRoute}
        nextRoute={step?.nextRoute}
        isNextEnabled={isValid}
      />
    </form>
  );
};

export default TravelInformationForm;
