'use client';

import config from '@/config';
import MenuItem from './menu-item';
import { ModeToggle } from '@/components/mode-toggle';
import ProfileDropdown from '@/components/profile-dropdown';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { ERole } from '@/types/enum';
import { useLayoutEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
        'bg-background/80 backdrop-blur-[6px]': isScrolled,
      })}
    >
      <div className={cn('container md:h-20 h-16 transition-all', { 'md:h-16': isScrolled })}>
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="md:hidden" variant="ghost" size="icon">
              <HamburgerMenuIcon />
            </Button>
            <Link href={config.routes.home} className="relative font-bold text-lg">
              adfusion
              <Image
                src="/logo.png"
                alt="adfusion"
                className="absolute -top-0.5 left-full size-6"
                width={200}
                height={200}
              />
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
            <ModeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
