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
          <v-col v-for="post in posts.timeline.slice().reverse()" :key="post.id" cols="6" md="4" sm="6">
            <v-col>
              <v-card class="mx-auto" max-width="325">
                <v-img :src="`${url}posts_pic/${post.picture[0]}`" alt="postImage" height="370" width="325"></v-img>
                <v-toolbar max-width="325">
                  <!-- <router-link :to="{ name: 'profil', params: { userName: post.postOwner.userName } }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-avatar small>
                        <img :src="`${url}avatars/${post.postOwner.avatar.substring(62)}`" />
                      </v-avatar>
                    </v-btn>
                  </router-link> -->

                  <router-link :to="{ name: 'profil', params: { userName: post.postOwner.userName } }">
                    <v-btn icon>
                      <v-avatar v-if="post.postOwner.avatar">
                        <img :src="`${url}avatars/${post.postOwner.avatar.substring(62)}`" />
                      </v-avatar>
                      <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
                    </v-btn>
                  </router-link>

                  <h3>{{ post.postOwner.userName }}</h3>
                  <v-spacer></v-spacer>
                  <v-btn icon small>
                    <v-icon>mdi-comment</v-icon>
                  </v-btn>
                  <h5>00</h5>
                  <v-btn @click="likePost(post._id)" icon small>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <h5>{{ post.likes.count }}</h5>
                </v-toolbar>
              </v-card>
            </v-col>
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
export default {
  props: { timeline: String },
  data: () => ({ url: process.env.VUE_APP_API_URI }),
  computed: {
    ...mapState({
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions(['posts/getPostFeed', 'posts/likePost']),
    likePost(postID) {
      this['posts/likePost'](postID);
    },
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
