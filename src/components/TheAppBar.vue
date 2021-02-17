<template>
  <div>
    <v-app-bar class="grey lighten-5" flat fixed height="60px">
      <TheAppBarLink> </TheAppBarLink>
      <v-spacer
        class="v-input expanding-search mt-1 v-input--hide-details v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--filled v-text-field--is-booted v-text-field--enclosed v-text-field--placeholder"
      ></v-spacer>
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
      <v-menu offsetY open-on-hover left bottom>
        <template v-slot:activator="{ on, attrs }" style="margin-right: 1em">
          <router-link class="mr-3" :to="{ name: 'profil', params: { userName: account.user.userName } }">
            <v-btn icon small plain ripple="{none}" v-bind="attrs" v-on="on">
              <v-avatar v-if="account.user.avatar" height="40" width="40">
                <img :src="`${url}avatars/${account.user.avatar.substring(62)}`" />
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
import { mapActions } from 'vuex';
import UploadPost from './Popups/Uploadpost';
import TheAppBarLink from './TheAppBarLink';

export default {
  props: { account: Object },
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
      avatar: '',
      dialogComp: UploadPost,
      dialog: false,
      searchClosed: true,
    };
  },
  components: { TheAppBarLink },

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
</style>