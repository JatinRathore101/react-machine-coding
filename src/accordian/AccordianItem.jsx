const AccordianItem = ({ item, isOpen, onToggle }) => (
  <div
    style={{
      border: '1px solid #e5e7eb',
      borderRadius: 6,
      overflow: 'hidden',
    }}
  >
    {/* Header */}
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px',
        background: isOpen ? '#eff6ff' : '#fff',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#111827',
        transition: 'background 0.15s',
      }}
    >
      <span>{item.question}</span>
      <span
        style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          flexShrink: 0,
          marginLeft: 12,
        }}
      >
        +
      </span>
    </button>

    {/* Body */}
    {isOpen && (
      <div
        style={{
          padding: '12px 16px 16px',
          fontSize: '0.9rem',
          color: '#374151',
          lineHeight: 1.6,
          borderTop: '1px solid #e5e7eb',
          background: '#fff',
        }}
      >
        {item.answer}
      </div>
    )}
  </div>
);

export default AccordianItem;
