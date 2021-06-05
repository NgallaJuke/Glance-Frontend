<template>
  <div class="py-10 container--fluid">
    <slot name="alert"></slot>
    <TheHashTagNavBar @gotohashtag="GoToHashTag($event)"></TheHashTagNavBar>
    <div>
      <keep-alive>
        <component :is="currentTabComponent" :timeline="timeline" :postType="'likedPost'"></component>
      </keep-alive>
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
const PostGrid = () => ({
  component: import(/* webpackChunckName: "PostGrid"*/ '@/components/PostGrid'),
  loading: TheTimeLineLoading,
  error: ErrorFetch,
  timeout: 500,
});
export default {
  data: () => {
    return {
      timeline: 'timeline',
      currentTabComponent: '',
    };
  },
  methods: {
    GoToHashTag($event) {
      console.log(`$event`, $event);
    },
  },
  components: { TheTimeLine, PostGrid, TheHashTagNavBar },
  created() {
    this.currentTabComponent = 'TheTimeLine';
  },
  beforeRouteUpdate(to, from, next) {
    // just use `this`
    this.currentTabComponent = to.fullPath === '/' ? 'TheTimeLine' : 'PostGrid';
    next();
  },
};
</script>
<style lang="scss" scoped>
.Current_Tab {
  display: flex;
  justify-content: center;
}
</style>
