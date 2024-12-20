const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  account: '/account',
  influencer: {
    base: '/influencer',
    landing: '/landing/influencer',
    create: (step: number) => `/influencer/create?step=${step}`,
    jobs: '/influencer/jobs',
  },
  influencers: {
    list: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
    editProfile: '/influencers/edit-profile',
  },
  brand: {
    base: '/brand',
    landing: '/landing/brand',
    create: (step: number) => `/brand/create?step=${step}`,
    campaigns: {
      base: '/brand/campaigns',
      edit: (id: string, step: number) => `/brand/campaigns/${id}?step=${step}`,
      tracking: (id: string) => `/brand/campaigns/${id}/tracking`,
    },
    wishlist: '/brand/wishlist',
    pricing: '/brand/pricing',
  },
  brands: {
    base: '/brands',
    details: (slug: string) => `/brands/${slug}`,
    editProfile: '/brands/edit-profile',
  },
  campaigns: {
    base: '/campaigns',
    details: (id: string) => `/campaigns/${id}`,
  },
  register: {
    brand: '/auth/register/brand',
    influencer: '/auth/register/influencer',
    emailVerification: '/auth/register/email-verification',
  },
  admin: {
    base: '/admin',
    action: '/admin/action-management',
    user: '/admin/user-management',
    statistic: '/admin/statistic',
    tag: '/admin/tag-management',
    report: '/admin/report-management',
    payment: '/admin/payment-management',
    setting: '/admin/setting-management',
  },
  chats: {
    base: '/chats/person',
    details: (isCampaign: boolean, id: string) => `/chats/${isCampaign ? 'group' : 'person'}?c=${id}`,
  },
};

export default routes;
