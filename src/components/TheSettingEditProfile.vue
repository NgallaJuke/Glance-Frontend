<template>
  <div class="Edit_Profile">
    <div class="Avatar mb-10">
      <AvatarLink
        class="Avatar mr-5"
        v-if="account.user.avatar"
        name_path="profil"
        :user_name="account.user.userName"
        :size="70"
        :avatar_uri="account.user.avatar.slice(account.user.avatar.lastIndexOf('avatars') + 8)"
      ></AvatarLink>
      <v-btn class="ml-5 mr-3 pa-1 px-3" depressed color="primary white--text" @click="ShowDialogUpdateAvatar()"
        >Upload New Avatar</v-btn
      >
      <UpdateAvatar
        v-if="avatarDialog"
        :avatarDialog="avatarDialog"
        @update:closedialog="avatarDialog = $event"
      ></UpdateAvatar>
      <v-btn class="mx-1 pa-1 px-3" depressed color=" grey lighten-3" @click="ResetAvatar()">Delete</v-btn>
    </div>
    <div class="Form_List">
      <div>
        <p class="Label">Displayed Name</p>
        <v-text-field
          class="Text_Field"
          background-color="#E8EAEC"
          :label="account.user.displayName"
          v-model="user.displayName"
          :rules="displayRule"
          clearable
          dense
          filled
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
      <div>
        <p class="Label">Bio</p>
        <v-textarea
          class="Text_Field"
          background-color="#E8EAEC"
          :label="account.user.bio"
          v-model="user.bio"
          :rules="bioRule"
          clearable
          dense
          filled
          flat
          solo
          hide-details
        ></v-textarea>
      </div>
      <div>
        <p class="Label">About Me</p>
        <v-textarea
          class="Text_Field"
          background-color="#E8EAEC"
          :label="account.user.about_user"
          v-model="user.about_user"
          :rules="aboutRule"
          clearable
          dense
          filled
          flat
          solo
          hide-details
        ></v-textarea>
      </div>
      <div>
        <p class="Label">Location</p>
        <v-text-field
          class="Text_Field"
          background-color="#E8EAEC"
          :label="account.user.location"
          v-model="user.location"
          :rules="locationRule"
          clearable
          dense
          filled
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
      <div>
        <p class="Label">Personal Website</p>
        <v-text-field
          class="Text_Field"
          background-color="#E8EAEC"
          :label="account.user.website"
          v-model="user.website"
          :rules="websiteRule"
          clearable
          dense
          filled
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-3" depressed color="primary white--text" @click="UpdateUserInfo()">Save Profil</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AvatarLink from '@/components/Bases/AvatarLink';
import UpdateAvatar from '@/components/Popups/UpdateAvatar';

export default {
  data: () => ({
    user: {
      displayName: '',
      bio: '',
      about_user: '',
      location: '',
      website: '',
    },
    displayRule: [(v) => v.length <= 30 || 'Max 30 characters'],
    bioRule: [(v) => v.length <= 150 || 'Max 150 characters'],
    aboutRule: [(v) => v.length <= 500 || 'Max 500 characters'],
    locationRule: [(v) => v.length <= 60 || 'Max 60 characters'],
    websiteRule: [(v) => v.length <= 60 || 'Max 60 characters'],
    avatarDialog: false,
    url: process.env.VUE_APP_API_URI,
  }),
  components: { AvatarLink, UpdateAvatar },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['users/updateAvatar', 'users/updateUser']),
    ShowDialogUpdateAvatar() {
      if (!this.avatarDialog) this.avatarDialog = true;
    },
    ResetAvatar() {
      this['users/updateAvatar'](null);
    },
    UpdateUserInfo() {
      this['users/updateUser'](this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.Edit_Profile {
  .Avatar {
    display: flex;
  }
  .Form_List {
    font-size: 0.9em;
    font-weight: 700;
    .Label {
      margin: 1.5em 0 0.5em 0;
    }
    .Text_Field {
      font-size: 1em;
      font-weight: 400;
      &:hover {
        box-shadow: 0px 0px 5px $color_primary_light;
      }
      &:focus-within {
        box-shadow: 0px 0px 5px $color_primary;
        border: 1.5px solid $color_primary;
      }
    }
  }
}
</style>
