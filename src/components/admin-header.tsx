'use client';

import { ModeToggle } from '@/components/mode-toggle';
import ProfileDropdown from '@/components/profile-dropdown';
import { Input } from './ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Badge } from './ui/badge';

const AdminHeader = () => {
  return (
    <header className="top-0 left-0 right-0 bg-background/80 shadow">
      <div className="container h-16 transition-all">
        <div className="h-full flex items-center justify-between">
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            startAdornment={<MagnifyingGlassIcon className="size-4" />}
            endAdornment={
              <Badge size="small" variant="secondary" className="shadow">
                <kbd className="text-nowrap">⌘ K</kbd>
              </Badge>
            }
          />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
