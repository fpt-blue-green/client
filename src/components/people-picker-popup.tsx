'use client';

import { FC, ReactNode, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { fetchRequest } from '@/request';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import IUser from '@/types/user';
import { Button } from './ui/button';

interface PeoplePickerPopupProps extends PeoplePickerProps {
  children: ReactNode;
}

const PeoplePickerPopup: FC<PeoplePickerPopupProps> = ({ children, campaignId, selectedIds, onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (users: IUser[]) => {
    setOpen(false);
    onSubmit(users);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogTitle>Thêm người</DialogTitle>
        <DialogDescription></DialogDescription>
        <PeoplePicker campaignId={campaignId} selectedIds={selectedIds} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

interface PeoplePickerProps {
  campaignId: string;
  selectedIds?: string[];
  onSubmit: (users: IUser[]) => void;
  onClose?: () => void;
}

const PeoplePicker = ({ campaignId, selectedIds, onSubmit }: PeoplePickerProps) => {
  const { data } = fetchRequest.campaign.participants(campaignId);
  const [selected, setSelected] = useState<IUser[]>([]);

  const handleSelect = (user: IUser) => () => {
    if (selected.includes(user)) {
      setSelected(selected.filter((i) => i.id !== user.id));
    } else {
      setSelected([...selected, user]);
    }
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      setSelected([]);
      onSubmit(selected);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4 text-sm">
        {selected.length > 0 ? (
          selected.map((user) => (
            <div key={user.id} className="relative flex flex-col items-center justify-center gap-2 overflow-hidden">
              <Avatar className="size-12">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-center line-clamp-2">{user.name}</span>
              <Button
                size="icon-sm"
                variant="secondary"
                className="absolute top-0 right-0 z-1 size-5 bg-muted rounded-full"
                onClick={handleSelect(user)}
              >
                <Cross2Icon className="size-3" />
              </Button>
            </div>
          ))
        ) : (
          <span className="col-span-full text-center">Chưa thêm người dùng nào</span>
        )}
      </div>
      <Command>
        <CommandInput placeholder="Nhập tên người dùng" />
        <CommandList>
          <CommandEmpty>Không tìm thấy người dùng nào</CommandEmpty>
          <CommandGroup>
            {data
              ?.filter((u) => !selectedIds?.includes(u.id))
              .map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  className="items-center gap-4"
                  onSelect={handleSelect(user)}
                >
                  <Avatar className="size-9">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  {user.name}
                  <CheckIcon className={cn('ml-auto size-4', selected.includes(user) ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <Button variant="gradient" fullWidth onClick={handleSubmit} disabled={!selected.length}>
        Thêm người dùng
      </Button>
    </>
  );
};

export default PeoplePickerPopup;
