import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { ImageModel } from './personal-info';

interface GalleryModalProps {
  gallery: ImageModel[];
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
        <DialogContent className="sm:max-w-[425px] min-w-[80%] max-h-[85%] ">
          <div className="w-full h-[70%] overflow-y-auto hide-scrollbar">
            <div className="grid grid-cols-3 gap-4 p-10 mx-6">
              {gallery?.map((image) => (
                <Image
                  key={image?.url}
                  src={image?.url || ''}
                  alt={'image from gallery'}
                  width={380}
                  height={380}
                  className="w-[100%] max-h-full aspect-thumbnail object-cover "
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryModal;
