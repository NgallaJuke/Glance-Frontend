<template>
  <div>
    <v-app-bar color="primary accent-4" dense dark>
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <v-btn icon><v-icon>mdi-home-variant</v-icon> </v-btn>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" depressed color="white black--text" @click="ShowDialog()">Upload</v-btn>
      <v-menu offsetY open-on-hover left bottom>
        <template v-slot:activator="{ on, attrs }">
          <router-link :to="{ name: 'account', params: { userName: account.user.userName } }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-avatar v-if="!account.status.loggingOut && avatar !== ''">
                <img :src="`${url}avatars/${avatar}`" />
              </v-avatar>
              <img
                v-else-if="account.status.loggingOut"
                class="mx-3"
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
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
import UploadPost from './Uploadpost';

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
    swapComponent: function(component) {
      this.currentComp = component;
    },
    ShowDialog() {
      console.log('SHOWDIALOG');

      if (!this.dialog) this.dialog = true;
    },
  },
  created() {
    this['account/getCurrentUser']().then(() => {
      const avatar = this.account.user.avatar;
      const lastIndex = avatar.lastIndexOf('avatars');
      this.avatar = this.account.user.avatar.substring(lastIndex + 8);
    });
  },
};
</script>
