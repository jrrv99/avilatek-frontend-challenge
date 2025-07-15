import { Users } from 'lucide-react';

import { Traveler } from '@/components/flights/form/schemas';
import { SectionCard } from '@/components/section-card';

import TravelerCard from './traveler-details-card';

type TravelersDetailsCardProps = {
  travelers: Traveler[];
  numberOfTravelers: number;
};

const TravelersDetailsCard: React.FC<TravelersDetailsCardProps> = ({
  travelers,
  numberOfTravelers,
}) => (
  <SectionCard
    title={
      <>
        <Users className="h-5 w-5" />
        Viajeros ({numberOfTravelers})
      </>
    }
  >
    <div className="space-y-3">
      {travelers.map((traveler, index) => (
        <TravelerCard key={index} traveler={traveler} index={index} />
      ))}
    </div>
  </SectionCard>
);

export default TravelersDetailsCard;
