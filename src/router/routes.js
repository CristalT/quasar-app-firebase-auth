const routes = [
  {
    path: '/login',
    component: () => import('pages/login')
  },
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [{ path: '/home', component: () => import('pages/index') }]
  },

  {
    // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
export default routes
