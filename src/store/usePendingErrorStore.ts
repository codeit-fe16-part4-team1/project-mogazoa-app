// store/useErrorStore.ts
import { create } from 'zustand';

interface PendingErrorState {
  hasError: boolean;
  setError: (value: boolean) => void;
}

export const usePendingErrorStore = create<PendingErrorState>((set) => ({
  hasError: false,
  setError: (value) => set({ hasError: value }),
}));
