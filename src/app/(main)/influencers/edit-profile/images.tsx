'use client';
import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UploadIcon } from '@radix-ui/react-icons';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useRef, useState } from 'react';

interface IInfluencerImagesModel {
  id: string;
  url: string;
  description: string;
}

const ImageGallery = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>('');

  console.log(url);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOnChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUrl(imageUrl);
    }
  };

  const handleDelete = () => {};
  return (
    <Paper>
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-semibold text-xl">Thư Viện Ảnh</h3>
        <div className="flex justify-between items-center">
          <Button onClick={handleUploadImage} variant="gradient" className=" font-bold">
            <UploadIcon />
            <Input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
              ref={fileInputRef}
              onChange={handleOnChangeImage}
            />
            Thêm ảnh
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {influencerImages.map((img) => (
          <div key={img.id} className="min-w-40 min-h-40 relative">
            <Image
              className="w-full rounded-md hover:opacity-"
              src={img.url}
              width={160}
              height={160}
              alt={'User Image'}
            />
            <div className="absolute z-10 w-full h-full bg-red top-0 opacity-0 hover:opacity-100">
              <RiCloseCircleFill
                size={24}
                className="absolute top-2 right-2 hover:cursor-pointer"
                onClick={handleDelete}
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
