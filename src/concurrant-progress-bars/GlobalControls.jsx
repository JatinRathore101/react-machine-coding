const GlobalControls = ({ onStartAll, onResetAll }) => (
  <div
    style={{
      display: "flex",
      gap: 10,
      marginBottom: 28,
    }}
  >
    <button
      style={{
        padding: "6px 16px",
        border: "none",
        borderRadius: 4,
        fontSize: "0.85rem",
        fontWeight: 500,
        cursor: "pointer",
        color: "#fff",
        background: "#3b82f6",
      }}
      onClick={onStartAll}
    >
      Start All
    </button>
    <button
      style={{
        padding: "6px 16px",
        border: "none",
        borderRadius: 4,
        fontSize: "0.85rem",
        fontWeight: 500,
        cursor: "pointer",
        color: "#fff",
        background: "#6b7280",
      }}
      onClick={onResetAll}
    >
      Reset All
    </button>
  </div>
);

export default GlobalControls;
