import Wizard from '@/components/custom/wizard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { LuBadgeInfo, LuBadgeDollarSign, LuCheck, LuMessageSquare } from 'react-icons/lu';
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
          <DialogTitle className="text-xl text-center">Sẽ Thế Nào Khi Tôi Giao Dịch Một Gói?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Wizard items={packagePurchasingSteps} />
      </DialogContent>
    </Dialog>
  );
};

export default HowPackagesWork;

const packagePurchasingSteps = [
  {
    key: 1,
    iconComponent: <LuBadgeDollarSign />,
    description: 'Hoá đơn của bạn sẽ được giữ trong vòng 72 tiếng trong lúc chờ đối phương chấp nhận yêu cầu của bạn. ',
  },
  {
    key: 2,
    iconComponent: <LuMessageSquare />,
    description: 'Liên lạc với đối phương và sắp xếp cho sự hợp tác sắp tới.    ',
  },
  {
    key: 3,
    iconComponent: <LuCheck />,
    description: 'Phê duyệt các sản phẩm bàn giao trước khi thanh toán được chuyển cho đối phương.',
  },
];
