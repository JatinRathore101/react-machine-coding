import React, { useState } from "react";
import { TASKS } from "./constants";
import Header from "./header";
import GlobalControl from "./globalControl";
import Task from "./task";

const Bars = () => {
  const [tasks, setTasks] = useState(TASKS);

  const setTask = (id, task) => {
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex((t) => t.id === id);
      if (index < 0 || index >= prevTasks.length) return prevTasks;
      const newTasks = [...prevTasks];
      newTasks[index] = { ...prevTasks[index], ...task };
      return newTasks;
    });
  };

  return (
    <div style={{ textAlign: "center", margin: "16px" }}>
      <Header heading={"Concurrant Progress Bars"} />
      <GlobalControl setTasks={setTasks} />
      {tasks?.map(({ id, ...task }) => (
        <Task key={id} task={{ ...task, id }} setTask={setTask} />
      ))}
    </div>
  );
};

export default Bars;
