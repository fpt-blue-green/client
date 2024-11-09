'use client';

import { useState } from 'react';
import InboxList from './inbox-list';
import BoxChat from './box-chat';

const Chats = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex h-full gap-8 px-5 py-6">
      <InboxList toggle={handleToggle} />
      <BoxChat open={open} toggle={handleToggle} />
    </div>
  );
};

export default Chats;
