import { GET_POKEMON_DETAIL } from "@/lib/queries";
import { GetPokemonsResponse } from "@/types/graphql";
import { useQuery } from "@apollo/client/react";

export function usePokemonDetail(id: string) {
  const { data, loading, error } = useQuery<GetPokemonsResponse>(
    GET_POKEMON_DETAIL,
    {
      variables: {
        id,
      },
      fetchPolicy: "cache-and-network",
    },
  );

  return { pokemon: data?.pokemon[0] ?? null, loading, error };
}
