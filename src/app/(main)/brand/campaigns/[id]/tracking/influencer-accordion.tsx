'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import IInfluencerJobs from '@/types/influencer-jobs';
import { FC } from 'react';

interface InfluencerAccordionProps {
  item?: IInfluencerJobs;
}

const InfluencerAccordion: FC<InfluencerAccordionProps> = ({}) => {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h6 className="text-lg font-semibold">Influencer Name</h6>
        </div>
      </AccordionTrigger>
      <AccordionContent>Jobs</AccordionContent>
    </AccordionItem>
  );
};

export default InfluencerAccordion;
