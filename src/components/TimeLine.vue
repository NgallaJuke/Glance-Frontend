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
              <v-card class="mx-auto" max-width="325" style="border-radius: 15px 15px 0 0">
                <v-img
                  class="card_img"
                  :src="`${url}posts_pic/${post.picture[0]}`"
                  @click="ShowDialog(post)"
                  alt="postImage"
                  height="370"
                  width="325"
                ></v-img>
                <v-toolbar class="grey lighten-4" flat max-width="325">
                  <router-link :to="{ name: 'profil', params: { userName: post.postOwner.userName } }">
                    <v-btn icon>
                      <v-avatar size="40" v-if="post.postOwner.avatar">
                        <img :src="`${url}avatars/${post.postOwner.avatar.substring(62)}`" />
                      </v-avatar>
                      <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
                    </v-btn>
                  </router-link>

                  <h4>{{ post.postOwner.userName }}</h4>
                  <v-spacer></v-spacer>
                  <v-btn icon small>
                    <img
                      src="https://s.svgbox.net/hero-outline.svg?ic=annotation&fill=000"
                      width="25"
                      height="25"
                      style="margin: 0 10px"
                    />
                  </v-btn>
                  <h5 style="margin-right: 10px">00</h5>
                  <v-btn icon small>
                    <img
                      v-if="post.likes.liker.includes(account.user._id)"
                      @click="[disLikePost(post)]"
                      src="https://s.svgbox.net/hero-solid.svg?ic=heart&fill=1976D2"
                      width="25"
                      height="25"
                    />
                    <img
                      v-else
                      @click="likePost(post)"
                      src="https://s.svgbox.net/hero-outline.svg?ic=heart&fill=000"
                      width="25"
                      height="25"
                      style="margin: 0 10px"
                    />
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
    <div
      v-if="dialog"
      :closedialog="dialog"
      :dialog="dialog"
      :post="post"
      @update:closedialog="dialog = $event"
      :is="dialogComp"
    ></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostCard from './Popups/PostCard';
export default {
  props: { timeline: String },
  data: () => ({ url: process.env.VUE_APP_API_URI, dialogComp: PostCard, dialog: false, post: { type: Object } }),
  computed: {
    ...mapState({
      posts: (state) => state.posts,
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['posts/getPostFeed', 'posts/likePost', 'posts/disLikePost']),
    likePost(post) {
      this['posts/likePost'](post._id);
      post.likes.count++;
      post.likes.liker.push(this.account.user._id);
    },
    disLikePost(post) {
      this['posts/disLikePost'](post._id);
      post.likes.count--;
      post.likes.liker.splice(post.likes.liker.indexOf(this.account.user._id), 1);
    },
    ShowDialog(post) {
      this.post = post;
      if (!this.dialog) this.dialog = true;
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
.card_img:hover {
  cursor: pointer;
}
</style>
