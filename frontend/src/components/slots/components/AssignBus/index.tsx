import { useCallback, useEffect, useRef, useState } from "react";
import type { BusSlot } from "../../../../types";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { assignBusToSlot } from "../../../../redux/slices/slots.slice";
import "./index.css";
import { availableBusesSelector } from "../../../../redux/slices/buses.slice";

type Props = {
  slot: BusSlot;
};

const AssignBus = ({ slot }: Props) => {
  const dispatch = useAppDispatch();

  const availableBuses = useAppSelector(availableBusesSelector);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    top?: number;
    left?: number;
  } | null>(null);

  const handleAssignBus = useCallback(async (busId: number, slotId: number) => {
    dispatch(assignBusToSlot({ bus_id: busId, slot_id: slotId })).then(() => {
      setIsDropdownOpen(false);
    });
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      const buttonRect = assignBusButtonRef.current?.getBoundingClientRect();
      setPosition({ top: buttonRect?.bottom, left: buttonRect?.left });
    }
  }, [isDropdownOpen]);

  const assignBusButtonRef = useRef<HTMLButtonElement>(null);
  let dropdownNode;

  if (isDropdownOpen) {
    dropdownNode = (
      <div
        className="bus-dropdown"
        style={{
          top: position?.top,
          left: position?.left,
          width: "300px",
        }}
      >
        <div className="bus-dropdown-header">
          <span>Available buses</span>
          <small>Select a bus for Slot {slot.id}</small>
        </div>

        <div className="bus-dropdown-list">
          {availableBuses.map((bus) => (
            <button
              type="button"
              className="bus-option"
              key={bus.id}
              onClick={() => handleAssignBus(bus.id, slot.id)}
            >
              <span className="bus-option-icon">🚌</span>

              <span className="bus-option-content">
                <strong>
                  {bus.id} - {bus.route.line}
                </strong>
                <small>{bus.capacity} seats</small>
              </span>

              <span className="bus-option-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="slot-assignment">
        <button
          type="button"
          className="slot-assign-button"
          onClick={() => setIsDropdownOpen((p) => !p)}
          ref={assignBusButtonRef}
        >
          Assign bus
          <span className="slot-assign-chevron">⌄</span>
        </button>

        {dropdownNode ? createPortal(dropdownNode, document.body) : null}
      </div>
    </>
  );
};

export default AssignBus;
