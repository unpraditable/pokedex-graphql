import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!, $search: String) {
    pokemon_aggregate(where: { name: { _regex: $search } }) {
      aggregate {
        count
      }
    }
    pokemon(
      limit: $limit
      offset: $offset
      where: { name: { _regex: $search } }
    ) {
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
