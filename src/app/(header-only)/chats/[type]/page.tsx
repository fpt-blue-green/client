import Chats from './chats';

const Page = () => {
  return (
    <div className="fixed top-20 inset-x-0 bottom-0">
      <Chats />
    </div>
  );
};

export function generateStaticParams() {
  return [{ type: 'group' }, { type: 'person' }];
}

export default Page;
