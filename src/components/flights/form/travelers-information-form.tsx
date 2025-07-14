'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import RHFStepperInput from '@/components/rhf/rhf-stepper-input';
import {
  MIN_NUMBER_OF_TRAVELERS,
  MAX_NUMBER_OF_TRAVELERS,
} from '@/lib/constants';
import { createEmptyTraveler } from '@/utils/flightUtils';

import NavigationButtons from './navigation-buttons';
import { TravelersInformation, travelersInformationSchema } from './schemas';
import { FlightStepIds, getStepById } from './steps';
import TravelerFormInfo from './traveler-form-info';

interface TravelersInformationFormProps {
  defaultValues?: TravelersInformation;
}

const step = getStepById(FlightStepIds.TRAVELERS_INFORMATION);

const TravelersInformationForm: React.FC<TravelersInformationFormProps> = ({
  defaultValues,
}) => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(travelersInformationSchema),
    defaultValues: {
      numberOfTravelers: MIN_NUMBER_OF_TRAVELERS,
      travelers: Array.from(
        { length: MIN_NUMBER_OF_TRAVELERS },
        createEmptyTraveler,
      ),
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'travelers',
  });

  const handleTravelersChange = useCallback(
    (value: number) => {
      setValue('numberOfTravelers', value);

      if (value > fields.length) {
        for (let i = fields.length; i < value; i++) {
          append(createEmptyTraveler());
        }
      } else if (value < fields.length) {
        for (let i = fields.length - 1; i >= value; i--) {
          remove(i);
        }
      }
    },
    [append, fields.length, remove, setValue],
  );

  const handleCounterFlagChange = useCallback(
    (
      index: number,
      key: 'numberOfPets' | 'numberOfExtraBaggage',
      value: boolean,
    ) => {
      setValue(`travelers.${index}.${key}`, Number(value));
    },
    [setValue],
  );

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(() => {
        // TODO: Handle form submission with context and local storage
      })}
    >
      <div className="grid justify-center">
        <RHFStepperInput
          name="numberOfTravelers"
          control={control}
          label={`Número de viajeros (maximo ${MAX_NUMBER_OF_TRAVELERS})`}
          min={MIN_NUMBER_OF_TRAVELERS}
          max={MAX_NUMBER_OF_TRAVELERS}
          className="items-center"
          onChange={handleTravelersChange}
        />
      </div>

      {fields.map((traveler, index) => (
        <TravelerFormInfo
          key={traveler.id}
          traveler={traveler}
          index={index}
          control={control}
          watch={watch}
          handleCounterFlagChange={handleCounterFlagChange}
          onDelete={() => {
            remove(index);
            setValue('numberOfTravelers', fields.length - 1);
          }}
        />
      ))}

      <NavigationButtons
        beforeRoute={step?.beforeRoute}
        nextRoute={step?.nextRoute}
        isNextEnabled={isValid}
      />
    </form>
  );
};

export default TravelersInformationForm;
