"use client";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider as QueryClientProviderComponent,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { toast } from "react-toastify";

const GENERIC_ERROR_MESSAGE = "Ceva nu a mers cum trebuie. Încearcă mai târziu.";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (_error, _variables, _onMutateResult, mutation) => {
      if (mutation.meta?.skipErrorToast) return;
      toast.error(GENERIC_ERROR_MESSAGE);
    },
  }),
});

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProviderComponent client={queryClient}>
      {children}
    </QueryClientProviderComponent>
  );
}
