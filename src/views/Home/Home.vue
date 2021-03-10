<template>
  <div>
    <slot name="alert"></slot>
    <div class="spacer"></div>
    <div class="container--fluid" style="display: flex; justify-content: center">
      <TheTimeLine :timeline="timeline"></TheTimeLine>
    </div>
  </div>
</template>

<script>
import TheTimeLine from '../../components/TheTimeLine';
export default {
  data: () => {
    return {
      timeline: 'timeline',
    };
  },
  components: { TheTimeLine },
};
</script>

<style  scoped>
.spacer {
  height: calc(2vh + 2vw);
}
</style>