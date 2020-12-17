<template>
  <div>
    <v-dialog v-model="dialoge" persistent max-width="90vw">
      <v-card>
        <v-toolbar flat class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn icon @click="CloseDialog">
            <img src="https://s.svgbox.net/hero-outline.svg?ic=x&fill=000" width="25" height="25"
          /></v-btn>
        </v-toolbar>
        <div class="container">
          <h3 class="headline title">{{ post._id }}</h3>
          <h3 class="headline title">{{ post.postOwner.userName }}</h3>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: { type: Boolean, required: true },
    post: { type: Object, required: true },
  },
  data: () => ({
    dialoge: true,
  }),
  methods: {
    CloseDialog() {
      this.dialoge = false;
      this.$emit('update:closedialog', false);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: rgb(201, 201, 201);
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.title {
  width: 100%;
}
</style>
