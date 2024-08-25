import { Metadata } from 'next';
import List from './list';

export const metadata: Metadata = {
  title: 'Tìm kiếm những người ảnh hưởng trên Instagram, TikTok và YouTube',
  description: 'Tìm kiếm những người ảnh hưởng trên Instagram, TikTok và YouTube',
};

const Explore = () => {
  return (
    <div className="container my-16">
      <List />
    </div>
  );
};

export default Explore;
