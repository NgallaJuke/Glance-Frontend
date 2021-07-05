<template>
  <div>
    <v-card class="PostCard mx-auto ma-0 pa-0" max-width="325" elevation="0">
      <v-img
        class="card_img"
        :src="`${url}posts_pic/${receivedPost.picture[0]}`"
        @click="ShowDialog(post)"
        alt="postImage"
        height="370"
        width="325"
      ></v-img>
      <v-toolbar class="grey lighten-5" flat max-width="325" height="45">
        <AvatarLink
          class="mr-1"
          name_path="profil"
          :user_name="receivedPost.postOwner.userName"
          :size="25"
          :avatar_uri="receivedPost.postOwner.avatar.slice(receivedPost.postOwner.avatar.lastIndexOf('avatars') + 8)"
        ></AvatarLink>
        <h4>{{ receivedPost.postOwner.userName | capitalize }}</h4>
        <v-spacer></v-spacer>
        <v-btn icon small>
          <img src="https://s.svgbox.net/hero-outline.svg?ic=annotation&fill=1976D2" width="20" height="20" />
        </v-btn>
        <h5 class="mr-2">{{ receivedPost.comments.count }}</h5>
        <v-btn icon small>
          <img
            v-if="isLiked"
            @click="DisLikePost(receivedPost)"
            @update:likepost="isLiked = $event"
            src="https://s.svgbox.net/hero-solid.svg?ic=heart&fill=1976D2"
            width="20"
            height="20"
          />
          <img
            v-else
            @click="LikePost(receivedPost)"
            src="https://s.svgbox.net/hero-outline.svg?ic=heart&fill=1976D2"
            width="20"
            height="20"
          />
        </v-btn>
        <h5>{{ receivedPost.likes.count }}</h5>
        <img
          class="ml-2 mr-1"
          src="https://s2.svgbox.net/hero-outline.svg?ic=eye&color=1976D2"
          width="20"
          height="20"
        />
        <h5 v-if="receivedPost.viewedBy && receivedPost.viewedBy.length > 0">
          {{ Views }}
        </h5>
        <h5 v-else>0</h5>
      </v-toolbar>
    </v-card>
    <SinglePostPopup
      v-if="dialog"
      :closedialog="dialog"
      :dialog="dialog"
      :post="receivedPost"
      @update:closedialog="dialog = $event"
      @likepost="LikePostEmited($event)"
      @dislikepost="DislikePostEmited($event)"
      @commentpost="CommentPostEmited($event)"
      @deletecomment="DeleteComment()"
    ></SinglePostPopup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SinglePostPopup from './Popups/SinglePostPopup';
import AvatarLink from '@/components/Bases/AvatarLink';
export default {
  props: { post: { type: Object, required: true } },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    dialog: false,
    isLiked: Boolean,
    receivedPost: Object,
  }),
  components: { SinglePostPopup, AvatarLink },
  computed: {
    ...mapState({
      posts: (state) => state.posts,
      account: (state) => state.account,
    }),
    Views() {
      if (this.receivedPost.viewedBy) {
        return Math.abs(this.receivedPost.viewedBy.length) > 999
          ? Math.sign(this.receivedPost.viewedBy.length) *
              (Math.abs(this.receivedPost.viewedBy.length) / 1000).toFixed(1) +
              'k'
          : Math.abs(this.receivedPost.viewedBy.length) > 999999
          ? Math.sign(this.receivedPost.viewedBy.length) *
              (Math.abs(this.receivedPost.viewedBy.length) / 1000000).toFixed(1) +
            'm'
          : Math.sign(this.receivedPost.viewedBy.length) * Math.abs(this.receivedPost.viewedBy.length);
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions(['posts/likePost', 'posts/disLikePost']),

    LikePost(receivedPost) {
      this['posts/likePost'](receivedPost._id);
      this.isLiked = true;
      this.receivedPost.likes.count++;
      this.receivedPost.likes.liker.push(this.account.user._id);
    },
    DisLikePost(receivedPost) {
      this['posts/disLikePost'](receivedPost._id);
      this.isLiked = false;
      this.receivedPost.likes.count--;
      this.receivedPost.likes.liker.splice(this.receivedPost.likes.liker.indexOf(this.account.user._id), 1);
    },
    LikePostEmited($event) {
      this.isLiked = $event;
      this.receivedPost.likes.count++;
      this.receivedPost.likes.liker.push(this.account.user._id);
    },
    DislikePostEmited($event) {
      this.isLiked = $event;
      this.receivedPost.likes.count--;
      this.receivedPost.likes.liker.splice(this.receivedPost.likes.liker.indexOf(this.account.user._id), 1);
    },
    CommentPostEmited($event) {
      this.receivedPost.comments.comment.push($event);
      this.receivedPost.comments.count++;
    },
    DeleteComment() {
      this.receivedPost.comments.count--;
    },
    ShowDialog(post) {
      this.post = post;
      if (!this.dialog) this.dialog = true;
    },
  },
  created() {
    this.receivedPost = JSON.parse(JSON.stringify(this.post));
  },
  mounted() {
    this.isLiked = this.receivedPost.likes.liker.includes(this.account.user._id) ? true : false;
  },
};
</script>

<style lang="scss" scoped>
.PostCard {
  border-radius: $border_radius;
  .card_img {
    border-radius: $border_radius;
  }
  .card_img:hover {
    cursor: pointer;
  }
}
</style>
