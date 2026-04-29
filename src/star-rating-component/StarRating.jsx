import { useState } from 'react';
import Star from './Star';

// Reusable widget — accepts `total`, `value`, `onChange` as props
const StarRating = ({ total = 5, value = 0, onChange }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div
      style={{ display: 'flex', gap: 4 }}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {Array.from({ length: total }, (_, i) => {
        const starNumber = i + 1;
        return (
          <Star
            key={starNumber}
            filled={starNumber <= value}
            hovered={hoverIndex !== null && starNumber <= hoverIndex}
            onMouseEnter={() => setHoverIndex(starNumber)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => onChange(starNumber)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
