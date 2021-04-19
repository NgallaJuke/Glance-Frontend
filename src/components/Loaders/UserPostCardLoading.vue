<template>
  <div class="container">
    <v-sheet depressed class="mx-auto grey lighten-5" max-width="1000">
      <v-slide-group depressed>
        <v-slide-item depressed v-for="post in 10" :key="post">
          <v-card
            class="ma-3 card_img grey lighten-3"
            height="227.7"
            width="200"
            max-width="200"
            style="border-radius: 6px"
          >
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {};
</script>

