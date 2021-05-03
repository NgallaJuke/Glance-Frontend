<template>
  <div class="container">
    <router-link class="logo" :to="{ name: 'home' }">
      <img src="@/assets/glance_logo_blue.png" alt="Glance" width="40" />
    </router-link>
    <ul class="menu-items">
      <li class="menu-item px-3 py-1">
        <router-link class="link" :to="{ name: 'users' }">
          <h3>Descover</h3>
        </router-link>
      </li>
      <li class="menu-item px-3 py-1">
        <router-link class="link" :to="{ name: 'users' }">
          <h3>Photographers</h3>
        </router-link>
      </li>
      <li class="menu-item px-3 py-1">
        <router-link class="link" :to="{ name: 'hire' }">
          <h3>Hire</h3>
        </router-link>
      </li>
    </ul>
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
