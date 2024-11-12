import { FC, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { Badge, BadgeProps } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ChipProps extends Omit<BadgeProps, 'children'> {
  label: string;
  icon?: ReactNode;
  onDelete?: MouseEventHandler;
}

const Chip: FC<ChipProps> = ({ label, icon, className, onDelete, ...props }) => {
  const btnVariants = {
    default: 'bg-primary-foreground text-primary rounded-full hover:opacity-80 transition',
    secondary: 'bg-secondary-foreground text-secondary rounded-full hover:opacity-80 transition',
    gradient: 'bg-primary-foreground text-primary rounded-full hover:opacity-80 transition',
    destructive: 'bg-destructive-foreground text-destructive rounded-full hover:opacity-80 transition',
    outline: 'bg-foreground text-background rounded-full hover:opacity-80 transition',
    success: 'bg-success text-success-foreground hover:opacity-80 transition',
    warning: 'bg-warning text-warning-foreground hover:opacity-80 transition',
    info: 'bg-info text-info-foreground hover:opacity-80 transition',
  };

  const handleDelete = () => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  return (
    <Badge {...props} className={cn('text-center', { 'cursor-pointer hover:opacity-80': props.onClick }, className)}>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="leading-[1]">{label}</span>
        {onDelete && (
          <button className={btnVariants[props.variant || 'default']} onClick={handleDelete()}>
            <Cross2Icon />
          </button>
        )}
      </div>
    </Badge>
  );
};

export default Chip;
