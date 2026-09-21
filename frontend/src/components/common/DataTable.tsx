import "./DataTable.css";
import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
};

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key}>{column.render(row)}</td>
              ))}
              <td>
                <div className="row-actions">
                  <button
                    className="icon-action edit"
                    aria-label="Edit"
                    onClick={() => onEdit(row)}
                  >
                    ✎
                  </button>
                  <button
                    className="icon-action delete"
                    aria-label="Delete"
                    onClick={() => onDelete(row)}
                  >
                    ⌫
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
