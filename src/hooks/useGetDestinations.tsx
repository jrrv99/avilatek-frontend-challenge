import { useQuery } from '@tanstack/react-query';

import { getDestinations } from '@/api/flights';

const useGetDestinations = () =>
  useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    refetchOnWindowFocus: false,
  });

export default useGetDestinations;
