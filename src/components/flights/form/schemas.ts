import { z } from 'zod';

export const travelInformationSchema = z
  .object({
    departure: z.string().min(1, 'Selecciona un destino'),
    flight_class: z.string().min(1, 'Selecciona una clase de vuelo'),
    departure_date: z.date(),
    return_date: z.date(),
  })
  .refine(data => data.return_date >= data.departure_date, {
    message:
      'La fecha de regreso debe ser igual o posterior a la fecha de salida',
    path: ['return_date'], // el error se asigna a return_date
  });
