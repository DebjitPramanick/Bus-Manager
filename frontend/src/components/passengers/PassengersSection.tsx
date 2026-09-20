import SectionCard from "../common/SectionCard";
import DataTable from "../common/DataTable";
import "./PassengersSection.css";

type Passenger = { id: number; name: string; route: string };

const rows: Passenger[] = [
  { id: 1, name: "John Doe", route: "Yellow" },
  { id: 2, name: "Priya Sharma", route: "Red" },
  { id: 3, name: "Alex Kim", route: "Blue" },
  { id: 4, name: "Neha Verma", route: "Yellow" },
  { id: 5, name: "Rahul Das", route: "Red" },
];

type Props = { onCreate: () => void; onEdit: () => void };

export default function PassengersSection({ onCreate, onEdit }: Props) {
  return (
    <SectionCard
      id="passengers"
      title="Passengers"
      icon="♙"
      count={rows.length}
      accent="#4d8cf5"
      buttonLabel="Add Passenger"
      onCreate={onCreate}
    >
      <DataTable
        rows={rows}
        onEdit={onEdit}
        onDelete={() => {}}
        columns={[
          { key: "id", label: "ID", render: row => row.id },
          { key: "name", label: "Name", render: row => row.name },
          { key: "route", label: "Route", render: row => row.route },
        ]}
      />
    </SectionCard>
  );
}
