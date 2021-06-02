<template>
  <div>
    <v-row justify="space-between" align-content="center">
      <v-row align-self="center" style="flex-grow: 0; margin: 0 10px">
        <v-col justify="center" align-content="center" style="margin: 5px 0">
          <AvatarLink
            v-if="receivedUser.avatar"
            name_path="profil"
            :user_name="receivedUser.userName"
            :size="50"
            :avatar_uri="receivedUser.avatar.substring(62)"
          ></AvatarLink>
        </v-col>
        <v-col justify="center" align-content="center">
          <h4>{{ receivedUser.userName }}</h4>
        </v-col>
      </v-row>
      <v-col
        v-show="account.user && receivedUser && receivedUser._id !== account.user._id"
        align-self="center"
        style="flex-grow: 0; margin: 0 10px"
      >
        <FollowButton
          :isfollowed="isFollowed"
          :userid="receivedUser._id"
          @follow="FollowUser($event)"
          @unfollow="UnFollowUser($event)"
        ></FollowButton>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AvatarLink from '@/components/Bases/AvatarLink';
import FollowButton from '@/components/Bases/FollowButton';
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
  components: { AvatarLink, FollowButton },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
    }),
  },
  methods: {
    FollowUser(even) {
      this.isFollowed = even;
    },
    UnFollowUser(even) {
      this.isFollowed = even;
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