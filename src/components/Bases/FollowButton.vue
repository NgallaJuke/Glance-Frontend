<template>
  <div>
    <v-btn v-if="isfollowed" @click="UnFollowUser(userid)" class="my-1 pa-2 mr-2" outlined color="primary"
      ><v-icon left small> mdi-check </v-icon>Following</v-btn
    ><v-btn v-else @click="FollowUser(userid)" class="my-1 pa-2 mr-2" depressed color="grey lighten-4"
      ><v-icon left>mdi-plus </v-icon>Follow</v-btn
    >
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: { isfollowed: { type: Boolean, required: true }, userid: { type: String, required: true } },
  data: () => {
    return { followed: Boolean };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapActions(['users/followUser', 'users/unfollowUser']),
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
      this.followed = false;
      this.$emit('unfollow', false);
    },
    FollowUser(userID) {
      this['users/followUser'](userID);
      this.followed = true;
      this.$emit('follow', true);
    },
  },
  mounted() {
    this.followed = this.isfollowed ? true : false;
  },
};
</script>
