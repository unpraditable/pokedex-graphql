"use client";

import { Pagination } from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import { client } from "@/lib/apolloClient";
import { GET_POKEMONS } from "@/lib/queries";
import { GetPokemonsResponse } from "@/types/graphql";
import { ApolloProvider, useQuery } from "@apollo/client/react";
import { useState } from "react";

function Home() {
  const LIMIT = 20;
  const [page, setPage] = useState(1);

  const { data, loading } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: {
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
    },
  });

  console.log(data, "dataaa");
  if (loading) return <p>Loading...</p>;

  const pokemons = data?.pokemon ?? [];
  const totalCount = data?.pokemon_aggregate.aggregate.count ?? 0;

  const totalPages = Math.ceil(totalCount / LIMIT);

  return (
    <div className="p-8">
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
