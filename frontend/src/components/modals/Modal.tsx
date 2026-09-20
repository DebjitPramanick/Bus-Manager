import type { ReactNode } from "react";
import "./Modal.css";

type Props = {
  title: string;
  subtitle?: string;
  icon: string;
  accent: string;
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ title, subtitle, icon, accent, children, onClose }: Props) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()} style={{ "--modal-accent": accent } as React.CSSProperties}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-title-row">
          <div className="modal-icon">{icon}</div>
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
