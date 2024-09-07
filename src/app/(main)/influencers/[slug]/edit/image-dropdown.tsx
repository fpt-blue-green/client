import { FC } from 'react';
import { FaEdit } from 'react-icons/fa';
import { DownloadIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface IImageDropdownProps {
  url?: string;
}

const ImageDropdown: FC<IImageDropdownProps> = ({ url }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute top-2 right-2">
          <Button size="icon" className="rounded-full bg-foreground">
            <FaEdit className="text-primary-foreground ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <Dialog>
          <DropdownMenuContent>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Button className="text-md" variant="ghost">
                  <TrashIcon />
                  Xoá ảnh
                </Button>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <div>
                <Button className="text-md" variant="ghost" asChild>
                  <a className="flex gap-2" href={url!} target="_blank" rel="noopener noreferrer" download>
                    <DownloadIcon />
                    Tải ảnh
                  </a>
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bạn có chắc muốn xoá ảnh này?</DialogTitle>
              <DialogDescription>
                Hành động này sẽ không được hoàn tác. Nó sẽ xoá vĩnh viễn ảnh này của bạn.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenu>
    </div>
  );
};

export default ImageDropdown;
