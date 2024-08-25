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

const VerificationGuidanceModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-muted-foreground text-sm cursor-pointer text-center mt-4">
          Tôi chưa nhận được tin nhắn ở hộp thư
        </p>
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
            <h3 className="font-semibold text-lg">3. Gửi lại tin nhắn xác thực</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Nếu bạn vẫn chưa thể tìm thấy tin nhắn xác thực, thử yêu cầu gửi lại bằng cách bấm vào nút bên dưới. Nếu
              bạn vẫn gặp vấn đề,{' '}
              <Button className="p-0 font-semibold underline" variant="link">
                Liên hệ chúng tôi
              </Button>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button className="h-12" variant="gradient" fullWidth>
            Gửi lại tin nhắn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationGuidanceModal;
