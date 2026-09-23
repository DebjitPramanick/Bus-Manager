import { useState } from "react";
import "./App.css";
import RoutesSection from "./components/routes/RoutesSection";
import BusesSection from "./components/buses/BusesSection";
import PassengersSection from "./components/passengers/PassengersSection";
import SlotsSection from "./components/slots/SlotsSection";
// import StatusFlow from "./components/status/StatusFlow";
import RouteModal from "./components/modals/RouteModal";
import BusModal from "./components/modals/BusModal";
import PassengerModal from "./components/modals/PassengerModal";
import SlotModal from "./components/modals/SlotModal";

export type ModalType = "route" | "bus" | "passenger" | "slot" | null;
export type ModalMode = "create" | "edit";

export default function App() {
  const [modal, setModal] = useState<ModalType>(null);
  const [mode, setMode] = useState<ModalMode>("create");

  const openModal = (
    type: Exclude<ModalType, null>,
    nextMode: ModalMode = "create",
  ) => {
    setMode(nextMode);
    setModal(type);
  };

  const closeModal = () => setModal(null);

  return (
    <div className="app-shell">
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Transit control</p>
            <h1>Bus Management</h1>
            <p className="subtitle">
              Manage routes, buses, passengers and bus slots.
            </p>
          </div>
          <div className="profile-chip">DP</div>
        </header>

        <section className="grid-layout">
          <PassengersSection onCreate={() => openModal("passenger")} />
          <SlotsSection
            onAddSlot={() => openModal("slot")}
            onEditSlot={() => openModal("slot", "edit")}
          />
          <div className="col-layout">
            <RoutesSection onCreate={() => openModal("route")} />
            <BusesSection onCreate={() => openModal("bus")} />
          </div>
        </section>

        {/* <StatusFlow
          onAddBus={() => openModal("bus")}
          onReleaseBus={() => openModal("slot", "edit")}
        /> */}
      </main>

      {modal === "route" && <RouteModal mode={mode} onClose={closeModal} />}
      {modal === "bus" && <BusModal mode={mode} onClose={closeModal} />}
      {modal === "passenger" && (
        <PassengerModal mode={mode} onClose={closeModal} />
      )}
      {modal === "slot" && <SlotModal mode={mode} onClose={closeModal} />}
    </div>
  );
}
