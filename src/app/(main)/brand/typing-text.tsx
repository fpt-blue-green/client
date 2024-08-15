'use client';
import { TypeAnimation } from 'react-type-animation';

const TypingText = () => {
  return (
    <span className="relative text-gradient after:absolute after:top-1 after:bottom-1 after:right-2 after:w-0.5 after:bg-foreground">
      <TypeAnimation
        className="text"
        sequence={[
          'hình ảnh sản phẩm',
          1000,
          'bài viết được tài trợ',
          1000,
          'lời chứng thực',
          1000,
          'video quảng cáo',
          1000,
        ]}
        repeat={Infinity}
      />
    </span>
  );
};

export default TypingText;
