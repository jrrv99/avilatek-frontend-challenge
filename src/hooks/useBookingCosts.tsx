import { useMemo } from 'react';

import { Traveler } from '@/components/flights/form/schemas';
import { PET_EXTRA_COST, EXTRA_BAGGAGE_COST } from '@/lib/constants';

type UseBookingCostsProps = {
  travelers: Traveler[];
  numberOfTravelers: number;
  flightPriceUSD: number;
};

export const useBookingCosts = ({
  travelers,
  numberOfTravelers,
  flightPriceUSD,
}: UseBookingCostsProps) =>
  useMemo(() => {
    const totalPets = travelers.reduce(
      (sum, traveler) =>
        traveler.hasPets ? sum + (traveler.numberOfPets || 0) : sum,
      0,
    );

    const totalExtraBaggage = travelers.reduce(
      (sum, traveler) =>
        traveler.hasExtraBaggage
          ? sum + (traveler.numberOfExtraBaggage || 0)
          : sum,
      0,
    );

    const flightCost = flightPriceUSD * numberOfTravelers;
    const petsCost = totalPets * PET_EXTRA_COST;
    const extraBaggageCost = totalExtraBaggage * EXTRA_BAGGAGE_COST;
    const totalCost = flightCost + petsCost + extraBaggageCost;

    return {
      totalPets,
      totalExtraBaggage,
      flightCost,
      petsCost,
      extraBaggageCost,
      totalCost,
    };
  }, [travelers, numberOfTravelers, flightPriceUSD]);
