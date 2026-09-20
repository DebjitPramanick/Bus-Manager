import type { ModalMode } from "../../App";
import Modal from "./Modal";

type Props = { mode: ModalMode; onClose: () => void };

export default function SlotModal({ mode, onClose }: Props) {
  return (
    <Modal
      title={`${mode === "edit" ? "Edit" : "Add"} Bus Slot`}
      subtitle="Place a bus into an available slot."
      icon="◷"
      accent="#ff8615"
      onClose={onClose}
    >
      <form className="form-stack" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label>Route</label>
          <select defaultValue="Yellow">
            <option>Yellow</option>
            <option>Red</option>
            <option>Blue</option>
          </select>
        </div>
        <div className="field">
          <label>Bus</label>
          <select defaultValue="101">
            <option value="101">Bus #101</option>
            <option value="102">Bus #102</option>
            <option value="103">Bus #103</option>
          </select>
        </div>
        <div className="field">
          <label>Capacity</label>
          <input type="number" placeholder="e.g. 40" defaultValue={mode === "edit" ? 20 : ""} />
        </div>
        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="save-button">Save Slot</button>
        </div>
      </form>
    </Modal>
  );
}
