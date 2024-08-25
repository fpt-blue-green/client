'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { verifyInfluencerEmailSchema, VerifyInfluencerEmailType } from '@/schema-validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const EmailVerificationForm = () => {
  const form = useForm<VerifyInfluencerEmailType>({
    resolver: zodResolver(verifyInfluencerEmailSchema),
    defaultValues: {
      code: undefined,
    },
  });

  const onSubmit = (values: VerifyInfluencerEmailType) => {
    console.log(values);
    alert('You clicked verify!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Input className="w-full font-light text-muted-foreground" placeholder="Nhập mã 6 chữ số" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="h-12" type="submit" variant="gradient" fullWidth>
          Tiếp Tục
        </Button>
      </form>
    </Form>
  );
};

export default EmailVerificationForm;
