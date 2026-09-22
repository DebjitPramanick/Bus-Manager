import { useEffect, useState } from "react";
import "./SlotsSection.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSlots } from "../../redux/slices/slots.slice";
import type { BusSlot, BusSlotsStatus } from "../../types";
import AssignBus from "./components/AssignBus";
import { getSlotStatus } from "../../api/slots.api";

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
  const [slotsStatus, setSlotsStatus] = useState<BusSlotsStatus>({});

  const fetchSlotsStatus = async () => {
    try {
      const response = await getSlotStatus();
      setSlotsStatus(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getSlots());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSlotsStatus();
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

          const slotStatus = slotsStatus.filling_status?.[slot.id];
          const nPassengers = slotStatus?.[0] ?? 0;
          const capacity = slotStatus?.[1] ?? 0;

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
                <div className="slot-metadata">
                  <span className="metadata-label">Route</span>
                  <strong
                    className={
                      !isOccupied ? "metadata-value-muted" : "metadata-value"
                    }
                  >
                    {slot.bus?.route?.line ?? "N/A"}
                  </strong>
                </div>

                <div className="slot-metadata">
                  <span className="metadata-label">Bus ID</span>
                  <strong
                    className={
                      !isOccupied ? "metadata-value-muted" : "metadata-value"
                    }
                  >
                    {slot.bus?.id ?? "N/A"}
                  </strong>
                </div>

                <div className="slot-metadata">
                  <span className="metadata-label">Filled</span>
                  <strong className={!isOccupied ? "metadata-value-muted" : ""}>
                    {nPassengers} / {capacity}
                  </strong>
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
