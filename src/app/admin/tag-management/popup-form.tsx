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
import { FC, useState } from 'react';
import ITag from '@/types/tag';
import EditForm from './edit-form';
import { tagRequest } from '@/request';
import { toast } from 'sonner';

interface IPopupFormProps {
  mode?: Mode;
  tag?: ITag;
  reload?: () => void;
}

const PopupForm: FC<IPopupFormProps> = ({ mode, tag, reload }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const handleDeleteTag = async () => {
    setLoading(true);
    try {
      const res = await tagRequest.delete(tag?.id || '');
      reload && reload();
      setShowDialog;
      toast.success('Xoá thẻ thành công.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenuItem asChild>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <Button
          className="w-full border-none"
          variant="outline"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          {mode === Mode.Edit ? 'Chỉnh sửa' : 'Xoá'}
        </Button>
        <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
          {mode === Mode.Edit ? (
            <EditForm setShowDialog={setShowDialog} reload={reload} tag={tag} />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Xoá thẻ</DialogTitle>
                <DialogDescription>
                  Hãy chắc rằng bạn muốn xoá thẻ này. Hành động này không thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit" onClick={handleDeleteTag} loading={loading}>
                  Lưu thay đổi
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
