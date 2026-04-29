import { useState } from 'react';
import { ITEMS } from './constants';
import AccordianItem from './AccordianItem';

const Accordian = () => {
  // null  → all collapsed; number → that item's id is open
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div
      style={{
        maxWidth: 560,
        margin: '40px auto',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 style={{ margin: '0 0 20px', fontSize: '1.4rem', fontWeight: 600 }}>
        Accordion
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ITEMS.map((item) => (
          <AccordianItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Accordian;
