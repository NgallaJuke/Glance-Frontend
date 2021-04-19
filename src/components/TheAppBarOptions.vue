<template>
  <div>
    <v-list max-width="200">
      <v-list-item-group max-width="200">
        <v-list-item>
          <v-list-item-title>
            <router-link class="link" :to="{ name: 'profil', params: { userName: account.user.userName } }">
              Profil
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <router-link class="link" :to="{ name: 'setting' }">Edit Profil </router-link>
          </v-list-item-title>
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
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  methods: {
    ...mapActions(['account/logout']),
    Logout() {
      this['account/logout']();
    },
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: black;
}
</style>
