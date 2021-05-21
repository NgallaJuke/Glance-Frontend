<template>
  <div class="Edit_Socials">
    <div class="Form_List">
      <div>
        <div class="Social mb-2">
          <p class="Label">Twitter</p>
          <img class="Icon ml-2" src="@/assets/Icons/twitter.svg" />
        </div>
        <v-text-field
          class="Text_Field"
          :label="account.user.socials.twitter"
          v-model="user.socials.twitter"
          :rules="socialRule"
          filled
          dense
          flat
          solo
          hide-details
          clearable
          background-color="#f3f3f4"
        ></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Facebook</p>
          <img class="Icon ml-2" src="@/assets/Icons/facebook.svg" />
        </div>
        <v-text-field
          class="Text_Field"
          :label="account.user.socials.facebook"
          v-model="user.socials.facebook"
          :rules="socialRule"
          clearable
          background-color="#f3f3f4"
          filled
          dense
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Instagram</p>
          <img class="Icon ml-2" src="@/assets/Icons/instagram.svg" />
        </div>
        <v-text-field
          class="Text_Field"
          :label="account.user.socials.instagram"
          v-model="user.socials.instagram"
          :rules="socialRule"
          clearable
          background-color="#f3f3f4"
          filled
          dense
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Github</p>
          <img class="Icon ml-2" src="@/assets/Icons/github.svg" />
        </div>
        <v-text-field
          class="Text_Field"
          :label="account.user.socials.github"
          v-model="user.socials.github"
          :rules="socialRule"
          clearable
          background-color="#f3f3f4"
          filled
          dense
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">LinkedIn</p>
          <img class="Icon ml-2" src="@/assets/Icons/linkedin.svg" />
        </div>
        <v-text-field
          class="Text_Field"
          :label="account.user.socials.linkedin"
          v-model="user.socials.linkedin"
          :rules="socialRule"
          clearable
          background-color="#f3f3f4"
          filled
          dense
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Dribbble</p>
          <img class="Icon ml-2" src="@/assets/Icons/dribbble.svg" />
        </div>
        <v-text-field
          class="Text_Field"
          :label="account.user.socials.dribbble"
          v-model="user.socials.dribbble"
          :rules="socialRule"
          clearable
          background-color="#f3f3f4"
          filled
          dense
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Behance</p>
          <img class="Icon ml-2" src="@/assets/Icons/behance.svg" />
        </div>
        <v-text-field
          class="Text_Field"
          :label="account.user.socials.behance"
          v-model="user.socials.behance"
          :rules="socialRule"
          clearable
          background-color="#f3f3f4"
          filled
          dense
          flat
          solo
          hide-details
        ></v-text-field>
      </div>
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-2" depressed color="primary white--text" @click="UpdateUserSocialLink()"
        >Change</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    user: {
      socials: {
        twitter: '',
        facebook: '',
        instagram: '',
        github: '',
        linkedin: '',
        dribbble: '',
        behance: '',
      },
    },
    socialRule: [(v) => v.length <= 60 || 'Max 60 characters'],
  }),
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['users/updateUser']),
    UpdateUserSocialLink() {
      this['users/updateUser'](this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.Edit_Socials {
  .Form_List {
    font-size: 0.9em;
    font-weight: 700;
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

    .Social {
      display: flex;
      align-items: center;

      .Label {
        margin: 1.5em 0 0.5em 0;
      }
      .Icon {
        width: 2em;
        margin: 1.5em 0 0.5em 0;
      }
    }
  }
}
</style>
