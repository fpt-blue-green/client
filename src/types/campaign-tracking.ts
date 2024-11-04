export interface ICampaignOverview {
  totalJob: number;
  targetReaction: number;
  totalView: number;
  totalLike: number;
  totalComment: number;
  totalReaction: number;
  totalFee: number;
}

export interface ICampaignMemberOverview extends ICampaignOverview {
  name: string;
  avatar: string;
}
