'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import RHFSimpleSelect from '@/components/rhf/rhf-simple-select';
import RHFCalendarPopover from '@/components/rhf/rhf-calendar-popover';
import ErrorMessage from '@/components/ui/error-message';
import LoadingMessage from '@/components/ui/loading-message';
import ReloadButton from '@/components/ui/reload-button';
import NavigationButtons from './navigation-buttons';

import useGetDestinationBySlug from '@/hooks/useGetDestinationBySlug';
import useGetDestinations from '@/hooks/useGetDestinations';
import { travelInformationSchema } from './schemas';
import { getStepById } from './steps';

const step = getStepById('travel-information');

const TravelInformationForm = () => {
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
    formState: { isValid },
  } = useForm({
    mode: 'all',
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
    refetch: refetchFlights, // TODO
  } = useGetDestinationBySlug(selectedDestinationSlug);

  if (isLoadingDestinations) {
    return <div>Loading destinations...</div>;
  }

  if (!data?.destinations || data.destinations.length === 0) {
    return <div>No destinations available.</div>;
  }

  const destinationOptions = data.destinations.map(destination => ({
    value: destination.slug,
    label: `${destination.name} (${destination.availableClasses.join(', ')})`,
  }));

  return (
    <form className="space-y-3">
      {data?.destinations && (
        <div className="grid grid-cols-2 items-end gap-x-6 gap-y-3 max-md:grid-cols-1">
          <RHFSimpleSelect
            control={control}
            name="departure"
            label="Destino"
            placeholder="Selecciona un destino"
            onChange={onChangeDestination}
            options={destinationOptions}
          />

          {isLoadingFlights && <LoadingMessage message="Buscando Vuelos..." />}

          {flightsError && (
            <div className="flex flex-row items-end gap-x-1">
              <ErrorMessage message={(flightsError as Error).message} />
              <ReloadButton onClick={refetchFlights} />
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
