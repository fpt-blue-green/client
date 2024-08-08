import config from '@/config';
import MenuItem from './menu-item';
import { ModeToggle } from '@/components/mode-toggle';
import ProfileDropdown from '@/components/profile-dropdown';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const Header = () => {
  return (
    <header>
      <div className="container h-20">
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
              <MenuItem href={config.routes.explore}>Khám phá</MenuItem>
              <MenuItem href={config.routes.influencer.base}>Trở thành nhà sáng tạo</MenuItem>
              <MenuItem href={config.routes.brand.base}>Trở thành nhãn hàng</MenuItem>
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
