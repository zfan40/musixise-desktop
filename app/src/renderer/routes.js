export default [
  {
    path: '/',
    name: 'home-page',
    component: require('components/HomePageView'),
  },
  // {
  //   path: '/',
  //   name: 'landing-page',
  //   component: require('components/LandingPageView'),
  // },
  {
    path: '*',
    redirect: '/',
  },
];
