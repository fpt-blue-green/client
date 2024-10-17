'use client';

import { ModeToggle } from '@/components/mode-toggle';
import ProfileDropdown from '@/components/profile-dropdown';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import MenuItem from '@/components/menu-item';
import { Button } from './button';
import { Input } from './input';

const AdminHeader = () => {
  return (
    <header className="top-0 left-0 right-0 bg-background/80 ">
      <div className={'container md:h-20 h-16 transition-all'}>
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="md:hidden" variant="ghost" size="icon">
              <HamburgerMenuIcon />
            </Button>
            <div className="flex items-center gap-4 max-md:hidden">
              <MenuItem href={''}>Tổng Quan</MenuItem>
              <MenuItem href={''}>Nhãn Hàng</MenuItem>
              <MenuItem href={''}>Nhà Sáng Tạo</MenuItem>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input type="text" placeholder="Tìm kiếm..." />
            <ModeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
