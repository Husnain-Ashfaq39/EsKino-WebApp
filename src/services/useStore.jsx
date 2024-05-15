// useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  showHeader: true,
  setShowHeader: (show) => set({ showHeader: show }),
}));

export default useStore;
