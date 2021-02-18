import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User'),
    props: true,
  }
];

const router = new VueRouter({
  routes
});

export default router;
