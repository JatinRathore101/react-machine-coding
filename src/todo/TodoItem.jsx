const TodoItem = ({ task, onToggle, onDelete }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: 6,
      background: task.done ? '#f9fafb' : '#fff',
    }}
  >
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => onToggle(task.id)}
      style={{ width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }}
    />

    <span
      style={{
        flex: 1,
        fontSize: '0.95rem',
        color: task.done ? '#9ca3af' : '#111827',
        textDecoration: task.done ? 'line-through' : 'none',
        wordBreak: 'break-word',
      }}
    >
      {task.text}
    </span>

    <button
      onClick={() => onDelete(task.id)}
      style={{
        padding: '3px 10px',
        border: 'none',
        borderRadius: 4,
        background: '#fee2e2',
        color: '#b91c1c',
        fontSize: '0.8rem',
        fontWeight: 500,
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      Delete
    </button>
  </div>
);

export default TodoItem;
