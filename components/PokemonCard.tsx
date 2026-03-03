import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div
      className={`green rounded-lg shadow-lg p-2 text-center flex justify-between bg-[url(/pokeball.svg)] bg-size-[auto_100px] md:bg-size-[auto_200px] bg-no-repeat bg-bottom-right min-h-[150px] md:min-h-[200px]`}
    >
      <div className="">
        <div className="flex flex-col gap-3 mb-6">
          <h2 className="text-sm sm:text-lg md:text-2xl font-semibold text-white capitalize">
            {pokemon.name}
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-between text-right">
        <span className="text-white text-sm sm:text-lg md:text-2xl font-bold">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>

        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          width={36}
          height={36}
          className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain"
        ></Image>
      </div>
    </div>
  );
}
