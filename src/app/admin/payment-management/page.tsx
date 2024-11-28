import PaymentTable from './table';

const Page = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản lý giao dịch</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là danh sách giao dịch từ người dùng!</p>
      <div className="mt-4">
        <PaymentTable />
      </div>
    </div>
  );
};

export default Page;
