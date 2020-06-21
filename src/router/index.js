import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPagesRoute = ['/login', '/register'];
  const authIsRequired = !publicPagesRoute.includes(to.path);
  const loggedIn = localStorage.getItem('user_token');
  if (authIsRequired && !loggedIn) return next('/login');
  next();
});
export default router;
