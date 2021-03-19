<template>
  <div style="width: 90%">
    <v-container fluid>
      <v-row>
        <v-col v-for="index in 12" :key="index" cols="12" lg="3" md="4" sm="6">
          <v-card class="PostCard mx-auto ma-0 pa-0" max-width="325" elevation="0">
            <v-img class="grey lighten-2" height="370" width="325"></v-img>
            <v-toolbar class="grey lighten-5" flat max-width="325" height="45">
              <div class="User_Avatar mr-2 grey lighten-2"></div>
              <div class="User_Name grey lighten-2"></div>
              <v-spacer></v-spacer>
              <div class="Button mr-2 grey lighten-2"></div>
              <div class="Count mr-2 grey lighten-2"></div>
              <div class="Button mr-2 grey lighten-2"></div>
              <div class="Count mr-2 grey lighten-2"></div>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.User_Avatar {
  width: 25px;
  height: 15px;
  border-radius: 50%;
}
.User_Name {
  width: 100px;
  height: 18px;
}
.Count {
  width: 25px;
  height: 15px;
}
.Button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
</style>
