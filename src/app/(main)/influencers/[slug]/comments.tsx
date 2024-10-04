'use client';

import Rating from '@/components/custom/rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { fetcher } from '@/lib/http';
import { constants, formats } from '@/lib/utils';
import { influencersRequest } from '@/request';
import { ReviewBodyType, reviewSchema } from '@/schema-validations/influencer.schema';
import IFeedback from '@/types/feedback';
import IInfluencer from '@/types/influencer';
import IUser from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWRImmutable from 'swr/immutable';

interface CommentsProps {
  influencer: IInfluencer;
  user?: IUser;
}

const Comments: FC<CommentsProps> = ({ influencer, user }) => {
  const { data, mutate } = useSWRImmutable<IFeedback[]>(`/Influencers/${influencer.id}/feedbacks`, fetcher);
  const { data: count, mutate: mutateCount } = useSWRImmutable<number>(
    `/Influencers/${influencer.id}/feedbacks/count`,
    fetcher,
  );

  const reload = async () => {
    await Promise.all([mutate(), mutateCount()]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        {influencer.rateAverage > 0 ? (
          <>
            <span className="relative text-7xl font-extrabold after:absolute after:bg-muted-foreground after:rotate-12 after:h-20 after:w-0.5 after:top-1/2 after:-right-2 after:-translate-y-1/2">
              {influencer.rateAverage.toFixed(1)}
            </span>
            <span>{count} đánh giá</span>
          </>
        ) : (
          <p>Chưa có đánh giá</p>
        )}
      </div>
      {user ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="gradient" size="large" fullWidth>
              Viết đánh giá
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CommentForm influencer={influencer} reload={reload} />
          </DialogContent>
        </Dialog>
      ) : (
        <Button type="button" variant="gradient" size="large" fullWidth onClick={() => signIn()}>
          Viết đánh giá
        </Button>
      )}
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

interface CommentFormProps {
  influencer: IInfluencer;
  reload: () => Promise<void>;
}

const CommentForm: FC<CommentFormProps> = ({ influencer, reload }) => {
  const form = useForm<ReviewBodyType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      content: '',
    },
  });

  const onSubmit = (values: ReviewBodyType) => {
    influencersRequest
      .sendFeedback(influencer.id, values)
      .then(() => {
        reload().then(() => toast.success('Gửi đánh giá thành công'));
      })
      .catch((err) => toast.error(err?.message || constants.sthWentWrong));
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Viết một đánh giá</DialogTitle>
          <DialogDescription>Để lại nhận xét của bạn về {influencer.fullName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bạn đánh giá như thế nào?</FormLabel>
                <FormControl>
                  <div>
                    <Rating {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Hủy
            </Button>
          </DialogClose>
          <Button type="submit" variant="gradient">
            Gửi
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default Comments;
