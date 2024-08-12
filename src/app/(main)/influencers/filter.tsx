import Badge from '@/components/custom/badge';
import Checkbox from '@/components/custom/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Cross2Icon, MagnifyingGlassIcon, ReloadIcon } from '@radix-ui/react-icons';
import { LuFilter } from 'react-icons/lu';
import { Slider } from '@/components/ui/slider';

const Filter = () => {
  return (
    <div className="flex items-center justify-between">
      <Input
        className="w"
        startAdornment={<MagnifyingGlassIcon className="size-8 text-muted-foreground" />}
        placeholder="Tìm kiếm..."
      />
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="large" startIcon={<LuFilter />} variant="ghost" className="px-3">
              Bộ lọc
            </Button>
          </SheetTrigger>
          <SheetContent hideCloseBtn>
            <SheetHeader className="pb-2 border-b">
              <SheetTitle className="flex items-center justify-between">
                Bộ lọc
                <div className="space-x-2">
                  <Button size="icon" variant="ghost">
                    <Badge dot={true}>
                      <ReloadIcon />
                    </Badge>
                  </Button>
                  <SheetClose asChild>
                    <Button size="icon" variant="ghost">
                      <Cross2Icon />
                    </Button>
                  </SheetClose>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-8">
              <div className="space-y-3">
                <h5 className="font-medium mb-2">Nền tảng</h5>
                <Checkbox label="Instagram" value="Instagram" />
                <Checkbox label="TikTok" value="TikTok" />
                <Checkbox label="YouTube" value="YouTube" />
              </div>
              <div className="space-y-3">
                <h5 className="font-medium mb-2">Danh mục</h5>
                <Checkbox label="Ca hát & Khiêu vũ" value="1" />
                <Checkbox label="Thời trang" value="2" />
                <Checkbox label="Đời sống" value="3" />
                <Checkbox label="Gaming" value="4" />
                <Checkbox label="Thể thao" value="5" />
                <Checkbox label="Giải trí" value="6" />
                <Checkbox label="Gia đình" value="7" />
              </div>
              <div>
                <h5 className="font-medium mb-2">Giá</h5>
                <Slider defaultValue={[25, 75]} step={5} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Button size="large" variant="ghost" className="px-3">
          Sắp xếp theo: Nổi bật
        </Button>
      </div>
    </div>
  );
};

export default Filter;
