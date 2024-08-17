'use client';

import useAuth from '@/hooks/useAuth';
import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';
import config from '@/config';

const ProfileDropdown = () => {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {user ? (
            <Avatar className="size-7">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <PersonIcon className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
          <></>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href={config.routes.login}>Đăng nhập</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={''}>Đăng kí</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
