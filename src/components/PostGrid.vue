<template>
  <div :key="$route.params.post" style="width: 90%">
    <div>{{ $route.params.post }}</div>
    <div v-if="fetchedPost">
      <v-container fluid>
        <v-row>
          <v-col v-for="post in fetchedPost" :key="post._id" cols="12" lg="3" md="4" sm="6">
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
  //This prop is use for this component to load post of different type
  // If the postType === likedPost then fetch all the liked post and display it
  props: {
    postType: {
      type: String,
      required: true,
    },
  },
  data: () => ({ url: process.env.VUE_APP_API_URI, fetchedPost: Array }),
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
  async created() {
    switch (this.postType) {
      case 'likedPost':
        await this['posts/getLikedPost'](this.users.user._id);
        this.fetchedPost = this.posts.likedPost;
        break;
      case '':
        this.fetchedPost = 'Testing';
        break;

      default:
        break;
    }
  },

  // beforeUpdate() {
  //   alert('before Update ' + this.$route.params.post);
  // },
};
</script>
