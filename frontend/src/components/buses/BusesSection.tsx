import SectionCard from "../common/SectionCard";
import DataTable from "../common/DataTable";
import "./BusesSection.css";

type Bus = { id: number; route: string };

const rows: Bus[] = [
  { id: 101, route: "Yellow" },
  { id: 102, route: "Yellow" },
  { id: 103, route: "Red" },
  { id: 104, route: "Blue" },
];

type Props = { onCreate: () => void; onEdit: () => void };

export default function BusesSection({ onCreate, onEdit }: Props) {
  return (
    <SectionCard
      id="buses"
      title="Buses"
      icon="▣"
      count={rows.length}
      accent="#16b67a"
      buttonLabel="Add Bus"
      onCreate={onCreate}
    >
      <DataTable
        rows={rows}
        onEdit={onEdit}
        onDelete={() => {}}
        columns={[
          { key: "id", label: "Bus", render: row => `#${row.id}` },
          { key: "route", label: "Route", render: row => row.route },
        ]}
      />
    </SectionCard>
  );
}
