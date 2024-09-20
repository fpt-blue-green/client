'use client';

import { ChangeEvent, ForwardRefRenderFunction, InputHTMLAttributes, ReactNode, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CoverUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultSrc?: string;
  fallback?: ReactNode;
}

const CoverUploader: ForwardRefRenderFunction<HTMLInputElement, CoverUploaderProps> = (
  { className, defaultSrc, id, onChange, ...props },
  ref,
) => {
  const [image, setImage] = useState(defaultSrc);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onChange?.(event);
    }
  };

  return (
    <div className={cn('relative pb-[37.03703703703704%]', className)}>
      <input
        id={id || 'cover-uploader'}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        tabIndex={-1}
        className="hidden"
        ref={ref}
        onChange={handleChange}
        {...props}
      />
      <label
        htmlFor={id || 'cover-uploader'}
        className="absolute inset-0 bg-muted rounded-lg overflow-hidden transition-opacity hover:opacity-75 cursor-pointer"
      >
        {image && <Image src={image} alt="Ảnh bìa" width={1000} height={400} className="size-full object-cover" />}
      </label>
    </div>
  );
};
export default forwardRef(CoverUploader);
