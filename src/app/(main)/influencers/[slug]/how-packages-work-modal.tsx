import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { LuBadgeInfo } from 'react-icons/lu';
const HowPackagesWork = () => {
  return (
    <div className="absolute -bottom-5 left-72">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute right-4 bottom-4 text-muted-foreground" variant={'link'}>
            <LuBadgeInfo />
            <span>How does it work?</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] min-w-[50%] max-h-[85%] ">
          <DialogHeader className="flex items-center font-semibold text-2xl">
            Điều gì xảy ra khi tôi giao dịch 1 gói?
          </DialogHeader>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HowPackagesWork;
