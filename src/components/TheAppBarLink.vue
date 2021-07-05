<template>
  <div class="container">
    <router-link class="logo" :to="{ name: 'home' }">
      <img src="@/assets/glance_logo_blue.png" alt="Glance" width="40" />
    </router-link>
    <ul class="menu-items">
      <li class="menu-item px-3">
        <router-link
          class="link"
          :class="[{ active: $route.name === 'discover' || $route.name === 'popular-posts' }]"
          :to="{ name: 'discover' }"
        >
          Discover
        </router-link>
      </li>
      <li class="menu-item px-3">
        <router-link class="link" :class="[{ active: $route.name === 'creators' }]" :to="{ name: 'creators' }">
          Creators
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
    return { active: false };
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
      display: grid;
      place-items: center;
      .link {
        font-size: 1em;
        font-weight: 450;
        color: #000;
        text-decoration: none;
        &:hover {
          color: $color_primary;
        }
      }
      .active {
        color: $color_primary;
      }
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
