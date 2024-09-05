'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import clsx from 'clsx';
import { FaTrashAlt } from 'react-icons/fa';
import ProgressHeading from './progress-heading';

const Step5 = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const addImages = [...images];
      for (let i = 0; i < files.length; i++) {
        const imageUrl = URL.createObjectURL(files[i]);
        addImages.push(imageUrl);
      }

      const newFiles = Array.from(files);
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setImages(addImages);
    }
  };

  const handleSubmit = () => {
    console.log(imageFiles);
  };

  return (
    <div className="space-y-10">
      <ProgressHeading step={4} title="Thêm 3 - 10 ảnh về bạn và nội dụng của bạn" />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        {images.map((img, index) => (
          <div className="relative border rounded-lg overflow-hidden group" key={index}>
            <Image src={img} alt="Cover profile" width={750} height={1000} className="aspect-square object-cover" />
            <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-destructive-foreground/80 text-destructive font-semibold transition-all opacity-0 group-hover:opacity-100 cursor-pointer">
              <FaTrashAlt />
              Xóa ảnh
            </div>
          </div>
        ))}
        <div className={clsx(images.length ? 'col-span-1' : 'col-span-full')}>
          <div className="flex items-center justify-center size-full min-h-56 border border-dashed rounded-lg">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif"
              tabIndex={-1}
              className="hidden"
              ref={inputRef}
              onChange={handleChange}
            />
            <Button variant="foreground" startIcon={<UploadIcon />} onClick={handleClick}>
              Tải ảnh lên
            </Button>
          </div>
        </div>
      </div>
      <Button variant="gradient" size="large" fullWidth onClick={handleSubmit}>
        Tiếp tục
      </Button>
    </div>
  );
};

export default Step5;
