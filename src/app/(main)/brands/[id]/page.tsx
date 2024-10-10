import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from '@/components/ui/button';
import config from '@/config';
import brandsRequest from '@/request/brands.request';
import IBrand from '@/types/brand';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { FaEdit } from 'react-icons/fa';
import Campaigns from './campaigns';

const getBrand = async (id: string): Promise<IBrand> => {
  try {
    const res = await brandsRequest.getBrandById(id);
    if (!res.data) {
      return notFound();
    }
    return res.data;
  } catch {
    return notFound();
  }
};

interface BrandDetailsProps {
  params: { id: string };
}

export async function generateMetadata({ params }: BrandDetailsProps): Promise<Metadata> {
  const brand = await getBrand(params.id);
  return {
    title: brand.name,
  };
}

const BrandDetails: FC<BrandDetailsProps> = async ({ params }) => {
  const [brand, session] = await Promise.all([getBrand(params.id), getServerSession(authOptions)]);

  return (
    <div className="container my-8">
      {session?.user.id === brand.userId && (
        <div className="flex justify-end mb-4">
          <Button variant="ghost" startIcon={<FaEdit />} asChild>
            <Link href={config.routes.brands.editProfile}>Chỉnh sửa</Link>
          </Button>
        </div>
      )}
      <div className="relative flex flex-col items-center mb-12">
        <Image
          className="w-full max-h-[480px] object-cover cursor-pointer hover:opacity-80 rounded-md"
          src={
            brand.coverImg ||
            'https://img.freepik.com/premium-photo/white-wall-with-white-background-that-says-word-it_994023-371201.jpg'
          }
          alt="Brand_Avatar"
          width={800}
          height={400}
        />
        <div className="absolute -bottom-12 z-10 rounded-full h-32 w-32 bg-primary-foreground flex justify-center items-center ">
          <Image
            src={
              brand.avatar! ||
              'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
            }
            alt="Brand_avatar"
            width={100}
            height={100}
            className="w-28 h-28 rounded-full"
          />
        </div>
      </div>
      <div>
        <h5 className="text-center font-semibold text-xl">{brand.name}</h5>
        <p className="mt-3 font-light text-sm text-center md:text-start">
          {brand.description}
          <Button className="font-semibold text-md text-foreground underline" variant="link">
            <Link href={config.routes.brands.editProfile}>Hoàn thành hồ sơ ngay.</Link>
          </Button>
        </p>
      </div>
      <Campaigns />
    </div>
  );
};

export default BrandDetails;
