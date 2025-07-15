import { Shield, Armchair, Heart, Plus } from 'lucide-react';

import { AdditionalServices } from '@/components/flights/form/schemas';
import { SectionCard } from '@/components/section-card';

import AdditionalServiceDetails from './additional-service-item';

type AdditionalServicesSectionProps = {
  services: AdditionalServices;
};

const AdditionalServicesSection: React.FC<AdditionalServicesSectionProps> = ({
  services,
}) => {
  const hasAnyService =
    services.travelInsurance ||
    services.preferentialSeats ||
    services.specialAssistance;

  if (!hasAnyService) return null;

  return (
    <SectionCard
      title={
        <>
          <Plus className="h-5 w-5" />
          Servicios Adicionales
        </>
      }
    >
      <div className="space-y-4">
        {services.travelInsurance && (
          <AdditionalServiceDetails
            icon={<Shield className="h-4 w-4 text-blue-600" />}
            label="Seguro de viaje"
          />
        )}

        {services.preferentialSeats && (
          <AdditionalServiceDetails
            icon={<Armchair className="h-4 w-4 text-green-600" />}
            label="Asientos preferenciales"
          />
        )}

        {services.specialAssistance && (
          <AdditionalServiceDetails
            icon={<Heart className="h-4 w-4 text-red-600" />}
            label="Asistencia especial"
            note={services.specialAssistanceNote}
          />
        )}
      </div>
    </SectionCard>
  );
};

export default AdditionalServicesSection;
