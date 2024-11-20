'use client';

import Table from '@/components/custom/data-table';
import Paper from '@/components/custom/paper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchRequest } from '@/request';
import { ICampaignMemberOverview } from '@/types/campaign-tracking';
import { ColumnDef } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import Statistical from './components/statistical';
import { LuBriefcase, LuEye, LuHeart, LuMessageSquare, LuSmile, LuTarget, LuWallet } from 'react-icons/lu';
import { formats } from '@/lib/utils';

const Performance = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = fetchRequest.campaign.trackingOverview(id);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-auto">
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6
            className="flex items-center justify-between text-lg font-semibold"
            title={formats.bigNum(data?.totalJob || 0)}
          >
            <LuBriefcase />
            {formats.bigNum(data?.totalJob || 0)}
          </h6>
          <span className="text-sm text-muted-foreground">Công việc</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6
            className="flex items-center justify-between text-lg font-semibold"
            title={formats.bigNum(data?.targetReaction || 0)}
          >
            <LuTarget />
            {formats.estimate(data?.targetReaction || 0)}
          </h6>
          <span className="text-sm text-muted-foreground">Mục tiêu tương tác</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6
            className="flex items-center justify-between text-lg font-semibold"
            title={formats.bigNum(data?.totalView || 0)}
          >
            <LuEye />
            {formats.estimate(data?.totalView || 0)}
          </h6>
          <span className="text-sm text-muted-foreground">Lượt xem</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6
            className="flex items-center justify-between text-lg font-semibold"
            title={formats.bigNum(data?.totalLike || 0)}
          >
            <LuHeart />
            {formats.bigNum(data?.totalLike || 0)}
          </h6>
          <span className="text-sm text-muted-foreground">Lượt thích</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6
            className="flex items-center justify-between text-lg font-semibold"
            title={formats.bigNum(data?.totalComment || 0)}
          >
            <LuMessageSquare />
            {formats.bigNum(data?.totalComment || 0)}
          </h6>
          <span className="text-sm text-muted-foreground">Bình luận</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6
            className="flex items-center justify-between text-lg font-semibold"
            title={formats.bigNum(data?.totalReaction || 0)}
          >
            <LuSmile />
            {formats.estimate(data?.totalReaction || 0)}
          </h6>
          <span className="text-sm text-muted-foreground">Tổng tương tác</span>
        </Paper>
        <Paper className="text-right p-4 w-44 shrink-0">
          <h6
            className="flex items-center justify-between text-lg font-semibold"
            title={formats.price(data?.totalFee || 0)}
          >
            <LuWallet />
            {formats.estimate(data?.totalFee || 0)}
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
    cell: ({ row }) => (
      <p className="text-right" title={formats.bigNum(row.getValue('totalJob'))}>
        {formats.estimate(row.getValue('totalJob'))}
      </p>
    ),
  },
  {
    accessorKey: 'targetReaction',
    header: 'Mục tiêu tương tác',
    cell: ({ row }) => (
      <p className="text-right" title={formats.bigNum(row.getValue('targetReaction'))}>
        {formats.estimate(row.getValue('targetReaction'))}
      </p>
    ),
  },
  {
    accessorKey: 'totalView',
    header: 'Lượt xem',
    cell: ({ row }) => (
      <p className="text-right" title={formats.bigNum(row.getValue('totalView'))}>
        {formats.estimate(row.getValue('totalView'))}
      </p>
    ),
  },
  {
    accessorKey: 'totalLike',
    header: 'Lượt thích',
    cell: ({ row }) => (
      <p className="text-right" title={formats.bigNum(row.getValue('totalLike'))}>
        {formats.estimate(row.getValue('totalLike'))}
      </p>
    ),
  },
  {
    accessorKey: 'totalComment',
    header: 'Bình luận',
    cell: ({ row }) => (
      <p className="text-right" title={formats.bigNum(row.getValue('totalComment'))}>
        {formats.estimate(row.getValue('totalComment'))}
      </p>
    ),
  },
  {
    accessorKey: 'totalFee',
    header: 'Chi phí',
    cell: ({ row }) => (
      <p className="text-right" title={formats.price(row.getValue('totalFee'))}>
        {formats.price(row.getValue('totalFee'))}
      </p>
    ),
  },
];

export default Performance;
