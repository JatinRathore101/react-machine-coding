import ReactDOM from "react-dom";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
