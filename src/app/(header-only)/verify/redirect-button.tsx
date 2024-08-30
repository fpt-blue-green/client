'use client';

import { Button } from '@/components/ui/button';
import config from '@/config';
import { useRouter } from 'next/navigation';

import { useLayoutEffect, useState } from 'react';

const RedirectButton = () => {
  const [time, setTime] = useState(10);
  const router = useRouter();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        router.push(config.routes.home);
      }
    }, 1_000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <Button variant="outline" size="large" onClick={() => router.push(config.routes.home)} disabled={!time}>
      Bạn sẽ trở về trang chủ sau {time} giây
    </Button>
  );
};
export default RedirectButton;
