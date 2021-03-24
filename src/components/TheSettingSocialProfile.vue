<template>
  <div class="Edit_Password">
    <div class="Form_List">
      <div>
        <p class="Label">Twitter</p>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <p class="Label">Facebook</p>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <p class="Label">Instagram</p>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <p class="Label">Github</p>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <p class="Label">LinkedIn</p>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <p class="Label">Dribble</p>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <p class="Label">Behance</p>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-2" depressed color="primary white--text">Change</v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.Edit_Password {
  .Form_List {
    font-size: 0.9em;
    font-weight: 700;
    .Text_Field {
      font-size: 1em;
      font-weight: 400;
    }
  }
}
</style>
