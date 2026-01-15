import { create } from 'zustand';

interface BearState {
  bears: number;
  addBear: () => void;
  removeBear: () => void;
  removeAllBears: () => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state) => ({ bears: Math.max(0, state.bears - 1) })),
  removeAllBears: () => set({ bears: 0 }),
}));
