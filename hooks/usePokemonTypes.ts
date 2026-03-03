import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_TYPES } from "@/lib/queries";
import { GetPokemonTypesResponse } from "@/types/graphql";

export function usePokemonTypes() {
  const { data, loading } = useQuery<GetPokemonTypesResponse>(
    GET_POKEMON_TYPES,
    {
      fetchPolicy: "cache-first",
    },
  );

  return {
    types: data?.typename ?? [],
    loading,
  };
}
