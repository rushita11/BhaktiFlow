import { X } from "lucide-react";

export default function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section className="modal-card" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <header className="modal-header">
          <div>
            <span className="eyebrow">Naam Jaap</span>
            <h2>{title}</h2>
          </div>
          <button className="icon-button muted" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-footer">{footer}</footer>}
      </section>
    </div>
  );
}
