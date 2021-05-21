<template>
  <div class="container">
    <v-dialog v-model="avatarDialoge" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New Avatar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <img ref="source" :src="objectUrl" class="image-preview" />
            <v-col cols="12">
              <v-file-input
                v-model="avatar"
                prepend-icon="mdi-camera"
                chips
                show-size
                outlined
                dense
                accept="image/png, image/jpeg, image/jpg"
                @change="setupCropper"
                placeholder="Click here "
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
            :disabled="!objectUrl"
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
import Cropper from 'cropperjs';

export default {
  props: ['avatarDialog'],
  data: () => ({
    avatar: null,
    avatarDialoge: true,
    pictureRules: [(v) => !!v || v.size < 2000000 || "Avartar's size should be less than 2 MB!"],
    cropper: null,
    objectUrl: null,
    previewCropped: null,
  }),

  methods: {
    ...mapActions(['users/updateAvatar']),

    CloseDialog() {
      this.avatarDialoge = false;
      this.$emit('update:closedialog', false);
    },
    UpdateAvatar() {
      const canvas = this.cropper.getCroppedCanvas();

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('file', blob, this.avatar.name);
        this['users/updateAvatar'](formData.entries().next().value[1]);
      });
    },
    setupCropper(avatar) {
      if (this.cropper) {
        this.cropper.destroy();
      }
      if (this.objectUrl) {
        window.URL.revokeObjectURL(this.objectUrl);
      }
      if (!avatar) {
        this.cropper = null;
        this.objectUrl = null;
        this.previewCropped = null;
        return;
      }
      this.objectUrl = window.URL.createObjectURL(avatar);
      this.$nextTick(this.setupCropperInstance);
    },
    setupCropperInstance() {
      this.cropper = new Cropper(this.$refs.source, {
        aspectRatio: 1,
        crop: this.debouncedUpdatePreview,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  display: inline-block;
}
.image-preview {
  display: block;
  max-width: 200px;
}
.cropper-modal {
  background-color: #ffffff;
  opacity: 0.5;
}
</style>
