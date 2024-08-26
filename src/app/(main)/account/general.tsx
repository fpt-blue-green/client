'use client';

import { FC } from 'react';
import AvatarUploader from '@/components/avatar-uploader';
import Paper from '@/components/custom/paper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import User from '@/types/user';

interface GeneralProps {
  user: User;
}

const General: FC<GeneralProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Paper>
        <div className="flex flex-col items-center justify-center gap-6">
          <AvatarUploader />
          <p className="text-xs text-muted-foreground text-center">
            Được phép *.jpeg, *.jpg, *.png, *.gif
            <br />
            kích thước tối đa 3 Mb
          </p>
        </div>
      </Paper>
      <Paper className="col-span-1 md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" className="w-full" type="email" defaultValue={user.email} readOnly disabled />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="name">Tên</Label>
            <Input id="name" className="w-full" />
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default General;
