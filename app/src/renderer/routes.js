export default [
  {
    path: '/',
    name: 'root',
    component: require('components/RootView'),
    children:[
      // this is vue-router 'nested routes' (to deepen path layer)
      {
        // when self is match, i.e. /
        path : '',
        components:{
          //this is vue-router 'named views' (handy to just update certain sections)
          'sidebar-section':require('components/SideBarView/index'),
          'content-section':require('components/RecommendPageView')
        }
      },
      {
        // when /recommend is match
        path : 'recommend',
        components:{
          //this is vue-router 'named views' (handy to just update certain sections)
          'sidebar-section':require('components/SideBarView/index'),
          'content-section':require('components/RecommendPageView')
        }
      },
      {
        // when /live is match
        path : 'live',
        components:{
          'sidebar-section':require('components/SideBarView/index'),
          'content-section':require('components/LivePageView')
        }
      },
      {
        // when /live is match
        path : 'perform',
        components:{
          'sidebar-section':require('components/PerformSideBarView/index'),
          'content-section':require('components/PerformPageView')
        }
      },
      {
        // when /shop is match
        path : 'shop',
        components:{
          //this is named views
          'sidebar-section':require('components/SideBarView/index'),
          'content-section':require('components/ShopPageView')
        }
      },
      {
        // when /favorite-musixisers is match
        path : 'favorite-musixisers',
        components:{
          //this is named views
          'sidebar-section':require('components/SideBarView/index'),
          'content-section':require('components/FavoriteMusixisersPageView')
        }
      },
      {
        // when /favorite-works is match
        path : 'favorite-works',
        components:{
          //this is named views
          'sidebar-section':require('components/SideBarView/index'),
          'content-section':require('components/FavoriteWorksPageView')
        }
      },
    ]
  },
  // {
  //   path: '/',
  //   name: '',
  //   component: require('components/HomePageViewBackup'),
  // },
  {
    path: '*',
    redirect: '/',
  },
];
