<template>
  <div style="width: 90%">
    <div v-if="posts.likedPost">
      <v-container fluid>
        <v-row>
          <v-col v-for="post in posts.likedPost.likedPost" :key="post._id" cols="12" lg="3" md="4" sm="6">
            <PostCard :post="post"></PostCard>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostCard from './PostCard';

export default {
  data: () => ({ url: process.env.VUE_APP_API_URI }),
  components: { PostCard },
  computed: {
    ...mapState({
      posts: (state) => state.posts,
      account: (state) => state.account,
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapActions(['posts/getLikedPost']),
  },
  created() {
    this['posts/getLikedPost'](this.users.user._id);
  },
};
</script>
