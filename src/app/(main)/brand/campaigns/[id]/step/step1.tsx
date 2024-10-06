'use client';

import { FC, useState } from 'react';
import DetailStepProps from './props';
import { ScrollArea } from '@/components/ui/scroll-area';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import ITag from '@/types/tag';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { campaignsRequest } from '@/request';
import config from '@/config';
import { useRouter } from 'next/navigation';

const Step1: FC<DetailStepProps> = ({ id, campaign, mutate }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(campaign.tags?.map((t) => t.id) || []);
  const { data, isLoading } = useSWRImmutable<ITag[]>('/Tags', fetcher);
  const router = useRouter();

  const handleToggle = (value: string) => () => {
    if (tags.includes(value)) {
      setTags(tags.filter((t) => t !== value));
    } else {
      if (tags.length < 6) {
        setTags([...tags, value]);
      } else {
        toast.error('Bạn chỉ được chọn tối đa 6 thẻ');
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    campaignsRequest
      .addTags(id, tags)
      .then(() => {
        mutate().then(() => router.push(config.routes.brand.campaigns.edit(id, 2)));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-10">
      <ScrollArea className="h-[40vh]">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => <Skeleton key={index} className="h-10 w-full" />)
            : data?.map((tag) => (
                <Toggle
                  variant="primary"
                  size="large"
                  key={tag.id}
                  pressed={tags.includes(tag.id)}
                  onPressedChange={handleToggle(tag.id)}
                >
                  {tag.name}
                </Toggle>
              ))}
        </div>
      </ScrollArea>
      <Button
        variant="gradient"
        size="large"
        fullWidth
        disabled={!tags.length}
        loading={loading}
        onClick={handleSubmit}
      >
        Tiếp tục
      </Button>
    </div>
  );
};
export default Step1;
