<template>
  <div>
    <v-col cols="12" xs="12" sm="4" md="4" lg="3" outlined>
      <v-row no-gutters justify="center">
        <v-col xs="5" sm="5" md="5" lg="5" align="center">
          <router-link :to="{ name: 'profil', params: { userName: receivedUser.userName } }">
            <v-btn icon>
              <v-avatar size="70" v-if="receivedUser.avatar">
                <img :src="`${url}avatars/${receivedUser.avatar.substring(62)}`" alt="avatar" />
              </v-avatar>
              <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
            </v-btn>
          </router-link>
        </v-col>
        <v-col v-show="account.user && receivedUser" xs="7" sm="7" md="7" lg="7" align="center">
          <v-row
            ><h3>{{ receivedUser.userName }}</h3></v-row
          >
          <v-row v-if="!receivedUser.follower.includes(account.user._id)">
            <v-btn small color="primary" outlined @click="FollowUser(receivedUser._id)">Follow</v-btn>
          </v-row>
          <v-row v-else>
            <v-btn small color="red" outlined @click="UnFollowUser(receivedUser._id)">UnFollow</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col depressed cols="12" xs="12" sm="12" md="12" lg="12" outlined>
      <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-3" height="370" width="325" @click="toggle">
        <v-row class="fill-height" align="center" justify="center">
          <v-scale-transition>
            <v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
          </v-scale-transition>
        </v-row>
      </v-card> </v-col
    ><v-divider></v-divider>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    user: { type: Object, required: true },
  },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    receivedUser: { type: Object },
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
