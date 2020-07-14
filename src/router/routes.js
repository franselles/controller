export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('@/views/Select.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/citybeaches',
    name: 'citybeaches',
    component: () => import('@/views/Citybeaches.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/sector',
    name: 'sector',
    component: () => import('@/views/Sector.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/available',
    name: 'available',
    component: () => import('@/views/Available.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cartsuser',
    name: 'cartsuser',
    component: () => import('@/views/Cartsuser.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkticket',
    name: 'checkticket',
    component: () => import('@/views/Checkticket.vue'),
    meta: { requiresAuth: true },
  },
];
