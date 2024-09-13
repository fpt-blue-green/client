'use client';

import { ChangeEvent, FC, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import clsx from 'clsx';
import { FaTrashAlt } from 'react-icons/fa';
import DetailStepProps from './props';
import { IImage } from '@/types/influencer';
import { toast } from 'sonner';
import { influencerRequest } from '@/request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { emitter } from '@/lib/utils';

const Step5: FC<DetailStepProps> = ({ profile, mutate }) => {
  const [images, setImages] = useState<IImage[]>(profile.images);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const addImages = [...images];
      for (let i = 0; i < files.length; i++) {
        const image: IImage = {
          id: '',
          url: URL.createObjectURL(files[i]),
        };
        addImages.push(image);
      }

      const newFiles = Array.from(files);
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setImages(addImages);
    }
  };

  const handleDelete = (index: number) => () => {
    emitter.confirm({
      content: 'Bạn có muốn xóa ảnh nảy không? Bạn không thể hoàn tác khi thực hiện thao tác này',
      callback: () => {
        const deletedImages = [...images];
        const [removedImage] = deletedImages.splice(index, 1);
        if (!removedImage.id) {
          const deletedFiles = [...imageFiles];
          const imagesCount = images.filter((i) => !!i.id).length;
          deletedFiles.splice(index - imagesCount, 1);
          setImageFiles(deletedFiles);
        }
        setImages(deletedImages);
      },
    });
  };

  const handleSubmit = () => {
    if (images.length < 3) {
      toast.error('Bạn phải có ít nhất 3 ảnh');
      return;
    }
    if (images.length > 10) {
      toast.error('Bạn chỉ được có tối đa 10 ảnh');
      return;
    }

    const imageIds = images.filter((i) => !!i.id).map((i) => i.id);
    setLoading(true);
    influencerRequest
      .uploadImages(imageIds, imageFiles)
      .then(() => {
        mutate().then(() => router.push(config.routes.influencer.create(6)));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        {images.map((img, index) => (
          <div className="relative border rounded-lg overflow-hidden group" key={index}>
            <Image src={img.url} alt="Cover profile" width={750} height={1000} className="aspect-square object-cover" />
            <div
              className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-destructive-foreground/80 text-destructive font-semibold transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={handleDelete(index)}
            >
              <FaTrashAlt />
              Xóa ảnh
            </div>
          </div>
        ))}
        {images.length < 10 && (
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
        )}
      </div>
      <Button variant="gradient" size="large" fullWidth onClick={handleSubmit} loading={loading}>
        Tiếp tục
      </Button>
    </div>
  );
};

export default Step5;
