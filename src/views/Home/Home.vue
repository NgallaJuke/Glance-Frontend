<template>
  <div class="container">
    <h1 v-if="account.user.userName">Hey Heey HEEEYY {{ account.user.userName }}</h1>
    <img v-else src="../../assets/loader.gif" />
    <v-btn color="info" @click="Logout">logout</v-btn>
    <img v-if="account.status.loggingOut" src="../../assets/loader.gif" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions('account', ['getCurrentUser', 'logout']),
    Logout() {
      this.logout();
    },
  },
  created() {
    this.getCurrentUser();
  },
};
</script>
