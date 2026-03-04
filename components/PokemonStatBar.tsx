type Props = {
  label: string;
  value: number;
};

export default function PokemonStatBar({ label, value }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-28 text-sm font-medium capitalize">{label}</div>

      <div className="w-12 text-sm font-semibold">{value}</div>

      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(value / 150) * 100}%` }}
        />
      </div>
    </div>
  );
}
