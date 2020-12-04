<template>
  <div>
    <AppBar></AppBar>
    <slot name="alert"></slot>
    <h1>Profil Component</h1>
    <div v-if="users.user" class="container" align="center">
      <v-row justify="center">
        <v-col cols="3" sm="6" md="4">
          <v-avatar class="my-2" size="150" v-if="!users.status.loggingOut && avatar !== ''">
            <img :src="`${url}avatars/${avatar}`" />
          </v-avatar>
          <div>
            <h3 class="my-1">{{ users.user.userName }}</h3>
            <v-btn class="my-1" outlined color="primary" dark @click="ShowDialog()">Edit Profil</v-btn>
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

    <div v-if="posts.status.laoding">
      <img src="https://s.svgbox.net/loaders.svg?ic=bars&fill=000" width="32" height="32" />
    </div>

    <TimeLine :timeline="timeline"></TimeLine>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppBar from '../../components/AppBar';
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
  components: { AppBar, TimeLine },
  computed: {
    ...mapState({
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
    this['posts/getPostFeed'](this.timeline);
  },
};
</script>
