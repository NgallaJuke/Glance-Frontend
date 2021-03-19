<template>
  <div>
    <v-btn @click="Save(postid)" class="my-1 pa-2 mr-2" depressed color="grey lighten-4">Save</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    postid: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts,
    }),
  },
  methods: {
    //TODO
    ...mapActions(['posts/savepost']),
    Save() {},
  },
};
</script>
