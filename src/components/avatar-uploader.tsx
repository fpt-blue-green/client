'use client';

import { FC, useRef } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { CameraIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface AvatarUploaderProps {
  size?: number | string;
  className?: string;
}

const AvatarUploader: FC<AvatarUploaderProps> = ({ size, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileBrowse = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn('size-36 border border-dashed rounded-full', className)} style={{ width: size, height: size }}>
      <input type="file" accept="image/jpeg,image/png,image/gif" tabIndex={-1} className="hidden" ref={inputRef} />
      <div className="size-full p-2">
        <div className="size-full relative rounded-full overflow-hidden group">
          <Avatar className="size-full">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <button
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 bg-foreground/65 text-background transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible"
            onClick={openFileBrowse}
          >
            <CameraIcon width={24} height={24} />
            <span className="text-xs">Tải ảnh lên</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AvatarUploader;
