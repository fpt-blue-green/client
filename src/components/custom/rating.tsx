'use client';

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

interface RatingsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: number;
  value?: number;
  total?: number;
  precision?: number;
  size?: number;
  fill?: boolean;
  icon?: React.ReactElement;
  emptyIcon?: React.ReactElement;
}

const Rating = React.forwardRef<HTMLInputElement, RatingsProps>(
  (
    {
      defaultValue = 0,
      value,
      total = 5,
      size = 24,
      precision = 1,
      icon = <FaStar className="fill-yellow-400" />,
      emptyIcon = <FaStar className="fill-muted-foreground" />,
      className,
      readOnly,
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => {
    if (precision > 1 || precision < 0) throw new Error('Precision must be greater than 0 and less than 1');
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [currentRating, setCurrentRating] = useState(defaultValue);

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      const starIndex = parseInt((event.currentTarget as HTMLDivElement).dataset.starIndex || '0');
      setHoverRating(starIndex);
    };

    const handleMouseLeave = () => {
      setHoverRating(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const starIndex = parseInt((event.currentTarget as HTMLDivElement).dataset.starIndex || '0');
      setCurrentRating(starIndex);
      setHoverRating(null);
      onChange?.(starIndex as any);
    };

    const displayRating = hoverRating ?? value ?? currentRating;
    const fullStars = Math.floor(displayRating);
    const partialStar =
      displayRating % 1 > 0 ? (
        <PartialStar
          fillPercentage={displayRating % 1}
          precision={precision}
          size={size}
          icon={icon}
          emptyIcon={emptyIcon}
        />
      ) : null;

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          'inline-block',
          { 'opacity-60': disabled, 'pointer-events-none': disabled || readOnly },
          className,
        )}
      >
        <div
          className="inline-flex items-center gap-px *:transition-transform cursor-pointer"
          onMouseLeave={handleMouseLeave}
        >
          {[...Array(fullStars)].map((_, i) =>
            React.cloneElement(icon, {
              key: i,
              size,
              className: cn(icon.props.className, 'hover:scale-110'),
              onClick: handleClick,
              onMouseEnter: handleMouseEnter,
              'data-star-index': i + 1,
            }),
          )}
          {partialStar}
          {[...Array(Math.max(0, total - fullStars - (partialStar ? 1 : 0)))].map((_, i) =>
            React.cloneElement(emptyIcon, {
              key: i + fullStars + 1,
              size,
              className: cn(emptyIcon.props.className),
              onClick: handleClick,
              onMouseEnter: handleMouseEnter,
              'data-star-index': i + fullStars + 1,
            }),
          )}
        </div>
      </div>
    );
  },
);

Rating.displayName = 'Rating';

interface PartialStarProps {
  fillPercentage: number;
  precision: number;
  size: number;
  icon: React.ReactElement;
  emptyIcon: React.ReactElement;
}

const PartialStar = ({ ...props }: PartialStarProps) => {
  const { fillPercentage, precision, size, icon, emptyIcon } = props;
  const data = Math.round(fillPercentage / precision);
  return (
    <div style={{ position: 'relative' }}>
      {React.cloneElement(emptyIcon, {
        size,
        className: cn(emptyIcon.props.className),
      })}
      <div
        style={{
          position: 'absolute',
          top: 0,
          overflow: 'hidden',
          width: `${data * precision * 100}%`,
        }}
      >
        {React.cloneElement(icon, {
          size,
          className: cn(icon.props.className, 'scale-105'),
        })}
      </div>
    </div>
  );
};

export default Rating;
