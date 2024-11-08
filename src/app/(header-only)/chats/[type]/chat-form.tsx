'use client';

import Tooltip from '@/components/custom/tooltip';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { LuImagePlus, LuPlus, LuSendHorizonal, LuSmilePlus } from 'react-icons/lu';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useTheme } from 'next-themes';

interface ChatFormProps {
  onSend: (content: string) => Promise<void>;
}

const ChatForm: FC<ChatFormProps> = ({ onSend }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const handlePickEmoji = (emoji: any) => {
    setContent(content + emoji.native);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loading && content.trim().length > 0) {
      setLoading(true);
      await onSend(content.trim()).then(() => {
        setContent('');
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DropdownMenu>
        <Input
          className="h-12 text-base"
          startAdornment={
            <div className="flex items-center gap-1">
              <Tooltip label="Mở hành động khác">
                <Button variant="ghost" size="icon">
                  <LuPlus className="text-xl" />
                </Button>
              </Tooltip>
              <Tooltip label="Thêm ảnh">
                <Button variant="ghost" size="icon">
                  <LuImagePlus className="text-xl" />
                </Button>
              </Tooltip>
              <Tooltip label="Chọn biểu tượng cảm xúc">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <LuSmilePlus className="text-xl" />
                  </Button>
                </DropdownMenuTrigger>
              </Tooltip>
            </div>
          }
          placeholder="Aa"
          fullWidth
          endAdornment={
            <Tooltip label="Nhấn Enter để gửi">
              <Button type="submit" variant="ghost" size="icon" className="shrink-0" loading={loading}>
                <LuSendHorizonal className="text-xl" />
              </Button>
            </Tooltip>
          }
          value={content}
          onChange={handleChange}
        />
        <DropdownMenuContent className="p-0">
          <Picker
            data={data}
            onEmojiSelect={handlePickEmoji}
            previewPosition="none"
            theme={theme}
            locale="vi"
            navPosition="bottom"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
};
export default ChatForm;
