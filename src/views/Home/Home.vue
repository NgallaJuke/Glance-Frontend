<template>
  <div>
    <slot name="alert"></slot>
    <div class="spacer"></div>
    <div class="container--fluid" style="display: flex; justify-content: center">
      <TimeLine :timeline="timeline"></TimeLine>
    </div>
  </div>
</template>

<script>
import TimeLine from '../../components/TimeLine';
export default {
  data: () => {
    return {
      timeline: 'timeline',
    };
  },
  components: { TimeLine },
};
</script>

<style  scoped>
.spacer {
  height: calc(2vh + 2vw);
}
</style>