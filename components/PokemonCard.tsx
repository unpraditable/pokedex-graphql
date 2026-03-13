import React from "react";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { useComparisonStore } from "@/store/useComparisonStore";

interface Props {
  pokemon: Pokemon;
  setIsTableOpen: (isOpen: boolean) => void;
}

const PokemonCard = React.memo(({ pokemon, setIsTableOpen }: Props) => {
  useComparisonStore((state) => state.comparisonTable); // this line is mandatory to track isIncluded
  const onCompare = useComparisonStore((state) => state.togglePokemon);
  const isPokemonIncluded = useComparisonStore((state) => state.isIncluded);

  return (
    <div className="bg-sky-700 rounded-lg shadow-lg p-2 text-center min-h-37.5 md:min-h-50">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 mb-6">
          <Link
            href={`/pokemon/${pokemon.id}`}
            className="text-sm sm:text-lg md:text-2xl font-semibold text-white capitalize cursor-pointer hover:underline"
          >
            {pokemon.name}
          </Link>
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
          />
        </div>
      </div>

      <button
        onClick={() => {
          onCompare(pokemon);
          setIsTableOpen(true);
        }}
        className={`my-4 text-white px-3 py-1 rounded cursor-pointer ${
          isPokemonIncluded(pokemon.id) ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isPokemonIncluded(pokemon.id) ? "Remove" : "Compare"}
      </button>
    </div>
  );
});

PokemonCard.displayName = "PokemonCard";

export default PokemonCard;
