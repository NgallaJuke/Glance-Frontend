<template>
  <div>
    <v-app-bar class="grey lighten-5" flat fixed height="60px">
      <div class="AppBar hidden-md-and-up">
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

      <div class="AppBar hidden-sm-and-down">
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
        <v-btn class="mx-5" depressed rounded color="primary white--text" @click="ShowDialog()">Upload</v-btn>
        <v-menu offsetY open-on-hover left bottom transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }" style="margin-right: 1em">
            <AvatarLink
              name_path="profil"
              :user_name="account.user.userName"
              :size="40"
              :avatar_uri="account.user.avatar.substring(62)"
              :on="on"
              :attrs="attrs"
            ></AvatarLink>
          </template>
          <TheProfilOptions></TheProfilOptions>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer class="Drawer" v-model="drawer" temporary fixed>
      <TheAppBarLink class="AppBarLink_drawer"></TheAppBarLink>
      <v-btn
        style="margin-left: 28px; margin-bottom: 10px"
        depressed
        rounded
        color="primary white--text"
        @click="ShowDialog()"
        >Upload</v-btn
      >
      <v-divider></v-divider>

      <AvatarLink
        class="Drawer_Avatar"
        name_path="profil"
        :user_name="account.user.userName"
        :size="40"
        :avatar_uri="account.user.avatar.substring(62)"
      ></AvatarLink>
      <div class="UserInfo">
        <h4>{{ account.user.userName }}</h4>
        <p>{{ account.user.email }}</p>
      </div>

      <div class="Drawer_Profil_Options">
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
      v-if="dialog"
      :is="dialogComp"
      :dialog="dialog"
      :closedialog="dialog"
      @update:closedialog="dialog = $event"
    ></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import UploadPost from './Popups/Uploadpost';
import TheAppBarLink from './TheAppBarLink';
import TheProfilOptions from './TheProfilOptions';
import AvatarLink from './Bases/AvatarLink';

export default {
  props: { account: Object },
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
  components: { TheAppBarLink, TheProfilOptions, AvatarLink },

  methods: {
    ...mapActions(['account/logout']),
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
};
</script>

<style lang="scss" >
@import '@/styles/variables.scss';
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
.Drawer {
  .Drawer_Avatar {
    margin: 30px 20px 0 28px;
    display: inline-block;
  }

  .UserInfo {
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
  .Drawer_Profil_Options {
    margin-left: 12px;
  }
}
</style>