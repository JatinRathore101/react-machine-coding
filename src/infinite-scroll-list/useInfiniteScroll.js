import { useEffect, useRef } from 'react';

const useInfiniteScroll = (onIntersect) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onIntersect();
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [onIntersect]);

  return loaderRef;
};

export default useInfiniteScroll;
