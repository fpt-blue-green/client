const routes = {
  home: '/',
  login: '/login',
  influencers: {
    base: '/influencers',
  },
  influencer: {
    base: '/influencer',
  },
  influencers: {
    base: '/influencers',
    details: (slug: string) => `/influencers/${slug}`,
  },
  brand: {
    base: '/brand',
  },
};

export default routes;
