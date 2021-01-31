<template>
  <div>
    <v-row justify="space-between" align-content="center">
      <v-row align-self="center" style="flex-grow: 0; margin: 0 10px">
        <v-col justify="center" align-content="center" style="margin: 5px 0">
          <router-link :to="{ name: 'profil', params: { userName: receivedUser.userName } }">
            <v-btn icon>
              <v-avatar size="70" v-if="receivedUser.avatar">
                <img :src="`${url}avatars/${receivedUser.avatar.substring(62)}`" alt="avatar" />
              </v-avatar>
              <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
            </v-btn>
          </router-link>
        </v-col>
        <v-col justify="center" align-content="center">
          <h3>{{ receivedUser.userName }}</h3>
        </v-col>
      </v-row>
      <v-col
        v-show="account.user && receivedUser && receivedUser._id !== account.user._id"
        align-self="center"
        style="flex-grow: 0; margin: 0 10px"
      >
        <v-row v-if="!isFollowed" justify="center" align-content="center" style="margin: 5px 0">
          <v-btn small color="primary" outlined @click="FollowUser(receivedUser._id)">Follow</v-btn>
        </v-row>
        <v-row v-else justify="center" align-content="center" style="margin: 5px 0">
          <v-btn small color="red" outlined @click="UnFollowUser(receivedUser._id)">UnFollow</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    isFollowed: Boolean,
  }),
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapActions(['users/followUser', 'users/unfollowUser']),
    FollowUser(userID) {
      this['users/followUser'](userID);
      this.isFollowed = true;
    },
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
      this.isFollowed = false;
    },
  },

  created() {
    this.receivedUser = JSON.parse(JSON.stringify(this.user));
  },
  mounted() {
    this.isFollowed = this.receivedUser.follower.includes(this.account.user._id) ? true : false;
  },
};
</script>

<style>
</style>