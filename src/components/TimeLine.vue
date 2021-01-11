<template>
  <div>
    <div v-if="posts.status.loading">
      <img src="https://s.svgbox.net/loaders.svg?ic=bars&fill=000" width="32" height="32" />
    </div>
    <div v-else-if="posts.status.empty">
      <img src="https://s.svgbox.net/hero-solid.svg?ic=eye-off&fill=000" width="50" height="50" />
      <h2>
        {{ posts.message }}
      </h2>
    </div>
    <div v-else-if="posts.timeline">
      <v-container fluid>
        <v-row>
          <v-col v-for="post in posts.timeline.slice().reverse()" :key="post._id" cols="6" md="4" sm="6">
            <PostCard :post="post"></PostCard>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else-if="!posts.timeline">
      <h4 style="color: red">your timmeline is Empty</h4>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostCard from './PostCard';
export default {
  props: { timeline: String },
  data: () => ({ url: process.env.VUE_APP_API_URI }),
  components: { PostCard },
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
      };
      this['posts/getPostFeed'](payload);
    }
  },
};
</script>
