<template>
  <div class="Setting_Account">
    <div class="Form_List">
      <div>
        <p class="Label">Email</p>
        <v-text-field class="Text_Field" label="Change email adress" clearable filled dense flat solo></v-text-field>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="Delete_Account pt-5">
      <p>Delete your account and account data</p>
      <v-btn class="ml-10 pa-1 Delete_Btn" depressed color="error white--text">Delete Account</v-btn>
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-3" depressed color="primary white--text">Save Change</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
};
</script>

<style lang="scss" scoped>
.Setting_Account {
  .Form_List {
    font-size: 0.9em;
    font-weight: 700;
    .Text_Field {
      font-size: 1em;
      font-weight: 400;
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
