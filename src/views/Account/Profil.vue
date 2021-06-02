<template>
  <div class="py-10" :key="$route.fullPath">
    <slot name="alert"></slot>

    <div v-if="users.user" class="Profil_User">
      <div class="Profil_User_Avatar mb-3">
        <v-avatar size="100" v-if="!users.status.loggingOut && avatar !== ''">
          <img :src="`${url}avatars/${avatar}`" />
        </v-avatar>
      </div>
      <div class="Profil_User_Name">
        <h1>{{ users.user.userName | capitalize }}</h1>
      </div>
      <div class="Profil_User_Bio mb-3">
        <!-- Change this H2 to user's bio -->
        <h2 class="mb-2">{{ users.user.bio | capitalize }}</h2>
      </div>
      <div v-if="account.user._id === users.user._id" class="Profil_User_Options">
        <router-link class="link" :to="{ name: 'setting' }">
          <v-btn class="my-1 pa-2" outlined color="primary">Edit Profil</v-btn>
        </router-link>
      </div>
      <div v-else class="Profil_User_Options">
        <FollowButton
          :isfollowed="isFollowed"
          :userid="users.user._id"
          @follow="FollowUser($event)"
          @unfollow="UnFollowUser($event)"
        ></FollowButton>
        <!-- <v-btn class="my-1 ml-2" @click="ShowDialogHireUs()" depressed color="primary">
          <v-icon left small> mdi-email </v-icon>
          Hire Us
        </v-btn> -->
      </div>
      <HireUserPopup v-if="dialog" :closedialog="dialog" :dialog="dialog" @update:closedialog="dialog = $event">
      </HireUserPopup>
    </div>
    <div class="Container_Tab my-8 ml-5">
      <ul class="Container_Tab_Items">
        <li class="Container_Tab_Item mx-4">
          <span
            class="Tag"
            @click="currentTabComponent = 'TheTimeLine'"
            :class="['Tab', { active: currentTabComponent === 'TheTimeLine' }]"
            >Posts
          </span>
          <span v-if="posts.timeline" class="Count">{{ posts.timeline.length }}</span>
        </li>
        <li class="Container_Tab_Item mx-4">
          <span
            class="Tag"
            @click="currentTabComponent = 'PostGrid'"
            :class="['Tab', { active: currentTabComponent === 'PostGrid' }]"
            >Liked Posts
          </span>
          <span v-if="posts.likedPost && posts.likedPost.length !== 0" class="Count">{{ posts.likedPost.length }}</span>
        </li>
        <li class="Container_Tab_Item mx-4">
          <span class="Tag" @click="ShowDialogListUserFollowers()">Followers </span>
          <span v-if="users.user" class="Count"> {{ users.user.follower.length }}</span>
        </li>
        <li class="Container_Tab_Item mx-4">
          <span class="Tag" @click="ShowDialogListUserFollowed()">Following </span>
          <span v-if="users.user" class="Count">{{ users.user.following.length }}</span>
        </li>
        <li class="Container_Tab_Item mx-4" v-if="users.user.about_user || users.user.location || users.user.website">
          <span
            class="Tag"
            @click="currentTabComponent = 'TheProfileAbout'"
            :class="['Tab', { active: currentTabComponent === 'TheProfileAbout' }]"
            >About
          </span>
        </li>
      </ul>
    </div>
    <FollowListUserPopUp
      v-if="activefollower"
      :userid="users.user._id"
      :activefollower="activefollower"
      @update:closedialog="activefollower = $event"
      :closedialog="activefollower"
    ></FollowListUserPopUp>
    <FollowListUserPopUp
      v-if="activefollowed"
      :userid="users.user._id"
      :activefollowed="activefollowed"
      @update:closedialog="activefollowed = $event"
      :closedialog="activefollowed"
    ></FollowListUserPopUp>
    <v-divider></v-divider>
    <div class="container--fluid" style="display: flex; justify-content: center; margin-top: 50px">
      <keep-alive>
        <component :is="currentTabComponent" v-bind="currentProperties"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TheProfileAbout from '@/components/TheProfileAbout';
import FollowListUserPopUp from '@/components/Popups/FollowListUserPopUp';
import HireUserPopup from '@/components/Popups/HireUserPopup';
import TheTimeLineLoading from '@/components/Loaders/TheTimeLineLoading';
import ErrorFetch from '@/components/Loaders/ErrorFetch';
import FollowButton from '@/components/Bases/FollowButton';

//Dynamic component
const TheTimeLine = () => ({
  component: import(/* webpackChunckName: "TheTimeLine"*/ '@/components/TheTimeLine'),
  loading: TheTimeLineLoading,
  error: ErrorFetch,
  timeout: 500,
});
const PostGrid = () => ({
  component: import(/* webpackChunckName: "PostGrid"*/ '@/components/PostGrid'),
  loading: TheTimeLineLoading,
  error: ErrorFetch,
  timeout: 500,
});

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      active: false,
      dialog: false,
      avatarDialog: false,
      isFollowed: Boolean,
      activefollower: false,
      activefollowed: false,
      currentTabComponent: 'TheTimeLine',
    };
  },
  components: { TheTimeLine, PostGrid, FollowListUserPopUp, HireUserPopup, TheProfileAbout, FollowButton },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users,
      posts: (state) => state.posts,
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    currentProperties() {
      if (this.currentTabComponent === 'TheTimeLine') {
        return { timeline: 'home-timeline' };
      }
    },
  },
  methods: {
    ...mapActions(['users/getSingleUser', 'users/followUser', 'users/unfollowUser']),
    ShowDialogListUserFollowers() {
      if (this.users.user.follower.length === 0) return;
      if (!this.activefollower) this.activefollower = true;
    },
    ShowDialogListUserFollowed() {
      if (this.users.user.following.length === 0) return;
      if (!this.activefollowed) this.activefollowed = true;
    },
    FollowUser(even) {
      this.isFollowed = even;
    },
    UnFollowUser(even) {
      this.isFollowed = even;
    },
    ShowDialogHireUs() {
      if (!this.dialog) this.dialog = true;
    },
  },
  async created() {
    const payload = { userName: this.$route.params.userName };
    await this['users/getSingleUser'](payload);
    const avatar = this.users.user.avatar;
    const lastIndex = avatar.lastIndexOf('avatars');
    this.avatar = this.users.user.avatar.substring(lastIndex + 8);
    this.isFollowed = this.account.user.following.includes(this.users.user._id) ? true : false;
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
  max-width: 600px;
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
      text-decoration: none;
      .Tag {
        color: rgb(30, 30, 30);
        font-weight: 600;
        &:hover {
          color: $color_primary;
          cursor: pointer;
        }
        &.active {
          color: $color_primary;
          font-size: 1.1em;
        }
      }
      .Count {
        color: rgb(114, 114, 114);
      }
    }
  }
  .Container_Tab_Item:hover {
    background-color: $btn_hover_color;
    border-radius: $border_radius;
  }
}
</style>
