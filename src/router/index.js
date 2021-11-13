import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunckName: "register"*/ '@/views/Auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunckName: "register"*/ '@/views/Auth/Register.vue'),
  },
  {
    path: '/register-success',
    name: 'register-success',
    component: () => import(/* webpackChunckName: "register-success"*/ '@/views/Auth/SuccessRegister.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunckName: "profil"*/ '@/views/Home/Home.vue'),
    children: [
      {
        path: '/posts/following/:post',
        name: 'following-posts',
        component: () => import(/* webpackChunckName: "profil"*/ '@/views/Home/FollowingPost.vue'),
      },
    ],
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import(/* webpackChunckName: "register-success"*/ '@/views/Discover/Discover.vue'),
    children: [
      {
        path: '/posts/popular/:post',
        name: 'popular-posts',
        component: () => import(/* webpackChunckName: "profil"*/ '@/views//Discover/PopularPost.vue'),
      },
    ],
  },
  {
    path: '/profil/:userName',
    name: 'profil',
    component: () => import(/* webpackChunckName: "profil"*/ '@/views/Account/Profil.vue'),
  },

  {
    path: '/creators',
    name: 'creators',
    component: () => import(/* webpackChunckName: "Users"*/ '@/views/Creator/Creators.vue'),
  },
  {
    path: '/account',
    name: 'setting',
    redirect: '/account/profile',
    component: () => import(/* webpackChunckName: "setting"*/ '@/views/Account/Setting.vue'),
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunckName: "Profile"*/ '@/components/TheSettingEditProfile.vue'),
      },

      {
        path: 'general',
        name: 'General',
        component: () => import(/* webpackChunckName: "General"*/ '@/components/TheSettingAccount.vue'),
      },
      {
        path: 'password',
        name: 'Password',
        component: () => import(/* webpackChunckName: "Password"*/ '@/components/TheSettingPassword.vue'),
      },
      {
        path: 'social_profile',
        name: 'Social Profile',
        component: () => import(/* webpackChunckName: "Social Profile"*/ '@/components/TheSettingSocialProfile.vue'),
      },
      {
        path: 'notification',
        name: 'Notification',
        component: () => import(/* webpackChunckName: "Notification"*/ '@/components/TheSettingNotification.vue'),
      },
      {
        path: '',
        redirect: 'profile', // default child path
      },
    ],
  },
  // {
  //   path: '/hire',
  //   name: 'hire',
  //   component: () => import(/* webpackChunckName: "Users"*/ '@/views/Account/Hire.vue'),
  // },

  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// redirect to login page if not logged in or trying to access a restricted page
router.beforeEach((to, from, next) => {
  if (from.name === null && to.params.post && to.name === 'following-posts') return next('/');
  if (from.name === null && to.params.post && to.name === 'popular-posts') return next('/discover');

  const publicPagesRoute = ['/login', '/register', '/register-success'];
  const authIsRequired = !publicPagesRoute.includes(to.path);
  //if it's a new user that just confirm his registration then accept to token end let him in

  // if (to.path === '/' && to.query.token !== undefined) {
  //   localStorage.setItem('user_token', to.query.token);
  //   return next('/');
  // }
  const loggedIn = localStorage.getItem('user_token');
  if (!authIsRequired && loggedIn) return next('/');
  if (authIsRequired && !loggedIn) return next('/login');
  next();
});

export default router;
