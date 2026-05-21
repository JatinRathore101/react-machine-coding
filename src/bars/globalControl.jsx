const GlobalControl = ({ setTasks }) => {
  const startAll = () =>
    setTasks((p) => {
      return p?.map((t) => ({ ...t, status: "IN_PROGRESS", progress: 0 }));
    });
  const resetAll = () =>
    setTasks((p) => {
      return p?.map((t) => ({ ...t, status: "INITIAL", progress: 0 }));
    });
  return (
    <div
      style={{
        margin: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <button onClick={startAll}>Start All</button>
      <button onClick={resetAll}>Reset All</button>
    </div>
  );
};

export default GlobalControl;
