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
            <h3 class="my-1">{{ users.user.userName }}</h3>
            <v-btn
              v-if="account.user._id === users.user._id"
              class="my-1"
              outlined
              color="primary"
              dark
              @click="ShowDialog()"
              >Edit Profil</v-btn
            >
            <div
              v-if="avatarDialog"
              :is="avartarComp"
              :avatarDialog="avatarDialog"
              @update:closedialog="avatarDialog = $event"
            ></div>
            <div class="my-1">
              <span><b>Post </b> 0 </span>
              <span> - </span>
              <span> <b>Followers </b>{{ users.user.follower.length }} </span>
              <span> - </span>
              <span><b>Following </b>{{ users.user.following.length }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      Loading user
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

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      avartarComp: UpdateAvatar,
      avatarDialog: false,
      timeline: 'home-timeline',
    };
  },
  components: { TimeLine },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions(['users/getSingleUser', 'posts/getPostFeed']),
    ShowDialog() {
      if (!this.avatarDialog) this.avatarDialog = true;
    },
  },
  created() {
    this['users/getSingleUser'](this.$route.params.userName).then(() => {
      const avatar = this.users.user.avatar;
      const lastIndex = avatar.lastIndexOf('avatars');
      this.avatar = this.users.user.avatar.substring(lastIndex + 8);
    });
  },
  watch: {
    '$route.params.userName': function (userName) {
      this['users/getSingleUser'](userName).then(() => {
        const avatar = this.users.user.avatar;
        const lastIndex = avatar.lastIndexOf('avatars');
        this.avatar = this.users.user.avatar.substring(lastIndex + 8);
      });
    },
  },
};
</script>
