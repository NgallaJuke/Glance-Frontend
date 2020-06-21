<template>
  <div class="container my-5">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        outlined
        label="userName"
        v-model="user.userName"
        :rules="nameRules"
        :counter="20"
        required
      ></v-text-field>
      <v-text-field outlined label="E-mail" v-model="user.email" :rules="emailRules" required></v-text-field>
      <v-select
        outlined
        label="Profil"
        v-model="user.role"
        :items="role"
        :rules="[(v) => !!v || 'Profil is required']"
        required
      ></v-select>

      <v-text-field
        outlined
        v-model="user.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
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
      <router-link to="/login">Login</router-link>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" @click="submit" :disabled="!valid">
        submit
      </v-btn>
      <img v-show="status.registering" src="../../assets/loader.gif" />
      <v-btn class="mx-2" @click="clear">clear</v-btn>
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
  computed: { ...mapState('account', ['status']) },
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
