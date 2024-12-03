import config from '@/config';
import brandsRequest from '@/request/brands.request';
import IBrand from '@/types/brand';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { notFound } from 'next/navigation';
import { FC } from 'react';
import Campaigns from './campaigns';
import GeneralInfo from './general-info';

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
  const [brand] = await Promise.all([getBrand(params.id), getServerSession(config.auth)]);

  return (
    <div className="container my-8">
      <GeneralInfo brand={brand} />
      <Campaigns brand={brand} />
    </div>
  );
};

export default BrandDetails;
