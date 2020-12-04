<template>
  <div>
    <AppBar></AppBar>
    <slot name="alert"></slot>
    <div class="container">
      <TimeLine :timeline="timeline"></TimeLine>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppBar from '../../components/AppBar';
import TimeLine from '../../components/TimeLine';

export default {
  data: () => {
    return {
      timeline: 'timeline',
    };
  },
  components: { TimeLine, AppBar },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
};
</script>
