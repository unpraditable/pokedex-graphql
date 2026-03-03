import { Pokemon } from "./pokemon";

export interface GetPokemonsResponse {
  pokemon: Pokemon[];
  pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface GetPokemonTypesResponse {
  typename: {
    type: {
      id: number;
      name: string;
    };
  }[];
}
