<template>
  <div>
    <slot name="alert"></slot>
    <div v-if="users.user" class="container" align="center">
      <v-row justify="center">
        <v-col cols="3" sm="6" md="4">
          <v-avatar class="my-2" size="150" v-if="!users.status.loggingOut && avatar !== ''">
            <img :src="`${url}avatars/${avatar}`" />
          </v-avatar>
          <div>
            <h2 class="my-1">{{ users.user.userName }}</h2>
            <v-btn
              v-if="account.user._id === users.user._id"
              class="my-1"
              outlined
              color="primary"
              dark
              @click="ShowDialogUpdateAvatar()"
              >Edit Profil</v-btn
            >
            <UpdateAvatar
              v-if="avatarDialog"
              :avatarDialog="avatarDialog"
              @update:closedialog="avatarDialog = $event"
            ></UpdateAvatar>
            <div class="my-1">
              <span>
                <b> Post </b>

                <span v-if="posts.timeline">
                  {{ users.user.follower.length }}
                </span>
                <span v-else> 0 </span>
              </span>
              <span> - </span>
              <span><b style="cursor: pointer" @click="ShowDialogListUserFollowers()"> Followers </b> </span>
              <span v-if="users.user.follower">
                {{ users.user.follower.length }}
              </span>
              <span v-else> 0 </span>

              <FollowListUserPopUp
                v-if="activefollower"
                :userid="users.user._id"
                :activefollower="activefollower"
                @update:closedialog="activefollower = $event"
                :closedialog="activefollower"
              ></FollowListUserPopUp>
              <span> - </span>
              <span><b style="cursor: pointer" @click="ShowDialogListUserFollowed()"> Followed </b> </span>
              <span v-if="users.user.following">
                {{ users.user.following.length }}
              </span>
              <span v-else> 0 </span>
              <FollowListUserPopUp
                v-if="activefollowed"
                :userid="users.user._id"
                :activefollowed="activefollowed"
                @update:closedialog="activefollowed = $event"
                :closedialog="activefollowed"
              ></FollowListUserPopUp>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <img src="https://s.svgbox.net/loaders.svg?ic=bars&fill=000" width="32" height="32" />
    </div>
    <v-divider></v-divider>

    <div class="container--fluid" style="display: flex; justify-content: center; margin-top: 50px">
      <!-- :key="$route.fullPath" will recreate this component when ever the route fullPath changes 
      Ex -> http://localhost:8080/profil/user1 to http://localhost:8080/profil/user2   -->
      <TimeLine :timeline="timeline" :key="$route.fullPath"></TimeLine>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TimeLine from '../../components/TimeLine';
import UpdateAvatar from '../../components/Popups/UpdateAvatar';
import FollowListUserPopUp from '../../components/Popups/FollowListUserPopUp';

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      active: false,
      activefollower: false,
      activefollowed: false,
      avatarDialog: false,
      timeline: 'home-timeline',
    };
  },
  components: { TimeLine, UpdateAvatar, FollowListUserPopUp },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions(['users/getSingleUser']),
    ShowDialogUpdateAvatar() {
      if (!this.avatarDialog) this.avatarDialog = true;
    },
    ShowDialogListUserFollowers() {
      if (this.users.user.follower.length === 0) return;
      if (!this.activefollower) this.activefollower = true;
    },
    ShowDialogListUserFollowed() {
      if (this.users.user.following.length === 0) return;
      if (!this.activefollowed) this.activefollowed = true;
    },
  },
  created() {
    const payload = { userName: this.$route.params.userName };
    this['users/getSingleUser'](payload).then(() => {
      const avatar = this.users.user.avatar;
      const lastIndex = avatar.lastIndexOf('avatars');
      this.avatar = this.users.user.avatar.substring(lastIndex + 8);
    });
  },
  watch: {
    '$route.params.userName': function (userName) {
      const payload = { userName: userName };
      this['users/getSingleUser'](payload).then(() => {
        const avatar = this.users.user.avatar;
        const lastIndex = avatar.lastIndexOf('avatars');
        this.avatar = this.users.user.avatar.substring(lastIndex + 8);
      });
    },
  },
};
</script>
