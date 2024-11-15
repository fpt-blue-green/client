'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ProBenefits } from './pro-benefit';
import { formats } from '@/lib/utils';

const BilledCards = () => {
  const [isMonthlyBilled, setIsMonthlyBilled] = useState<boolean>(true);
  const handleMonthlyBilledClick = () => {
    setIsMonthlyBilled(true);
  };
  const handleYearlyBilledClick = () => {
    setIsMonthlyBilled(false);
  };
  return (
    <>
      <div className="flex gap-2 items-center justify-center mb-12">
        <Button
          onClick={handleMonthlyBilledClick}
          size="small"
          variant={isMonthlyBilled ? 'foreground' : 'ghost'}
          className="h-8 rounded-2xl cursor-pointer text-base"
          asChild
        >
          <p>Giá gói tháng</p>
        </Button>
        <Button
          onClick={handleYearlyBilledClick}
          size="small"
          variant={isMonthlyBilled ? 'ghost' : 'foreground'}
          className="h-8 rounded-2xl cursor-pointer text-base"
          asChild
        >
          <p>Giá gói năm</p>
        </Button>
        <Button size="small" variant="gradient" className="h-6 rounded-2xl text-[10px]" asChild>
          <p>Tiết kiệm 50%</p>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-foreground col-span-1 px-8 py-5 rounded-md bg-card">
          <h5 className="text-center text-base">Cơ bản</h5>
          <h3 className="text-3xl my-6 text-center font-semibold">Miễn phí</h3>
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
          <h5 className="text-center text-lg font-semibold text-muted-foreground mb-12">Quyền lợi hiện có</h5>
        </div>
        <div className="border border-foreground col-span-1 px-8 py-5 rounded-md bg-card-foreground">
          <h5 className="text-center text-base text-muted">Pro</h5>
          <h3 className="text-3xl my-6 text-center font-semibold text-muted">
            {isMonthlyBilled ? formats.price(1000000) : formats.price(700000)}
          </h3>
          <div className="flex flex-col gap-4 mb-12">
            <p className="font-semibold text-muted">Mọi quyền lời cơ bản</p>
            {ProBenefits.map((item) => (
              <p className="text-muted text-sm" key={item.benefit}>
                <span className="font-semibold">{item.benefit}</span> {item.appendText}
              </p>
            ))}
          </div>
          <Button size="large" fullWidth variant="secondary" className="h-16 rounded-2xl cursor-pointer my-4" asChild>
            <p className="text-xl font-semibold ">Nâng Cấp</p>
          </Button>
          <p className="italic text-muted text-center text-xs">Có thể huỷ bất cứ lúc nào</p>
        </div>
      </div>
    </>
  );
};

export default BilledCards;
