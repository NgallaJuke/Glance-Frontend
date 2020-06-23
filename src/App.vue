<template>
  <v-app>
    <v-main class=" grey lighten-3">
      <transition name="slide-fade">
        <v-alert outlined :class="`${alert.type} ma-2`" v-if="alert.message && show">
          {{ alert.message }}
        </v-alert>
      </transition>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'App',
  data() {
    return { show: true };
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
      fadeAlert: 'alert/fade',
    }),
  },
  updated() {
    setTimeout(() => {
      this.fadeAlert();
    }, 3000);
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
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
