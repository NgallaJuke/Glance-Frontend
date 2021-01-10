import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Auth/Login.vue';
import Profil from '../views/Account/Profil.vue';
import Tailors from '../views/Account/Tailors.vue';
import Register from '../views/Auth/Register.vue';
import SuccessRegister from '../views/Auth/SuccessRegister.vue';
import Home from '../views/Home/Home.vue';

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
  {
    path: '/register-success',
    name: 'register-success',
    component: SuccessRegister,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/profil/:userName',
    name: 'profil',
    component: Profil,
  },
  {
    path: '/tailors',
    name: 'tailors',
    component: Tailors,
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
