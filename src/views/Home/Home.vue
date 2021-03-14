<template>
  <div class="pt-10">
    <slot name="alert"></slot>
    <div class="container--fluid" style="display: flex; justify-content: center">
      <TheTimeLine :timeline="timeline"></TheTimeLine>
    </div>
  </div>
</template>

<script>
import TheTimeLineLoading from '@/components/TheTimeLineLoading';
import TheTimeLineError from '@/components/TheTimeLineError';
const TheTimeLine = () => ({
  component: import(/* webpackChunckName: "TheTimeLine"*/ '@/components/TheTimeLine'),
  loading: TheTimeLineLoading,
  error: TheTimeLineError,
  timeout: 5000,
});
export default {
  data: () => {
    return {
      timeline: 'timeline',
    };
  },
  components: { TheTimeLine },
};
</script>
