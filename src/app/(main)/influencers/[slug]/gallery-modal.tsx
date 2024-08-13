import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { ImageProps } from './personal-info';

interface GalleryModalProps {
  gallery: ImageProps[];
}

const GalleryModal: FC<GalleryModalProps> = ({ gallery }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute right-4 bottom-4" variant={'gradient'}>
            <LuGalleryHorizontalEnd />
            <span>Xem tất cả ảnh</span>
          </Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[425px] min-w-[80%] max-h-[85%] overflow-y-auto scrollbar-width hide-scrollbar">
          <div className="flex flex-wrap justify-between p-3 mx-6">
            {gallery?.map((image) => (
              <Image
                key={image?.url}
                src={image?.url || ''}
                alt={'image from gallery'}
                width={380}
                height={380}
                className="w-[30%] h-[27vw] max-h-96 aspect-thumbnail object-cover mb-2"
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryModal;
