"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import PokemonStatBar from "@/components/PokemonStatBar";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import Link from "next/link";

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { pokemon, loading, error } = usePokemonDetail(id);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error || !pokemon) return <p className="p-6">Failed to load Pokémon</p>;

  const formatName = (name: string) => {
    return name.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-900">
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

      <div className="container mx-auto pb-16">
        <div className=" rounded-3xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <h2 className="text-lg font-semibold mb-4">Physical Info</h2>

              <div className="space-y-3 text-white">
                <div className="flex justify-between">
                  <span>Height</span>
                  <span className="font-medium">{pokemon.height} m</span>
                </div>

                <div className="flex justify-between">
                  <span>Weight</span>
                  <span className="font-medium">{pokemon.weight} kg</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Base Stats</h2>

              <div className="space-y-4">
                {pokemon.pokemonstats.map((stat) => (
                  <PokemonStatBar
                    key={stat.stat.name}
                    label={formatName(stat.stat.name)}
                    value={stat.base_stat}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
