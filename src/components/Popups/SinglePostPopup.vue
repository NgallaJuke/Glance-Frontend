<template>
  <div>
    <v-dialog v-model="dialoge" persistent max-width="75vw">
      <v-card class="grey lighten-5 card">
        <v-toolbar flat class="grey lighten-5">
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseDialog">
            <img src="https://s.svgbox.net/hero-outline.svg?ic=x&fill=000" width="25" height="25" />
          </v-btn>
        </v-toolbar>
        <div class="container grey lighten-5">
          <div class="Post_Info">
            <div class="Post_Info_User">
              <AvatarLink
                class="mx-5"
                name_path="profil"
                :user_name="receivedPost.postOwner.userName"
                :size="50"
                :avatar_uri="receivedPost.postOwner.avatar.substring(62)"
              ></AvatarLink>
              <h4 class="ml-2 mr-10">
                {{ receivedPost.postOwner.userName }}
              </h4>
              <FollowButton
                v-if="receivedPost.postOwner.userName !== account.user.userName"
                class="Post_Info_User_FollowBtn"
                :isfollowed="isFollowed"
                :userid="receivedPost.postOwner._id"
                @follow="FollowUser($event)"
                @unfollow="UnFollowUser($event)"
              ></FollowButton>
            </div>

            <div class="Post_Info_LikeBtn">
              <v-btn color="primary" outlined icon id="like_btn">
                <img
                  v-if="isLiked"
                  @click="DisLikePost(receivedPost._id)"
                  src="https://s.svgbox.net/hero-solid.svg?ic=heart&fill=1976D2"
                  width="25"
                  height="25"
                />
                <img
                  v-else
                  @click="LikePost(receivedPost._id)"
                  src="https://s.svgbox.net/hero-outline.svg?ic=heart&fill=1976D2"
                  width="25"
                  height="25"
                />
              </v-btn>
            </div>
          </div>
          <div class="post_pic">
            <img class="card_img" :src="`${url}posts_pic/${receivedPost.picture[0]}`" alt="postImage" />
          </div>
          <div v-if="comments.status.gettingPostComments">
            <img src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
          </div>
          <div v-else-if="comments.status.CommentFailed">
            <h3 style="color: red">Error fetching comment</h3>
          </div>
          <div class="comments" v-else>
            <div v-for="comment in orderedComments" :key="comment._id" class="comment-list">
              <Comment :comment="comment" @deleteComment="DeleteComment($emit)"></Comment>
            </div>
          </div>
          <div class="make_comment">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="form">
                <div class="input_comment">
                  <v-text-field
                    v-model="comment"
                    :rules="commentRules"
                    label="Comment here"
                    clearable
                    filled
                    dense
                    flat
                    solo
                  ></v-text-field>
                </div>
                <div class="btn_comment">
                  <v-btn :disabled="!valid" outlined color="primary" @click.stop="MakeComment(receivedPost._id)"
                    >Publish</v-btn
                  >
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
import Comment from '@/components/Bases/Comment';
import AvatarLink from '@/components/Bases/AvatarLink';
import FollowButton from '@/components/Bases/FollowButton';
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
    isFollowed: Boolean,
    comment: '',
    valid: false,
    commentRules: [(v) => !!v || 'Comment is required'],
  }),
  components: { Comment, AvatarLink, FollowButton },
  computed: {
    ...mapState({
      account: (state) => state.account,
      comments: (state) => state.comments,
    }),
    ...mapGetters({ orderedComments: 'comments/orderedComments' }),
  },
  methods: {
    ...mapActions(['posts/likePost', 'posts/disLikePost', 'comments/makeComment', 'comments/getAllPostComments']),
    CloseDialog() {
      this.dialoge = false;
      this.$emit('update:closedialog', false);
    },
    async MakeComment(postID) {
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
    FollowUser(even) {
      this.isFollowed = even;
    },
    UnFollowUser(even) {
      this.isFollowed = even;
    },
    LikePost(postID) {
      this['posts/likePost'](postID);
      this.receivedPost.likes.liker.push(this.account.user._id);
      this.isLiked = true;
      this.$emit('likepost', true);
    },
    DisLikePost(postID) {
      this['posts/disLikePost'](postID);
      this.receivedPost.likes.liker.splice(this.receivedPost.likes.liker.indexOf(this.account.user._id), 1);
      this.isLiked = false;
      this.$emit('dislikepost', false);
    },
    DeleteComment(commentID) {
      const index = this.orderedComments.findIndex((f) => f.commentID === commentID);
      this.orderedComments.splice(index, 1);
      this.$emit('deletecomment');
    },
  },
  async created() {
    this.receivedPost = JSON.parse(JSON.stringify(this.post));
    await this['comments/getAllPostComments'](this.receivedPost._id);
  },
  mounted() {
    if (this.receivedPost.likes.liker.includes(this.account.user._id)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
    this.isFollowed = this.account.user.following.includes(this.receivedPost.postOwner._id) ? true : false;
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: 0 10px;
}
.container {
  max-width: 911px;
  padding: 0;
}
.title {
  width: 100%;
}
.spacer {
  margin: 0 10px 0 20px;
}
.Post_Info {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .Post_Info_User {
    display: flex;
    align-items: center;
  }
}
/* .Post_Info h3 {
  display: inline;
  margin: 0 20px;
} */

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
  align-content: flex-start;
  justify-content: center;
}
.btn_comment {
  display: flex;

  justify-content: center;
  width: 15%;
  margin-right: 20px;
}
.input_comment {
  width: 60%;
}
</style>
