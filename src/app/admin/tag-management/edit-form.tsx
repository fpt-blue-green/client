import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import ITag from '@/types/tag';
import { BasicBodyType, basicSchema } from '@/schema-validations/tag.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { tagRequest } from '@/request';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';

interface EditFormProps {
  tag?: ITag;
}

const EditForm: FC<EditFormProps> = ({ tag }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: tag?.name || '',
      isPremium: tag?.isPremium || false,
    },
  });
  const handleUpdateTag = async (values: BasicBodyType) => {
    setLoading(true);
    try {
      const res = await tagRequest.updateTag(tag?.id || '', values);
      if (res.data) {
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateTag)}>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thẻ</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <Button type="submit" loading={loading}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditForm;
