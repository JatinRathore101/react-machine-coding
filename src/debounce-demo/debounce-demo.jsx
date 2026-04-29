import { useState } from 'react';
import useDebounce from './useDebounce';

const DEBOUNCE_DELAY = 500;

const DebaunceDemo = () => {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, DEBOUNCE_DELAY);

  return (
    <div
      style={{
        maxWidth: 560,
        margin: '40px auto',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 style={{ margin: '0 0 6px', fontSize: '1.4rem', fontWeight: 600 }}>
        Debounce Demo
      </h2>
      <p style={{ margin: '0 0 20px', fontSize: '0.875rem', color: '#6b7280' }}>
        Output updates {DEBOUNCE_DELAY}ms after you stop typing.
      </p>

      <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>
        Input
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing…"
        rows={4}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '0.95rem',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          resize: 'vertical',
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
        }}
      />

      <label style={{ display: 'block', fontWeight: 500, margin: '20px 0 6px' }}>
        Debounced Output
      </label>
      <div
        style={{
          minHeight: 80,
          padding: '10px 12px',
          fontSize: '0.95rem',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          background: '#f9fafb',
          color: debouncedText ? '#111827' : '#9ca3af',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {debouncedText || 'Debounced text will appear here…'}
      </div>
    </div>
  );
};

export default DebaunceDemo;
