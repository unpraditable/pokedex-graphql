export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemontypes: {
    type_id: string;
  }[];
  pokemonsprites: {
    sprites: string;
  }[];
}
