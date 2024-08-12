import Image from 'next/image';
import React from 'react';
import { LuGalleryHorizontalEnd, LuHeart, LuShare } from 'react-icons/lu';

const InfluencerDetails: React.FC = () => {
  return (
    <div className="container w-full my-8 ">
      <div className="flex space-x-6 justify-end my-6">
        <div className="flex items-center space-x-2">
          <LuShare />
          <span>Chia sẽ</span>
        </div>
        <div className="flex items-center space-x-2">
          <LuHeart />
          <span>Yêu thích</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Image
            src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/454530341_523941173319997_4319077826762337608_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfWjALriNSn9uF5PbBuViLKxA69Vi6aM8rEDr1WLpoz0ymNF_anj5JLNl0fE-pJn6YUTUwSNDo61IOyl9S-6Sf&_nc_ohc=zqj-SlzFHcgQ7kNvgF2Blnc&_nc_ht=scontent.fhan5-2.fna&oh=00_AYCfBS7pXZTUYju-OjYFjO-NrNe3H0TULkwPu_G4d5gLIg&oe=66BA6169"
            alt={'Profile pictures'}
            width={380}
            height={380}
            className="rounded-s-lg w-full"
          />
        </div>
        <div>
          <Image
            src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/454530341_523941173319997_4319077826762337608_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfWjALriNSn9uF5PbBuViLKxA69Vi6aM8rEDr1WLpoz0ymNF_anj5JLNl0fE-pJn6YUTUwSNDo61IOyl9S-6Sf&_nc_ohc=zqj-SlzFHcgQ7kNvgF2Blnc&_nc_ht=scontent.fhan5-2.fna&oh=00_AYCfBS7pXZTUYju-OjYFjO-NrNe3H0TULkwPu_G4d5gLIg&oe=66BA6169"
            alt={'Profile pictures'}
            width={380}
            height={380}
            className="w-full"
          />
        </div>
        <div className="relative">
          <Image
            src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/454530341_523941173319997_4319077826762337608_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfWjALriNSn9uF5PbBuViLKxA69Vi6aM8rEDr1WLpoz0ymNF_anj5JLNl0fE-pJn6YUTUwSNDo61IOyl9S-6Sf&_nc_ohc=zqj-SlzFHcgQ7kNvgF2Blnc&_nc_ht=scontent.fhan5-2.fna&oh=00_AYCfBS7pXZTUYju-OjYFjO-NrNe3H0TULkwPu_G4d5gLIg&oe=66BA6169"
            alt={'Profile pictures'}
            width={380}
            height={380}
            className="rounded-e-lg w-full"
          />
          <div className="flex items-center space-x-2 absolute right-6 bottom-5 bg-background p-2 rounded-md cursor-pointer border-zinc-900">
            <LuGalleryHorizontalEnd />
            <p>Show All Photos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetails;
