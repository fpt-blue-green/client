import { FC, ReactNode } from 'react';
import { formats } from '@/lib/utils';
import { FluctuationType, NumberType } from '@/types/enum';
import Paper from '@/components/custom/paper';

interface CardProps {
  details: {
    quantity?: number;
    fluctuationValue?: number;
    fluctuationType?: FluctuationType;
  };
  title: string;
  cardType: number;
  icon: ReactNode;
}

const Card: FC<CardProps> = (props) => {
  const { quantity = 0, fluctuationValue = 0, fluctuationType } = props.details;
  return (
    <Paper>
      <div className="flex flex-col gap-2">
        <div className="pb-2 flex items-center justify-between">
          <p className="text-sm font-medium">{props.title}</p>
          {props.icon && props.icon}
        </div>
        <div className="pt-0">
          <h5 className="text-2xl font-semibold">
            +{props.cardType === NumberType.Quantity ? formats.bigNum(quantity) : formats.price(quantity)}
          </h5>
          <p className="text-xs text-muted-foreground">
            {fluctuationType === FluctuationType.ASC ? '+' : '-'}
            {`${fluctuationValue}% so với tháng trước`}
          </p>
        </div>
      </div>
    </Paper>
  );
};

export default Card;
