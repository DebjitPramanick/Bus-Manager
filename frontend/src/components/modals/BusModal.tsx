import type { ModalMode } from "../../App";
import Modal from "./Modal";

type Props = { mode: ModalMode; onClose: () => void };

export default function BusModal({ mode, onClose }: Props) {
  return (
    <Modal
      title={`${mode === "edit" ? "Edit" : "Add"} Bus`}
      subtitle="Assign a bus to a route."
      icon="▣"
      accent="#16b67a"
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
          <label>Bus number</label>
          <input placeholder="e.g. 101" defaultValue={mode === "edit" ? "101" : ""} />
        </div>
        <div className="field">
          <label>Capacity</label>
          <input type="number" placeholder="e.g. 40" defaultValue={mode === "edit" ? 40 : ""} />
        </div>
        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="save-button">Save Bus</button>
        </div>
      </form>
    </Modal>
  );
}
