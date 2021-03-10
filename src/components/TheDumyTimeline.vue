<template>
  <div class="Container">
    <v-row>
      <v-col v-for="(post, index) in 2" :key="index" cols="12" lg="3" md="4" sm="6">
        <div class="Card">
          <div class="PostPic"></div>
          <div class="Toolbar"></div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.Container {
  width: 100%;

  height: 370;
  color: #ddd;
}
.Card {
  width: 325px;
  display: flex;
  height: 370;
  flex-direction: column;
  background-color: #ddd;
  .PostPic {
    width: 325px;
    height: 370;
    color: #ddd;
  }
  .Toolbar {
    width: 325px;
    height: 45;
    color: #ddd;
  }
}
</style>