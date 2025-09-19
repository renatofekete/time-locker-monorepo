type HeaderProps = {
  label: string;
};

type TableProps<T> = {
  headers: HeaderProps[];
  data: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
};

const Table = <T,>({ headers, renderRow, data }: TableProps<T>) => {
  return (
    <table className={`w-full table-auto rounded-xl `}>
      <thead className="text-left bg-slate-100 border-b border-neutral-300/50 text-neutral-900 text-sm">
        <tr>
          {headers.map((header: HeaderProps, index: number) => (
            <th key={index} className="ps-6 py-3.5 font-medium">
              {header.label}{" "}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-neutral-900 text-sm">
        {data && renderRow && data.map((row, index) => renderRow(row, index))}
      </tbody>
    </table>
  );
};

export default Table;
