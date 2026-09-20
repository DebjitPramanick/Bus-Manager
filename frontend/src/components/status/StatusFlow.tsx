import "./StatusFlow.css";

type Props = {
  onAddBus: () => void;
  onReleaseBus: () => void;
};

export default function StatusFlow({ onAddBus, onReleaseBus }: Props) {
  return (
    <section className="status-flow">
      <div className="status-heading">
        <span className="status-flow-icon">⌁</span>
        <div>
          <h2>Slot Status Flow</h2>
          <p>Quick actions for the current bus allocation state.</p>
        </div>
      </div>

      <div className="status-track">
        <button className="status-card empty" onClick={onAddBus}>
          <span className="status-dot">＋</span>
          <span>
            <strong>Slot is Empty</strong>
            <small>Add a bus to this slot</small>
          </span>
          <b>→</b>
        </button>

        <button className="status-card full" onClick={onReleaseBus}>
          <span className="status-dot">✓</span>
          <span>
            <strong>Bus at Slot is Full</strong>
            <small>Release the bus or try another slot</small>
          </span>
        </button>
      </div>
    </section>
  );
}
