<template>
  <div>
    <v-container v-if="!users.allUsers">
      <img src="https://s.svgbox.net/loaders.svg?ic=bars&fill=000" width="32" height="32"
    /></v-container>
    <v-container>
      <slot name="alert"></slot>

      <v-row v-for="user in users.allUsers" :key="user._id" no-gutters justify="center" align="center" class="pb-2">
        <v-col cols="12" xs="12" sm="4" md="4" lg="3" outlined>
          <v-row no-gutters justify="center">
            <v-col xs="5" sm="5" md="5" lg="5" align="center">
              <v-avatar size="70">
                <img :src="`${url}avatars/${user.avatar.substring(62)}`" alt="avatar" />
              </v-avatar>
            </v-col>
            <v-col v-show="account.user && user" xs="7" sm="7" md="7" lg="7" align="center">
              <v-row
                ><h3>{{ user.userName }}</h3></v-row
              >
              <v-row v-if="!user.follower.includes(account.user._id)">
                <v-btn
                  small
                  color="primary"
                  outlined
                  @click="
                    FollowUser(user._id);
                    user.follower.push(account.user._id);
                  "
                  >Follow</v-btn
                >
              </v-row>
              <v-row v-else>
                <v-btn
                  small
                  color="red"
                  outlined
                  @click="
                    UnFollowUser(user._id);
                    user.follower.pop(account.user._id);
                  "
                  >UnFollow</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col depressed cols="12" xs="12" sm="8" md="8" lg="9" outlined>
          <v-sheet depressed class="mx-auto grey lighten-3" elevation="8" max-width="800">
            <v-slide-group depressed center-active show-arrows>
              <v-slide-item depressed v-for="n in 5" :key="n" v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : 'grey lighten-1'"
                  class="ma-3"
                  height="180"
                  width="180"
                  @click="toggle"
                >
                  <v-row class="fill-height" align="center" justify="center">
                    <v-scale-transition>
                      <v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
                    </v-scale-transition>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet> </v-col
        ><v-divider></v-divider>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
      posts: (state) => state.posts,
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['users/getAllUser', 'users/followUser', 'users/unfollowUser']),
    // ShowDialog() {
    //   if (!this.avatarDialog) this.avatarDialog = true;
    // },
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
