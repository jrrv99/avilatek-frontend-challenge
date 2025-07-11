# Prueba front

El objetivo de esta prueba es evaluar tus habilidades y conocimientos como desarrollador Frontend.

A continuación, se presenta un caso de estudio que debe ser resuelto utilizando Next.js, TypeScript y Tailwind CSS.

## Contexto

Globetrotter es una aplicación web diseñada para facilitar y personalizar la experiencia de reserva de viajes de una manera moderna, minimalista y visualmente atractiva.

- Como frontend developer tienes el espacio de mostrar tu criterio, creatividad y habilidades.
- ¡Recuerda! Menos puede ser más, el minimalismo puede ser de ayuda.

## 1. Formulario del viajero

### a. Paso 1: Información del Viaje

Campos requeridos:

- Destino (Input o Autocompletado)
- Fecha de salida (Date Picker)
- Fecha de regreso (Date Picker)
- Clase de vuelo (Dropdown o botones)

La información de los precios, destino y clase del vuelo provienen de acá:  
https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json

### b. Paso 2: Información del Viaje

Campos requeridos:

- Número de viajeros (Input numérico o Stepper: mínimo 1, máximo 10)
- Datos de cada viajero (por cada viajero seleccionado en el campo anterior):
  - Nombre completo (Input de texto)
  - Fecha de nacimiento (Date Picker)
  - Documento de identidad (select de tipo de documento, e input para el número de documento)

Opcionales:

- ¿Viajas con mascotas? (Sí/No - Switch o radio buttons)
  - Si es Sí, preguntar:
    - Cantidad de mascotas (Input numérico)
    - Costo 100$ c/u
- ¿Necesitas maletas extra? (Sí/No - Switch o radio buttons)
  - Si es Sí, preguntar:
    - Cantidad de maletas extra (Input numérico)
    - Costo 50$ c/u

### c. Paso 3: Servicios adicionales

Campos requeridos:

- ¿Deseas agregar seguro de viaje? (Sí/No - Switch)
- ¿Deseas seleccionar asientos preferenciales? (Sí/No - Switch)
- ¿Requiere asistencia especial? (Sí/No - Switch)
  - Si es Sí, permitir escribir una nota (Textarea breve: 200 caracteres máximo)

### d. Paso 4: Resumen y Confirmación

Mostrar:

- Destino
- Fechas de viaje
- Clase de vuelo
- Cantidad de viajeros y sus edades
- Cantidad de mascotas (si aplica)
- Cantidad de maletas extra (si aplica)
- Servicios adicionales seleccionados

Acción principal:

- Botón "Confirmar Reserva" (no requiere enviar a un servidor real, puede mostrar un mensaje de éxito o alerta simulada como “¡Reserva confirmada!”).

## Criterios de evaluación

- Conocimiento de Next.js y React
- Conocimiento de Tailwind CSS
- Conocimiento de TypeScript
- Diseño
- Estructura y calidad del código
- Uso de git
- Responsividad
- Reutilización de componentes
- Deploy en Vercel (deseable)

Contarás con 24 horas para la entrega de la prueba a través de un repositorio en GitHub.

¡Éxito! 🚀
