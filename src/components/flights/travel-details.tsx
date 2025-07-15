import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MapPin } from 'lucide-react';

import SummaryInfoItem from '@/components/summary-info-item';
import { NormalizedFlight } from '@/types/flights.types';

import { SectionCard } from '../section-card';

interface TravelDetailsProps extends NormalizedFlight {
  departure_date?: Date;
  return_date?: Date;
}

const TravelDetails: React.FC<TravelDetailsProps> = flight => (
  <SectionCard
    title={
      <>
        <MapPin className="h-5 w-5" />
        Información del Viaje
      </>
    }
  >
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SummaryInfoItem label="Destino" value={flight.destination} />
        <SummaryInfoItem label="Clase de vuelo" value={flight.class} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SummaryInfoItem
          label="Salida"
          value={
            flight.departure_date
              ? format(new Date(flight.departure_date), 'dd MMMM yyyy', {
                  locale: es,
                })
              : '-'
          }
        />
        <SummaryInfoItem
          label="Regreso"
          value={
            flight.return_date
              ? format(new Date(flight.return_date), 'dd MMMM yyyy', {
                  locale: es,
                })
              : '-'
          }
        />
      </div>
    </div>
  </SectionCard>
);

export default TravelDetails;
