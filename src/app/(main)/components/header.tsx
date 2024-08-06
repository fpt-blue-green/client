import config from '@/config';
import MenuItem from './menu-item';
import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header>
      <div className="container h-20">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg">adfusion</span>
            <div className="flex items-center gap-4">
              <MenuItem href={config.routes.home}>Khám phá</MenuItem>
              <MenuItem href={'1'}>Trở thành nhà sáng tạo</MenuItem>
              <MenuItem href={'1'}>Trở thành nhãn hàng</MenuItem>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button size="icon-large" variant="outline">
              <Avatar className="size-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
