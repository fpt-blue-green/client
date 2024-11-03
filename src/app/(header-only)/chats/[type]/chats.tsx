'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import InboxList from './inbox-list';
import BoxChat from './box-chat';

const Chats = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="py-6">
      <ResizablePanel defaultSize={30} minSize={25} maxSize={35}>
        <InboxList />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <BoxChat />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Chats;
