const Star = ({ filled, hovered, onMouseEnter, onMouseLeave, onClick }) => (
  <span
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    style={{
      fontSize: '2rem',
      cursor: 'pointer',
      color: filled || hovered ? '#f59e0b' : '#d1d5db',
      transition: 'color 0.15s',
      userSelect: 'none',
      lineHeight: 1,
    }}
  >
    ★
  </span>
);

export default Star;
