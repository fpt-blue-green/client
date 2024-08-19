const routes = {
  home: '/',
  login: '/login',
  forgot: '/forgot-password',
  influencer: {
    base: '/influencer',
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
  },
  brand: {
    base: '/brand',
    register: '/brand/register',
  },
};

export default routes;
