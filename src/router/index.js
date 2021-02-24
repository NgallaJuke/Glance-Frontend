import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import Login from '../views/Auth/Login.vue';

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
    component: () => import(/* webpackChunckName: "register"*/ '../views/Auth/Register.vue'),
  },
  {
    path: '/register-success',
    name: 'register-success',
    component: () => import(/* webpackChunckName: "register-success"*/ '../views/Auth/SuccessRegister.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/profil/:userName',
    name: 'profil',
    component: () => import(/* webpackChunckName: "profil"*/ '../views/Account/Profil.vue'),
  },
  {
    path: '/account',
    name: 'setting',
    component: () => import(/* webpackChunckName: "setting"*/ '../views/Account/Setting.vue'),
  },
  {
    path: '/tailors',
    name: 'tailors',
    component: () => import(/* webpackChunckName: "Tailors"*/ '../views/Account/Tailors.vue'),
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// redirect to login page if not logged in or trying to access a restricted page
router.beforeEach((to, from, next) => {
  const publicPagesRoute = ['/login', '/register', '/register-success'];
  const authIsRequired = !publicPagesRoute.includes(to.path);
  const loggedIn = localStorage.getItem('user_token');
  if (authIsRequired && !loggedIn) return next('/login');
  next();
});

export default router;
