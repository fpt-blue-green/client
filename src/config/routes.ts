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
};

export default routes;
