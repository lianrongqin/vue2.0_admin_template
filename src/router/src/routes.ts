import path from './routesPath';

// 路由404
// const routeNotFound: any = { path: path.PATH_NOTFOUND, component: () => import('@/pages/errorPage/notFound.vue') };
// 路由不匹配
// const routeRest: any = { path: '*', component: () => import('@/pages/errorPage/notFound.vue') };

const publicRoutes: any = [

  {
    name: 'user', path: '/user', component: () => import('@/globalLayout/UserLayout.vue'), meta: { menu: true }, children: [
      { path: path.PATH_LOGIN, component: () => import('@/pages/login/index.vue') }
    ]
  },
  {
    name: 'root', path: '/', component: () => import('@/globalLayout/BaseLayout.vue'), redirect: '/index', meta: { menu: true }, children: [
      { path: path.PATH_ROOT, component: () => import('@/pages/index.vue') }
    ]
  },
];

const routes: any = [...publicRoutes];


export default routes;
