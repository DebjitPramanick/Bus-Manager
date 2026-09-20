import type { ModalMode } from "../../App";
import Modal from "./Modal";

type Props = { mode: ModalMode; onClose: () => void };

export default function RouteModal({ mode, onClose }: Props) {
  return (
    <Modal
      title={`${mode === "edit" ? "Edit" : "Add"} Route`}
      subtitle="Define a route line for the network."
      icon="⌖"
      accent="#ec3b86"
      onClose={onClose}
    >
      <form className="form-stack" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label>Line name</label>
          <input placeholder="e.g. Yellow" defaultValue={mode === "edit" ? "Yellow" : ""} />
        </div>
        <div className="field">
          <label>Display color</label>
          <select defaultValue="yellow">
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="save-button">Save Route</button>
        </div>
      </form>
    </Modal>
  );
}
