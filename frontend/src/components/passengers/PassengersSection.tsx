import SectionCard from "../common/SectionCard";
import DataTable from "../common/DataTable";
import "./PassengersSection.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getPassengers } from "../../redux/slices/passengers.slice";

type Props = { onCreate: () => void };

export default function PassengersSection({ onCreate }: Props) {
  const dispatch = useAppDispatch();
  const { data: passengers, isLoading } = useAppSelector(
    (state) => state.passengers,
  );

  useEffect(() => {
    dispatch(getPassengers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SectionCard
      id="passengers"
      title="Passengers"
      icon="♙"
      count={passengers.length}
      accent="#4d8cf5"
      buttonLabel="Add Passenger"
      onCreate={onCreate}
    >
      <DataTable
        rows={passengers}
        onDelete={() => {}}
        columns={[
          { key: "id", label: "ID", render: (row) => row.id },
          { key: "name", label: "Name", render: (row) => row.name },
          { key: "route", label: "Route", render: (row) => row.route.line },
          {
            key: "bus",
            label: "Bus",
            render: (row) => (row.bus?.id ? `Bus - ${row.bus.id}` : "N/A"),
          },
        ]}
      />
    </SectionCard>
  );
}
