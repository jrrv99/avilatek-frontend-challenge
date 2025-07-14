import { FlightRoutes } from '@/app/flights/routes';

export enum FlightStepIds {
  TRAVEL_INFORMATION = 'travel-information',
  TRAVELERS_INFORMATION = 'travelers-information',
  ADDITIONAL_SERVICES = 'additional-services',
  SUMMARY_CONFIRMATION = 'summary-confirmation',
}

type Step = {
  id: FlightStepIds;
  title: string;
  route: string;
  beforeRoute?: string;
  nextRoute?: string;
  fields?: string[];
};

export const steps: Step[] = [
  {
    id: FlightStepIds.TRAVEL_INFORMATION,
    title: 'Información del Viaje',
    route: FlightRoutes.TRAVEL_INFORMATION,
    nextRoute: FlightRoutes.TRAVELERS_INFORMATION,
    fields: ['departure', 'flight_class', 'departure_date', 'return_date'],
  },
  {
    id: FlightStepIds.TRAVELERS_INFORMATION,
    title: 'Información de los Viajero',
    route: FlightRoutes.TRAVELERS_INFORMATION,
    beforeRoute: FlightRoutes.TRAVEL_INFORMATION,
    nextRoute: FlightRoutes.ADDITIONAL_SERVICES,
    fields: [
      'Número de los viajeross',
      'Nombre completo de cada viajero',
      'Fecha de nacimiento de cada viajero',
      'Documento de identidad (tipo y número)',
      '¿Viajas con mascotas?',
      'Cantidad de mascotas (si aplica)',
      '¿Necesitas maletas extra?',
      'Cantidad de maletas extra (si aplica)',
    ],
  },
  {
    id: FlightStepIds.ADDITIONAL_SERVICES,
    title: 'Servicios adicionales',
    route: FlightRoutes.ADDITIONAL_SERVICES,
    beforeRoute: FlightRoutes.TRAVELERS_INFORMATION,
    nextRoute: FlightRoutes.SUMMARY_CONFIRMATION,
    fields: [
      '¿Deseas agregar seguro de viaje?',
      '¿Deseas seleccionar asientos preferenciales?',
      '¿Requiere asistencia especial?',
      'Nota para asistencia especial (si aplica)',
    ],
  },
  {
    id: FlightStepIds.SUMMARY_CONFIRMATION,
    title: 'Resumen y Confirmación',
    route: FlightRoutes.SUMMARY_CONFIRMATION,
    beforeRoute: FlightRoutes.ADDITIONAL_SERVICES,
    fields: [
      'Destino',
      'Fechas de viaje',
      'Clase de vuelo',
      'Cantidad de viajeros y sus edades',
      'Cantidad de mascotas (si aplica)',
      'Cantidad de maletas extra (si aplica)',
      'Servicios adicionales seleccionados',
      'Botón Confirmar Reserva',
    ],
  },
];

export const isFlightStepId = (value: string): value is FlightStepIds =>
  Object.values(FlightStepIds).includes(value as FlightStepIds);

export const stepExists = (slug: FlightStepIds) =>
  steps.some(step => step.id === slug);

export const getStepById = (id: FlightStepIds) =>
  steps.find(step => step.id === id) || null;
