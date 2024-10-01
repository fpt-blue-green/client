import { campaignsRequest } from '@/request';
import ICampaign from '@/types/campaign';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import ImagesCarousel from './images-carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlatformData } from '@/types/enum';
import Link from 'next/link';
import { formats } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const getCampaign = async (id: string): Promise<ICampaign> => {
  try {
    const res = await campaignsRequest.getCampaignById(id);
    if (!res.data) {
      return notFound();
    }
    return res.data;
  } catch {
    return notFound();
  }
};

interface CampaignDetailsProps {
  params: { id: string };
}

export async function generateMetadata({ params }: CampaignDetailsProps): Promise<Metadata> {
  const campaign = await getCampaign(params.id);
  return {
    title: campaign.title,
  };
}

const CampaignDetails: FC<CampaignDetailsProps> = async ({}) => {
  return (
    <div className="container mt-8 mb-16">
      <div className="relative grid md:grid-cols-2 gap-6">
        <div className="md:sticky top-4 h-fit">
          <ImagesCarousel />
        </div>
        <div className="py-4 space-y-6">
          <h1 className="font-bold text-2xl">Tên chiến dịch gì đó</h1>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi nisi esse aut, quos harum, error hic illo
            quasi animi repellat rerum ullam architecto tenetur laboriosam eos voluptatum sit. Laudantium, in.
          </p>
          <div className="flex items-center gap-2">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h5 className="font-semibold">Tên nhãn hàng</h5>
              <div className="flex items-center gap-3 mt-2">
                {Object.entries(PlatformData).map(([key, { Icon }]) => (
                  <Link key={key} href="#">
                    <Icon className="size-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Thông tin chung</h3>
            <ul className="list-disc pl-8 space-y-2">
              <li>
                <span className="font-medium">Thời gian: </span>
                {formats.date(new Date())} - {formats.date(new Date())}
              </li>
              <li>
                <span className="font-medium">Ngân sách ước tính: </span>
                {formats.price(1200000)}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Yêu cầu nội dung</h3>
            <div className="flex flex-col gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="border border-foreground px-5 py-4 rounded-sm" key={index}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{'1 video Tiktok'}</span>
                    <span className="font-semibold">{formats.price(200000)}</span>
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non voluptatum velit veritatis debitis,
                    sunt explicabo error. Velit, repellat asperiores ullam dicta aspernatur quo doloribus minima
                    recusandae tempore molestias. A, iure!
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center justify-center size-9 text-background bg-foreground rounded-md">
                      {/* <Icon className="size-6" /> */}
                    </div>
                    <Button variant="gradient" className="text-base">
                      Tiếp tục
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampaignDetails;
