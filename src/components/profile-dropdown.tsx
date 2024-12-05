'use client';

import { ExitIcon, HeartIcon, IdCardIcon, PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import config from '@/config';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { useAuthBrand, useAuthInfluencer } from '@/hooks';
import { fetchRequest } from '@/request';
import { formats } from '@/lib/utils';
import { GiUpgrade } from 'react-icons/gi';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

const ProfileDropdown = () => {
  const { session, profile: influencer } = useAuthInfluencer();
  const { profile: brand } = useAuthBrand();
  const user = session?.user;
  const { data: wallet } = fetchRequest.user.wallet(!!user);
  const { theme, setTheme } = useTheme();

  const onChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isPremium = brand?.isPremium;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          {user ? (
            <>
              <Avatar className="size-7">
                {user.image ? (
                  <Image
                    src={user.image || ''}
                    alt={`Ảnh đại diện của ${user.name}`}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              {isPremium && (
                <Image
                  src="https://cdn.iconscout.com/icon/free/png-256/free-premium-icon-download-in-svg-png-gif-file-formats--tag-badge-king-online-streaming-pack-multimedia-icons-1598007.png?f=webp&w=256"
                  alt={`Icon premium của ${user.name}`}
                  width={16}
                  height={16}
                  className="object-cover absolute top-0 -right-1"
                />
              )}
            </>
          ) : (
            <PersonIcon className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <Dialog>
        <DropdownMenuContent align="end" className="min-w-52">
          {user ? (
            <>
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="font-normal">
                Số dư: {formats.price(wallet?.currentAmount || 0)}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={config.routes.account}>
                  <PersonIcon className="mr-2" />
                  Tài khoản
                </Link>
              </DropdownMenuItem>
              {influencer && (
                <DropdownMenuItem asChild>
                  <Link href={config.routes.influencers.details(influencer.slug)}>
                    <IdCardIcon className="mr-2" />
                    Trang cá nhân
                  </Link>
                </DropdownMenuItem>
              )}
              {brand && (
                <>
                  {!isPremium && (
                    <DropdownMenuItem asChild>
                      <Link href={config.routes.brand.pricing}>
                        <GiUpgrade className="mr-2" />
                        Nâng cấp Premium
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href={config.routes.brands.details(brand.id)}>
                      <IdCardIcon className="mr-2" />
                      Trang cá nhân
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={config.routes.brand.wishlist}>
                      <HeartIcon className="mr-2" />
                      Yêu thích
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem onClick={onChangeTheme}>
                <SunIcon className="size-4 mr-2 dark:hidden" />
                <MoonIcon className="size-4 mr-2 dark:block hidden" />
                Giao diện: {theme === 'light' ? 'Sáng' : 'Tối'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => signOut({ callbackUrl: config.routes.home })}
              >
                <ExitIcon className="mr-2" />
                Đăng xuất
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={onChangeTheme}>
                Giao diện: {theme === 'light' ? 'Sáng' : 'Tối'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signIn()}>Đăng nhập</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DialogTrigger className="w-full">Đăng ký</DialogTrigger>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
        <DialogContent className="max-w-3xl py-20">
          <DialogHeader>
            <DialogTitle className="text-xl text-center"></DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="max-w-full">
              <div className="flex items-center justify-center">
                <h1 className="font-bold text-7xl">adfusion</h1>
                <Image src="/logo.png" alt="adfusion" className="w-10 h-10" width={200} height={200} />
              </div>
              <h2 className="px-5 pt-10 font-bold text-4xl text-center">Kể Chúng Tôi Nghe Về Bạn</h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center pt-10">
                <DialogClose asChild>
                  <Button size="large" className="py-5 px-16 h-14" variant="gradient" asChild>
                    <Link href={config.routes.register.influencer}>Người Nổi Tiếng</Link>
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button size="large" className="py-5 px-16 h-14" variant="gradient" asChild>
                    <Link href={config.routes.brand.landing}>Nhãn Hàng / Agency</Link>
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
