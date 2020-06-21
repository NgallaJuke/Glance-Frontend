<template>
  <v-app>
    <v-main class=" grey lighten-3">
      <v-alert outlined class="my-2" type="success" v-if="alert.message">
        {{ alert.message }}
      </v-alert>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'App',

  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
    }),
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
    /* eslint-enable no-unused-vars */
  },
};
</script>
