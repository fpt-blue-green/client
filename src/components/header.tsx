'use client';

import config from '@/config';
import MenuItem from './menu-item';
import ProfileDropdown from '@/components/profile-dropdown';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { ChatBubbleIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ERole } from '@/types/enum';
import { useLayoutEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Lobster_Two } from 'next/font/google';
import { useAuthBrand } from '@/hooks';
import Chip from './custom/chip';
import { useRouter } from 'next/navigation';

const lobster = Lobster_Two({ weight: ['700'], subsets: ['latin'] });

const Header = () => {
  const { profile, session } = useAuthBrand();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const router = useRouter();

  const navigateUpgrade = () => {
    router.push(config.routes.brand.pricing);
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn('sticky top-0 left-0 right-0 z-40 transition-all', {
        'bg-background/80 backdrop-blur-[6px] shadow-sm': isScrolled,
      })}
    >
      <div className={cn('container md:h-20 h-16 transition-all', { 'md:h-16': isScrolled })}>
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="md:hidden" variant="ghost" size="icon">
              <HamburgerMenuIcon />
            </Button>
            <Link
              href={config.routes.home}
              className="flex items-center gap-1 font-bold text-xl text-gradient select-none"
            >
              <Image src="/logo.png" alt="adfusion" className="size-7" width={200} height={200} />
              <span className={lobster.className}>adfusion</span>
            </Link>
            <div className="flex items-center gap-4 ml-10 max-md:hidden">
              <MenuItem href={config.routes.influencers.list}>Khám phá</MenuItem>
              {!session && (
                <>
                  <MenuItem href={config.routes.influencer.landing}>Trở thành nhà sáng tạo</MenuItem>
                  <MenuItem href={config.routes.brand.landing}>Trở thành nhãn hàng</MenuItem>
                </>
              )}
              {session && session.user.role === ERole.Influencer && (
                <>
                  <MenuItem href={config.routes.campaigns.base}>Chiến dịch</MenuItem>
                  <MenuItem href={config.routes.influencer.jobs}>Công việc</MenuItem>
                </>
              )}
              {session && session.user.role === ERole.Brand && (
                <MenuItem href={config.routes.brand.campaigns.base}>Chiến dịch của tôi</MenuItem>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!profile?.isPremium && <Chip label="Nâng cấp lên Premium" size="large" onClick={navigateUpgrade} />}
            <Button variant="ghost" size="icon" asChild>
              <Link href={config.routes.chats.base}>
                <ChatBubbleIcon className="size-5" />
              </Link>
            </Button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
