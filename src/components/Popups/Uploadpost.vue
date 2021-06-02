<template>
  <div class="container">
    <v-dialog v-model="dialoge" persistent max-width="600px">
      <v-card>
        <v-card-title align="center">
          <span class="headline">New Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-file-input
              v-model="post.pictures"
              prepend-icon="mdi-camera"
              chips
              show-size
              outlined
              dense
              multiple
              accept="image/png, image/jpeg, image/jpg"
              placeholder="Pick A Picture"
              required
            ></v-file-input>
            <v-text-field
              prepend-icon="mdi-border-color"
              v-model="post.description"
              :rules="descriptionRules"
              outlined
              dense
              placeholder="Description"
              required
            ></v-text-field>
            <div><h4>recommanded tag: please select a tag to help the post be more populare</h4></div>
            <v-row class="mt-2" align="center">
              <v-chip-group column multiple v-model="selectedTag" active-class="primary--text">
                <v-chip v-for="(tag, i) in tags" :value="tag" :key="i">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="CloseDialog">Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              CloseDialog();
              CreatePost();
            "
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: ['dialog'],
  data: () => ({
    post: {
      pictures: null,
      description: '',
    },
    dialoge: true,
    // pictureRules: [(v) => !!v || v.size < 2000000 || 'Picture"s size should be less than 2 MB!'],
    descriptionRules: [(v) => !!v || 'the description is required!'],
    tags: ['Illustration', 'Graphic Design', 'Photography', 'Branding'],
    selectedTag: [],
  }),
  computed: {
    ...mapState({
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions('posts', ['createpost']),

    CloseDialog() {
      this.dialoge = false;
      this.$emit('update:closedialog', false);
    },
    CreatePost() {
      this.createpost(this.post);
    },
    showSelected() {
      console.log(`this.selectedTag`, this.selectedTag);
    },
  },
  watch: {
    selectedTag: 'showSelected',
  },
};
</script>
