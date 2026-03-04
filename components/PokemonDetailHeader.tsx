import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonDetailHeader({ pokemon }: Props) {
  return (
    <div className="bg-gray-700 text-white relative overflow-hidden pb-16">
      <Link
        href="/"
        className="text-md font-bold mt-6 ml-2 cursor-pointer hover:underline"
      >
        Back to Pokedex
      </Link>
      <div className="container mx-auto px-6 pt-10">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <div className="text-4xl font-bold  ">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {pokemon.pokemontypes.map((type) => (
            <span
              key={type.type_id}
              className="bg-white/20 px-3 py-1 rounded-full text-sm"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          width={250}
          height={250}
          priority
        />
      </div>
    </div>
  );
}
