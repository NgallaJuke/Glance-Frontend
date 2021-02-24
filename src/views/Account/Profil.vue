<template>
  <div>
    <slot name="alert"></slot>
    <!-- <div v-if="users.user" class="container" align="center">
      <v-row justify="start">
        <v-col cols="3" sm="12" md="4">
          <v-avatar class="my-2" size="100" v-if="!users.status.loggingOut && avatar !== ''">
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
    </div> -->

    <div v-if="users.user" class="Profil_User">
      <div class="Profil_User_Avatar mb-3">
        <v-avatar size="100" v-if="!users.status.loggingOut && avatar !== ''">
          <img :src="`${url}avatars/${avatar}`" />
        </v-avatar>
      </div>
      <div class="Profil_User_Name">
        <h1>{{ users.user.userName }}</h1>
      </div>
      <div class="Profil_User_Bio mb-3">
        <h2>Design for awesome experiences and bright brands</h2>
      </div>
      <div v-if="account.user._id === users.user._id" class="Profil_User_Options">
        <router-link class="link" :to="{ name: 'setting' }">
          <v-btn class="my-1 pa-2" outlined color="primary">Edit Profil</v-btn>
        </router-link>
      </div>
      <div v-else class="Profil_User_Options">
        <v-btn v-if="isFollowed" @click="UnFollowUser(users.user._id)" class="my-1 pa-2 mr-2" outlined color="primary"
          ><v-icon left small> mdi-check </v-icon>Following</v-btn
        >
        <v-btn v-else @click="FollowUser(users.user._id)" class="my-1 pa-2 mr-2" depressed color="grey lighten-4"
          ><v-icon left>mdi-plus </v-icon>Follow</v-btn
        >
        <v-btn class="my-1 ml-2" @click="ShowDialogHireUs()" depressed color="primary"
          ><v-icon left small> mdi-email </v-icon>Hire Us</v-btn
        >
      </div>
      <HireUserPopup v-if="dialog" :closedialog="dialog" :dialog="dialog" @update:closedialog="dialog = $event">
      </HireUserPopup>
      <!-- <div class="Profil_User_Follow">
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
      </div> -->
    </div>
    <div class="Container_Tab my-8">
      <ul class="Container_Tab_Items">
        <li class="Container_Tab_Item">Posts</li>
        <li class="Container_Tab_Item">Liked Posts</li>
        <li class="Container_Tab_Item">Followers</li>
        <li class="Container_Tab_Item">Following</li>
        <li class="Container_Tab_Item">About</li>
      </ul>
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
// import UpdateAvatar from '../../components/Popups/UpdateAvatar';
// import FollowListUserPopUp from '../../components/Popups/FollowListUserPopUp';
import HireUserPopup from '../../components/Popups/HireUserPopup';

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      active: false,
      dialog: false,
      isFollowed: Boolean,
      activefollower: false,
      activefollowed: false,

      timeline: 'home-timeline',
    };
  },
  components: { TimeLine, HireUserPopup },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions(['users/getSingleUser', 'users/followUser', 'users/unfollowUser']),

    // ShowDialogListUserFollowers() {
    //   if (this.users.user.follower.length === 0) return;
    //   if (!this.activefollower) this.activefollower = true;
    // },
    // ShowDialogListUserFollowed() {
    //   if (this.users.user.following.length === 0) return;
    //   if (!this.activefollowed) this.activefollowed = true;
    // },
    FollowUser(userID) {
      this['users/followUser'](userID);
      this.isFollowed = true;
    },
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
      this.isFollowed = false;
    },
    ShowDialogHireUs() {
      if (!this.dialog) this.dialog = true;
    },
  },
  created() {
    const payload = { userName: this.$route.params.userName };
    this['users/getSingleUser'](payload).then(() => {
      const avatar = this.users.user.avatar;
      const lastIndex = avatar.lastIndexOf('avatars');
      this.avatar = this.users.user.avatar.substring(lastIndex + 8);
      if (this.account.user.following.includes(this.users.user._id)) this.isFollowed = true;
      else this.isFollowed = false;
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

<style lang="scss" scoped>
.Profil_User {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 400px;
  width: 500px;
  margin: 0 auto;
  .Profil_User_Name {
    font-size: 1em;
  }
  .Profil_User_Bio {
    font-size: 2em;
    line-height: 56px;
    text-align: center;
  }
  .Profil_User_Options {
    display: flex;
    justify-content: center;
    width: 100%;
    .link {
      text-decoration: none;
    }
  }

  .Container_Tab {
    display: flex;
    align-items: center;
    padding: 0;
    .Container_Tab_Items {
      list-style: none;
      display: flex;
      align-items: center;
      .Container_Tab_Item {
        font-size: 1rem;

        color: #000;
        text-decoration: none;
        &:hover {
          color: $color_primary;
        }
      }
    }
    .Container_Tab_Item:hover {
      background-color: $btn_hover_color;
      border-radius: $border_radius;
    }
  }
}
</style>