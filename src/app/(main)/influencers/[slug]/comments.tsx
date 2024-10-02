'use client';

import Paper from '@/components/custom/paper';
import Rating from '@/components/custom/rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetcher } from '@/lib/http';
import { formats } from '@/lib/utils';
import IComment from '@/types/comment';
import { FC } from 'react';
import useSWRImmutable from 'swr/immutable';

interface CommentsProps {
  influencerId: string;
}

const Comments: FC<CommentsProps> = ({ influencerId }) => {
  const { data } = useSWRImmutable<IComment[]>(`/Influencers/${influencerId}/feedbacks`, fetcher);

  return (
    <div className="mt-16">
      <h3 className="font-semibold text-2xl mb-6">
        Đánh giá<span className="text-base font-normal text-muted-foreground ml-2">(483 đánh giá)</span>
      </h3>
      <Paper className="space-y-8">
        {data?.map((comment) => (
          <div className="flex flex-col md:flex-row gap-4" key={comment.id}>
            <div className="flex md:flex-col gap-4 items-center md:w-40 md:text-center">
              <Avatar className="size-12 md:size-16">
                <AvatarImage src={comment.user.image} alt={`Ảnh đại diện của ${comment.user.name}`} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{comment.user.name}</div>
                <div className="text-sm text-muted-foreground">{formats.date(comment.createdAt)}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Rating defaultValue={comment.rating} precision={0.25} readOnly />
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default Comments;
