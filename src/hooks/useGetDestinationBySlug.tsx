import { useQuery } from '@tanstack/react-query';

import { getDestinationBySlug } from '@/api/flights';

export const useGetDestinationBySlug = (selectedDestination: string | null) =>
  useQuery({
    queryKey: ['flights', selectedDestination],
    queryFn: () =>
      selectedDestination
        ? getDestinationBySlug(selectedDestination)
        : Promise.resolve(null),
  });

export default useGetDestinationBySlug;
