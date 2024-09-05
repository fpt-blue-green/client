'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { fetcher } from '@/lib/http';
import Tag from '@/types/tag';
import { useState } from 'react';
import { toast } from 'sonner';
import useSWRImmutable from 'swr/immutable';
import ProgressHeading from './progress-heading';

const Step4 = () => {
  const [tags, setTags] = useState<string[]>([]);
  const { data, isLoading } = useSWRImmutable<Tag[]>('/Tags', fetcher);

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
    console.log(tags);
  };

  return (
    <div className="space-y-10">
      <ProgressHeading step={4} title="Chọn các thẻ phù hợp với nội dung của bạn" />
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
      <Button variant="gradient" size="large" fullWidth disabled={!tags.length} onClick={handleSubmit}>
        Tiếp tục
      </Button>
    </div>
  );
};

export default Step4;
