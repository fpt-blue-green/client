'use client';
import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UploadIcon } from '@radix-ui/react-icons';
import { RiCloseCircleFill, RiEditFill } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import IInfluencer, { IImage } from '@/types/influencer';
import { toast } from 'sonner';
import { influencerRequest } from '@/request';
import { emitter } from '@/lib/utils';

interface IInfluencerImagesModel {
  id: string;
  url: string;
  description: string;
}
interface IImageGalleryProps {
  influencer: IInfluencer;
}

const ImageGallery: FC<IImageGalleryProps> = ({ influencer }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageGallery, setImageGallery] = useState<IImage[]>(influencer.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaveButtonDisplayed, setIsSaveButtonDisplayed] = useState<boolean>();
  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (imageGallery.length !== influencer.images.length) setIsSaveButtonDisplayed(true);
  }, [imageGallery.length]);

  const handleOnChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const addedImages = [...imageGallery];
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const imageUrl = URL.createObjectURL(files[i]);
        const image: IImage = {
          id: '',
          url: imageUrl,
          description: '',
        };
        addedImages.push(image);
      }
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
      setImageGallery(addedImages);
    }
  };

  const handleDelete = (i: number) => {
    emitter.confirm({
      content: 'Bạn có muốn xóa ảnh nảy không? Bạn không thể hoàn tác khi thực hiện thao tác này',
      callback: () => {
        const remainingImages = [...imageGallery];
        const [removedImage] = remainingImages.splice(i, 1);
        if (!removedImage.id) {
          const remainingImagesFiles = [...imageFiles];
          const imagesCount = imageGallery.filter((i) => !!i.id).length;
          remainingImagesFiles.splice(i - imagesCount, 1);
          setImageFiles(remainingImagesFiles);
        }
        setImageGallery(remainingImages);
      },
    });
  };

  const handleSaveChanges = () => {
    if (imageGallery.length < 3) {
      toast.error('Bạn phải có ít nhất 3 ảnh');
      return;
    }
    if (imageGallery.length > 10) {
      toast.error('Bạn chỉ được có tối đa 10 ảnh');
      return;
    }

    const imageIds = imageGallery.filter((i) => !!i.id).map((i) => i.id);
    setLoading(true);
    influencerRequest
      .uploadImages(imageIds, imageFiles)
      .then(() => {
        setIsSaveButtonDisplayed(false);
        toast.success('Bạn cập nhật thư viện ảnh thành công');
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };
  return (
    <Paper>
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-semibold text-xl">Thư Viện Ảnh</h3>
        <div className="flex justify-between items-center gap-4">
          {imageGallery.length <= 10 && (
            <Button onClick={handleUploadImage} variant="secondary" className="font-bold">
              <UploadIcon />
              <Input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                ref={fileInputRef}
                onChange={handleOnChangeImage}
                multiple
              />
              Thêm ảnh
            </Button>
          )}
          {isSaveButtonDisplayed && (
            <Button onClick={handleSaveChanges} variant="gradient" className="font-bold" loading={loading}>
              <RiEditFill />
              Lưu thay đổi
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {imageGallery.map((img, index) => (
          <div key={img.id} className="min-w-40 min-h-40 relative">
            <Image
              className="w-full rounded-md object-cover aspect-square"
              src={img.url}
              width={100}
              height={80}
              alt={'User Image'}
            />
            <div className="absolute z-10 w-full h-full bg-red top-0 opacity-0 hover:opacity-100">
              <RiCloseCircleFill
                size={24}
                className="absolute top-2 right-2 hover:cursor-pointer"
                onClick={() => {
                  handleDelete(index);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
};
export default ImageGallery;

const influencerImages: IInfluencerImagesModel[] = [
  {
    id: '1',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
  },
  {
    id: '2',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
  },
  {
    id: '3',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
  },
  {
    id: '4',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
  },
  {
    id: '5',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
  },
  {
    id: '6',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
  },
  {
    id: '7',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
  },
  {
    id: '8',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
  },
  {
    id: '9',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
  },
  {
    id: '10',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
  },
  {
    id: '11',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
  },
  {
    id: '12',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
  },
];
