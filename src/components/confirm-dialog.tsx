'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useMount } from '@/hooks';
import { eventEmitter } from '@/lib/utils';

export interface ConfirmBody {
  title?: string;
  content?: string;
  description?: string;
  callback?: (() => Promise<void>) | (() => void);
}

const ConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ConfirmBody>({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    await data.callback?.();
    handleClose();
  };

  useMount(() => {
    const onConfirm = (eventData: ConfirmBody) => {
      setData({
        ...eventData,
        title: eventData.title || 'Bạn có chắc chắn không?',
        content: eventData.content || 'Bạn không thể hoàn tác sau khi thực hiện tác vụ này.',
      });
      setOpen(true);
    };

    const listener = eventEmitter.addListener('confirm', onConfirm);

    return () => listener.remove();
  });

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-ld" onEscapeKeyDown={handleClose} onCloseAutoFocus={handleClose}>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader>
        <div>{data.content}</div>
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose} size="large" className="max-sm:w-full">
            Đóng
          </Button>
          <Button variant="gradient" onClick={handleOk} size="large" className="max-sm:w-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDialog;
