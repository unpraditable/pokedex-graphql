"use client";

import PokemonCard from "@/components/PokemonCard";
import { client } from "@/lib/apolloClient";
import { GET_POKEMONS } from "@/lib/queries";
import { GetPokemonsResponse } from "@/types/graphql";
import { ApolloProvider, useQuery } from "@apollo/client/react";

function Home() {
  const { data, loading } = useQuery<GetPokemonsResponse>(GET_POKEMONS);

  console.log(data, "dataaa");
  if (loading) return <p>Loading...</p>;

  const pokemons = data?.pokemon ?? [];
  return (
    <div className="p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
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
