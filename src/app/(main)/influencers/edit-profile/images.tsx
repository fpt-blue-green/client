'use client';
import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ImageDropdown from './image-dropdown';
import { UploadIcon } from '@radix-ui/react-icons';
import { RiCloseCircleFill } from 'react-icons/ri';

interface IInfluencerImagesModel {
  id: string;
  influencerId: string;
  url: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
  influencer: string;
}

const ImageGallery = () => {
  const handleUploadImage = () => {};

  const handleDelete = () => {};
  return (
    <Paper>
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-semibold text-xl">Thư Viện Ảnh</h3>
        <div className="flex justify-between items-center">
          <Button onClick={handleUploadImage} variant="gradient" className=" font-bold">
            <UploadIcon />
            Thêm ảnh
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {influencerImages.map((img) => (
          <div key={img.id} className="min-w-40 min-h-40 relative">
            <Image className="w-full rounded-md" src={img.url} width={160} height={160} alt={'User Image'} />
            <RiCloseCircleFill className="absolute top-2 right-2 cursor-pointer" onClick={handleDelete} />
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
    influencerId: '1',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '2',
    influencerId: '1',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '3',
    influencerId: '1',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '4',
    influencerId: '1',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '5',
    influencerId: '1',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '6',
    influencerId: '1',
    url: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/355908271_1770752910006602_459370154146537752_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=585619&_nc_ohc=IsdLUELXHOwQ7kNvgFXKLw9&_nc_ht=scontent.fdad3-5.fna&oh=00_AYAmei6q7z7hTB-F4o3gZ3udfsILopMxoNMU0-Ex5wSaSg&oe=66E21EA8&dl=1',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '7',
    influencerId: '1',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '8',
    influencerId: '1',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '9',
    influencerId: '1',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '10',
    influencerId: '1',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '11',
    influencerId: '1',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
  {
    id: '12',
    influencerId: '1',
    url: 'https://danviet.mediacdn.vn/upload/2-2019/images/2019-05-21/Ngam-nhan-sac-cua-hot-girl-Nga-duoc-menh-danh-54522370_1008888162641919_3123301347227598848_n-1558433996-width660height661.jpg',
    description: 'string',
    createdAt: '2024-09-07T08:09:31.933Z',
    modifiedAt: '2024-09-07T08:09:31.933Z',
    influencer: 'Lucy',
  },
];
