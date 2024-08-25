import { FC } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { CameraIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface AvatarUploaderProps {
  size?: number | string;
  className?: string;
}

const AvatarUploader: FC<AvatarUploaderProps> = ({ size, className }) => {
  return (
    <div className={cn('size-36 border border-dashed rounded-full', className)} style={{ width: size, height: size }}>
      <input type="file" accept="image/*" tabIndex={-1} className="hidden" />
      <div className="size-full p-2">
        <div className="size-full relative rounded-full overflow-hidden">
          <Avatar className="size-full">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 bg-foreground/65 text-background">
            <CameraIcon width={24} height={24} />
            <span className="text-xs">Tải ảnh lên</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvatarUploader;
