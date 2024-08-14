const routes = {
  home: '/',
  explore: '/explore',
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
  },
};

export default routes;
