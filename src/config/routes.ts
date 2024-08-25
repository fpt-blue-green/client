const routes = {
  home: '/',
  login: '/auth/login',
  forgot: '/auth/forgot-password',
  influencer: {
    base: '/influencer',
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
  },
  brand: {
    base: '/brand',
    register: '/auth/brand/register',
  },
  register: {
    base: '/register',
    influencer: '/register/influencer',
    influencerEmailVerification: '/register/influencer/email-verification',
    brand: '/register/brand',
  },
};

export default routes;
