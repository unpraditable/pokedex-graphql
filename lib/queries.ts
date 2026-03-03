import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_aggregate {
      aggregate {
        count
      }
    }
    pokemon(limit: $limit, offset: $offset) {
      id
      name

      weight
      height
      pokemonsprites {
        sprites(path: "front_default")
      }
    }
  }
`;
