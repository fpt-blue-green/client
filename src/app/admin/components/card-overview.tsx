import { FC, ReactNode } from 'react';
import Paper from '@/components/custom/paper';
import { convertMetricTrendType } from '@/lib/constants';

interface CardProps {
  item: {
    type: string;
    data: string;
    comment: string;
  };
  icon: ReactNode;
}

const Card: FC<CardProps> = (props) => {
  const { type, data, comment } = props.item;
  return (
    <Paper>
      <div className="flex flex-col gap-2">
        <div className="pb-2 flex items-center justify-between">
          <p className="text-sm font-medium">{convertMetricTrendType(type)}</p>
          {props.icon && props.icon}
        </div>
        <div className="pt-0">
          <h5 className="text-2xl font-semibold">{data}</h5>
          <p className="text-xs text-muted-foreground">{comment}</p>
        </div>
      </div>
    </Paper>
  );
};

export default Card;
