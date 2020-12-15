<template>
  <div>
    <AppBar v-if="account" :account="account"></AppBar>
    <slot name="alert"></slot>
    <div class="container">
      <TimeLine :timeline="timeline"></TimeLine>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppBar from '../../components/AppBar';
import TimeLine from '../../components/TimeLine';

export default {
  data: () => {
    return {
      timeline: 'timeline',
    };
  },
  components: { TimeLine, AppBar },
  methods: {
    ...mapActions(['account/getCurrentUser']),
  },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  created() {
    this['account/getCurrentUser']();
  },
};
</script>
