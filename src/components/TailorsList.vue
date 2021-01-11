<template>
  <div style="width: 90%">
    <v-row>
      <v-col>
        <v-row justify="center">
          <v-col>
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
      <v-col depressed>
        <v-sheet depressed class="mx-auto grey lighten-3" max-width="1200">
          <v-slide-group depressed center-active show-arrows>
            <v-slide-item depressed v-for="n in 10" :key="n" v-slot:default="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : 'grey lighten-1'"
                class="ma-3"
                height="220"
                width="200"
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
        </v-sheet>
      </v-col>
    </v-row>
    <!--  -->
    <!--    <v-col cols="12" xs="12" sm="4" md="4" lg="3" outlined>
          <v-row no-gutters justify="center">
            <v-col xs="5" sm="5" md="5" lg="5" align="center">
              <router-link :to="{ name: 'profil', params: { userName: user.userName } }">
                <v-btn icon>
                  <v-avatar size="70" v-if="user.avatar">
                    <img :src="`${url}avatars/${user.avatar.substring(62)}`" alt="avatar" />
                  </v-avatar>
                  <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
                </v-btn>
              </router-link>
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
                    user.follower.splice(user.follower.indexOf(account.user._id), 1);
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
        ><v-divider></v-divider> -->
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
