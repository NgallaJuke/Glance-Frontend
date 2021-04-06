<template>
  <div class="Edit_Profile">
    <div class="Avatar mb-10">
      <AvatarLink
        class="Avatar mr-5"
        v-if="account.user.avatar"
        name_path="profil"
        :user_name="account.user.userName"
        :size="70"
        :avatar_uri="account.user.avatar.substring(62)"
      ></AvatarLink>
      <v-btn class="ml-5 mr-3 pa-1 px-3" depressed color="primary white--text">Upload New Avatar</v-btn>
      <UpdateAvatar
        v-if="dialog"
        :closedialog="dialog"
        :avatarDialog="dialog"
        :post="receivedPost"
        @update:closedialog="dialog = $event"
      ></UpdateAvatar>
      <v-btn class="mx-1 pa-1 px-3" depressed color=" grey lighten-3">Delete</v-btn>
    </div>
    <div class="Form_List">
      <div>
        <p class="Label">Name</p>
        <v-text-field
          class="Text_Field"
          label="Change Your Displayed User Name"
          clearable
          filled
          dense
          flat
          solo
        ></v-text-field>
      </div>
      <div>
        <p class="Label">Bio</p>
        <v-textarea class="Text_Field" label="Change Your Bio " clearable filled flat solo></v-textarea>
      </div>
      <div>
        <p class="Label">Location</p>
        <v-text-field class="Text_Field" label="Change Your Location" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <p class="Label">Personal Website</p>
        <v-text-field
          class="Text_Field"
          label="Add Your Personal Website"
          clearable
          filled
          dense
          flat
          solo
        ></v-text-field>
      </div>
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-3" depressed color="primary white--text">Save Profil</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AvatarLink from '@/components/Bases/AvatarLink';
import UpdateAvatar from '@/components/Popups/UpdateAvatar';

export default {
  data: () => ({
    dialog: false,
    url: process.env.VUE_APP_API_URI,
  }),
  components: { AvatarLink, UpdateAvatar },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
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
    .Text_Field {
      font-size: 1em;
      font-weight: 400;
    }
  }
}
</style>
