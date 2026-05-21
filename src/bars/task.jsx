import { useEffect } from "react";

const Task = ({ task, setTask }) => {
  const { id, name, progress, status, duration } = task;

  useEffect(() => {
    if (status !== "IN_PROGRESS") return;

    if (progress >= duration) {
      setTask(id, { status: "COMPLETED", progress: duration });
      return;
    }

    const timeout = setTimeout(() => {
      setTask(id, { progress: progress + 100 });
    }, 100);

    return () => clearTimeout(timeout);
  }, [status, progress, id, duration, setTask]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <span>{name}</span>
      <span>{Math.floor((progress / duration) * 100)}%</span>
      <span>{status}</span>
    </div>
  );
};

export default Task;
