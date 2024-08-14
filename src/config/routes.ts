const routes = {
  home: '/',
  login: '/login',
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
