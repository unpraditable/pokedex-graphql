import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
interface Props {
  pokemon: Pokemon;
  onCompare: (pokemon: Pokemon, isActionRemove: boolean) => void;
  isIncludedInComparisonTable: (pokemonId: number) => boolean;
}
export default function PokemonCard({
  pokemon,
  onCompare,
  isIncludedInComparisonTable,
}: Props) {
  return (
    <div
      className={`bg-sky-700 rounded-lg shadow-lg p-2 text-center  min-h-37.5 md:min-h-50`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 mb-6">
          <h2 className="text-sm sm:text-lg md:text-2xl font-semibold text-white capitalize">
            {pokemon.name}
          </h2>
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

      {!isIncludedInComparisonTable(pokemon.id) ? (
        <button
          onClick={() => onCompare(pokemon, false)}
          className="my-4 bg-green-500 text-white px-3 py-1 rounded"
        >
          Compare
        </button>
      ) : (
        <button
          onClick={() => onCompare(pokemon, true)}
          className="my-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      )}
    </div>
  );
}
