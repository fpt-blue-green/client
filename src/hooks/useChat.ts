'use client';

import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import IMessage from '@/types/message';
import { useSession } from 'next-auth/react';
import { fetchRequest } from '@/request';
import useThrottle from './useThrottle';

const useChat = (chatId: string, isCampaign: boolean) => {
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: session } = useSession();
  const { mutate } = fetchRequest.chat.list();

  const refresh = useThrottle(() => {
    mutate();
  }, 1000);

  useEffect(() => {
    const url = isCampaign ? 'https://localhost:7100/groupchat' : 'https://localhost:7100/chat';
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    if (session)
      newConnection
        .start()
        .then(() => {
          setConnection(newConnection);
          // Tham gia nhóm chat
          if (isCampaign) {
            newConnection.invoke('JoinRoom', {
              senderId: session.user.id,
              campaignChatId: chatId,
            });
            newConnection.on('ReceiveGroupMessage', (message) => {
              refresh();
              setMessages((prev) => [...prev, message]);
            });
          } else {
            newConnection.invoke('StartChat', {
              senderId: session.user.id,
              receiverId: chatId,
            });
            newConnection.on('ReceiveMessage', (message) => {
              refresh();
              setMessages((prev) => [...prev, message]);
            });
          }

          // Lắng nghe sự kiện nhận tin nhắn
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));

    return () => {
      if (connection) connection.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, session?.user.id]);

  const sendMessage = async (message: string) => {
    if (connection && connection.state === HubConnectionState.Connected) {
      await connection.invoke('SendMessage', message);
    }
  };

  return { messages, sendMessage };
};

export default useChat;
