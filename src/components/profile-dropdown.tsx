'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { signIn, signOut, useSession } from 'next-auth/react';

const ProfileDropdown = () => {
  const { data } = useSession<true>();
  const user = data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {user ? (
            <Avatar className="size-7">
              {user.image ? (
                <Image src={user.image || ''} alt="sd" width={28} height={28} />
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
        <DropdownMenuContent align="end">
          {user ? (
            <>
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={config.routes.account}>Tài khoản</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Đăng xuất</DropdownMenuItem>
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
                    <Link href={config.routes.influencer.base}>Người Nổi Tiếng</Link>
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button size="large" className="py-5 px-16 h-14" variant="gradient" asChild>
                    <Link href={config.routes.brand.base}>Nhãn Hàng / Agency</Link>
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
