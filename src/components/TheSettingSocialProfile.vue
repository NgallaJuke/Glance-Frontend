<template>
  <div class="Edit_Password">
    <div class="Form_List">
      <div>
        <div class="Social mb-2">
          <p class="Label">Twitter</p>
          <img class="Icon ml-2" src="@/assets/Icons/twitter.svg" />
        </div>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Facebook</p>
          <img class="Icon ml-2" src="@/assets/Icons/facebook.svg" />
        </div>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Instagram</p>
          <img class="Icon ml-2" src="@/assets/Icons/instagram.svg" />
        </div>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Github</p>
          <img class="Icon ml-2" src="@/assets/Icons/github.svg" />
        </div>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">LinkedIn</p>
          <img class="Icon ml-2" src="@/assets/Icons/linkedin.svg" />
        </div>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Dribbble</p>
          <img class="Icon ml-2" src="@/assets/Icons/dribbble.svg" />
        </div>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
      <div>
        <div class="Social mb-2">
          <p class="Label">Behance</p>
          <img class="Icon ml-2" src="@/assets/Icons/behance.svg" />
        </div>
        <v-text-field class="Text_Field" clearable filled dense flat solo></v-text-field>
      </div>
    </div>
    <div>
      <v-btn class="mt-10 pa-1 px-2" depressed color="primary white--text">Change</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
};
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
    .Social {
      display: flex;
      align-items: center;

      .Label {
        margin: 0;
      }
      .Icon {
        width: 2em;
      }
    }
  }
}
</style>
