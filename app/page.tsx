"use client";

import { Pagination } from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import { useDebounce } from "@/hooks/useDebounce";
import { client } from "@/lib/apolloClient";
import { GET_POKEMONS } from "@/lib/queries";
import { GetPokemonsResponse } from "@/types/graphql";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import { useState } from "react";

function Home() {
  const LIMIT = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [sort, setSort] = useState("id-asc");

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
      search: `${debouncedSearch}`,
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="id-asc">ID Asc</option>
        <option value="id-desc">ID Desc</option>
        <option value="name-asc">Name Asc</option>
        <option value="name-desc">Name Desc</option>
      </select>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
