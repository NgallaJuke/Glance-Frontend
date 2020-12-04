<template>
  <div>
    <v-app-bar color="primary accent-4" dense dark>
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <v-btn icon><v-icon>mdi-home-variant</v-icon> </v-btn>
        </router-link>
      </v-toolbar-title>
      <router-link class="ml-5" :to="{ name: 'tailors' }">
        <v-btn depressed outlined>Tailors <v-icon class="ml-1">mdi-account-star</v-icon></v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" depressed color="white black--text" @click="ShowDialog()">Upload</v-btn>
      <v-menu offsetY open-on-hover left bottom>
        <template v-slot:activator="{ on, attrs }">
          <router-link :to="{ name: 'profil', params: { userName: account.user.userName } }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-avatar v-if="!account.status.loggingOut && avatar !== ''">
                <img :src="`${url}avatars/${avatar}`" />
              </v-avatar>
              <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
            </v-btn>
          </router-link>
        </template>

        <v-list>
          <v-list-item @click="Logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
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
import { mapState, mapActions } from 'vuex';
import UploadPost from './Popups/Uploadpost';

export default {
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      dialogComp: UploadPost,
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['account/getCurrentUser', 'account/logout']),
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
    this['account/getCurrentUser']().then(() => {
      const avatar = this.account.user.avatar;
      this.avatar = avatar.substring(62);
    });
  },
};
</script>
