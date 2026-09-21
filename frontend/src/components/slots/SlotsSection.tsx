import { useEffect, useState } from "react";
import "./SlotsSection.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSlots } from "../../redux/slices/slots.slice";
import type { BusSlot } from "../../types";
import AssignBus from "./components/AssignBus";

type Props = {
  onAddSlot?: () => void;
  onEditSlot?: (slot: BusSlot) => void;
  onDeleteSlot?: (slot: BusSlot) => void;
};

export default function SlotsSection({
  onAddSlot,
  // onEditSlot,
  // onDeleteSlot,
}: Props) {
  const dispatch = useAppDispatch();
  const { data: slots, isLoading } = useAppSelector((state) => state.slots);

  const [selectedSlot, setSelectedSlot] = useState<BusSlot | null>(null);

  useEffect(() => {
    dispatch(getSlots());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          const isOccupied = slot.is_occupied;
          // const isFull = isOccupied && slot.passengers >= slot.capacity;
          // const availableSeats = Math.max(slot.capacity - slot.passengers, 0);

          return (
            <article
              className={`slot-card ${!isOccupied ? "slot-card--empty" : ""}`}
              key={slot.id}
            >
              <div className="slot-number">
                <span>Slot</span>
                <strong>{String(slot.slot_number).padStart(2, "0")}</strong>
              </div>

              <div className="slot-main">
                <div className="slot-route">
                  <span className="slot-label">Route</span>

                  {/* {isOccupied ? (
                    <span
                      className={`route-pill route-pill--${slot.route?.toLowerCase()}`}
                    >
                      <i />
                      N/A
                    </span>
                  ) : (
                    <span className="slot-muted">No route assigned</span>
                  )} */}
                </div>

                <div className="slot-bus">
                  <span className="slot-label">Bus</span>
                  {/* <strong className={isEmpty ? "slot-muted" : ""}>
                    {slot.bus ?? "Empty"}
                  </strong> */}
                </div>

                <div className="slot-capacity">
                  <div className="capacity-top">
                    <span className="slot-label">Capacity</span>

                    {isOccupied && (
                      <span className="capacity-value">10/40</span>
                    )}
                  </div>

                  {/* <div className="capacity-track">
                    <span
                      className={`capacity-fill ${
                        !isOccupied
                          ? "capacity-fill--empty"
                          : isFull
                            ? "capacity-fill--full"
                            : ""
                      }`}
                      style={{
                        width: !isOccupied
                          ? "0%"
                          : `${Math.min(
                              (slot.passengers / slot.capacity) * 100,
                              100,
                            )}%`,
                      }}
                    />
                  </div> */}

                  {/* <small>
                    {isEmpty
                      ? "Waiting for bus"
                      : isFull
                        ? "Full"
                        : `${availableSeats} seats available`}
                  </small> */}
                </div>
              </div>

              <div className="slot-actions">
                {isOccupied ? (
                  <>
                    <button
                      type="button"
                      className="slot-icon-button"
                      aria-label={`Edit slot ${slot.id}`}
                      // onClick={() => handleEdit(slot)}
                    >
                      ✎
                    </button>

                    <button
                      type="button"
                      className="slot-icon-button slot-icon-button--danger"
                      aria-label={`Delete slot ${slot.id}`}
                      // onClick={() => onDeleteSlot?.(slot)}
                    >
                      ⌫
                    </button>
                  </>
                ) : (
                  <AssignBus slot={slot} />
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
