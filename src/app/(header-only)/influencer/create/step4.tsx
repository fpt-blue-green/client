'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toggle } from '@/components/ui/toggle';
import config from '@/config';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';

const Step4 = () => {
  const [tags, setTags] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    setTags(tags.includes(value) ? tags.filter((t) => t !== value) : [...tags, value]);
  };

  const handleSubmit = () => {
    console.log(tags);
  };

  return (
    <div className="space-y-10">
      <Progress value={(100 * 4) / 7} className="h-3" />
      <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />}>
        <Link href={{ pathname: config.routes.influencer.create, query: { step: 3 } }}>Trở lại</Link>
      </Button>
      <h1 className="text-3xl font-semibold">Chọn các thẻ phù hợp với nội dung của bạn</h1>
      <ScrollArea className="h-[40vh]">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6">
          {Array.from({ length: 40 }).map((_, index) => (
            <Toggle
              variant="primary"
              size="large"
              key={index}
              pressed={tags.includes(index.toString())}
              onPressedChange={handleToggle(index.toString())}
            >
              Thời trang
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
