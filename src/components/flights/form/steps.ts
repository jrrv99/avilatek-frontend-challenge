import { FlightRoutes } from '@/app/flights/routes';

export const steps = [
  {
    id: 'travel-information',
    title: 'Información del Viaje',
    route: FlightRoutes.TRAVEL_INFORMATION,
    nextRoute: FlightRoutes.TRAVELERS_INFORMATION,
    fields: ['departure', 'flight_class', 'departure_date', 'return_date'],
  },
  {
    id: 'travelers-information',
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
    id: 'additional-services',
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
    id: 'summary-confirmation',
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

export const stepExists = (slug: string) =>
  steps.some(step => step.id === slug);

export const getStepById = (id: string) =>
  steps.find(step => step.id === id) || null;
