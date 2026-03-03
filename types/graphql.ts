import { Pokemon } from "./pokemon";

export interface GetPokemonsResponse {
  pokemon: Pokemon[];
  pokemon_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
