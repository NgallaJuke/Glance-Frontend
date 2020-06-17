import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './account.module';
import { users } from './users.module';
import { posts } from './posts.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { account, users, posts },
});
