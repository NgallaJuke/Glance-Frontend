<template>
  <div style="width: 90%">
    <div v-if="posts.status.loading"><TheDumyTimeline></TheDumyTimeline></div>
    <div v-else-if="posts.status.empty">
      <img src="https://s.svgbox.net/hero-solid.svg?ic=eye-off&fill=000" width="32" height="32" />
      <h1>
        {{ posts.message }}
      </h1>
    </div>
    <div v-else-if="posts.timeline">
      <v-container fluid>
        <v-row>
          <v-col v-for="post in posts.timeline.slice().reverse()" :key="post._id" cols="12" lg="3" md="4" sm="6">
            <PostCard :post="post"></PostCard>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else-if="!posts.timeline">
      <h2 style="color: red">Timeline is Empty</h2>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostCard from './PostCard';
import TheDumyTimeline from './TheDumyTimeline';
export default {
  props: { timeline: String },
  data: () => ({ url: process.env.VUE_APP_API_URI }),
  components: { PostCard, TheDumyTimeline },
  computed: {
    ...mapState({
      posts: (state) => state.posts,
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['posts/getPostFeed']),
  },
  created() {
    if (this.timeline === 'timeline') {
      const payload = {
        timeline: this.timeline,
      };
      this['posts/getPostFeed'](payload);
    } else {
      const payload = {
        timeline: this.timeline,
        userName: this.$route.params.userName,
        limit: 'all', //limit of postfeed can be a number or 'all'
      };
      this['posts/getPostFeed'](payload);
    }
  },
};
</script>
