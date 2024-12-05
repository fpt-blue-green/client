'use client';
import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { useAuthInfluencer } from '@/hooks';
import { fetcher } from '@/lib/http';
import { influencerRequest } from '@/request';
import ITag from '@/types/tag';
import { useState } from 'react';
import { toast } from 'sonner';
import useSWRImmutable from 'swr/immutable';

const Tags = () => {
  const { profile, refreshProfile } = useAuthInfluencer();
  const { data, isLoading } = useSWRImmutable<ITag[]>('/Tags', fetcher);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(profile!.tags?.map((tag) => tag.id));
  const handleSubmit = () => {
    setLoading(true);
    influencerRequest
      .selectTags(tags)
      .then(() => {
        refreshProfile().then(() => toast.success('Cập nhật thẻ thành công!'));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleSelectedTag = (selectedTag: string) => () => {
    if (tags.includes(selectedTag)) {
      setTags(tags.filter((tag) => tag !== selectedTag));
    } else {
      if (tags.length < 6) {
        setTags([...tags, selectedTag]);
      } else {
        toast.error('Bạn chỉ được chọn tối đa 6 thẻ');
      }
    }
  };

  return (
    <Paper>
      <div>
        <h3 className="font-semibold text-xl mb-8">Quản Lý Các Thẻ</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => <Skeleton key={index} className="h-10 w-full" />)
            : data?.map((tag) => (
                <Toggle
                  variant="primary"
                  size="large"
                  key={tag.id}
                  pressed={tags.includes(tag.id)}
                  onPressedChange={handleSelectedTag(tag.id)}
                >
                  {tag.name}
                </Toggle>
              ))}
        </div>
      </div>
      <Button
        variant="gradient"
        size="large"
        fullWidth
        disabled={!tags.length}
        onClick={handleSubmit}
        loading={loading}
        className="mt-8 h-12 text-md"
      >
        Lưu thẻ
      </Button>
    </Paper>
  );
};

export default Tags;
