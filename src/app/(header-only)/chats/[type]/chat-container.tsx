'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

const ChatContainer = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className="flex-1 flex items-end overflow-auto pr-4">
      <div className="flex flex-col gap-4 max-h-full">
        <Message sent />
        <Message />
        <Message sent />
        <Message />
        <Message sent />
        <Message sent />
        <Message sent />
        <Message />
        <Message sent />
        <Message />
        <Message sent />
        <Message sent />
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const Message = ({ sent = false }) => {
  return (
    <div className={cn('flex items-end gap-2', { 'justify-end': sent })}>
      {!sent && (
        <Avatar className="size-10 shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn('max-w-[70%] w-fit px-3 py-2 bg-secondary shadow-md rounded-lg rounded-es-none', {
          'bg-primary rounded-es-lg rounded-ee-none': sent,
        })}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quibusdam laudantium recusandae est atque
        provident totam voluptate non quis porro! Nostrum tempora suscipit dolores. Repellat voluptatem placeat sint
        obcaecati perspiciatis?
      </div>
    </div>
  );
};

export default ChatContainer;
