<template>
  <div class="py-10 container--fluid">
    <slot name="alert"></slot>
    <TheHashTagNavBar :hashType="hashType" @gotohashtag="goToHashTag"></TheHashTagNavBar>
    <!-- 
    <div class="Current_Tab">
      <keep-alive>
        <component :is="currentTabComponent" :postType="postType" :key="Key"></component>
      </keep-alive>
    </div> -->
  </div>
</template>

<script>
// import TheTimeLineLoading from '@/components/Loaders/TheTimeLineLoading';
import TheHashTagNavBar from '@/components/TheHashTagNavBar';
// import ErrorFetch from '@/components/Loaders/ErrorFetch';

// const PostGrid = () => ({
//   component: import(/* webpackChunckName: "PostGrid"*/ '@/components/PostGrid'),
//   loading: TheTimeLineLoading,
//   error: ErrorFetch,
//   timeout: 500,
// });
export default {
  data: () => {
    return {
      currentTabComponent: 'PostGrid',
      postType: '',
      hashType: '',
    };
  },
  components: { TheHashTagNavBar },
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
  beforeRouteEnter(to, from, next) {
    // if the user refresh the page when the past route is like :8080/posts/following/illustration
    // then make the currentTab swith to PostGrib component and postType prop to params to.params.prop( = illustration ) for this exemple
    next((vm) => {
      vm._data.hashType = 'popular-posts';
    });
  },
};
</script>
<style lang="scss" scoped>
.Current_Tab {
  display: flex;
  justify-content: center;
}
</style>
