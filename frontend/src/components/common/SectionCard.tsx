import "./SectionCard.css";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: string;
  icon: string;
  count: number;
  accent: string;
  buttonLabel: string;
  onCreate: () => void;
  children: ReactNode;
};

export default function SectionCard({
  id, title, icon, count, accent, buttonLabel, onCreate, children
}: Props) {
  return (
    <section id={id} className="section-card" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="section-header">
        <div className="section-title">
          <div className="section-icon">{icon}</div>
          <div>
            <h2>{title}</h2>
            <span>{count} total</span>
          </div>
        </div>
        <button className="add-button" onClick={onCreate}>＋ {buttonLabel}</button>
      </div>
      {children}
    </section>
  );
}
