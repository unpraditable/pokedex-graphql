export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemontypes: {
    type_id: string;
    type: {
      name: string;
    };
  }[];
  pokemonsprites: {
    sprites: string;
  }[];
  pokemonstats: {
    stat: {
      name: string;
    };
    base_stat: number;
  }[];
}
