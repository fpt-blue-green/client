import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
