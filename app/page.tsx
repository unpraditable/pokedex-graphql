"use client";

import FloatingComparisonBar from "@/components/FloatingComparisonBar";
import { Pagination } from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import SelectFilter from "@/components/SelectFilter";
import SelectSort from "@/components/SelectSort";
import { useDebounce } from "@/hooks/useDebounce";
import { usePokemons } from "@/hooks/usePokemons";
import { usePokemonTypes } from "@/hooks/usePokemonTypes";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useState } from "react";

export default function Page() {
  const LIMIT = 20;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id-asc");
  const [type, setType] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { pokemons, totalCount, loading, error } = usePokemons({
    page,
    limit: LIMIT,
    search: debouncedSearch,
    type,
    sort,
  });

  const { types } = usePokemonTypes();

  const togglePokemon = useComparisonStore((state) => state.togglePokemon);
  const isIncluded = useComparisonStore((state) => state.isIncluded);

  const totalPages = Math.ceil(totalCount / LIMIT);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Error loading Pokémon</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>

      <div className="flex gap-4 flex-wrap">
        <SearchBar search={search} setSearch={setSearch} />
        <SelectFilter type={type} setType={setType} types={types} />
        <SelectSort sort={sort} setSort={setSort} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onCompare={togglePokemon}
            isIncludedInComparisonTable={isIncluded}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <FloatingComparisonBar />
    </div>
  );
}
