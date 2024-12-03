'use client';

import Paper from '@/components/custom/paper';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formats } from '@/lib/utils';
import { fetchRequest } from '@/request';
import { MobileIcon } from '@radix-ui/react-icons';
import { Laptop, Tablet } from 'lucide-react';
import { RiAndroidLine, RiChromeLine, RiEdgeNewLine, RiWindowsLine } from 'react-icons/ri';
import { SiIos, SiLinux } from 'react-icons/si';

const Devices = () => {
  const { data } = fetchRequest.user.loginHistory();

  const icon = (device: string) => {
    switch (device) {
      case 'Desktop':
        return <Laptop className="size-5" />;
      case 'Table':
        return <Tablet className="size-5" />;
      case 'Mobile':
        return <MobileIcon className="size-5" />;
      default:
        return;
    }
  };

  const browser = (browser: string) => {
    switch (browser) {
      case 'Edge':
        return <RiEdgeNewLine className="text-xl" />;
      case 'Chrome':
        return <RiChromeLine className="text-xl" />;
      default:
        return;
    }
  };

  const operatingSystem = (os: string) => {
    switch (os) {
      case 'Windows':
        return <RiWindowsLine className="text-xl" />;
      case 'Android':
        return <RiAndroidLine className="text-xl" />;
      case 'iOS':
        return <SiIos className="text-xl" />;
      case 'Linux':
        return <SiLinux className="text-xl" />;
      default:
        return;
    }
  };

  return (
    <Paper>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên thiết bị</TableHead>
              <TableHead>Trình duyệt</TableHead>
              <TableHead>Hệ điều hành</TableHead>
              <TableHead>Đăng nhập lần cuối</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((d, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {icon(d.deviceType)} {d.deviceType}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {browser(d.browserName)} {d.browserName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {operatingSystem(d.deviceOperatingSystem)} {d.deviceOperatingSystem}
                  </div>
                </TableCell>
                <TableCell>{formats.date(d.lastLoginTime, true)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default Devices;
