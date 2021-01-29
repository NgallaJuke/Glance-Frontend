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
                {{ posts.timeline.length }}
              </span>
              <span> - </span>
              <b>
                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <span color="primary" v-bind="attrs" v-on="on">Followers</span>
                  </template>
                  <template>
                    <v-card
                      v-for="(follower, index) in users.user.follower"
                      :key="index"
                      class="pa-5"
                      max-height="50vh"
                      style="overflow: hidden; overflow-y: auto"
                    >
                      <UserSingle :userid="follower" :key="index" class="py-5"></UserSingle>
                    </v-card>
                  </template>
                </v-dialog>
              </b>
              {{ users.user.follower.length }}
              <span> - </span>
              <b>
                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <span color="primary" v-bind="attrs" v-on="on">Followed</span>
                  </template>
                  <template>
                    <v-card
                      class="pa-5"
                      max-height="50vh"
                      v-for="(following, index) in users.user.following"
                      :key="index"
                      style="overflow: hidden; overflow-y: auto"
                    >
                      <UserSingle :userid="following" :key="index" class="py-3"></UserSingle>
                    </v-card>
                  </template>
                </v-dialog>
              </b>
              {{ users.user.following.length }}
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
import UserSingle from '../../components/UserSingle';

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',

      avatarDialog: false,
      timeline: 'home-timeline',
    };
  },
  components: { TimeLine, UpdateAvatar, UserSingle },
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
