<template>
  <div style="width: 90%; margin: 25px">
    <v-row style="width: 100%">
      <v-col align-self="center" style="width: 10%">
        <v-row justify="center" align-content="center">
          <v-col align-self="center" style="flex-grow: 0; margin: 0 10px">
            <router-link :to="{ name: 'profil', params: { userName: receivedUser.userName } }">
              <v-btn icon>
                <v-avatar size="70" v-if="receivedUser.avatar">
                  <img :src="`${url}avatars/${receivedUser.avatar.substring(62)}`" alt="avatar" />
                </v-avatar>
                <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
              </v-btn>
            </router-link>
          </v-col>
          <v-col v-show="account.user && receivedUser" align-self="center" style="flex-grow: 0; margin: 0 10px">
            <v-row justify="center" align-content="center" style="margin: 5px 0">
              <h3>{{ receivedUser.userName }}</h3>
            </v-row>
            <v-row
              v-if="!receivedUser.follower.includes(account.user._id)"
              justify="center"
              align-content="center"
              style="margin: 5px 0"
            >
              <v-btn small color="primary" outlined @click="FollowUser(receivedUser._id)">Follow</v-btn>
            </v-row>
            <v-row v-else justify="center" align-content="center" style="margin: 5px 0">
              <v-btn small color="red" outlined @click="UnFollowUser(receivedUser._id)">UnFollow</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col depressed style="width: 90%">
        <TailorsPostCard :user-name="receivedUser.userName"></TailorsPostCard>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import TailorsPostCard from './TailorsPostCard';
export default {
  props: {
    user: { type: Object, required: true },
  },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    receivedUser: { type: Object },
    userOwnPost: Array,
  }),
  components: { TailorsPostCard },
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
      this.receivedUser.follower.push(this.account.user._id);
    },
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
      this.receivedUser.follower.splice(this.receivedUser.follower.indexOf(this.account.user._id), 1);
    },
  },
  created() {
    this.receivedUser = JSON.parse(JSON.stringify(this.user));
  },
};
</script>
