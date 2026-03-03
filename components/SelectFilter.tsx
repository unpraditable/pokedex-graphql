interface Props {
  type: string;
  setType: (type: string) => void;
  types: {
    type: {
      id: number;
      name: string;
    };
  }[];
}

export default function SelectFilter({ type, setType, types }: Props) {
  return (
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">All Types</option>
      {types.map((typename) => (
        <option key={typename.type.id} value={typename.type.name}>
          {typename.type.name}
        </option>
      ))}
    </select>
  );
}
