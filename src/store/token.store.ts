

export const useRolesStorage = create<>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
      clearRole: () => set({ role: null }),
    }),
    { name: "role", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
