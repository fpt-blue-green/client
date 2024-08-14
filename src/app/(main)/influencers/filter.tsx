import Badge from '@/components/custom/badge';
import Checkbox from '@/components/custom/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Cross2Icon, MagnifyingGlassIcon, ReloadIcon } from '@radix-ui/react-icons';
import { LuFilter } from 'react-icons/lu';
import { Slider } from '@/components/ui/slider';
import { formats } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';

const Filter = () => {
  return (
    <div className="flex items-center justify-between">
      <Input
        startAdornment={<MagnifyingGlassIcon className="size-7 text-muted-foreground" />}
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
                <div className="flex flex-wrap gap-4 items-center">
                  <Toggle variant="primary">Ca hát & Khiêu vũ</Toggle>
                  <Toggle variant="primary">Thời trang</Toggle>
                  <Toggle variant="primary">Đời sống</Toggle>
                  <Toggle variant="primary">Gaming</Toggle>
                  <Toggle variant="primary">Thể thao</Toggle>
                  <Toggle variant="primary">Giải trí</Toggle>
                  <Toggle variant="primary">Gia đình</Toggle>
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Giá</h5>
                <Slider className="mt-6" defaultValue={[0, 10_000_000]} max={10_000_000} step={250_000} />
                <div className="flex items-center gap-4 mt-6">
                  <Input className="h-10" inputClassName="text-right" value={formats.price(250_000)} readOnly />
                  -
                  <Input className="h-10" inputClassName="text-right" value={formats.price(10_000_000)} readOnly />
                </div>
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
