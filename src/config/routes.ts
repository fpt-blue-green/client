const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  account: '/account',
  influencer: {
    base: '/influencer',
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
    editProfile: (slug: string) => `influencers/${slug}/edit`,
  },
  brand: {
    base: '/brand',
  },
  register: {
    base: '/auth/register/',
    emailVerification: '/auth/register/email-verification',
  },
};

export default routes;
