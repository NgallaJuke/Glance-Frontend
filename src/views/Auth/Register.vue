<template>
  <div class="container py-10">
    <slot name="alert"></slot>
    <div>
      <img class="mb-5" src="@/assets/glance_logo_blue.png" alt="Glance" width="200" />
    </div>
    <v-form v-model="valid" ref="form" class="Form" lazy-validation>
      <p class="Label">User Name</p>
      <v-text-field
        class="Text_Field mb-5"
        background-color="#E8EAEC"
        clearable
        filled
        dense
        flat
        solo
        hide-details
        v-model="user.userName"
        :rules="nameRules"
        :counter="20"
        required
      ></v-text-field>
      <p class="Label">E-mail</p>
      <v-text-field
        class="Text_Field mb-5"
        background-color="#E8EAEC"
        clearable
        filled
        dense
        flat
        solo
        hide-details
        v-model="user.email"
        :rules="emailRules"
        required
      ></v-text-field>
      <p class="Label">Profil</p>
      <v-select
        class="Text_Field mb-5"
        background-color="#E8EAEC"
        clearable
        filled
        dense
        flat
        solo
        hide-details
        v-model="user.role"
        :items="role"
        :rules="[(v) => !!v || 'Profil is required']"
        required
      ></v-select>
      <p class="Label">Password</p>
      <v-text-field
        class="Text_Field mb-5"
        background-color="#E8EAEC"
        clearable
        filled
        dense
        flat
        solo
        hide-details
        v-model="user.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        hint="At least 6 characters"
        counter
        @click:append="show1 = !show1"
        required
      ></v-text-field>

      <v-checkbox
        label="Do you agree?"
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        required
      ></v-checkbox>
      <p>I have an account! <router-link class="ml-2" to="/login">Sign In</router-link></p>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" :disabled="!valid" @click="submit">
        <img
          v-if="account.status.registering"
          class="mx-3"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <p class="mb-0" v-else>Sign Up</p>
      </v-btn>
      <v-btn class="mx-2" @click="clear">Clear</v-btn>
    </v-form>
  </div>
</template>

<script>
/* import axios from 'axios'; */
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    user: {
      userName: '',
      email: '',
      password: '',
      role: null,
    },
    valid: true,

    nameRules: [
      (v) => !!v || 'User name is required',
      (v) => (v && v.length <= 20) || 'User name must be less than 20 characters',
    ],

    emailRules: [(v) => !!v || 'E-mail is required'],

    passwordRules: [(v) => v.length >= 6 || 'Min 6 characters'],

    role: ['tailor', 'costumer'],
    show1: false,
    checkbox: false,
  }),
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions('account', ['register']),
    submit() {
      if (this.$refs.form.validate()) {
        this.register(this.user);
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .Form {
    width: 400px;
    max-width: 90vw;
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
