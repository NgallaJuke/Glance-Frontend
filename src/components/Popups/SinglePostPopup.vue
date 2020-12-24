<template>
  <div>
    <v-dialog v-model="dialoge" persistent max-width="90vw">
      <v-card class="grey lighten-3">
        <v-toolbar flat class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseDialog">
            <img src="https://s.svgbox.net/hero-outline.svg?ic=x&fill=000" width="25" height="25" />
          </v-btn>
        </v-toolbar>
        <div class="container">
          <div class="user_details">
            <router-link :to="{ name: 'profil', params: { userName: recevidPost.postOwner.userName } }">
              <v-btn icon class="spacer">
                <v-avatar size="60" v-if="recevidPost.postOwner.avatar">
                  <img :src="`${url}avatars/${recevidPost.postOwner.avatar.substring(62)}`" alt="Ava" />
                </v-avatar>
                <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
              </v-btn>
            </router-link>
            <h3>
              {{ recevidPost.postOwner.userName }}
            </h3>
            <v-btn
              v-if="
                !recevidPost.postOwner.follower.includes(account.user._id) &&
                account.user._id != recevidPost.postOwner._id
              "
              small
              color="primary"
              outlined
              @click="
                FollowUser(recevidPost.postOwner._id);
                recevidPost.postOwner.follower.push(account.user._id);
              "
            >
              Follow
            </v-btn>
            <v-btn
              v-else-if="
                recevidPost.postOwner.follower.includes(account.user._id) &&
                account.user._id != recevidPost.postOwner._id
              "
              small
              color="red"
              outlined
              @click="
                UnFollowUser(recevidPost.postOwner._id);
                recevidPost.postOwner.follower.splice(recevidPost.postOwner.follower.indexOf(account.user._id), 1);
              "
            >
              UnFollow
            </v-btn>
            <v-btn color="primary" depressed rounded outlined small id="like_btn">
              <img
                v-if="isLiked"
                @click="disLikePost(recevidPost._id)"
                src="https://s.svgbox.net/hero-solid.svg?ic=heart&fill=1976D2"
                width="25"
                height="25"
              />
              <img
                v-else
                @click="likePost(recevidPost._id)"
                src="https://s.svgbox.net/hero-outline.svg?ic=heart&fill=1976D2"
                width="25"
                height="25"
              />
            </v-btn>
          </div>
          <div class="post_pic">
            <img
              class="card_img"
              :src="`${url}posts_pic/${recevidPost.picture[0]}`"
              @click="ShowDialog(post)"
              alt="postImage"
            />
          </div>
          <div class="comments"></div>
          <div class="make_comment">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="comment" :rules="commentRules" label="Comment" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate"> Validate </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    dialog: { type: Boolean, required: true },
    post: { type: Object, required: true },
  },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    dialoge: true,
    isLiked: Boolean,
    recevidPost: Object,
    comment: '',
    valid: false,
    commentRules: [(v) => !!v || 'Comment is required'],
  }),
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['posts/likePost', 'posts/disLikePost', 'users/followUser', 'users/unfollowUser']),
    CloseDialog() {
      this.dialoge = false;
      this.$emit('update:closedialog', false);
    },
    validate() {
      this.$refs.form.validate();
    },
    FollowUser(userID) {
      this['users/followUser'](userID);
    },
    UnFollowUser(userID) {
      this['users/unfollowUser'](userID);
    },
    likePost(postID) {
      this['posts/likePost'](postID);
      this.recevidPost.likes.liker.push(this.account.user._id);
      this.isLiked = true;
      this.$emit('likepost', true);
    },
    disLikePost(postID) {
      this['posts/disLikePost'](postID);
      this.recevidPost.likes.liker.splice(this.recevidPost.likes.liker.indexOf(this.account.user._id), 1);
      this.isLiked = false;
      this.$emit('dislikepost', false);
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
.container {
  box-sizing: border-box;
  background-color: #eeeeee;
  width: 100%;
  padding: 0 20px;
}
.title {
  width: 100%;
}
.spacer {
  margin: 0 10px 0 20px;
}
.user_details {
  border-bottom: #000 solid 2px;
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
  border-bottom: #000 solid 2px;
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
  border-bottom: #000 solid 2px;
  min-height: 10vh;
  max-height: 40vh;
  width: 100%;
  overflow: hidden;
}
.make_comment {
  height: 100px;
  width: 100%;
}
</style>
