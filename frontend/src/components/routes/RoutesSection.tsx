import SectionCard from "../common/SectionCard";
import DataTable from "../common/DataTable";
import "./RoutesSection.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getRoutes } from "../../redux/slices/routes.slice";
import { useEffect } from "react";

type Props = { onCreate: () => void; onEdit: () => void };

export default function RoutesSection({ onCreate, onEdit }: Props) {
  const dispatch = useAppDispatch();
  const { data: routes, isLoading } = useAppSelector((state) => state.routes);

  useEffect(() => {
    dispatch(getRoutes());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SectionCard
      id="routes"
      title="Routes"
      icon="⌖"
      count={routes.length}
      accent="#ec3b86"
      buttonLabel="Add Route"
      onCreate={onCreate}
    >
      <DataTable
        rows={routes}
        onEdit={onEdit}
        onDelete={() => {}}
        columns={[
          { key: "id", label: "ID", render: (row) => row.id },
          { key: "line", label: "Line", render: (row) => row.line },
        ]}
      />
    </SectionCard>
  );
}
