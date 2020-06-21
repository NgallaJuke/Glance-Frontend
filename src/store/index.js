import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './account.module';
import { users } from './users.module';
import { posts } from './posts.module';
import { alert } from './alert.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { account, users, posts, alert },
  strict: process.env.NODE_ENV !== 'production',
});
