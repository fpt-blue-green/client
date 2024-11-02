'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Mode } from '@/types/enum';
import { FC } from 'react';
import ITag from '@/types/tag';
import EditForm from './edit-form';

interface IPopupFormProps {
  mode?: Mode;
  tag?: ITag;
}

const PopupForm: FC<IPopupFormProps> = ({ mode, tag }) => {
  const handleDeleteTag = () => {
    console.log('xoá', tag);
  };

  return (
    <DropdownMenuItem asChild>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            {mode === Mode.Edit ? 'Chỉnh sửa' : 'Xoá'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
          {mode === Mode.Edit ? (
            <EditForm tag={tag} />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Xoá thẻ</DialogTitle>
                <DialogDescription>
                  Hãy chắc rằng bạn muốn xoá thẻ này. Hành động này không thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button type="submit" onClick={handleDeleteTag}>
                  Save changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
};

export default PopupForm;
