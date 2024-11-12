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

const ProfileDropdown = () => {
  const { session, profile: influencer } = useAuthInfluencer();
  const { profile: brand } = useAuthBrand();
  const user = session?.user;
  const { data: wallet } = fetchRequest.user.payment(!!user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {user ? (
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
              <DropdownMenuItem onClick={() => signIn()}>Đăng nhập</DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>Đăng kí</DropdownMenuItem>
              </DialogTrigger>
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
                    <Link href={config.routes.influencer.landing}>Người Nổi Tiếng</Link>
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
