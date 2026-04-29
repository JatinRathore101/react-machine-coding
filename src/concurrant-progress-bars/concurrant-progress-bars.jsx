import { useState, useEffect, useRef } from "react";
import { TICK, makeInitialBars } from "./constants";
import GlobalControls from "./GlobalControls";
import ProgressBar from "./ProgressBar";

const ConcurrantProgressBars = () => {
  const [bars, setBars] = useState(makeInitialBars);
  const timers = useRef({});

  useEffect(() => {
    return () => Object.values(timers.current).forEach(clearInterval);
  }, []);

  const startBar = (id) => {
    setBars((prev) => {
      const bar = prev.find((b) => b.id === id);
      if (!bar || bar.status === "running" || bar.status === "completed")
        return prev;
      return prev.map((b) => (b.id === id ? { ...b, status: "running" } : b));
    });

    timers.current[id] = setInterval(() => {
      setBars((prev) => {
        const bar = prev.find((b) => b.id === id);
        if (!bar || bar.status !== "running") {
          clearInterval(timers.current[id]);
          return prev;
        }

        const newProgress = Math.min(
          bar.progress + (TICK / bar.duration) * 100,
          100,
        );
        const completed = newProgress >= 100;

        if (completed) {
          clearInterval(timers.current[id]);
          delete timers.current[id];
        }

        return prev.map((b) =>
          b.id === id
            ? {
                ...b,
                progress: newProgress,
                status: completed ? "completed" : "running",
              }
            : b,
        );
      });
    }, TICK);
  };

  const pauseBar = (id) => {
    clearInterval(timers.current[id]);
    delete timers.current[id];
    setBars((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "paused" } : b)),
    );
  };

  const resetBar = (id) => {
    clearInterval(timers.current[id]);
    delete timers.current[id];
    setBars((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, progress: 0, status: "idle" } : b,
      ),
    );
  };

  const startAll = () =>
    bars.forEach((b) => {
      if (b.status !== "running" && b.status !== "completed") startBar(b.id);
    });

  const resetAll = () => {
    Object.values(timers.current).forEach(clearInterval);
    timers.current = {};
    setBars(makeInitialBars());
  };

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "40px auto",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: "0 0 20px",
          fontSize: "1.4rem",
          fontWeight: 600,
        }}
      >
        Concurrent Progress Bars
      </h2>

      <GlobalControls onStartAll={startAll} onResetAll={resetAll} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {bars.map((bar) => (
          <ProgressBar
            key={bar.id}
            bar={bar}
            onStart={() => startBar(bar.id)}
            onPause={() => pauseBar(bar.id)}
            onReset={() => resetBar(bar.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConcurrantProgressBars;
