import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { influencersRequest } from '@/request';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import IInfluencer from '@/types/influencer';
import { getServerSession } from 'next-auth';
import config from '@/config';
import ImagesCarousel from './images-carousel';
import Breadcrumbs, { IBreadcrumbItem } from '@/components/custom/breadcrumbs';
import { Button } from '@/components/ui/button';
import { RiHome4Fill } from 'react-icons/ri';
import Link from 'next/link';
import { LuPencil } from 'react-icons/lu';
import Rating from '@/components/custom/rating';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlatformData } from '@/types/enum';
import { formats } from '@/lib/utils';
import HowPackagesWork from './how-packages-work-modal';
import Packages from './packages';
import Comments from './comments';
import InfluencerList from '@/components/influencer-list';
import Tooltip from '@/components/custom/tooltip';
import Action from './action';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone, FaTags } from 'react-icons/fa6';

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
    openGraph: {
      title: influencer.fullName,
      description: influencer.description,
      images: influencer.images.slice(0, 3).map((img) => ({
        url: img.url,
        width: 600,
        height: 800,
        alt: 'Ảnh bìa của ' + influencer.fullName,
      })),
      siteName: 'adfusion',
      type: 'profile',
      locale: 'vi_VN',
    },
  };
}

const InfluencerDetails: FC<InfluencerDetailsProps> = async ({ params }) => {
  const [influencer, session] = await Promise.all([getInfluencer(params.slug), getServerSession(config.auth)]);
  const count = influencer.rateAverage ? (await influencersRequest.countFeedback(influencer.id)).data : 0;
  const breadcrumbItems: IBreadcrumbItem[] = [
    {
      label: 'Trang chủ',
      href: config.routes.home,
      icon: <RiHome4Fill />,
    },
    {
      label: 'Nhà sáng tạo nội dung',
      href: config.routes.influencers.list,
    },
    {
      label: influencer.fullName,
    },
  ];

  return (
    <div className="container mt-8 mb-16">
      <div className="relative grid lg:grid-cols-2 gap-6">
        <Breadcrumbs items={breadcrumbItems} className="col-span-full" />
        <div className="lg:sticky top-20 h-fit max-lg:order-first">
          <ImagesCarousel influencer={influencer} />
        </div>
        <div className="py-4 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 lg:size-20">
              <AvatarImage src={influencer.avatar} alt={`Ảnh đại diện của ${influencer.fullName}`} />
              <AvatarFallback>{influencer.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl lg:text-2xl font-bold mb-2">{influencer.fullName}</h1>
                {influencer.userId === session?.user.id && (
                  <>
                    <Tooltip label="Chỉnh sửa">
                      <Button variant="ghost" size="icon" className="lg:hidden" asChild>
                        <Link href={config.routes.influencers.editProfile}>
                          <LuPencil />
                        </Link>
                      </Button>
                    </Tooltip>
                    <Button variant="ghost" startIcon={<LuPencil />} className="max-lg:hidden" asChild>
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
            {influencer.userId !== session?.user.id && (
              <Button variant="link" asChild className="text-foreground">
                <Link href="#reviews">Thêm đánh giá</Link>
              </Button>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{influencer.description}</p>
          <Action influencer={influencer} />
          <Accordion type="multiple" defaultValue={['info', 'social', 'packages', 'reviews']}>
            <AccordionItem value="info">
              <AccordionTrigger className="text-xl font-semibold">Liên lạc</AccordionTrigger>
              <AccordionContent className="lg:px-4 lg:text-base">
                <ul className="space-y-2">
                  <li className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    <strong>Địa chỉ:</strong> {influencer.address}
                  </li>
                  <li className="flex items-center gap-1">
                    <FaPhone />
                    <strong>Số điện thoại:</strong> {influencer.phone}
                  </li>
                  <li className="flex items-center gap-1">
                    <FaTags className="flex-shrink-0" />
                    <strong className="text-nowrap">Danh mục:</strong>
                    <span className="truncate" title={influencer.tags.map((t) => t.name).join(', ')}>
                      {influencer.tags.map((t) => t.name).join(', ')}
                    </span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="social">
              <AccordionTrigger className="text-xl font-semibold">Mạng xã hội</AccordionTrigger>
              <AccordionContent className="lg:px-4 lg:text-base">
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
                        <span>{`(${formats.estimate(channel.followersCount)} ${followerText.substring(6)})`}</span>
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
              <AccordionContent className="lg:px-4 lg:text-base">
                <Packages influencer={influencer} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews" id="reviews">
              <AccordionTrigger className="text-xl font-semibold">Đánh giá</AccordionTrigger>
              <AccordionContent className="lg:px-4 lg:text-base">
                <Comments influencer={influencer} user={session?.user} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <InfluencerList
        className="mt-16"
        url={`/Influencers/${influencer.id}/similar`}
        title={`Những người tương tự với ${influencer.fullName}`}
      />
    </div>
  );
};

export default InfluencerDetails;
