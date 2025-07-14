'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Armchair, Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';

import RHFTextareaField from '@/components/rhf/rhf-textarea-field';
import RHFToggleField from '@/components/rhf/rhf-toggle-field';

import NavigationButtons from './navigation-buttons';
import { additionalServicesSchema } from './schemas';
import { getStepById, FlightStepIds } from './steps';

const step = getStepById(FlightStepIds.ADDITIONAL_SERVICES);

export enum AdditionalServiceName {
  TravelInsurance = 'travelInsurance',
  PreferentialSeats = 'preferentialSeats',
  SpecialAssistance = 'specialAssistance',
  SpecialAssistanceNote = 'specialAssistanceNote',
}

const toggleFields: {
  name: Exclude<AdditionalServiceName, 'specialAssistanceNote'>;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    name: AdditionalServiceName.TravelInsurance,
    title: 'Seguro de viaje',
    description: 'Protege tu inversión con cobertura completa',
    icon: Shield,
  },
  {
    name: AdditionalServiceName.PreferentialSeats,
    title: 'Asientos preferenciales',
    description: 'Selecciona los mejores asientos del avión',
    icon: Armchair,
  },
  {
    name: AdditionalServiceName.SpecialAssistance,
    title: 'Asistencia especial',
    description: 'Soporte personalizado durante tu viaje',
    icon: Heart,
  },
];

const AdditionalServicesForm = () => {
  const {
    control,
    watch,
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

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(() => {
        // TODO: Handle form submission with context and local storage
      })}
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
