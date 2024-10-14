import { Button } from '@/components/ui/button';
import { RiInstagramFill, RiTiktokFill, RiYoutubeFill } from 'react-icons/ri';
import { contentTypes } from './constant';
import InfluencerList from '@/components/influencer-list';
import Banner from '../../(home)/banner';
import HowItWork from '../../(home)/how-it-work';
import { Metadata } from 'next';
import Link from 'next/link';
import config from '@/config';

export const metadata: Metadata = {
  title: 'Trở thành nhà sáng tạo',
};

const JoinAsCreator = () => {
  return (
    <div className="container my-16">
      {/* Claim section */}
      <div className="flex flex-col mb-10 items-center text-center">
        <h1 className="font-semibold text-4xl">Kiếm tiền như một nhà sáng tạo</h1>
        <p className="mt-4 mb-9 text-muted-foreground text-sm">
          Cách đơn giản để bán, quản lí và kiếm tiền từ Instagram, TikTok, Youtube của bạn bằng cách sáng tạo nội dung
        </p>
        <div className="w-full md:w-[65%] flex justify-between items-center py-2 px-5 border border-foreground rounded-full shadow-lg">
          <span className="font-medium">adfusion.com/</span>
          <input placeholder="nickname" className="w-full pr-1 outline-none" />
          <Button className="rounded-full p-6" size="large" variant="gradient">
            <Link href={{ pathname: config.routes.register.influencer }}> Xác Thực</Link>
          </Button>
        </div>
      </div>
      {/* Images section*/}
      <div className="w-fit m-auto relative shadow-md">
        <div className="relative"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          width={285}
          src="https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/hero.mp4"
          className="rounded-3xl"
        ></video>
        <div className="absolute top-16 sm:-right-20 -right-12 p-2 -z-10 w-32 rounded-xl bg-blue-500">
          <RiInstagramFill className="ml-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute top-32 sm:-right-28 -right-12 p-2 -z-10 w-32 rounded-xl bg-pink-400">
          <RiTiktokFill className="ml-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute top-48 sm:-right-20 -right-12  p-2 -z-10 w-32 rounded-xl bg-red-600">
          <RiYoutubeFill className="ml-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute bottom-48 sm:-left-20 -left-12 p-2 -z-10 w-32 rounded-xl bg-blue-400">
          <RiInstagramFill className="mr-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute bottom-32 sm:-left-28 -left-12 p-2 -z-10 w-32 rounded-xl bg-blue-500">
          <RiTiktokFill className="me-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute bottom-16 sm:-left-20 -left-12 p-2 -z-10 w-32 rounded-xl bg-orange-400">
          <RiYoutubeFill className="me-auto w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      {/* Categories */}
      <div className="mt-20">
        <h2 className="text-center text-2xl text-gradient font-bold">Được Yêu Thích Bởi 130,000+ Nhà Sáng Tạo</h2>
        <div className="max-w-3xl m-auto flex justify-center items-center gap-2 flex-wrap my-8">
          {contentTypes.map((item) => (
            <div key={item} className="sm:py-3 sm:px-8 py-1 px-6 rounded-full bg-accent">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-20">
        <InfluencerList title="" />
        <HowItWork />
        <Banner />
      </div>
    </div>
  );
};

export default JoinAsCreator;
