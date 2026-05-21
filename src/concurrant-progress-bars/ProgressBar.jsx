const ProgressBar = ({ bar, onStart, onPause, onReset }) => {
  const { label, progress, status } = bar;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span>{status}</span>
      </div>

      <div
        style={{
          position: "relative",
          height: 20,
          background: "#e5e7eb",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background:
              status === "completed"
                ? "lightgreen"
                : status === "paused"
                  ? "yellow"
                  : "blue",
            transition: "width 0.1s linear",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: 6,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "0.75rem",
          }}
        >
          {Math.floor(progress)}%
        </span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {status === "running" ? (
          <button onClick={onPause}>Pause</button>
        ) : (
          <button onClick={onStart} disabled={status === "completed"}>
            {status === "paused" ? "Resume" : "Start"}
          </button>
        )}
        <button onClick={onReset} disabled={status === "idle"}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
