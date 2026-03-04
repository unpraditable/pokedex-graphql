"use client";
interface Props {
  search: string;
  setSearch: (searchTerm: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded"
    />
  );
}
