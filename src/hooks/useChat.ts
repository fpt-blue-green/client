'use client';

import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import IMessage from '@/types/message';
import { useSession } from 'next-auth/react';

const useChat = (receiverId: string) => {
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder().withUrl('').withAutomaticReconnect().build();

    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);

        // Tham gia nhóm chat
        newConnection.invoke('JoinGroup', { userId: session?.user.id, receiverId });

        // Lắng nghe sự kiện nhận tin nhắn
        newConnection.on('ReceiveMessage', (message) => {
          setMessages((prev) => [...prev, message]);
        });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));

    return () => {
      if (connection) connection.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId]);

  const sendMessage = async (message: string) => {
    if (connection && connection.state === HubConnectionState.Connected) {
      await connection.invoke('SendMessage', message);
    }
  };

  return { messages, sendMessage };
};

export default useChat;
