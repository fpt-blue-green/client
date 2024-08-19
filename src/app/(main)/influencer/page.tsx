import { InputWithoutOutline } from '@/components/custom/input-without-outline';
import { Button } from '@/components/ui/button';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import React from 'react';
import { LuYoutube } from 'react-icons/lu';
import { RiTiktokFill } from 'react-icons/ri';
import { contentTypes } from './constant';
import InfluencerList from '@/components/influencer-list';
import Banner from '../(home)/banner';
import HowItWork from '../(home)/how-it-work';

const JoinAsCreator = () => {
  return (
    <div className="container my-20">
      {/* Claim section */}
      <div className="flex flex-col my-10 items-center text-center">
        <h1 className="font-bold text-4xl">Kiếm tiền như một nhà sáng tạo</h1>
        <h2 className="mt-4 mb-9 text-muted-foreground">
          Cách đơn giản để bán, quản lí và kiếm tiền từ Instagram, TikTok, Youtube của bạn bằng cách sáng tạo nội dung
        </h2>
        <div className="w-full md:w-[65%] flex justify-between items-center py-2 px-5 border border-foreground rounded-full shadow-lg">
          <span className="font-medium">adfusion.com/</span>
          <InputWithoutOutline placeholder="nickname" type="text" className="pl-1 w-full" />
          <Button className="rounded-full p-6" size="large">
            Xác Thực
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
        <div className="absolute top-16 sm:-right-20 -right-12 p-2 -z-10 w-32 rounded-xl bg-blue-400">
          <InstagramLogoIcon className="ml-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute top-32 sm:-right-28 -right-12 p-2 -z-10 w-32 rounded-xl bg-pink-400">
          <RiTiktokFill className="ml-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute top-48 sm:-right-20 -right-12  p-2 -z-10 w-32 rounded-xl bg-red-500">
          <LuYoutube className="ml-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute bottom-48 sm:-left-20 -left-12 p-2 -z-10 w-32 rounded-xl bg-blue-400">
          <InstagramLogoIcon className="mr-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute bottom-32 sm:-left-28 -left-12 p-2 -z-10 w-32 rounded-xl bg-blue-500">
          <RiTiktokFill className="me-auto w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute bottom-16 sm:-left-20 -left-12 p-2 -z-10 w-32 rounded-xl bg-orange-400">
          <LuYoutube className="me-auto w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      {/* Categories */}
      <div className="mt-20">
        <h2 className="text-center text-2xl text-gradient font-bold">Được Yêu Thích Bởi 130,000+ Nhà Sáng Tạo</h2>
        <div className="w-[70%] m-auto flex justify-center items-center gap-2 flex-wrap my-8">
          {contentTypes.map((item) => (
            <div
              key={item}
              className="sm:py-3 sm:px-8 py-1 px-4 border rounded-full bg-slate-100 text-muted-foreground"
            >
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
