<template>
  <div class="container">
    <v-dialog v-model="dialoge" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col cols="12">
              <v-file-input
                :rules="pictureRules"
                v-model="post.pictures"
                prepend-icon="mdi-camera"
                chips
                show-size
                outlined
                dense
                accept="image/png, image/jpeg, image/jpg"
                label="Picture"
                placeholder="Pick a picture"
                required
              ></v-file-input>
              <v-text-field
                prepend-icon="mdi-border-color"
                v-model="post.description"
                :rules="descriptionRules"
                outlined
                dense
                label="Description"
                placeholder="Add a description"
                required
              ></v-text-field>
            </v-col>

            <!--
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col> -->
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
export default {
  props: ['dialog'],
  data: () => ({
    post: {
      pictures: null,
      description: '',
    },
    dialoge: true,
    pictureRules: [(v) => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!'],
    descriptionRules: [(v) => !!v || 'the description is required!'],
  }),
  methods: {
    CloseDialog() {
      this.dialoge = false;
      this.$emit('update:closedialog', false);
    },
    CreatePost() {
      console.log('Post Created');
      console.log('Post Picture', this.post.pictures);
      console.log('Post Descrition', this.post.description);
    },
  },
};
</script>
