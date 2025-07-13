import { getDestinations } from "@/api/flights";
import { useQuery } from "@tanstack/react-query";


const useGetDestinations = () => {
  return useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    refetchOnWindowFocus: false,
  });
};

export default useGetDestinations;