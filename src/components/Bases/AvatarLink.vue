<template>
  <div>
    <template>
      <router-link :to="{ name: name_path, params: { userName: user_name } }">
        <v-btn icon small v-on="on" v-bind="attrs">
          <v-avatar v-if="avatar_uri" :height="`${size}`" :width="`${size}`">
            <img :src="`${url}${avatar_uri}`" />
          </v-avatar>
          <img v-else src="https://s.svgbox.net/loaders.svg?ic=bars&fill=fff" width="20" height="20" />
        </v-btn>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    name_path: { type: String, require: true },
    user_name: { type: String, require: true },
    size: { type: Number, require: true },
    avatar_uri: { type: String, require: true },
    on: { require: false },
    attrs: { require: false },
  },
  data: () => {
    return {
      url: process.env.VUE_APP_API_URI,
    };
  },
};
</script>
