<template>
  <div class="py-10 container--fluid">
    <slot name="alert"></slot>
    <TheHashTagNavBar></TheHashTagNavBar>
    <div class="Current_Tab">
      <router-view class="Current_Tab"></router-view>
      <TheTimeLine :timeline="timeline"></TheTimeLine>
    </div>
  </div>
</template>

<script>
import TheTimeLineLoading from '@/components/Loaders/TheTimeLineLoading';
import TheHashTagNavBar from '@/components/TheHashTagNavBar';
import ErrorFetch from '@/components/Loaders/ErrorFetch';
const TheTimeLine = () => ({
  component: import(/* webpackChunckName: "TheTimeLine"*/ '@/components/TheTimeLine'),
  loading: TheTimeLineLoading,
  error: ErrorFetch,
  timeout: 5000,
});
export default {
  data: () => {
    return {
      timeline: 'timeline',
    };
  },
  components: { TheTimeLine, TheHashTagNavBar },
};
</script>
<style lang="scss" scoped>
.Current_Tab {
  display: flex;
  justify-content: center;
}
</style>
