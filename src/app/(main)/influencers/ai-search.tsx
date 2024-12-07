'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { fetchRequest } from '@/request';
import { IFilterList } from '@/types/filter-list';
import IInfluencer from '@/types/influencer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { VscNewline } from 'react-icons/vsc';
import { z } from 'zod';

const schema = z.object({
  prompt: z.string().min(1, 'Bạn cần nhập thông tin để tìm kiếm'),
});

interface AISearchProps {
  page: number;
  pageSize: number;
  onPromptChange: () => void;
  onSubmit: (prompt: IFilterList<IInfluencer>) => void;
  onClose: () => void;
}

const AISearch = ({ page, pageSize, onPromptChange, onSubmit, onClose }: AISearchProps) => {
  const [prompt, setPrompt] = useState('');
  const { data, isLoading } = fetchRequest.influencers.searchAI(prompt, page, pageSize);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    onPromptChange();
    setPrompt(values.prompt);
  };

  useEffect(() => {
    if (data) {
      onSubmit(data);
    }
  }, [data, onSubmit]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  startAdornment={<FaWandMagicSparkles />}
                  endAdornment={
                    <div className="flex items-center gap-2">
                      <Button
                        type="submit"
                        variant="gradient"
                        size="small"
                        endIcon={<VscNewline />}
                        loading={isLoading}
                      >
                        Tìm
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={onClose} disabled={isLoading}>
                        <FaTimes />
                      </Button>
                    </div>
                  }
                  fullWidth
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AISearch;
