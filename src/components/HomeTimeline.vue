<template>
  <div>
    <h1>HomeTimeline Component</h1>
    <div>
      <v-container v-if="posts.timeline" fluid>
        <v-row>
          <v-col v-for="post in posts.timeline" :key="post.id" cols="6" sm="4">
            <div v-for="(pic, index) in post.picture" :key="index">
              <v-img :src="`${url}posts_pic/${pic}`" alt="postImage"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({ url: process.env.VUE_APP_API_URI }),
  computed: {
    ...mapState({
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions(['posts/getUserTimeline']),
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      // ...
    },
  },
  created() {
    this['posts/getUserTimeline']();
  },
};
</script>
<style scoped>
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 0, 0, 0.25),
    rgba(255, 0, 0, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 10px
  );
}
</style>
