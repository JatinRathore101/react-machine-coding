import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const STORAGE_KEY = 'todo-list';

const ToDo = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  );
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '40px auto',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 style={{ margin: '0 0 20px', fontSize: '1.4rem', fontWeight: 600 }}>
        To-Do List
      </h2>

      {/* Add task row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task…"
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '0.95rem',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '8px 18px',
            border: 'none',
            borderRadius: 6,
            background: '#3b82f6',
            color: '#fff',
            fontSize: '0.95rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', textAlign: 'center' }}>
          No tasks yet. Add one above!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {/* Footer summary */}
      {tasks.length > 0 && (
        <p style={{ marginTop: 16, fontSize: '0.8rem', color: '#6b7280' }}>
          {tasks.filter((t) => t.done).length} / {tasks.length} completed
        </p>
      )}
    </div>
  );
};

export default ToDo;
