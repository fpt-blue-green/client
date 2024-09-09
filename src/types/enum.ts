import { IconType } from 'react-icons/lib';
import { RiInstagramFill, RiTiktokFill, RiYoutubeFill } from 'react-icons/ri';

export enum EPlatform {
  TitTok = 1,
  Instagram,
  YouTube,
}

export enum ETikTokContent {
  Post = 1,
  Story,
  Live,
}

export enum EInstagramContent {
  FeedPost = 1,
  Reel,
  Story,
  Live,
}

export enum EYouTubeContent {
  Video = 1,
  Short,
  Live,
}

interface IPlatformDetail {
  name: string;
  Icon: IconType;
  url: string;
  contentTypes: Record<number, string>;
}

type IPlatformData = Record<EPlatform, IPlatformDetail>;

export const PlatformData: IPlatformData = {
  [EPlatform.TitTok]: {
    name: 'TikTok',
    Icon: RiTiktokFill,
    url: 'https://www.tiktok.com/@',
    contentTypes: {
      [ETikTokContent.Post]: 'bài đăng TikTok',
      [ETikTokContent.Story]: 'tin TikTok',
      [ETikTokContent.Live]: 'livestream TikTok',
    },
  },
  [EPlatform.Instagram]: {
    name: 'Instagram',
    Icon: RiInstagramFill,
    url: 'https://www.instagram.com/',
    contentTypes: {
      [EInstagramContent.FeedPost]: 'bài đăng ảnh Instagram',
      [EInstagramContent.Reel]: 'thước phim Instagram',
      [EInstagramContent.Story]: 'tin Instagram',
      [EInstagramContent.Live]: 'livestream Instagram',
    },
  },
  [EPlatform.YouTube]: {
    name: 'YouTube',
    Icon: RiYoutubeFill,
    url: 'https://www.youtube.com/',
    contentTypes: {
      [EYouTubeContent.Video]: 'video YouTube',
      [EYouTubeContent.Short]: 'video short YouTube',
      [EYouTubeContent.Live]: 'livestream YouTube',
    },
  },
};

export enum ERole {
  Admin = 1,
  Influencer,
  Brand,
}

export enum EGender {
  Male = 1,
  Female,
  Others,
}

export enum EVerifyAction {
  Register = 1,
  ChangePass,
  ForgotPassword,
}
