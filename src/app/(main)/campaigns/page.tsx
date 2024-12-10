import List from './list';
import Recommendation from './recommendation';

const Page = () => {
  return (
    <div className="container mt-8 mb-16">
      <div className="space-y-7">
        <h1 className="text-2xl font-semibold">Chiến dịch</h1>
        <List />
        <Recommendation title="Đề xuất cho bạn" />
      </div>
    </div>
  );
};

export default Page;
