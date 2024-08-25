const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  influencer: {
    base: '/influencer',
    register: '/auth/register/influencer',
    emailVerification: '/auth/register/influencer/email-verification',
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
  },
  brand: {
    base: '/brand',
    register: '/auth/register/brand',
  },
};

export default routes;
