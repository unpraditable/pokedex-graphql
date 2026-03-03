import { GET_POKEMON_TYPES } from "@/lib/queries";
import { GetPokemonTypesResponse } from "@/types/graphql";
import { useQuery } from "@apollo/client/react";

interface Props {
  type: string;
  setType: (type: string) => void;
}

export default function SelectFilter({ type, setType }: Props) {
  const { data } = useQuery<GetPokemonTypesResponse>(GET_POKEMON_TYPES);

  console.log(data?.typename, "data");

  return (
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">All Types</option>
      {data?.typename.map((typename) => {
        return (
          <option key={typename.type.id} value={typename.type.name}>
            {typename.type.name}
          </option>
        );
      })}
    </select>
  );
}
