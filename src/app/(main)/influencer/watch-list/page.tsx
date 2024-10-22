import List from './list';

const Page = () => {
  return (
    <div className="container my-16">
      <div className="space-y-4 mb-7">
        <h1 className="text-2xl font-semibold">Lời đề nghị</h1>
        <p className="text-sm">
          Bạn có thể theo dõi những chiến dịch bạn đã đăng ký hoặc những lời đề nghị tham gia từ những chiến dịch.
        </p>
      </div>
      <List />
    </div>
  );
};

export default Page;
