'use client';

import Table from '@/components/custom/data-table';
import Paper from '@/components/custom/paper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchRequest } from '@/request';
import { ICampaignMemberOverview } from '@/types/campaign-tracking';
import { ColumnDef } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import Statistical from './statistical';
import { LuBriefcase, LuEye, LuHeart, LuMessageSquare, LuSmile, LuTarget, LuWallet } from 'react-icons/lu';

const Performance = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = fetchRequest.campaign.trackingOverview(id);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-auto">
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6 className="flex items-center justify-between text-lg font-semibold">
            <LuBriefcase />
            {data?.totalJob}
          </h6>
          <span className="text-sm text-muted-foreground">Công việc</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6 className="flex items-center justify-between text-lg font-semibold">
            <LuTarget />
            {data?.targetReaction}
          </h6>
          <span className="text-sm text-muted-foreground">Mục tiêu tương tác</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6 className="flex items-center justify-between text-lg font-semibold">
            <LuEye />
            {data?.totalView}
          </h6>
          <span className="text-sm text-muted-foreground">Lượt xem</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6 className="flex items-center justify-between text-lg font-semibold">
            <LuHeart />
            {data?.totalLike}
          </h6>
          <span className="text-sm text-muted-foreground">Lượt thích</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6 className="flex items-center justify-between text-lg font-semibold">
            <LuMessageSquare />
            {data?.totalComment}
          </h6>
          <span className="text-sm text-muted-foreground">Bình luận</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6 className="flex items-center justify-between text-lg font-semibold">
            <LuSmile />
            {data?.totalReaction}
          </h6>
          <span className="text-sm text-muted-foreground">Tổng tương tác</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6 className="flex items-center justify-between text-lg font-semibold">
            <LuWallet />
            {data?.totalFee}
          </h6>
          <span className="text-sm text-muted-foreground">Chi phí</span>
        </Paper>
      </div>
      <Paper className="overflow-auto">
        <h3 className="mb-8 font-semibold">Hiệu suất theo ngày</h3>
        <Statistical id={id} />
      </Paper>
      <Paper>
        <Table url={`/Campaigns/${id}/jobDetails`} columns={columns} headClassName="text-right first:text-left" />
      </Paper>
    </div>
  );
};

const columns: ColumnDef<ICampaignMemberOverview>[] = [
  {
    accessorKey: 'name',
    header: 'Tên',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} alt={`Ảnh đại diện của ${row.original.name}`} />
          <AvatarFallback>{row.original.name}</AvatarFallback>
        </Avatar>
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalJob',
    header: 'Công việc',
    cell: ({ row }) => <p className="text-right">{row.getValue('totalJob')}</p>,
  },
  {
    accessorKey: 'targetReaction',
    header: 'Mục tiêu tương tác',
    cell: ({ row }) => <p className="text-right">{row.getValue('targetReaction')}</p>,
  },
  {
    accessorKey: 'totalView',
    header: 'Lượt xem',
    cell: ({ row }) => <p className="text-right">{row.getValue('totalView')}</p>,
  },
  {
    accessorKey: 'totalLike',
    header: 'Lượt thích',
    cell: ({ row }) => <p className="text-right">{row.getValue('totalLike')}</p>,
  },
  {
    accessorKey: 'totalComment',
    header: 'Bình luận',
    cell: ({ row }) => <p className="text-right">{row.getValue('totalComment')}</p>,
  },
  {
    accessorKey: 'totalFee',
    header: 'Chi phí',
    cell: ({ row }) => <p className="text-right">{row.getValue('totalFee')}</p>,
  },
];

export default Performance;
