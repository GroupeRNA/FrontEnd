// store/sidebarStore.js
import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isOpen: true,
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (value) => set(() => ({ isOpen: value })),
}));
