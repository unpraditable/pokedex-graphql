import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons(
    $limit: Int!
    $offset: Int!
    $orderBy: [pokemon_order_by!]
    $search: String
    $type: String
  ) {
    pokemon_aggregate(
      where: {
        name: { _regex: $search }
        pokemontypes: { type: { name: { _regex: $type } } }
      }
    ) {
      aggregate {
        count
      }
    }
    pokemon(
      limit: $limit
      offset: $offset
      where: {
        name: { _regex: $search }
        pokemontypes: { type: { name: { _regex: $type } } }
      }
      order_by: $orderBy
    ) {
      id
      name
      weight
      height
      pokemontypes {
        type {
          name
        }
      }
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemonsprites {
        sprites(path: "front_default")
      }
    }
  }
`;

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    typename(distinct_on: type_id) {
      type {
        name
        id
      }
    }
  }
`;
