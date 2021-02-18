<template>
  <div>
    <v-list max-width="200">
      <v-list-item-group max-width="200">
        <v-list-item>
          <v-list-item-title>Profil</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Edit Profil</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>My Saves</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title>Account Settings</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="Logout">
          <v-list-item-title style="margin-top: 25px; color: red">Sign Out</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['account/logout']),
    Logout() {
      this['account/logout']();
    },
  },
};
</script>

<style>
</style>