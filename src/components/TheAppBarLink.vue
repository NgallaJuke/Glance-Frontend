<template>
  <div class="container">
    <router-link class="logo" :to="{ name: 'home' }">
      <h1>Glance</h1>
    </router-link>
    <ul class="menu-items">
      <li class="menu-item">
        <router-link class="link" :to="{ name: 'tailors' }">
          <h3>Descover</h3>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link class="link" :to="{ name: 'tailors' }">
          <h3>Tailors</h3>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link class="link" :to="{ name: 'tailors' }">
          <h3>Hire</h3>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.container {
  display: flex;
  align-items: center;
  padding: 0;
  .menu-items {
    list-style: none;
    display: flex;
    align-items: center;
    .menu-item {
      font-size: 1rem;
      padding: 0.5em 1em;
      .link {
        color: #000;
        text-decoration: none;
        :hover {
          color: $color_primary;
        }
      }
    }
    .menu-item:hover {
      background-color: $btn_hover_color;
      border-radius: $border_radius;
    }
  }
  .logo {
    color: #000;
    text-decoration: none;
    padding: 0.5em 0px;
    display: inline;
  }
}
</style>