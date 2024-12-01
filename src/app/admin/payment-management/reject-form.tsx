'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { paymentRequest } from '@/request';
import { IPaymentManagement } from '@/types/payment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const rejectSchema = z.object({
  adminMessage: z.string().min(1, 'Vui lòng nhập lý do'),
});

const RejectForm = ({ payment, onSuccess }: { payment: IPaymentManagement; onSuccess: () => void }) => {
  const form = useForm({
    resolver: zodResolver(rejectSchema),
    defaultValues: {
      adminMessage: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof rejectSchema>) => {
    toast.promise(paymentRequest.withdrawResponse(payment.id, false, values.adminMessage), {
      loading: 'Đang tải',
      success: () => {
        onSuccess();
        return 'Từ chối thanh toán thành công';
      },
      error: (err) => err?.message,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="adminMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Lý do</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="gradient" type="submit" fullWidth>
          Gửi
        </Button>
      </form>
    </Form>
  );
};

export default RejectForm;
