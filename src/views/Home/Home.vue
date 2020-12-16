<template>
  <div>
    <slot name="alert"></slot>
    <div class="container">
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
