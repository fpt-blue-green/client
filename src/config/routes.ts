const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  account: '/account',
  influencer: {
    base: '/influencer',
    create: (step: number) => `/influencer/create?step=${step}`,
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
    editProfile: '/influencers/edit-profile',
  },
  brand: {
    base: '/brand',
    create: (step: number) => `/brand/create?step=${step}`,
  },
  brands: {
    base: '/brands',
    details: (slug: string) => `/brands/${slug}`,
    editProfile: '/brands/edit-profile',
  },
  register: {
    brand: '/auth/register/brand',
    influencer: '/auth/register/influencer',
    emailVerification: '/auth/register/email-verification',
  },
};

export default routes;
