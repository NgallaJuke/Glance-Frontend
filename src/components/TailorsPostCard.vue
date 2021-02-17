<template>
  <div>
    <v-sheet depressed v-if="timelineLimited.length > 0" class="mx-auto grey lighten-3" max-width="1000">
      <v-slide-group depressed>
        <v-slide-item depressed v-for="post in timelineLimited" :key="post._id">
          <v-card class="ma-3 card_img" max-width="200" style="border-radius: 10px">
            <v-img
              :src="`${url}posts_pic/${post.picture[0]}`"
              @click="ShowDialog(post)"
              alt="postImage"
              height="227.7"
              width="200"
              style="border-radius: 10px"
            ></v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div style="width: 100px" v-else>Has Not Posted yet</div>
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
import SinglePostPopup from './Popups/SinglePostPopup';
export default {
  props: { userName: { type: String, required: true } },
  data: () => ({
    url: process.env.VUE_APP_API_URI,
    dialogComp: SinglePostPopup,
    dialog: false,
    timelineLimited: Array,
  }),
  computed: {
    ...mapState({
      account: (state) => state.account,
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions(['posts/getPostFeed']),
    ShowDialog(post) {
      this.post = post;
      if (!this.dialog) this.dialog = true;
    },
  },
  async created() {
    const payload = {
      timeline: 'home-timeline',
      userName: this.userName,
      limit: 10, //limit of postfeed can be a number or 'all'
    };
    await this['posts/getPostFeed'](payload);

    if (this.posts.timeline) {
      this.timelineLimited = JSON.parse(JSON.stringify(this.posts.timeline));
    }
  },
};
</script>

<style scoped>
.card_img:hover {
  cursor: pointer;
}
</style>
