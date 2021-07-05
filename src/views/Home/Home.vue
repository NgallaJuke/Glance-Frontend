<template>
  <div class="py-10 container--fluid">
    <slot name="alert"></slot>

    <TheHashTagNavBar :hashType="hashType" @gotohashtag="goToHashTag"></TheHashTagNavBar>
    <div class="Current_Tab">
      <keep-alive v-if="!$route.params.post">
        <TheTimeLine :timeline="timeline"></TheTimeLine>
      </keep-alive>
      <keep-alive v-else>
        <component :is="currentTabComponent" :postType="postType" :key="Key"></component>
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
});
const PostGrid = () => ({
  component: import(/* webpackChunckName: "PostGrid"*/ '@/components/PostGrid'),
  loading: TheTimeLineLoading,
  error: ErrorFetch,
});
export default {
  data: () => {
    return {
      timeline: 'timeline',
      currentTabComponent: '',
      postType: '',
      hashType: '',
    };
  },
  computed: {
    Key() {
      const key = this.$route.params.post;
      return key;
    },
  },
  methods: {
    goToHashTag(e) {
      this.postType = e;
    },
  },
  components: { TheTimeLine, PostGrid, TheHashTagNavBar },
  created() {
    this.currentTabComponent = '';
  },
  beforeRouteEnter(to, from, next) {
    // if the user refresh the page when the past route is like :8080/posts/following/illustration
    // then make the currentTab swith to PostGrib component and postType prop to params to.params.prop( = illustration ) for this exemple

    let goto = to.fullPath === '/' ? 'TheTimeLine' : 'PostGrid';
    next((vm) => {
      vm._data.hashType = 'following-posts';
      vm._data.currentTabComponent = goto;
    });
  },
  beforeRouteUpdate(to, from, next) {
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
