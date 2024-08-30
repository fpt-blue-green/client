import { FC } from 'react';
import { constants } from '@/lib/utils';
import { authRequest } from '@/request';
import { EVerifyAction } from '@/types/enum';
import { notFound } from 'next/navigation';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import RedirectButton from './redirect-button';

interface VerifyProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Verify: FC<VerifyProps> = async ({ searchParams }) => {
  const data = {
    success: false,
    title: 'Xác thực thất bại!',
    message: constants.sthWentWrong,
  };

  if (searchParams) {
    const { action, token } = searchParams;
    if (typeof action === 'string' && typeof token === 'string') {
      try {
        const actionEnum = parseInt(action) as EVerifyAction;
        const res = await authRequest.verify(actionEnum, token);
        if (res.data) {
          data.success = true;
          data.title = 'Xác thực thành công!';
          data.message = '';
        }
      } catch (error: any) {
        data.message = error.message;
      }
    } else {
      return notFound();
    }
  } else {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-screen-sm">
      <div
        className={clsx(
          'flex items-center justify-center size-48 rounded-full text-white',
          data.success ? 'bg-green-500' : 'bg-red-500',
        )}
      >
        {data.success ? <CheckIcon className="size-32" /> : <Cross2Icon className="size-32" />}
      </div>
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="text-muted-foreground">{data.message}</p>
      <RedirectButton />
    </div>
  );
};
export default Verify;
