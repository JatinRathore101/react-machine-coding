import { useState, useCallback } from 'react';
import useInfiniteScroll from './useInfiniteScroll';

const PAGE_SIZE = 20;

// Simulates an async data fetch
const fetchItems = (startIndex) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const items = Array.from({ length: PAGE_SIZE }, (_, i) => startIndex + i + 1);
      resolve(items);
    }, 600)
  );

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const nextIndex = items.length;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    fetchItems(nextIndex).then((newItems) => {
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
      // Stop after 100 items for demo purposes
      if (nextIndex + PAGE_SIZE >= 100) setHasMore(false);
    });
  }, [loading, hasMore, nextIndex]);

  const loaderRef = useInfiniteScroll(loadMore);

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '1.4rem', fontWeight: 600 }}>Infinite Scroll</h2>

      {items.map((item) => (
        <div
          key={item}
          style={{ padding: '10px 12px', borderBottom: '1px solid #e5e7eb', fontSize: '0.95rem' }}
        >
          Item #{item}
        </div>
      ))}

      {/* Sentinel — IntersectionObserver watches this */}
      <div ref={loaderRef} style={{ padding: '16px 0', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
        {loading && 'Loading...'}
        {!hasMore && 'No more items'}
      </div>
    </div>
  );
};

export default InfiniteScrollList;
