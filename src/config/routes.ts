const routes = {
  home: '/',
  explore: '/explore',
  login: '/login',
  register: '/register',
  influencer: {
    base: '/influencer',
    details: (slug: string) => `/influencer/${slug}`,
  },
  brand: {
    base: '/brand',
  },
};

export default routes;
