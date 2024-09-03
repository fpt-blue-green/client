import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LuHelpingHand } from 'react-icons/lu';

const VerificationGuidanceModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-60 py-6" type="submit" variant="gradient" fullWidth>
          Hướng dẫn xử lí
          <LuHelpingHand size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-bold">Chưa nhận được tin nhắn?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-5">
          <div className="my-5 p-4 border rounded-sm">
            <h3 className="font-semibold text-lg">1. Kiểm tra tất cả thư mục của bạn</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Đôi khi tin nhắn được gửi đến mục spam hoặc các thư mục khác thay vì hòm thư của bạn. Hãy chắc rằng bạn đã
              kiểm tra tất cả thư mục để tìm tin nhắn xác thực.
            </p>
          </div>
          <div className="my-5 p-4 border rounded-sm">
            <h3 className="font-semibold text-lg">2. Tìm kiếm tin nhắn từ hello@adfusion.com</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Tìm kiếm hòm thư cho các tin nhắn từ hello@adfusion.com.
            </p>
          </div>
          <div className="my-5 p-4 border rounded-sm">
            <h3 className="font-semibold text-lg">3. Liên hệ chúng tôi</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Nếu bạn vẫn chưa thể tìm thấy tin nhắn xác thực, thử yêu cầu gửi lại bằng cách liên hệ với chúng tôi qua
              thông tin liên lạc bên dưới{' '}
              <Button className="p-0 font-semibold underline" variant="link">
                Thông tin liên hệ
              </Button>
            </p>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationGuidanceModal;
