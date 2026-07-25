"use client";

export function BlogTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary/5 border-b border-border">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-bold text-text uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border/50 last:border-b-0 hover:bg-primary/[0.02]"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
