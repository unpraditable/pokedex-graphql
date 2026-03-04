"use client";
import Image from "next/image";
import { useComparisonStore } from "@/store/useComparisonStore";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function FloatingComparisonBar({ isOpen, setIsOpen }: Props) {
  const comparisonTable = useComparisonStore((state) => state.comparisonTable);
  const removePokemon = useComparisonStore((state) => state.removePokemon);
  const clearAll = useComparisonStore((state) => state.clearAll);

  if (comparisonTable.length === 0) return null;

  const formatName = (name: string) => {
    return name.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-800 font-bold text-white px-4 py-1 rounded-t-lg shadow-md text-md cursor-pointer"
        >
          {isOpen
            ? "Hide Comparison ↓"
            : `Show Comparison (${comparisonTable.length}) ↑`}
        </button>
      </div>

      <div
        className={`bg-gray-900 shadow-2xl border-t overflow-x-auto transition-all duration-300 ${
          isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">
              Comparing ({comparisonTable.length})
            </h2>

            <button
              onClick={clearAll}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="flex gap-6">
            {comparisonTable.map((pokemon) => (
              <div
                key={pokemon.id}
                className="min-w-55 bg-gray-700 rounded-lg p-3"
              >
                <div className="flex justify-between items-center">
                  <Link
                    href={`/pokemon/${pokemon.id}`}
                    className="font-semibold capitalize text-white"
                  >
                    {pokemon.name}
                  </Link>

                  <button
                    onClick={() => removePokemon(pokemon.id)}
                    className="text-red-400 text-sm hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex justify-center my-2">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                <p className="text-sm text-gray-200">
                  <strong>Types:</strong>{" "}
                  {pokemon.pokemontypes
                    .map((t) => formatName(t.type.name))
                    .join(", ")}
                </p>

                <p className="text-sm text-gray-200">
                  <strong>Weight:</strong> {pokemon.weight} lbs
                </p>
                <p className="text-sm text-gray-200">
                  <strong>Height:</strong> {pokemon.height} ft
                </p>

                <div className="mt-2 text-sm text-gray-200">
                  <strong>Stats:</strong>
                  <ul className="mt-1 space-y-1">
                    {pokemon.pokemonstats.map((stat) => (
                      <li key={stat.stat.name}>
                        {formatName(stat.stat.name)}: {stat.base_stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
