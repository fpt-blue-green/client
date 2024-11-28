'use client';

import Tooltip from '@/components/custom/tooltip';
import { convertReportReason, convertReportStatus } from '@/lib/constants';
import { formats } from '@/lib/utils';
import IReport from '@/types/report';
import { ColumnDef } from '@tanstack/react-table';
import { MdWarning } from 'react-icons/md';

export const columns: ColumnDef<IReport, IReport>[] = [
  {
    id: 'reporterName',
    accessorKey: 'reporterName',
    header: 'Người tố cáo',
    cell: ({ row }) => <div className="pl-4">{row.original.reporterName}</div>,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }) => <div className="pl-4 truncate max-w-40">{row.original.description}</div>,
  },
  {
    id: 'influencerName',
    accessorKey: 'influencerName',
    header: 'Người bị tố cáo',
    cell: ({ row }) => (
      <div className="pl-4 flex items-center gap-2">
        <MdWarning />
        {row.original.influencerName}
      </div>
    ),
  },
  {
    id: 'reason',
    accessorKey: 'reason',
    header: 'Lí do',
    cell: ({ row }) => (
      <Tooltip className="max-w-96" label={convertReportReason(row.original.reason) || ''}>
        <div className="truncate max-w-80">{convertReportReason(row.original.reason)}</div>
      </Tooltip>
    ),
  },
  {
    id: 'reportStatus',
    accessorKey: 'reportStatus',
    header: 'Trạng thái',
    cell: ({ row }) => <div className="pl-4">{convertReportStatus(row.original.reportStatus)}</div>,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Thời gian gửi báo cáo',
    enableSorting: false,
    cell: ({ row }) => formats.date(row.original.createdAt || '', true),
  },
  {
    id: 'modifiedAt',
    accessorKey: 'modifiedAt',
    header: 'Lần cập nhật gần nhất',
    enableSorting: false,
    cell: ({ row }) => formats.date(row.original.modifiedAt || '', true),
  },
];
