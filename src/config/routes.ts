const routes = {
  home: '/',
  login: '/login',
  influencers: {
    base: '/influencers',
  },
  influencer: {
    base: '/influencer',
    details: (slug: string) => `/influencer/${slug}`,
  },
  brand: {
    base: '/brand',
    register: '/brand/register',
  },
};

export default routes;
