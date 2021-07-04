<template>
  <div class="container">
    <router-link class="logo" :to="{ name: 'home' }">
      <img src="@/assets/glance_logo_blue.png" alt="Glance" width="40" />
    </router-link>
    <ul class="menu-items">
      <li class="menu-item px-3">
        <router-link class="link" :to="{ name: 'discover' }">
          <p>Discover</p>
        </router-link>
      </li>
      <li class="menu-item px-3">
        <router-link class="link" :to="{ name: 'creators' }">
          <p>Creators</p>
        </router-link>
      </li>
      <!-- <li class="menu-item px-3 ">
        <router-link class="link" :to="{ name: 'hire' }">
          <p>Hire</p>
        </router-link>
      </li> -->
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
      .link {
        display: grid;
        place-items: center;
        font-size: 1em;
        font-weight: 500;
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
