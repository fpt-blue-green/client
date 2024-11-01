'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import InboxList from './inbox-list';

const Chats = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="px-4 py-6">
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
        <InboxList />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Chats;
