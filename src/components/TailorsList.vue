<template>
  <div style="margin: 25px">
    <v-row style="width: 100%">
      <v-col align-self="center" style="width: 10%">
        <v-row justify="center" align-content="center">
          <v-col align-self="center" style="flex-grow: 0; margin: 0 10px">
            <router-link :to="{ name: 'profil', params: { userName: receivedUser.userName } }">
              <v-btn icon>
                <!-- <v-avatar size="70" >
                  <img :src="`${url}avatars/${receivedUser.avatar.substring(62)}`" alt="avatar" />
                </v-avatar> -->
                <AvatarLink
                  v-if="receivedUser.avatar"
                  name_path="profil"
                  :user_name="receivedUser.userName"
                  :size="70"
                  :avatar_uri="receivedUser.avatar.substring(62)"
                ></AvatarLink>
                <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
              </v-btn>
            </router-link>
          </v-col>
          <v-col v-show="account.user && receivedUser" align-self="center" style="flex-grow: 0; margin: 0 10px">
            <v-row justify="center" align-content="center" style="margin: 5px 0">
              <h3>{{ receivedUser.userName }}</h3>
            </v-row>
            <FollowButton
              :isfollowed="isFollowed"
              :userid="receivedUser._id"
              @follow="FollowUser($event)"
              @unfollow="UnFollowUser($event)"
            ></FollowButton>
          </v-col>
        </v-row>
      </v-col>
      <v-col depressed style="width: 90%; margin-top: 50px">
        <TailorsPostCard
          :user-name="receivedUser.userName"
          @follow="Followed($event)"
          @unfollow="Unfollowed($event)"
        ></TailorsPostCard>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import TailorsPostCard from './TailorsPostCard';
import AvatarLink from '@/components/Bases/AvatarLink';
import FollowButton from '@/components/Bases/FollowButton';
export default {
  props: {
    user: { type: Object, required: true },
  },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    receivedUser: { type: Object },
    userOwnPost: Array,
    isFollowed: Boolean,
  }),
  components: { TailorsPostCard, AvatarLink, FollowButton },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapActions(['users/followUser', 'users/unfollowUser']),
    FollowUser(even) {
      this.isFollowed = even;
    },
    UnFollowUser(even) {
      this.isFollowed = even;
    },
  },
  created() {
    this.receivedUser = JSON.parse(JSON.stringify(this.user));
    this.isFollowed = this.receivedUser.follower.includes(this.account.user._id) ? true : false;
  },
};
</script>
