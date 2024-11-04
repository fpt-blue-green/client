'use-client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MagnifyingGlassIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Fragment } from 'react';

const InboxList = () => {
  return (
    <div className="relative flex flex-col gap-2 pl-8 pr-4 h-full">
      <div className="sticky top-0 z-5">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Đoạn chat</h1>
          <Button variant="ghost" size="icon">
            <Pencil2Icon />
          </Button>
        </div>
        <Input
          startAdornment={<MagnifyingGlassIcon className="size-5" />}
          fullWidth
          placeholder="Tìm kiếm đoạn chat..."
        />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <Fragment key={i}>
              <Button variant="ghost" className="flex justify-start h-fit">
                <span className="flex gap-2 w-full">
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left gap-1 overflow-hidden">
                    <h6 className="font-medium">Shadecn/ui</h6>
                    <p className="truncate font-normal text-muted-foreground">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt velit voluptatibus modi eius
                      repudiandae, dicta fugit est, voluptatem totam odit eveniet! Alias labore iste quisquam
                      reprehenderit tempora itaque quia enim!
                    </p>
                  </div>
                </span>
              </Button>
              <Separator />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxList;
