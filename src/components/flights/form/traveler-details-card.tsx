import { Dog, Luggage } from 'lucide-react';

import { documentTypes, Traveler } from '@/components/flights/form/schemas';
import { Badge } from '@/components/ui/badge';
import { calculateAge } from '@/utils/general';

type TravelerDetailsCardProps = {
  traveler: Traveler;
  index: number;
};

const TravelerDetailsCard: React.FC<TravelerDetailsCardProps> = ({
  traveler,
  index,
}) => (
  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
    <div>
      <div className="flex items-center gap-2">
        <p className="font-medium">{traveler.fullName}</p>
        {traveler.hasPets && (
          <Badge variant="outline" className="text-primary">
            <Dog className="h-4 w-4" />
            {traveler.numberOfPets || 0} Mascotas
          </Badge>
        )}
        {traveler.hasExtraBaggage && (
          <Badge variant="outline" className="text-primary">
            <Luggage className="h-4 w-4" />
            {traveler.numberOfExtraBaggage || 0} Maletas
          </Badge>
        )}
      </div>
      <p className="text-sm text-gray-600">
        {calculateAge(traveler.birthDate)} años •{' '}
        {documentTypes[traveler.documentType]} - {traveler.documentNumber}
      </p>
    </div>
    <span>Viajero {index + 1}</span>
  </div>
);

export default TravelerDetailsCard;
