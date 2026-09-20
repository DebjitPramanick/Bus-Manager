import SectionCard from "../common/SectionCard";
import DataTable from "../common/DataTable";
import "./SlotsSection.css";

type Slot = { id: number; route: string; bus: string; capacity: number; status: "Open" | "Full" };

const rows: Slot[] = [
  { id: 1, route: "Yellow", bus: "#101", capacity: 20, status: "Open" },
  { id: 2, route: "Yellow", bus: "#102", capacity: 30, status: "Full" },
  { id: 3, route: "Red", bus: "#103", capacity: 25, status: "Open" },
  { id: 4, route: "Blue", bus: "—", capacity: 40, status: "Open" },
];

type Props = { onCreate: () => void; onEdit: () => void };

export default function SlotsSection({ onCreate, onEdit }: Props) {
  return (
    <SectionCard
      id="slots"
      title="Bus Slots"
      icon="◷"
      count={rows.length}
      accent="#ff8615"
      buttonLabel="Add Slot"
      onCreate={onCreate}
    >
      <DataTable
        rows={rows}
        onEdit={onEdit}
        onDelete={() => {}}
        columns={[
          { key: "id", label: "ID", render: row => row.id },
          { key: "route", label: "Route", render: row => row.route },
          { key: "bus", label: "Bus", render: row => row.bus },
          { key: "capacity", label: "Capacity", render: row => row.capacity },
        ]}
      />
    </SectionCard>
  );
}
