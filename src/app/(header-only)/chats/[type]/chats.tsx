'use client';

import { useState } from 'react';
import InboxList from './inbox-list';
import BoxChat from './box-chat';
import { useSearchParams } from 'next/navigation';
import NoData from '@/components/no-data';

const Chats = () => {
  const [open, setOpen] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('c');

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex h-full gap-6 px-5 py-6">
      <InboxList id={id} toggle={handleToggle} />
      {id ? (
        <BoxChat id={id} open={open} toggle={handleToggle} />
      ) : (
        <NoData className="flex-1 h-full" description="Chọn đoạn chat hoặc nhắn tin mới" />
      )}
    </div>
  );
};

export default Chats;
