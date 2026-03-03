import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons(
    $limit: Int!
    $offset: Int!
    $orderBy: [pokemon_order_by!]
    $search: String
  ) {
    pokemon_aggregate(where: { name: { _regex: $search } }) {
      aggregate {
        count
      }
    }
    pokemon(
      limit: $limit
      offset: $offset
      where: { name: { _regex: $search } }
      order_by: $orderBy
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
