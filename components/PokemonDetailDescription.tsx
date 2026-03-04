"use client";

import { Pokemon } from "@/types/pokemon";
import PokemonStatBar from "./PokemonStatBar";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonDetailDescription({ pokemon }: Props) {
  const formatName = (name: string) => {
    return name.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };
  return (
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
  );
}
