import config from '@/config';
import MenuItem from './menu-item';
import { ModeToggle } from '@/components/mode-toggle';
import ProfileDropdown from '@/components/profile-dropdown';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="container h-20">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={config.routes.home} className="font-bold text-lg">
              adfusion
            </Link>
            <div className="flex items-center gap-4">
              <MenuItem href={config.routes.home}>Khám phá</MenuItem>
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
