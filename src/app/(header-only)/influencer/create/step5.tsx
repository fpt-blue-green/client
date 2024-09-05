'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import config from '@/config';
import { ArrowLeftIcon, UploadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

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
      <Progress value={(100 * 5) / 7} className="h-3" />
      <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />}>
        <Link href={{ pathname: config.routes.influencer.create, query: { step: 4 } }}>Trở lại</Link>
      </Button>
      <h1 className="text-3xl font-semibold">Thêm 3 - 10 ảnh về bạn và nội dụng của bạn</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Cover profile"
            width={750}
            height={1000}
            className="aspect-square object-cover rounded-lg border"
          />
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
