<template>
  <div v-if="account.status.loggedIn" class="App_Bar">
    <v-app-bar class="grey px-md-5 px-sm-and-down-5 lighten-5" flat fixed>
      <div class="AppBar hidden-md-and-up" height="45px">
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-text-field
          filled
          dense
          clearable
          placeholder="Search"
          class="expanding-search pt-6"
          :class="{ closed: searchClosed }"
          @focus="searchClosed = false"
          @blur="searchClosed = true"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        <v-btn icon> <v-icon>mdi-email-outline</v-icon> </v-btn>
        <v-btn icon> <v-icon>mdi-bell-ring-outline</v-icon> </v-btn>
      </div>
      <div class="AppBar hidden-sm-and-down" height="60px">
        <TheAppBarLink> </TheAppBarLink>
        <v-spacer></v-spacer>

        <v-text-field
          filled
          dense
          clearable
          placeholder="Search"
          class="expanding-search pt-6"
          :class="{ closed: searchClosed }"
          @focus="searchClosed = false"
          @blur="searchClosed = true"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        <v-btn icon> <v-icon>mdi-email-outline</v-icon> </v-btn>
        <v-btn icon> <v-icon>mdi-bell-ring-outline</v-icon> </v-btn>
        <v-btn class="mx-5 px-3" dense depressed color="primary white--text" @click="ShowDialog()">Upload</v-btn>
        <v-menu offsetY open-on-hover left bottom transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }" style="margin-right: 1em">
            <AvatarLink
              name_path="profil"
              :user_name="account.user.userName"
              :size="35"
              :avatar_uri="account.user.avatar.slice(account.user.avatar.lastIndexOf('avatars') + 8)"
              :on="on"
              :attrs="attrs"
            ></AvatarLink>
          </template>
          <TheAppBarOptions></TheAppBarOptions>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer class="Drawer" v-model="drawer" temporary fixed>
      <TheAppBarLink class="AppBarLink_drawer pl-5"></TheAppBarLink>
      <v-btn class="ml-10 mb-8" depressed rounded color="primary white--text" @click="ShowDialog()">Upload</v-btn>

      <div class="Drawer_User pl-6">
        <AvatarLink
          class="Drawer_User_Avatar mr-5"
          name_path="profil"
          :user_name="account.user.userName"
          :size="40"
          :avatar_uri="account.user.avatar.slice(account.user.avatar.lastIndexOf('avatars') + 8)"
        ></AvatarLink>
        <div class="Drawer_User_Info">
          <h4>{{ account.user.userName }}</h4>
          <p>{{ account.user.email }}</p>
        </div>
      </div>

      <div class="pl-6">
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title>Profil</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Edit Profil</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>My Saves</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>Account Settings</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="Logout">
              <v-list-item-title style="margin-top: 25px; color: red">Sign Out</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
    <div
      class="Post_PopUp"
      v-if="dialog"
      :is="dialogComp"
      :dialog="dialog"
      :closedialog="dialog"
      @update:closedialog="dialog = $event"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UploadPost from '@/components/Popups/Uploadpost';
import TheAppBarLink from '@/components/TheAppBarLink';
import TheAppBarOptions from '@/components/TheAppBarOptions';
import AvatarLink from '@/components/Bases/AvatarLink';

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      dialogComp: UploadPost,
      dialog: false,
      drawer: false,
      group: null,
      searchClosed: true,
    };
  },
  components: { TheAppBarLink, TheAppBarOptions, AvatarLink },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
    AuthRequired() {
      const publicPagesRoute = ['/login', '/register', '/register-success'];
      const authIsRequired = !publicPagesRoute.includes(this.$router.history._startLocation);
      return authIsRequired;
    },
  },
  methods: {
    ...mapActions(['account/logout', 'account/getCurrentUser']),
    Logout() {
      this['account/logout']();
    },
    swapComponent(component) {
      this.currentComp = component;
    },
    ShowDialog() {
      if (!this.dialog) this.dialog = true;
    },
  },
  created() {
    if (this.AuthRequired) this['account/getCurrentUser']();
  },
};
</script>

<style lang="scss">
.App_Bar {
  .closed {
    max-width: 45px !important;
    .v-input__slot {
      background: transparent !important;
      cursor: pointer !important;
      border-radius: 50% !important;
      &:hover {
        background: rgba(0, 0, 0, 0.06) !important;
      }
    }
  }
  .v-input.expanding-search {
    transition: max-width 0.3s;
    max-width: 350px;
    .v-input__slot {
      border-radius: $border_radius;
      &::before {
        border-style: none !important;
      }
      &::after {
        border: none !important;
      }
    }
  }
  .v-ripple__container {
    display: none !important;
  }

  .AppBar {
    display: contents;
  }

  .AppBarLink_drawer {
    flex-direction: column;
    align-items: flex-start !important;
    .menu-items {
      flex-direction: column;
      align-items: flex-start !important;
      padding: 8px 10px;
    }
  }
  .Drawer_User {
    .Drawer_User_Avatar {
      display: inline-block;
      .v-btn__content {
        top: 10px;
      }
    }

    .Drawer_User_Info {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      h4 {
        display: inline;
      }
      p {
        display: inline;
      }
    }
  }
}
</style>
