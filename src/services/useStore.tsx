// useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  isToggled: false,
  toggle: () => set((state) => ({ isToggled: !state.isToggled })),
}));

export default useStore;
