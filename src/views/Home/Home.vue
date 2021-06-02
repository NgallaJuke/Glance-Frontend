<template>
  <div class="py-10 container--fluid">
    <slot name="alert"></slot>
    <NavTagBar></NavTagBar>
    <div class="mb-10 ml-15"><h3>Projets de créatifs que vous suivez</h3></div>
    <div class="Current_Tab">
      <TheTimeLine :timeline="timeline"></TheTimeLine>
    </div>
  </div>
</template>

<script>
import TheTimeLineLoading from '@/components/Loaders/TheTimeLineLoading';
import NavTagBar from '@/components/NavTagBar';
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
  components: { TheTimeLine, NavTagBar },
};
</script>
<style lang="scss" scoped>
.Current_Tab {
  display: flex;
  justify-content: center;
}
</style>
