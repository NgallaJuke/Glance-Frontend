import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './account.module';
import { users } from './users.module';
import { posts } from './posts.module';
import { comments } from './comments.module';
import { alert } from './alert.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { account, users, posts, comments, alert },
  strict: process.env.NODE_ENV !== 'production',
});

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./posts.module.js', './comments.module.js'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output

    const newPosts = require('./posts.module.js').default;
    const newComments = require('./posts.module.js').default;
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        posts: newPosts,
        comments: newComments,
      },
    });
  });
}
