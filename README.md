# Globetrotter

Globetrotter es una aplicación web moderna, minimalista y visualmente atractiva diseñada para facilitar y personalizar la experiencia de reserva de viajes.

Este proyecto fue construido utilizando Next.js, TypeScript y Tailwind CSS.

## Funcionalidades

- Formulario de viajero con múltiples pasos:
  - Información de viaje
  - Detalles del viajero
  - Servicios adicionales
  - Resumen y confirmación
- Integración con una API externa de datos de vuelos.
- Diseño responsivo.
- Interfaz minimalista y fácil de usar.

## Cómo empezar

Primero, clona el repositorio:

```bash
git clone git@github.com:jrrv99/avilatek-frontend-challenge.git
```

Luego, instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente mientras editas el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una nueva familia de fuentes para Vercel.

## Documentación de la API

La aplicación se integra con una API personalizada para manejar datos de vuelos. Los siguientes endpoints están disponibles:

- `GET /api/flights`: Recupera una lista de vuelos disponibles con opciones de filtrado y formato de respuesta.
- `GET /api/flights/[slug]`: Obtiene detalles de un vuelo específico utilizando su slug único.
- `GET /api/flights/destinations`: Recupera una lista de destinos disponibles para vuelos. Este endpoint proporciona slugs y nombres de destinos para ayudar a los usuarios a filtrar opciones de vuelo según sus ubicaciones de viaje deseadas.
- `GET /api/flights/destinations/[slug]`: Obtiene detalles y clases de vuelo disponibles para un destino específico.

## Aprende más

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

Puedes revisar [el repositorio de GitHub de Next.js](https://github.com/vercel/next.js) - tus comentarios y contribuciones son bienvenidos.

## Despliega en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
