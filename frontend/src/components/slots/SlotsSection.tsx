import { useState } from "react";
import "./SlotsSection.css";

export type BusSlot = {
  id: number;
  route: string | null;
  bus: string | null;
  capacity: number;
  passengers: number;
};

type Props = {
  slots?: BusSlot[];
  onAddSlot?: () => void;
  onEditSlot?: (slot: BusSlot) => void;
  onDeleteSlot?: (slot: BusSlot) => void;
};

const defaultSlots: BusSlot[] = [
  { id: 1, route: "Yellow", bus: "#101", capacity: 20, passengers: 14 },
  { id: 2, route: "Yellow", bus: "#102", capacity: 30, passengers: 30 },
  { id: 3, route: "Red", bus: "#103", capacity: 25, passengers: 11 },
  { id: 4, route: null, bus: null, capacity: 40, passengers: 0 },
];

export default function SlotsSection({
  slots = defaultSlots,
  onAddSlot,
  onEditSlot,
  onDeleteSlot,
}: Props) {
  const [selectedSlot, setSelectedSlot] = useState<BusSlot | null>(null);

  const handleEdit = (slot: BusSlot) => {
    setSelectedSlot(slot);
    onEditSlot?.(slot);
  };

  return (
    <section className="slots-section" id="slots">
      <header className="slots-header">
        <div className="slots-heading">
          <div className="slots-icon" aria-hidden="true">
            <span>◷</span>
          </div>

          <div>
            <h2>Bus Slots</h2>
            <p>{slots.length} total</p>
          </div>
        </div>

        <button type="button" className="slots-add-button" onClick={onAddSlot}>
          <span>＋</span>
          Add Slot
        </button>
      </header>

      <div className="slots-list">
        {slots.map((slot) => {
          const isEmpty = !slot.bus;
          const isFull = !isEmpty && slot.passengers >= slot.capacity;
          const availableSeats = Math.max(slot.capacity - slot.passengers, 0);

          return (
            <article
              className={`slot-card ${isEmpty ? "slot-card--empty" : ""}`}
              key={slot.id}
            >
              <div className="slot-number">
                <span>Slot</span>
                <strong>{String(slot.id).padStart(2, "0")}</strong>
              </div>

              <div className="slot-main">
                <div className="slot-route">
                  <span className="slot-label">Route</span>

                  {isEmpty ? (
                    <span className="slot-muted">No route assigned</span>
                  ) : (
                    <span
                      className={`route-pill route-pill--${slot.route?.toLowerCase()}`}
                    >
                      <i />
                      {slot.route}
                    </span>
                  )}
                </div>

                <div className="slot-bus">
                  <span className="slot-label">Bus</span>
                  <strong className={isEmpty ? "slot-muted" : ""}>
                    {slot.bus ?? "Empty"}
                  </strong>
                </div>

                <div className="slot-capacity">
                  <div className="capacity-top">
                    <span className="slot-label">Capacity</span>

                    {!isEmpty && (
                      <span className="capacity-value">
                        {slot.passengers}/{slot.capacity}
                      </span>
                    )}
                  </div>

                  <div className="capacity-track">
                    <span
                      className={`capacity-fill ${
                        isEmpty
                          ? "capacity-fill--empty"
                          : isFull
                            ? "capacity-fill--full"
                            : ""
                      }`}
                      style={{
                        width: isEmpty
                          ? "0%"
                          : `${Math.min(
                              (slot.passengers / slot.capacity) * 100,
                              100,
                            )}%`,
                      }}
                    />
                  </div>

                  <small>
                    {isEmpty
                      ? "Waiting for bus"
                      : isFull
                        ? "Full"
                        : `${availableSeats} seats available`}
                  </small>
                </div>
              </div>

              <div className="slot-actions">
                {isEmpty ? (
                  <button
                    type="button"
                    className="slot-assign-button"
                    onClick={() => handleEdit(slot)}
                  >
                    Assign bus
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="slot-icon-button"
                      aria-label={`Edit slot ${slot.id}`}
                      onClick={() => handleEdit(slot)}
                    >
                      ✎
                    </button>

                    <button
                      type="button"
                      className="slot-icon-button slot-icon-button--danger"
                      aria-label={`Delete slot ${slot.id}`}
                      onClick={() => onDeleteSlot?.(slot)}
                    >
                      ⌫
                    </button>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {selectedSlot && (
        <div className="slot-selection-hint">
          Slot {selectedSlot.id} selected — connect your modal here.
          <button type="button" onClick={() => setSelectedSlot(null)}>
            ×
          </button>
        </div>
      )}
    </section>
  );
}
