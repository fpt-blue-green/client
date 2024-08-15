import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { LuBadgeInfo } from 'react-icons/lu';
const HowPackagesWork = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-muted-foreground" variant="link" startIcon={<LuBadgeInfo />}>
          Hoạt động như thế nào?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Điều gì xảy ra khi tôi giao dịch 1 gói?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>Content{/* Code content ở đây */}</div>
      </DialogContent>
    </Dialog>
  );
};

export default HowPackagesWork;
