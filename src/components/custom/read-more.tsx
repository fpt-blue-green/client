'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

interface ReadMoreProps {
  children: Readonly<string>;
  className?: string;
  length?: number;
}

const ReadMore: FC<ReadMoreProps> = ({ children, className, length = 255 }) => {
  const text = children;
  const initReadMore = text.length > length;
  const [isReadMore, setIsReadMore] = useState(initReadMore);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className={className}>
      {isReadMore ? text.slice(0, length) + '...' : text}
      {initReadMore && (
        <Link href="#" className="font-medium ml-1 hover:underline" onClick={toggleReadMore}>
          {isReadMore ? 'Xem thêm' : 'Ẩn bớt'}
        </Link>
      )}
    </p>
  );
};

export default ReadMore;
