<template>
  <div>
    <slot name="alert"></slot>
    <v-container v-if="!users.allUsers">
      <img src="https://s.svgbox.net/loaders.svg?ic=bars&fill=000" width="32" height="32"
    /></v-container>
    <v-container fluid style="width: 90%">
      <v-row v-for="user in users.allUsers" :key="user._id" justify="start" align="center" class="pb-5">
        <TailorsList :user="user"></TailorsList>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TailorsList from '../../components/TailorsList';
export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
    };
  },
  components: { TailorsList },
  computed: {
    ...mapState({
      posts: (state) => state.posts,
      account: (state) => state.account,
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapActions(['users/getAllUser', 'users/followUser', 'users/unfollowUser']),

    FollowUser(userID) {
      this['users/followUser'](userID);
    },
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
    },
  },
  created() {
    this['users/getAllUser']();
  },
};
</script>
