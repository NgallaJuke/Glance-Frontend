<template>
  <div>
    <v-dialog v-model="dialoge" persistent max-height="50vh" max-width="580px">
      <v-card>
        <v-btn icon @click="CloseDialog()">
          <img src="https://s.svgbox.net/hero-outline.svg?ic=x&fill=000" width="25" height="25" />
        </v-btn>
        <h1>Hire Me !!!</h1>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: { type: Boolean, required: true },
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

<style>
</style>