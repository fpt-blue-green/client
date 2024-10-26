'use client';

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
        <span className="font-medium ml-1 hover:underline cursor-pointer" onClick={toggleReadMore}>
          {isReadMore ? 'Xem thêm' : 'Ẩn bớt'}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
