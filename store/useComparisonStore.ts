import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Pokemon } from "@/types/pokemon";

interface ComparisonState {
  comparisonTable: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
  togglePokemon: (pokemon: Pokemon) => void;
  isIncluded: (id: number) => boolean;
  clearAll: () => void;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      comparisonTable: [],

      addPokemon: (pokemon) =>
        set((state) => ({
          comparisonTable: [...state.comparisonTable, pokemon],
        })),

      removePokemon: (id) =>
        set((state) => ({
          comparisonTable: state.comparisonTable.filter((p) => p.id !== id),
        })),

      togglePokemon: (pokemon) => {
        const exists = get().comparisonTable.some((p) => p.id === pokemon.id);

        if (exists) {
          get().removePokemon(pokemon.id);
        } else {
          get().addPokemon(pokemon);
        }
      },

      isIncluded: (id) => get().comparisonTable.some((p) => p.id === id),

      clearAll: () => set({ comparisonTable: [] }),
    }),
    {
      name: "pokemon-comparison-storage",
    },
  ),
);
