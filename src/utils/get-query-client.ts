import { QueryClient, isServer } from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5 minutes

const buildQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: DEFAULT_STALE_TIME,
      },
    },
  });

let queryClientInstance: QueryClient | null = null;

export const getQueryClient = () => {
  if (isServer) {
    return buildQueryClient();
  }

  // In the browser, use a singleton pattern to ensure only create one instance
  if (!queryClientInstance) {
    queryClientInstance = buildQueryClient();
  }

  return queryClientInstance;
};
