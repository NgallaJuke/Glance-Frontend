<template>
  <div class="container my-5">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field outlined label="E-mail" v-model="user.email" :rules="emailRules" required></v-text-field>

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
      <router-link to="/register">Register</router-link>
      <v-spacer></v-spacer>
      <v-btn @click="submit" :disabled="!valid">
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
      <img v-show="status.loggingIn" src="../../assets/loader.gif" />
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

  computed: { ...mapState('account', ['status']) },
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
