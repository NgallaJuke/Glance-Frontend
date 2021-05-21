<template>
  <div class="Setting_Account">
    <div class="Form_List">
      <div>
        <p class="Label">Email</p>
        <v-text-field
          class="Text_Field"
          :label="account.user.email"
          v-model="user.email"
          :rules="emailRule"
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
    <v-divider></v-divider>
    <div class="Delete_Account pt-5">
      <p>Delete your account and account data</p>
      <v-btn class="ml-10 pa-1 px-3 Delete_Btn" depressed color="error white--text" @click="DeleteAccount()"
        >Delete Account</v-btn
      >
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-3" depressed color="primary white--text" @click="UpdateUserInfo()">Save Change</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    user: { email: '' },
    emailRule: [(v) => !!v || 'E-mail is required'],
  }),
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['users/updateUser', 'account/deleteAccount']),

    UpdateUserInfo() {
      this['users/updateUser'](this.user);
    },

    DeleteAccount() {
      this['account/deleteAccount']();
    },
  },
};
</script>

<style lang="scss" scoped>
.Setting_Account {
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
  .Delete_Account {
    display: flex;

    p {
      margin: 0;
    }
  }
}
</style>
