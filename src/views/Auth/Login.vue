<template>
  <div class="container py-10">
    <slot name="alert"></slot>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        class="Text_Field"
        clearable
        filled
        dense
        flat
        solo
        hide-details
        sololabel="E-mail"
        v-model="user.email"
        :rules="emailRules"
        required
      ></v-text-field>

      <v-text-field
        class="Text_Field"
        clearable
        filled
        dense
        flat
        solo
        hide-details
        counter
        v-model="user.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 6 characters"
        @click:append="show1 = !show1"
        required
      ></v-text-field>
      <p>New user? <router-link to="/register">Register</router-link></p>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" :disabled="!valid" @click="submit">
        <img
          v-if="account.status.loggingIn"
          class="mx-3"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <p class="mb-0" v-else>Login</p>
      </v-btn>

      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
/* import axios from 'axios'; */
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    valid: true,
    user: { email: '', password: '' },
    show1: false,
    emailRules: [(v) => !!v || 'E-mail is required'],
    passwordRules: [(v) => v.length >= 6 || 'Min 6 characters'],
  }),

  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions('account', ['login']),
    submit() {
      if (this.$refs.form.validate()) {
        this.login(this.user);
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.Text_Field {
  font-size: 1em;
  font-weight: 400;
  box-shadow: 0px 0px 10px $color_primary;
}
</style>
