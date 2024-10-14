'use client';

import { useRef, useCallback } from 'react';

function useThrottle<T extends (...args: any[]) => void>(callback: T, delay: number) {
  // Dùng để lưu lại thời điểm lần cuối cùng hàm callback được gọi
  const lastCalled = useRef(0);

  // Ref giữ timeout nếu throttle đang trong khoảng chờ
  const timeout = useRef<NodeJS.Timeout | null>(null);

  // Throttled function
  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      // Kiểm tra xem đã đủ thời gian delay kể từ lần cuối cùng chưa
      if (now - lastCalled.current >= delay) {
        // Gọi hàm callback
        callback(...args);
        lastCalled.current = now;
      } else {
        // Nếu chưa đủ thời gian thì lên lịch thực thi callback khi hết thời gian
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
          callback(...args);
          lastCalled.current = Date.now();
        }, delay - (now - lastCalled.current));
      }
    },
    [callback, delay],
  );

  return throttledFunction;
}

export default useThrottle;
