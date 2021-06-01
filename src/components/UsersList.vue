<template>
  <div v-if="receivedUser._id !== account.user._id" class="User_PostCard_List py-10">
    <div class="User mr-5">
      <AvatarLink
        class="mb-5"
        v-if="receivedUser.avatar"
        name_path="profil"
        :user_name="receivedUser.userName"
        :size="60"
        :avatar_uri="receivedUser.avatar.slice(receivedUser.avatar.lastIndexOf('avatars') + 8)"
      ></AvatarLink>
      <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
      <h4 class="mb-4">{{ receivedUser.userName | capitalize }}</h4>
      <FollowButton
        class=""
        :isfollowed="isFollowed"
        :userid="receivedUser._id"
        @follow="FollowUser($event)"
        @unfollow="UnFollowUser($event)"
      ></FollowButton>
    </div>

    <div class="PostCard ml-5" depressed>
      <UsersPostCard
        :user-name="receivedUser.userName"
        @follow="Followed($event)"
        @unfollow="Unfollowed($event)"
      ></UsersPostCard>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import AvatarLink from '@/components/Bases/AvatarLink';
import FollowButton from '@/components/Bases/FollowButton';
import UserPostCardLoading from '@/components/Loaders/UserPostCardLoading';
import ErrorFetch from '@/components/Loaders/ErrorFetch';

const UsersPostCard = () => ({
  component: import(/* webpackChunckName: "UsersPostCard"*/ '@/components/UsersPostCard'),
  loading: UserPostCardLoading,
  error: ErrorFetch,
  timeout: 5000,
});
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
  components: { UsersPostCard, AvatarLink, FollowButton },
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

<style lang="scss" scoped>
.User_PostCard_List {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .User {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 300px;
  }
  .PostCard {
    max-width: 900px;
  }
}
</style>
