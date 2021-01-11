<template>
  <div>
    <v-dialog v-model="dialoge" persistent max-width="75vw">
      <v-card class="grey lighten-3 card">
        <v-toolbar flat class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseDialog">
            <img src="https://s.svgbox.net/hero-outline.svg?ic=x&fill=000" width="25" height="25" />
          </v-btn>
        </v-toolbar>
        <div class="container">
          <div class="user_details">
            <router-link :to="{ name: 'profil', params: { userName: receivedPost.postOwner.userName } }">
              <v-btn icon class="spacer">
                <v-avatar size="60" v-if="receivedPost.postOwner.avatar">
                  <img :src="`${url}avatars/${receivedPost.postOwner.avatar.substring(62)}`" alt="Ava" />
                </v-avatar>
                <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
              </v-btn>
            </router-link>
            <h3>
              {{ receivedPost.postOwner.userName }}
            </h3>
            <v-btn
              v-if="
                !receivedPost.postOwner.follower.includes(account.user._id) &&
                account.user._id != receivedPost.postOwner._id
              "
              small
              color="primary"
              outlined
              @click="
                FollowUser(receivedPost.postOwner._id);
                receivedPost.postOwner.follower.push(account.user._id);
              "
            >
              Follow
            </v-btn>
            <v-btn
              v-else-if="
                receivedPost.postOwner.follower.includes(account.user._id) &&
                account.user._id != receivedPost.postOwner._id
              "
              small
              color="red"
              outlined
              @click="
                UnFollowUser(receivedPost.postOwner._id);
                receivedPost.postOwner.follower.splice(receivedPost.postOwner.follower.indexOf(account.user._id), 1);
              "
            >
              UnFollow
            </v-btn>
            <v-btn color="primary" outlined icon id="like_btn">
              <img
                v-if="isLiked"
                @click="disLikePost(receivedPost._id)"
                src="https://s.svgbox.net/hero-solid.svg?ic=heart&fill=1976D2"
                width="25"
                height="25"
              />
              <img
                v-else
                @click="likePost(receivedPost._id)"
                src="https://s.svgbox.net/hero-outline.svg?ic=heart&fill=1976D2"
                width="25"
                height="25"
              />
            </v-btn>
          </div>
          <div class="post_pic">
            <img
              class="card_img"
              :src="`${url}posts_pic/${receivedPost.picture[0]}`"
              @click="ShowDialog(post)"
              alt="postImage"
            />
          </div>
          <div v-if="comments.status.gettingPostComments">
            <img src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
          </div>

          <div v-else-if="comments.status.CommentFailed">
            <h3 style="color: red">Error fetching comment</h3>
          </div>
          <div class="comments" v-else>
            <div v-for="(comment, index) in orderedComments" :key="index" class="comment-list">
              <Comment :comment="comment"></Comment>
            </div>
          </div>
          <div class="make_comment">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="form">
                <div class="btn_comment">
                  <v-btn :disabled="!valid" color="primary" @click.stop="makeComment(receivedPost._id)">Publish</v-btn>
                </div>
                <div class="input_comment">
                  <v-text-field v-model="comment" :rules="commentRules" label="Comment" required></v-text-field>
                </div>
              </div>
            </v-form>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Comment from '../Comment';
export default {
  props: {
    dialog: { type: Boolean, required: true },
    post: { type: Object, required: true },
  },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    dialoge: true,
    isLiked: Boolean,
    receivedPost: Object,
    comment: '',
    valid: false,
    commentRules: [(v) => !!v || 'Comment is required'],
  }),
  components: { Comment },
  computed: {
    ...mapState({
      account: (state) => state.account,
      comments: (state) => state.comments,
    }),
    ...mapGetters({ orderedComments: 'comments/orderedComments' }),
  },
  methods: {
    ...mapActions([
      'posts/likePost',
      'posts/disLikePost',
      'comments/makeComment',
      'comments/getAllPostComments',
      'users/followUser',
      'users/unfollowUser',
    ]),
    CloseDialog() {
      this.dialoge = false;
      this.$emit('update:closedialog', false);
    },
    async makeComment(postID) {
      this.$refs.form.validate();
      const payload = {
        comment: this.comment,
        postID,
        user: { _id: this.account.user._id, userName: this.account.user.userName, avatar: this.account.user.avatar },
      };
      await this['comments/makeComment'](payload);
      this.receivedPost.comments.comment.push(this.comments.comment[this.comments.comment.length - 1]);
      this.$emit('commentpost', this.comments.comment[this.comments.comment.length - 1]._id);
      this.$refs.form.reset();
    },
    FollowUser(userID) {
      this['users/followUser'](userID);
    },
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
    },
    likePost(postID) {
      this['posts/likePost'](postID);
      this.receivedPost.likes.liker.push(this.account.user._id);
      this.isLiked = true;
      this.$emit('likepost', true);
    },
    disLikePost(postID) {
      this['posts/disLikePost'](postID);
      this.receivedPost.likes.liker.splice(this.receivedPost.likes.liker.indexOf(this.account.user._id), 1);
      this.isLiked = false;
      this.$emit('dislikepost', false);
    },
  },
  created() {
    this.receivedPost = JSON.parse(JSON.stringify(this.post));
    this['comments/getAllPostComments'](this.receivedPost._id);
  },
  mounted() {
    if (this.receivedPost.likes.liker.includes(this.account.user._id)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  },
};
</script>

<style scoped>
.card {
  background-color: #eeeeee;
  width: 100%;
  padding: 0 10px;
}
.container {
  background-color: #eeeeee;
  max-width: 911px;
  padding: 0;
}
.title {
  width: 100%;
}
.spacer {
  margin: 0 10px 0 20px;
}
.user_details {
  height: 80px;
  width: 100%;
}
.user_details h3 {
  display: inline;
  margin: 0 20px;
}
#like_btn {
  float: right;
}
.post_pic {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 15px;
}
.card_img {
  display: block;
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
}
.comments {
  min-height: 10vh;
  max-height: 40vh;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;

  margin-top: 25px;
}
.comment_list {
  position: relative;
  background-color: rgb(238, 135, 135);
}
.make_comment {
  height: 100px;
  width: 100%;
  margin-top: 50px;
}
.form {
  width: 100%;
  display: flex;
  align-content: center;
}
.btn_comment {
  display: flex;
  align-self: center;
  justify-content: center;
  width: 15%;
  margin-right: 20px;
}
.input_comment {
  width: 75%;
}
</style>
