import SectionCard from "../common/SectionCard";
import DataTable from "../common/DataTable";
import "./BusesSection.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getBuses } from "../../redux/slices/buses.slice";

type Props = { onCreate: () => void };

export default function BusesSection({ onCreate }: Props) {
  const dispatch = useAppDispatch();
  const { data: buses, isLoading } = useAppSelector((state) => state.buses);

  useEffect(() => {
    dispatch(getBuses());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SectionCard
      id="buses"
      title="Buses"
      icon="▣"
      count={buses.length}
      accent="#16b67a"
      buttonLabel="Add Bus"
      onCreate={onCreate}
    >
      <DataTable
        rows={buses}
        onDelete={() => {}}
        columns={[
          { key: "id", label: "Bus", render: (row) => `#${row.id}` },
          { key: "route", label: "Route", render: (row) => row.route.line },
        ]}
      />
    </SectionCard>
  );
}
