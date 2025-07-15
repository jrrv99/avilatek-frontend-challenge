import { Plane } from 'lucide-react';

import { Traveler } from '@/components/flights/form/schemas';
import { SectionCard } from '@/components/section-card';
import { Separator } from '@/components/ui/separator';
import { useBookingCosts } from '@/hooks/useBookingCosts';

import CostLineItem from './cost-line-item';

type CostSummarySectionProps = {
  travelers: Traveler[];
  numberOfTravelers: number;
  flightPriceUSD: number;
};

const CostSummarySection: React.FC<CostSummarySectionProps> = ({
  travelers,
  numberOfTravelers,
  flightPriceUSD,
}) => {
  const {
    totalPets,
    totalExtraBaggage,
    flightCost,
    petsCost,
    extraBaggageCost,
    totalCost,
  } = useBookingCosts({
    travelers,
    numberOfTravelers,
    flightPriceUSD,
  });

  return (
    <SectionCard
      title={
        <>
          <Plane className="h-5 w-5" />
          Resumen de Costos
        </>
      }
      className="bg-gradient-to-br from-orange-200 to-orange-50"
    >
      <div className="space-y-3">
        <CostLineItem
          label={`Viajeros`}
          quantity={numberOfTravelers}
          amount={flightCost}
        />

        <CostLineItem label="Mascotas" quantity={totalPets} amount={petsCost} />

        <CostLineItem
          label="Maletas extra"
          quantity={totalExtraBaggage}
          amount={extraBaggageCost}
        />

        <Separator className="bg-primary" />

        <CostLineItem label="Total" amount={totalCost} isTotal={true} />
      </div>
    </SectionCard>
  );
};

export default CostSummarySection;
