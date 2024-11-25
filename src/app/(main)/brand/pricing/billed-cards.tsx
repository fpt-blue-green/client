'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ProBenefits } from './pro-benefit';
import { constants, formats } from '@/lib/utils';
import { paymentRequest } from '@/request';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthBrand } from '@/hooks';

interface IPackagePurchase {
  redirectUrl: string;
  numberMonthsRegis: number;
}

const BilledCards = () => {
  const { profile: brand } = useAuthBrand();
  const [isMonthlyBilled, setIsMonthlyBilled] = useState<boolean>(true);
  const handleMonthlyBilledClick = () => {
    setIsMonthlyBilled(true);
  };
  const handleThreeMonthBilledClick = () => {
    setIsMonthlyBilled(false);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (!brand) {
    return;
  }

  const handleSubmit = (month: number) => {
    const payload: IPackagePurchase = {
      redirectUrl: window.location.origin,
      numberMonthsRegis: month,
    };
    setIsLoading(true);
    const caller = paymentRequest.updatePremium(payload);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: (res) => {
        if (res.data) {
          router.push(res.data.shortLink);
          return 'Bạn được chuyển đến trang thanh toán';
        }
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setIsLoading(false),
    });
  };

  return (
    <>
      <div className="flex justify-center mb-6 ml-4">
        <Button
          onClick={handleMonthlyBilledClick}
          size="small"
          variant={isMonthlyBilled ? 'foreground' : 'ghost'}
          className="h-8 ml-4 rounded-2xl cursor-pointer text-base"
        >
          Một Tháng
        </Button>
        <Button
          onClick={handleThreeMonthBilledClick}
          size="small"
          variant={isMonthlyBilled ? 'ghost' : 'foreground'}
          className="h-8 rounded-2xl cursor-pointer text-base"
        >
          Ba Tháng
        </Button>
        <Button size="icon" className="text-[6px] p-2 h-4 mb-6 mr-4" variant="gradient">
          -15%
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-foreground col-span-1 px-8 py-5 rounded-md bg-card">
          <h5 className="text-center text-base">Cơ Bản</h5>
          <h3 className="text-3xl my-6 text-center font-semibold">Miễn Phí</h3>
          <div className="flex flex-col gap-4 mb-12">
            <p>
              <span className="font-semibold">Tìm kiếm các nhà sáng tạo </span> trên thị trường
            </p>
            <p>
              <span className="font-semibold">10% </span> phí thị trường
            </p>
            {ProBenefits.map((item) => (
              <p className="text-muted-foreground line-through text-sm" key={item.benefit}>
                {item.benefit} {item.appendText}
              </p>
            ))}
          </div>
          {brand.isPremium ? (
            <></>
          ) : (
            <p className="text-xl font-semibold text-center text-muted-foreground">Quyền Lợi Hiện Tại</p>
          )}
        </div>
        <div className="border border-foreground col-span-1 px-8 py-5 rounded-md bg-card-foreground">
          <h5 className="text-center text-base text-muted">Premium</h5>
          <h3 className="text-3xl my-6 text-center font-semibold text-muted">
            {isMonthlyBilled ? formats.price(469000) : formats.price(1416000)}
            <span className="text-base">{isMonthlyBilled ? '/tháng' : '/3 tháng'}</span>
          </h3>
          <div className="flex flex-col gap-4 mb-12">
            <p className="font-semibold text-muted">Mọi quyền lời cơ bản</p>
            {ProBenefits.map((item) => (
              <p className="text-muted text-sm" key={item.benefit}>
                <span className="font-semibold">{item.benefit}</span> {item.appendText}
              </p>
            ))}
          </div>
          {brand.isPremium ? (
            <p className="text-xl font-semibold text-center text-muted-foreground">Quyền Lợi Hiện Tại</p>
          ) : (
            <Button
              onClick={() => {
                handleSubmit(isMonthlyBilled ? 1 : 3);
              }}
              size="large"
              fullWidth
              variant="secondary"
              className="rounded-2xl mt-8 text-xl"
              loading={isLoading}
            >
              Nâng Cấp
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default BilledCards;
