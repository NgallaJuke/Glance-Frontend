<template>
  <div class="container">
    <v-dialog v-model="avatarDialoge" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New Avatar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col cols="12">
              <v-file-input
                v-model="avatar"
                prepend-icon="mdi-camera"
                chips
                show-size
                outlined
                dense
                multiple
                accept="image/png, image/jpeg, image/jpg"
                label="Avatar"
                placeholder="Pick a avatar"
                required
              ></v-file-input>
            </v-col>
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
              UpdateAvatar();
            "
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['avatarDialog'],
  data: () => ({
    avatar: null,
    avatarDialoge: true,
    pictureRules: [(v) => !!v || v.size < 2000000 || "Avartar's size should be less than 2 MB!"],
  }),

  methods: {
    ...mapActions(['users/updateAvatar']),

    CloseDialog() {
      this.avatarDialoge = false;
      this.$emit('update:closedialog', false);
    },
    UpdateAvatar() {
      this['users/updateAvatar'](this.avatar);
    },
  },
};
</script>
