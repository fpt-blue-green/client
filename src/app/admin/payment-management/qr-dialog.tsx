/* eslint-disable @next/next/no-img-element */
'use client';

import { paymentRequest } from '@/request';
import { IPaymentManagement } from '@/types/payment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const QRDialog = ({ payment, qr, onSuccess }: { payment: IPaymentManagement; qr: string; onSuccess: () => void }) => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      paymentRequest.withdrawResponse(payment.id).then((res) => {
        if (res.data) {
          setSuccess(true);
        }
      });
    }, 3_000);

    return () => clearInterval(timer);
  }, [payment.id, onSuccess]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) {
      timer = setTimeout(() => {
        onSuccess();
      }, 3_000);
    }

    return () => clearTimeout(timer);
  }, [success, onSuccess]);

  return (
    <div>
      {success ? (
        <div className="flex flex-col items-center justify-center gap-2 p-8">
          <FaCheckCircle className="text-8xl text-success" />
          <h5 className="font-semibold">Thanh toán giao dịch thành công!</h5>
        </div>
      ) : (
        <Image src={qr} alt={`QR của ${payment.user.name}`} width={450} height={560} className="w-full" />
      )}
    </div>
  );
};

export default QRDialog;
