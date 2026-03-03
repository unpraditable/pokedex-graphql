"use client";

import { Pagination } from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import SelectFilter from "@/components/SelectFilter";
import SelectSort from "@/components/SelectSort";
import { useDebounce } from "@/hooks/useDebounce";
import { client } from "@/lib/apolloClient";
import { GET_POKEMONS } from "@/lib/queries";
import { GetPokemonsResponse } from "@/types/graphql";
import { Pokemon } from "@/types/pokemon";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import { useState } from "react";

function Home() {
  const LIMIT = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [sort, setSort] = useState("id-asc");
  const [type, setType] = useState("");
  const [comparisonTable, setComparisonTable] = useState<Pokemon[]>([]);

  const buildOrderBy = () => {
    switch (sort) {
      case "id-desc":
        return [{ id: "desc" }];
      case "name-asc":
        return [{ name: "asc" }];
      case "name-desc":
        return [{ name: "desc" }];
      default:
        return [{ id: "asc" }];
    }
  };

  const { data, loading, error } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: {
      search: debouncedSearch,
      type: type,
      limit: LIMIT,
      orderBy: buildOrderBy(),
      offset: (page - 1) * LIMIT,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon</p>;

  const pokemons = data?.pokemon ?? [];
  const totalCount = data?.pokemon_aggregate.aggregate.count ?? 0;

  const totalPages = Math.ceil(totalCount / LIMIT);

  console.log(pokemons, "pokemons");

  const isIncludedInComparisonTable = (pokemon: Pokemon) => {
    return !!comparisonTable.find((item) => pokemon.id === item.id);
  };

  const handleCompare = (pokemon: Pokemon) => {
    if (isIncludedInComparisonTable(pokemon)) {
      const newComparisonTable = comparisonTable.filter(
        (item) => pokemon.id !== item.id,
      );
      setComparisonTable(newComparisonTable);
    } else {
      setComparisonTable([...comparisonTable, pokemon]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>
      <SearchBar search={search} setSearch={setSearch} />

      <SelectFilter type={type} setType={setType} />

      <SelectSort sort={sort} setSort={setSort} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onCompare={handleCompare}
            isIncludedInComparisonTable={isIncludedInComparisonTable}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default function Page() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
