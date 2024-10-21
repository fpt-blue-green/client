import { FC, ReactNode } from 'react';
import { formats } from '@/lib/utils';
import { FluctuationType } from '@/types/enum';

interface CardProps {
  details: {
    quantity?: number;
    fluctuationValue?: number;
    fluctuationType?: FluctuationType;
  };
  title: string;
  icon: ReactNode;
}

const Card: FC<CardProps> = (props) => {
  const { quantity = 0, fluctuationValue = 0, fluctuationType } = props.details;
  return (
    <div className="w-full border rounded-md shadow-md">
      <div className="p-6 pb-2 flex items-center justify-between">
        <p className="text-sm font-medium">{props.title}</p>
        {props.icon && props.icon}
      </div>
      <div className="p-6 pt-0">
        <h5 className="text-2xl font-semibold">+{formats.bigNum(quantity)}</h5>
        <p className="text-xs text-muted-foreground">
          {fluctuationType === FluctuationType.ASC ? '+' : '-'}
          {`${fluctuationValue}% so với tháng trước`}
        </p>
      </div>
    </div>
  );
};

export default Card;
