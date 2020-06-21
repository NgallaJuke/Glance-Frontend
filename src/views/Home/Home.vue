<template>
  <div class="container">
    <h1 v-if="account.user">Hey Heey HEEEYY {{ account.user.userName }}</h1>
    <h1 v-else>QHIMATTTAAAA</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
};
</script>
