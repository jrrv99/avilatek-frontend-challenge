import { useQuery } from '@tanstack/react-query';

import { getFlightBySlug } from '@/api/flights';

export const useGetFlightBySlug = (slug: string | null) =>
  useQuery({
    queryKey: ['flights', slug],
    queryFn: () => (slug ? getFlightBySlug(slug) : Promise.resolve(null)),
  });

export default useGetFlightBySlug;
