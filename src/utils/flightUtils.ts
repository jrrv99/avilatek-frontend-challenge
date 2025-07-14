import { Traveler } from '@/components/flights/form/schemas';

export const createEmptyTraveler = (): Traveler => ({
  fullName: '',
  birthDate: new Date(),
  documentType: '',
  documentNumber: '',
  hasPets: false,
  numberOfPets: 0,
  hasExtraBaggage: false,
  numberOfExtraBaggage: 0,
});
