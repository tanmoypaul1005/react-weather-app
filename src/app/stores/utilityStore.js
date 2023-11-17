import { create }from "zustand";

const useUtilityStore = create((set) => ({

    isLoading: false,
    setLoading: (value) => set({ isLoading: value }),

}));

export default useUtilityStore;