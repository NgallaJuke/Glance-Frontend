<template>
  <div class="Edit_Password">
    <div class="Form_List">
      <div>
        <p class="Label">Current Password</p>
        <v-text-field
          class="Text_Field"
          filled
          background-color="#E8EAEC"
          dense
          flat
          solo
          hide-details
          v-model="user.oldPassword"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          hint="At least 6 characters"
          label="Current"
          counter
          @click:append="show1 = !show1"
          required
        ></v-text-field>
      </div>
      <div>
        <p class="Label">New Password</p>
        <v-text-field
          class="Text_Field"
          filled
          background-color="#E8EAEC"
          dense
          flat
          solo
          hide-details
          v-model="user.newPassword"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          hint="At least 6 characters"
          label="New"
          counter
          @click:append="show1 = !show1"
          required
        ></v-text-field>
      </div>
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-2" depressed color="primary white--text" @click="ChangePassword()">Change</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    valid: true,
    user: { oldPassword: '', newPassword: '' },
    show1: false,
    show2: false,
    passwordRules: [(v) => v.length >= 6 || 'Min 6 characters'],
  }),

  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },

  methods: {
    ...mapActions(['account/changePassword']),

    submit() {
      if (this.$refs.form.validate()) {
        // this.login(this.user);
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    ChangePassword() {
      this['account/changePassword'](this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.Edit_Password {
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
