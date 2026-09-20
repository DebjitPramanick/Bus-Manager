import SectionCard from "../common/SectionCard";
import DataTable from "../common/DataTable";
import "./RoutesSection.css";

type Route = { id: number; line: string };

const rows: Route[] = [
  { id: 1, line: "Yellow" },
  { id: 2, line: "Red" },
  { id: 3, line: "Blue" },
];

type Props = { onCreate: () => void; onEdit: () => void };

export default function RoutesSection({ onCreate, onEdit }: Props) {
  return (
    <SectionCard
      id="routes"
      title="Routes"
      icon="⌖"
      count={rows.length}
      accent="#ec3b86"
      buttonLabel="Add Route"
      onCreate={onCreate}
    >
      <DataTable
        rows={rows}
        onEdit={onEdit}
        onDelete={() => {}}
        columns={[
          { key: "id", label: "ID", render: row => row.id },
          { key: "line", label: "Line", render: row => row.line },
        ]}
      />
    </SectionCard>
  );
}
