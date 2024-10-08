import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { influencersRequest } from '@/request';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import IInfluencer from '@/types/influencer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import config from '@/config';
import ImagesCarousel from './images-carousel';
import Breadcrumbs, { IBreadcrumbItem } from '@/components/custom/breadcrumbs';
import { Button } from '@/components/ui/button';
import { RiHome4Fill } from 'react-icons/ri';
import Link from 'next/link';
import { LuHeart, LuPencil, LuShare } from 'react-icons/lu';
import Rating from '@/components/custom/rating';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlatformData } from '@/types/enum';
import { formats } from '@/lib/utils';
import HowPackagesWork from './how-packages-work-modal';
import Packages from './packages';
import Comments from './comments';
import InfluencerList from '@/components/influencer-list';
import Tooltip from '@/components/custom/tooltip';

const getInfluencer = async (slug: string): Promise<IInfluencer> => {
  try {
    const res = await influencersRequest.getInfluencerBySlug(slug);
    if (!res.data) {
      return notFound();
    }
    return res.data;
  } catch {
    return notFound();
  }
};

interface InfluencerDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: InfluencerDetailsProps): Promise<Metadata> {
  const influencer = await getInfluencer(params.slug);
  return {
    title: influencer.fullName,
  };
}

const InfluencerDetails: FC<InfluencerDetailsProps> = async ({ params }) => {
  const [influencer, session] = await Promise.all([getInfluencer(params.slug), getServerSession(authOptions)]);
  const count = influencer.rateAverage ? (await influencersRequest.countFeedback(influencer.id)).data : 0;

  const breadcrumbItems: IBreadcrumbItem[] = [
    {
      label: 'Trang chủ',
      href: config.routes.home,
      icon: <RiHome4Fill />,
    },
    {
      label: 'Người sáng tạo',
      href: config.routes.influencers.base,
    },
    {
      label: influencer.fullName,
    },
  ];

  return (
    <div className="container mt-8 mb-16">
      <div className="relative grid md:grid-cols-2 gap-6">
        <Breadcrumbs items={breadcrumbItems} className="col-span-full" />
        <div className="md:sticky top-20 h-fit max-md:order-first">
          <ImagesCarousel influencer={influencer} />
        </div>
        <div className="py-4 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 md:size-20">
              <AvatarImage src={influencer.avatar} alt={`Ảnh đại diện của ${influencer.fullName}`} />
              <AvatarFallback>{influencer.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl md:text-2xl font-bold mb-2">{influencer.fullName}</h1>
                {influencer.userId === session?.user.id && (
                  <>
                    <Tooltip label="Chỉnh sửa">
                      <Button variant="ghost" size="icon" className="md:hidden" asChild>
                        <Link href={config.routes.influencers.editProfile}>
                          <LuPencil />
                        </Link>
                      </Button>
                    </Tooltip>
                    <Button variant="ghost" startIcon={<LuPencil />} className="max-md:hidden" asChild>
                      <Link href={config.routes.influencers.editProfile}>Chỉnh sửa</Link>
                    </Button>
                  </>
                )}
              </div>
              <h3>{influencer.summarise}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Rating defaultValue={influencer.rateAverage} precision={0.25} readOnly />
            <span className="text-sm text-muted-foreground">
              {influencer.rateAverage > 0 ? `${count} đánh giá` : 'Chưa có đánh giá'}
            </span>
            <Button variant="link" asChild className="text-foreground">
              <Link href="#reviews">Thêm đánh giá</Link>
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">{influencer.description}</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" startIcon={<LuShare />}>
              Chia Sẻ
            </Button>
            <Button variant="ghost" startIcon={<LuHeart />}>
              Yêu thích
            </Button>
          </div>
          <Accordion type="multiple" defaultValue={['social', 'packages', 'reviews']}>
            <AccordionItem value="social">
              <AccordionTrigger className="text-xl font-semibold">Mạng xã hội</AccordionTrigger>
              <AccordionContent className="md:px-4 md:text-base">
                <ul className="space-y-2">
                  {influencer.channels.map((channel) => {
                    const { Icon, url, followerText, name } = PlatformData[channel.platform];
                    return (
                      <li key={channel.id} className="flex items-center gap-1">
                        <Icon />
                        <span className="font-semibold">{`${name}: `}</span>
                        <Link href={url + channel.userName} target="_blank" className="text-blue-400 hover:underline">
                          {channel.userName}
                        </Link>
                        <span>{`(${formats.estimate(channel.followersCount)} ${followerText})`}</span>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="packages">
              <AccordionTrigger className="text-xl font-semibold">
                <div>
                  Gói <HowPackagesWork />
                </div>
              </AccordionTrigger>
              <AccordionContent className="md:px-4 md:text-base">
                <Packages data={influencer.packages} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews" id="reviews">
              <AccordionTrigger className="text-xl font-semibold">Đánh giá</AccordionTrigger>
              <AccordionContent className="md:px-4 md:text-base">
                <Comments influencer={influencer} user={session?.user} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <InfluencerList className="mt-16" title={`Những người tương tự với ${influencer.fullName}`} />
    </div>
  );
};

export default InfluencerDetails;
