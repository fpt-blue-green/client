const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  account: '/account',
  influencer: {
    base: '/landing/influencer',
    create: (step: number) => `/influencer/create?step=${step}`,
  },
  influencers: {
    landing: '/influencers',
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
    },
    wishlist: '/brand/wishlist',
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
  },
};

export default routes;
