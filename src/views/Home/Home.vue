<template>
  <div class="container">
    <h1 v-if="account.user">Hey Heey HEEEYY {{ account.user.userName }}</h1>
    <h1 v-else><img src="../../assets/loader.gif" /></h1>
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
    ...mapActions('account', ['getCurrentUser']),
  },
  created() {
    this.getCurrentUser();
  },
};
</script>
