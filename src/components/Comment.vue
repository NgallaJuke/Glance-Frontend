<template>
  <div>
    <div class="container">
      <div class="avatar">
        <router-link :to="{ name: 'profil', params: { userName: comment.user.userName } }">
          <v-btn icon>
            <v-avatar size="45" v-if="comment.user.avatar">
              <img :src="`${url}avatars/${comment.user.avatar.substring(62)}`" alt="Ava" />
            </v-avatar>
            <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="22" height="22" />
          </v-btn>
        </router-link>
      </div>
      <div class="user_comment">
        <div class="user_options">
          <h3>
            {{ comment.user.userName }}
          </h3>

          <ul class="option_list">
            <li class="btn">
              <v-btn small icon>
                <img
                  v-if="isLiked"
                  src="https://s.svgbox.net/hero-solid.svg?ic=heart&fill=1976D2"
                  width="22"
                  height="22"
                />
                <img v-else src="https://s.svgbox.net/hero-outline.svg?ic=heart&fill=1976D2" width="22" height="22" />
              </v-btn>
              <h5 id="like_count">{{ comment.likes.count }}</h5>
            </li>
            <li class="btn" v-if="comment.user._id === account.user._id">
              <v-btn small icon @click="DeleteComment()">
                <img src="https://s.svgbox.net/materialui.svg?ic=delete_outline&fill=red" width="22" height="22" />
              </v-btn>
            </li>
          </ul>
        </div>
        <div class="comment">
          <p>{{ comment.comment }}</p>
        </div>
        <div class="comment">
          <span>00h</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    comment: { type: Object, required: true },
  },
  data: () => ({ url: process.env.VUE_APP_API_URI, isLiked: Boolean }),
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['comments/deleteComment']),
    DeleteComment() {
      const payload = {
        postID: this.comment.post,
        commentID: this.comment._id,
      };
      this['comments/deleteComment'](payload);
      this.$emit('deleteComment', this.comment._id);
    },
  },
  created() {
    if (this.comment.likes.liker.includes(this.account.user._id)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  },
  mounted() {},
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
}

.avatar {
  display: flex;
  padding-top: 10px;
  justify-content: center;
  width: 8%;
}

.user_comment {
  width: 88%;
}

.user_options {
  display: inline;
  display: flex;
  justify-content: space-between;
}

.user_options h3 {
  padding: 0;
  margin: 0;
}

.comment {
  padding: 0;
  margin: 0;
}
.comment p {
  margin: 0;
}
.comment span {
  font-size: 12px;
  color: rgb(141, 141, 141);
}
.option_list {
  display: flex;
  list-style-type: none;
}
.btn {
  text-decoration: none;
  padding: 0 5px;
  display: flex;
  align-items: center;
}
#like_count {
  display: inline;
  margin-left: 3px;
}
</style>
