import { z } from 'zod';

import {
  MIN_NUMBER_OF_TRAVELERS,
  MAX_NUMBER_OF_TRAVELERS,
} from '@/lib/constants';

export const documentTypes: { [key: string]: string } = {
  rif: 'RIF',
  passport: 'Pasaporte',
  id: 'Cédula de identidad',
  license: 'Licencia de conducir',
};

export const travelInformationSchema = z
  .object({
    departure: z.string().min(1, 'Selecciona un destino'),
    flight_class: z.string().min(1, 'Selecciona una clase de vuelo'),
    departure_date: z.date({
      error: issue =>
        issue.input === undefined ? 'La fecha es requerida' : 'Fecha invalida',
    }),
    return_date: z.date({
      error: issue =>
        issue.input === undefined ? 'La fecha es requerida' : 'Fecha invalida',
    }),
  })
  .refine(data => data.return_date >= data.departure_date, {
    message:
      'La fecha de regreso debe ser igual o posterior a la fecha de salida',
    path: ['return_date'], // el error se asigna a return_date
  });

export const TravelerSchema = z
  .object({
    fullName: z.string().min(1, 'Nombre completo es requerido'),
    birthDate: z.date({
      error: issue =>
        issue.input === undefined
          ? 'La fecha de nacimiento es requerida'
          : 'Fecha invalida',
    }),
    documentType: z.enum(Object.keys(documentTypes)),
    documentNumber: z.string().min(1, 'Número de documento es requerido'),
    hasPets: z.boolean(),
    numberOfPets: z.number().min(0),
    hasExtraBaggage: z.boolean(),
    numberOfExtraBaggage: z.number().min(0),
  })
  .refine(data => !(data.hasPets && data.numberOfPets < 1), {
    message: 'Si tiene mascotas, debe especificar al menos una mascota',
    path: ['numberOfPets'], // el error se asigna a numberOfPets
  })
  .refine(
    data => {
      return !(data.hasExtraBaggage && data.numberOfExtraBaggage < 1);
    },
    {
      message: 'Si tiene equipaje extra, debe especificar al menos una pieza',
      path: ['numberOfExtraBaggage'], // el error se asigna a numberOfExtraBaggage
    },
  );

export type Traveler = z.infer<typeof TravelerSchema>;

export const travelersInformationSchema = z.object({
  numberOfTravelers: z.number().min(1).max(10),
  travelers: z
    .array(TravelerSchema)
    .min(MIN_NUMBER_OF_TRAVELERS, 'Debe haber al menos un viajero')
    .max(MAX_NUMBER_OF_TRAVELERS, 'No puede haber más de 10 viajeros'),
});

export type TravelersInformation = z.infer<typeof travelersInformationSchema>;
