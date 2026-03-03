import { useQuery } from "@apollo/client/react";
import { GET_POKEMONS } from "@/lib/queries";
import { GetPokemonsResponse } from "@/types/graphql";
import { useMemo } from "react";

interface Props {
  page: number;
  limit: number;
  search: string;
  type: string;
  sort: string;
}

export function usePokemons({ page, limit, search, type, sort }: Props) {
  const orderBy = useMemo(() => {
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
  }, [sort]);

  const { data, loading, error } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: {
      search,
      type,
      limit,
      offset: (page - 1) * limit,
      orderBy,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    pokemons: data?.pokemon ?? [],
    totalCount: data?.pokemon_aggregate.aggregate.count ?? 0,
    loading,
    error,
  };
}
