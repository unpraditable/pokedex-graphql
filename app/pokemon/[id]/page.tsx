"use client";

import { useParams } from "next/navigation";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import PokemonDetailDescription from "@/components/PokemonDetailDescription";
import PokemonDetailHeader from "@/components/PokemonDetailHeader";

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { pokemon, loading, error } = usePokemonDetail(id);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error || !pokemon) return <p className="p-6">Failed to load Pokémon</p>;

  return (
    <div className="min-h-screen bg-gray-900">
      <PokemonDetailHeader pokemon={pokemon} />
      <PokemonDetailDescription pokemon={pokemon} />
    </div>
  );
}
