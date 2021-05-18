<template>
  <v-app>
    <v-main class="grey lighten-5">
      <TheAppBar
        v-if="$route.name !== 'login' && $route.name !== 'register' && $route.name !== 'register-success'"
        class="mb-16"
      ></TheAppBar>
      <router-view>
        <transition name="slide-fade" cols="6" sm="4" slot="alert">
          <v-alert outlined :class="`${alert.type} ma-2`" v-if="alert.message && show">
            <h3>
              <v-icon v-if="alert.type === 'success'">mdi-checkbox-marked-circle-outline</v-icon>
              <v-icon v-else>mdi-close-circle-outline</v-icon>
              {{ alert.message }}
            </h3>
          </v-alert>
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import TheAppBar from './components/TheAppBar';
export default {
  name: 'App',
  data() {
    return { show: true };
  },
  components: { TheAppBar },
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
    }, 5000);
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route(to, from) {
      // clear alert on location change
      if (this.alert.message) {
        this.clearAlert();
      }
    },
    /* eslint-disable no-unused-vars */
  },
};
</script>
<style >
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
