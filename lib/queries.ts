import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemon(limit: 20, offset: 0) {
      id
      name
      pokemontypes {
        type_id
      }
      weight
      height
      pokemonsprites {
        sprites(path: "front_default")
      }
    }
  }
`;
