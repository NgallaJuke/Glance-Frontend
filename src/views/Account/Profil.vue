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
      <img
        class="mx-3"
        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
      />
    </div>
    <v-divider></v-divider>
    <h2>User Home TimeLine</h2>
    <div v-if="posts.status.laoding">
      HomeTimeline loading
      <img
        class="mx-3"
        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
      />
    </div>
    <div v-else-if="posts.status.empty">
      <h2>
        {{ posts.message }}
      </h2>
    </div>
    <div v-else-if="posts.hometimeline">
      <v-container fluid>
        <v-row>
          <v-col v-for="post in posts.hometimeline.slice().reverse()" :key="post.id" cols="6" sm="4">
            <v-col>
              <v-img :src="`${url}posts_pic/${post.picture[0]}`" alt="postImage"></v-img>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppBar from '../../components/AppBar';
import UpdateAvatar from '../../components/UpdateAvatar';

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      avartarComp: UpdateAvatar,
      avatarDialog: false,
    };
  },
  components: { AppBar },
  computed: {
    ...mapState({
      users: (state) => state.users,
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions(['users/getSingleUser', 'posts/getUserHomeTimeline']),
    ShowDialog() {
      if (!this.avatarDialog) this.avatarDialog = true;
    },
  },
  created() {
    console.log('this.$route.params.userName', this.$route.params.userName);
    this['users/getSingleUser'](this.$route.params.userName).then(() => {
      const avatar = this.users.user.avatar;
      const lastIndex = avatar.lastIndexOf('avatars');
      this.avatar = this.users.user.avatar.substring(lastIndex + 8);
    });
    this['posts/getUserHomeTimeline']();
  },
};
</script>
