import { useState } from 'react';
import StarRating from './StarRating';

const LABELS = ['', 'Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];

const StarRatingComponent = () => {
  const [rating, setRating] = useState(0);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 style={{ margin: '0 0 20px', fontSize: '1.4rem', fontWeight: 600 }}>
        Star Rating
      </h2>

      <StarRating value={rating} onChange={setRating} />

      <p
        style={{
          marginTop: 12,
          fontSize: '0.95rem',
          color: rating ? '#111827' : '#9ca3af',
          minHeight: '1.4em',
        }}
      >
        {rating ? `${rating} / 5 — ${LABELS[rating]}` : 'Click to rate'}
      </p>

      {rating > 0 && (
        <button
          onClick={() => setRating(0)}
          style={{
            marginTop: 8,
            padding: '5px 14px',
            border: 'none',
            borderRadius: 4,
            background: '#e5e7eb',
            color: '#374151',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default StarRatingComponent;
