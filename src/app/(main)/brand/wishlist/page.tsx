import List from './list';

const Page = () => {
  return (
    <div className="container mt-8 mb-16">
      <div className="space-y-7">
        <h1 className="text-2xl font-semibold">Danh sách yêu thích</h1>
        <List />
      </div>
    </div>
  );
};
export default Page;
