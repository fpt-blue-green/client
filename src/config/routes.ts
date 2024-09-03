const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  account: '/account',
  influencer: {
    base: '/influencer',
    register: '/auth/register/influencer',
    emailVerification: '/auth/register/influencer/email-verification',
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
    editProfile: (slug: string) => `influencers/${slug}/edit`,
  },
  brand: {
    base: '/brand',
    register: '/auth/register/brand',
    emailVerification: '/auth/register/brand/email-verification',
  },
};

export default routes;
