'use client';

import Rating from '@/components/custom/rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/http';
import { formats } from '@/lib/utils';
import IComment from '@/types/comment';
import IInfluencer from '@/types/influencer';
import { FC } from 'react';
import useSWRImmutable from 'swr/immutable';

interface CommentsProps {
  influencer: IInfluencer;
}

const Comments: FC<CommentsProps> = ({ influencer }) => {
  const { data } = useSWRImmutable<IComment[]>(`/Influencers/${influencer.id}/feedbacks`, fetcher);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        {influencer.rateAverage > 0 ? (
          <>
            <span className="relative text-7xl font-extrabold after:absolute after:bg-muted-foreground after:rotate-12 after:h-20 after:w-0.5 after:top-1/2 after:-right-2 after:-translate-y-1/2">
              {influencer.rateAverage.toFixed(1)}
            </span>
            <span>{'483 đánh giá'}</span>
          </>
        ) : (
          <p>Chưa có đánh giá</p>
        )}
      </div>
      <Button variant="gradient" size="large" fullWidth>
        Viết đánh giá
      </Button>
      {data?.map((comment) => (
        <div className="flex flex-col md:flex-row gap-4" key={comment.id}>
          <div className="flex md:flex-col gap-4 items-center md:w-36 md:text-center">
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
            <Rating defaultValue={comment.rating} precision={0.25} readOnly size={20} />
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
