type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  [key: string]: string | number;
};
export default User;

interface InfluencerInfoProps {
  influencer: {
    id?: string;
    imagesGallery?: ImageProps[];
    avatar?: ImageProps;
    fullName: string;
    jobTitle?: string;
    description?: string;
    address?: string;
    socialAccounts?: SocialAccProps[];
    portfolioVideos?: string[];
  };
}

interface SocialAccProps {
  platformName?: string;
  followers?: number;
}

interface ImageProps {
  url?: string;
}

export type { InfluencerInfoProps };
