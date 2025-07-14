'use client';

import { useForm } from 'react-hook-form';
import { Shield, Armchair, Heart } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import RHFToggleField from '@/components/rhf/rhf-toggle-field';
import RHFTextareaField from '@/components/rhf/rhf-textarea-field';
import NavigationButtons from './navigation-buttons';

import { getStepById, FlightStepIds } from './steps';
import { additionalServicesSchema } from './schemas';

const step = getStepById(FlightStepIds.ADDITIONAL_SERVICES);

const toggleFields = [
  {
    name: 'travelInsurance',
    title: 'Seguro de viaje',
    description: 'Protege tu inversión con cobertura completa',
    icon: Shield,
  },
  {
    name: 'preferentialSeats',
    title: 'Asientos preferenciales',
    description: 'Selecciona los mejores asientos del avión',
    icon: Armchair,
  },
  {
    name: 'specialAssistance',
    title: 'Asistencia especial',
    description: 'Soporte personalizado durante tu viaje',
    icon: Heart,
  },
];

const AdditionalServicesForm = () => {
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(additionalServicesSchema),
    defaultValues: {
      travelInsurance: false,
      preferentialSeats: false,
      specialAssistance: false,
    },
  });

  const specialAssistance = watch('specialAssistance');

  const values = getValues();
  const validated = additionalServicesSchema.safeParse(values);

  return (
    <form
      onSubmit={handleSubmit(() => {
        // TODO: Handle form submission with context and local storage
      })}
      className="space-y-3"
    >
      {toggleFields.map(field => (
        <RHFToggleField
          key={field.name}
          name={field.name}
          title={field.title}
          description={field.description}
          icon={field.icon}
          control={control}
        />
      ))}

      {specialAssistance && (
        <RHFTextareaField
          name="specialAssistanceNote"
          control={control}
          label="Describe tu necesidad de asistencia especial"
          placeholder="Describe brevemente el tipo de asistencia que necesitas..."
        />
      )}

      <NavigationButtons
        beforeRoute={step?.beforeRoute}
        nextRoute={step?.nextRoute}
        isNextEnabled={isValid}
      />
    </form>
  );
};

export default AdditionalServicesForm;
