interface Props {
  sort: string;
  setSort: (sortTerm: string) => void;
}

export default function SelectSort({ sort, setSort }: Props) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="id-asc">ID Asc</option>
      <option value="id-desc">ID Desc</option>
      <option value="name-asc">Name Asc</option>
      <option value="name-desc">Name Desc</option>
    </select>
  );
}
