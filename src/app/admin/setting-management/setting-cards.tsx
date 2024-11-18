'use client';
import { Button } from '@/components/ui/button';
import { fetchRequest } from '@/request';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ActionForm from './action-form';
import { ISystemSetting } from '@/types/system-settings';
import NoData from '@/components/no-data';

const SettingCards = () => {
  const { data, isLoading, mutate } = fetchRequest.settings();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<ISystemSetting>();

  const handleOpen = (item?: ISystemSetting) => {
    setItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setItem(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col gap-4 my-8">
        {!isLoading && data ? (
          data.map((item, index) => (
            <div key={index} className="flex justify-between items-center shadow-md border p-6">
              <div>
                <h5 className="text-blue-400 mb-2">{item.keyName}</h5>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
              <Button onClick={() => handleOpen(item)} variant="outline" size="large" className="text-muted-foreground">
                Cấu hình
              </Button>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
      <DialogContent>
        <ActionForm handleClose={handleClose} mutate={mutate} item={item} />
      </DialogContent>
    </Dialog>
  );
};

export default SettingCards;
