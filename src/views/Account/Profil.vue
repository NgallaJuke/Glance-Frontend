<template>
  <div>
    <AppBar></AppBar>
    <h1>Profil Component</h1>
    <div class="container" align="center">
      <v-row justify="center">
        <v-col cols="3" sm="6" md="4">
          <v-avatar class="my-2" size="150" v-if="!account.status.loggingOut && avatar !== ''">
            <img :src="`${url}avatars/${avatar}`" />
          </v-avatar>
          <div>
            <h3 class="my-1">{{ account.user.userName }}</h3>
            <v-btn class="my-1" outlined color="primary" dark>Edit Profil</v-btn>
            <div class="my-1">
              <span><b>Post </b> 0 </span>
              <span> - </span>
              <span> <b>Followers </b>{{ account.user.follower.length }} </span>
              <span> - </span>
              <span><b>Following </b>{{ account.user.following.length }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppBar from '../../components/AppBar';

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      dialog: false,
    };
  },
  components: { AppBar },
  computed: {
    ...mapState({
      account: (state) => state.account,
      posts: (state) => state.posts,
    }),
  },
  created() {
    const avatar = this.account.user.avatar;
    const lastIndex = avatar.lastIndexOf('avatars');
    this.avatar = this.account.user.avatar.substring(lastIndex + 8);
  },
};
</script>
