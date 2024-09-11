'use client';

import {
  ChangeEvent,
  DragEvent,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CameraIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface AvatarUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultSrc?: string;
  fallback?: ReactNode;
}

const AvatarUploader: ForwardRefRenderFunction<HTMLInputElement, AvatarUploaderProps> = (
  { className, defaultSrc, fallback, id, onChange, ...props },
  ref,
) => {
  const [image, setImage] = useState(defaultSrc);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onChange?.(event);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // TODO: Image change
    }
  };

  return (
    <div className={cn('size-36 border border-dashed rounded-full', className)}>
      <input
        id={id || 'avatar-uploader'}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        tabIndex={-1}
        className="hidden"
        ref={ref}
        onChange={handleChange}
        {...props}
      />
      <div className="size-full p-2">
        <div
          className="size-full relative rounded-full overflow-hidden group"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Avatar className="size-full">
            <AvatarImage src={image} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <label
            htmlFor={id || 'avatar-uploader'}
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 bg-foreground/65 text-background font-medium transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible cursor-pointer select-none',
              { 'opacity-100 visible': !image || isDragging },
            )}
          >
            <CameraIcon width={24} height={24} />
            <span className="text-xs">Tải ảnh mới</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default forwardRef(AvatarUploader);
