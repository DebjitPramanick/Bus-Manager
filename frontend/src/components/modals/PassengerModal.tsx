import type { ModalMode } from "../../App";
import Modal from "./Modal";

type Props = { mode: ModalMode; onClose: () => void };

export default function PassengerModal({ mode, onClose }: Props) {
  return (
    <Modal
      title={`${mode === "edit" ? "Edit" : "Add"} Passenger`}
      subtitle="Add a passenger request to the queue."
      icon="♙"
      accent="#4d8cf5"
      onClose={onClose}
    >
      <form className="form-stack" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label>Passenger name</label>
          <input placeholder="Enter full name" defaultValue={mode === "edit" ? "John Doe" : ""} />
        </div>
        <div className="field">
          <label>Route</label>
          <select defaultValue="Yellow">
            <option>Yellow</option>
            <option>Red</option>
            <option>Blue</option>
          </select>
        </div>
        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="save-button">Save Passenger</button>
        </div>
      </form>
    </Modal>
  );
}
