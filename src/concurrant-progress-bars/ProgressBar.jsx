const STATUS_COLORS = {
  idle:      { fill: '#3b82f6', badge: { background: '#e5e7eb', color: '#6b7280' } },
  running:   { fill: '#3b82f6', badge: { background: '#dbeafe', color: '#1d4ed8' } },
  paused:    { fill: '#f59e0b', badge: { background: '#fef9c3', color: '#854d0e' } },
  completed: { fill: '#22c55e', badge: { background: '#dcfce7', color: '#166534' } },
};

const BTN_COLORS = {
  start:  '#3b82f6',
  resume: '#3b82f6',
  pause:  '#f59e0b',
  reset:  '#6b7280',
};

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 500,
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '2px 8px',
    borderRadius: 999,
  },
  track: {
    position: 'relative',
    height: 22,
    background: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  pct: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#111827',
    pointerEvents: 'none',
  },
  controls: {
    display: 'flex',
    gap: 8,
  },
  btn: {
    padding: '5px 14px',
    border: 'none',
    borderRadius: 4,
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    color: '#fff',
  },
};

const ProgressBar = ({ bar, onStart, onPause, onReset }) => {
  const { label, progress, status } = bar;
  const { fill, badge: badgeStyle } = STATUS_COLORS[status];

  return (
    <div style={styles.row}>
      <div style={styles.meta}>
        <span style={styles.label}>{label}</span>
        <span style={{ ...styles.badge, ...badgeStyle }}>{status}</span>
      </div>

      <div style={styles.track}>
        <div style={{ height: '100%', width: `${progress}%`, background: fill, borderRadius: 4, transition: 'width 0.1s linear' }} />
        <span style={styles.pct}>{Math.floor(progress)}%</span>
      </div>

      <div style={styles.controls}>
        {status === 'running' ? (
          <button style={{ ...styles.btn, background: BTN_COLORS.pause }} onClick={onPause}>
            Pause
          </button>
        ) : (
          <button
            style={{ ...styles.btn, background: BTN_COLORS.start, opacity: status === 'completed' ? 0.4 : 1, cursor: status === 'completed' ? 'default' : 'pointer' }}
            onClick={onStart}
            disabled={status === 'completed'}
          >
            {status === 'paused' ? 'Resume' : 'Start'}
          </button>
        )}
        <button
          style={{ ...styles.btn, background: BTN_COLORS.reset, opacity: status === 'idle' ? 0.4 : 1, cursor: status === 'idle' ? 'default' : 'pointer' }}
          onClick={onReset}
          disabled={status === 'idle'}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
