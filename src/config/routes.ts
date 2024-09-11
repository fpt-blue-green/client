const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  account: '/account',
  influencer: {
    base: '/influencer',
    create: '/influencer/create',
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
    editProfile: '/influencers/edit-profile',
  },
  brand: {
    base: '/brand',
  },
  register: {
    brand: '/auth/register/brand',
    influencer: '/auth/register/influencer',
    emailVerification: '/auth/register/email-verification',
  },
};

export default routes;
