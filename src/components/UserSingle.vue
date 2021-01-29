<template>
  <div>
    <v-row justify="space-between" align-content="center">
      <v-row align-self="center" style="flex-grow: 0; margin: 0 10px">
        <v-col justify="center" align-content="center" style="margin: 5px 0">
          <router-link :to="{ name: 'profil', params: { userName: users.listUsers[$vnode.key].userName } }">
            <v-btn icon>
              <v-avatar size="70" v-if="users.listUsers[$vnode.key].avatar">
                <img :src="`${url}avatars/${users.listUsers[$vnode.key].avatar.substring(62)}`" alt="avatar" />
              </v-avatar>
              <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
            </v-btn>
          </router-link>
        </v-col>
        <v-col justify="center" align-content="center">
          <h3>{{ users.listUsers[$vnode.key].userName }}</h3>
        </v-col>
      </v-row>
      <v-col
        v-show="account.user && users.listUsers[$vnode.key]"
        align-self="center"
        style="flex-grow: 0; margin: 0 10px"
      >
        <v-row v-if="!isFollowed" justify="center" align-content="center" style="margin: 5px 0">
          <v-btn small color="primary" outlined @click="FollowUser(users.listUsers[$vnode.key]._id)">Follow</v-btn>
        </v-row>
        <v-row v-else justify="center" align-content="center" style="margin: 5px 0">
          <v-btn small color="red" outlined @click="UnFollowUser(users.listUsers[$vnode.key]._id)">UnFollow</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    userid: {
      type: String,
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
    ...mapActions(['users/getSingleUser']),
    FollowUser(userID) {
      this['users/followUser'](userID);
      this.isFollowed = true;
    },
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
      this.isFollowed = false;
    },
  },

  async created() {
    const payload = { userID: this.userid };
    await this['users/getSingleUser'](payload);
    this.isFollowed = this.users.listUsers[this.$vnode.key].follower.includes(this.account.user._id) ? true : false;
  },
};
</script>

<style>
</style>