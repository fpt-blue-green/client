import { useEffect, useRef } from 'react';

const useUpdateEffect = (callback: () => any, deps?: any[]) => {
  const isMount = useRef(true);

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
    } else {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
