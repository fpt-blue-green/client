import { Metadata } from 'next';
import List from './list';

export const metadata: Metadata = {
  title: 'Công việc của bạn',
  description:
    'Bạn có thể theo dõi những chiến dịch bạn đã đăng ký hoặc những lời đề nghị tham gia từ những chiến dịch.',
};

const Page = () => {
  return (
    <div className="container mt-8 mb-16">
      <div className="space-y-4 mb-7">
        <h1 className="text-2xl font-semibold">Công việc của bạn</h1>
        <p className="text-sm">
          Bạn có thể theo dõi những chiến dịch bạn đã đăng ký hoặc những lời đề nghị tham gia từ những chiến dịch.
        </p>
      </div>
      <List />
    </div>
  );
};

export default Page;
