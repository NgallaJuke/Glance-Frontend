<template>
  <div>
    <v-card class="mx-auto" max-width="325" style="border-radius: 15px 15px 0 0">
      <v-img
        class="card_img"
        :src="`${url}posts_pic/${recevidPost.picture[0]}`"
        @click="ShowDialog(post)"
        alt="postImage"
        height="370"
        width="325"
      ></v-img>
      <v-toolbar class="grey lighten-4" flat max-width="325">
        <router-link :to="{ name: 'profil', params: { userName: recevidPost.postOwner.userName } }">
          <v-btn icon>
            <v-avatar size="40" v-if="recevidPost.postOwner.avatar">
              <img :src="`${url}avatars/${recevidPost.postOwner.avatar.substring(62)}`" />
            </v-avatar>
            <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
          </v-btn>
        </router-link>

        <h4>{{ recevidPost.postOwner.userName }}</h4>
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
            v-if="isLiked"
            @click="disLikePost(recevidPost)"
            @update:likepost="isLiked = $event"
            src="https://s.svgbox.net/hero-solid.svg?ic=heart&fill=1976D2"
            width="25"
            height="25"
          />
          <img
            v-else
            @click="likePost(recevidPost)"
            src="https://s.svgbox.net/hero-outline.svg?ic=heart&fill=1976D2"
            width="25"
            height="25"
          />
        </v-btn>
        <h5>{{ recevidPost.likes.count }}</h5>
      </v-toolbar>
    </v-card>
    <div
      v-if="dialog"
      :closedialog="dialog"
      :dialog="dialog"
      :post="recevidPost"
      @update:closedialog="dialog = $event"
      @likepost="likePostEmited($event)"
      @dislikepost="dislikePostEmited($event)"
      :is="dialogComp"
    ></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SinglePostPopup from './Popups/SinglePostPopup';
export default {
  props: { post: { type: Object, required: true } },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    dialogComp: SinglePostPopup,
    dialog: false,
    isLiked: Boolean,
    recevidPost: Object,
  }),
  computed: {
    ...mapState({
      posts: (state) => state.posts,
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['posts/likePost', 'posts/disLikePost']),
    likePost(recevidPost) {
      this['posts/likePost'](recevidPost._id);
      this.isLiked = true;
      this.recevidPost.likes.count++;
      this.recevidPost.likes.liker.push(this.account.user._id);
    },
    disLikePost(recevidPost) {
      this['posts/disLikePost'](recevidPost._id);
      this.isLiked = false;
      this.recevidPost.likes.count--;
      this.recevidPost.likes.liker.splice(this.recevidPost.likes.liker.indexOf(this.account.user._id), 1);
    },
    likePostEmited($event) {
      this.isLiked = $event;
      this.recevidPost.likes.count++;
      this.recevidPost.likes.liker.push(this.account.user._id);
    },
    dislikePostEmited($event) {
      this.isLiked = $event;
      this.recevidPost.likes.count--;
      this.recevidPost.likes.liker.splice(this.recevidPost.likes.liker.indexOf(this.account.user._id), 1);
    },
    ShowDialog(post) {
      this.post = post;
      if (!this.dialog) this.dialog = true;
    },
  },
  created() {
    this.recevidPost = JSON.parse(JSON.stringify(this.post));
  },
  mounted() {
    if (this.recevidPost.likes.liker.includes(this.account.user._id)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  },
};
</script>

<style scoped>
.card_img:hover {
  cursor: pointer;
}
</style>
