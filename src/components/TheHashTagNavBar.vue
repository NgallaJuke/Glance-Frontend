<template>
  <div class="Container">
    <ul class="NavTag_Container">
      <li
        class="Tag_Container"
        @click="GoToHashTag('illustration')"
        :class="[{ active: $route.params.post === 'illustration' }]"
        :style="{ backgroundImage: `url(${require('@/assets/tags/illustration.jpg')})` }"
      >
        <div class="hashTag_Name">
          <router-link class="Link" :to="{ name: hashType, params: { post: 'illustration' } }">
            <h4>Illustration</h4>
          </router-link>
        </div>
      </li>
      <li
        class="Tag_Container"
        :class="[{ active: $route.params.post === 'graphic-design' }]"
        @click="GoToHashTag('graphic-design')"
        :style="{ backgroundImage: `url(${require('@/assets/tags/graphic_design.jpg')})` }"
      >
        <div class="hashTag_Name">
          <router-link class="Link" :to="{ name: hashType, params: { post: 'graphic-design' } }">
            <h4>Graphic Design</h4>
          </router-link>
        </div>
      </li>
      <li
        class="Tag_Container"
        :class="[{ active: $route.params.post === 'art' }]"
        @click="GoToHashTag('art')"
        :style="{ backgroundImage: `url(${require('@/assets/tags/art.jpg')})` }"
      >
        <div class="hashTag_Name">
          <router-link class="Link" :to="{ name: hashType, params: { post: 'art' } }">
            <h4>Art</h4>
          </router-link>
        </div>
      </li>
      <li
        class="Tag_Container"
        :class="[{ active: $route.params.post === 'photography' }]"
        @click="GoToHashTag('photography')"
        :style="{ backgroundImage: `url(${require('@/assets/tags/photography.jpg')})` }"
      >
        <div class="hashTag_Name">
          <router-link class="Link" :to="{ name: hashType, params: { post: 'photography' } }">
            <h4>Photography</h4>
          </router-link>
        </div>
      </li>
      <li
        class="Tag_Container"
        :class="[{ active: $route.params.post === 'branding' }]"
        @click="GoToHashTag('branding')"
        :style="{ backgroundImage: `url(${require('@/assets/tags/branding.jpg')})` }"
      >
        <div class="hashTag_Name">
          <router-link class="Link" :to="{ name: hashType, params: { post: 'branding' } }">
            <h4>Branding</h4>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hashType: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return { active: false };
  },
  components: {},
  computed: {},
  methods: {
    GoToHashTag(hashTag) {
      this.$emit('gotohashtag', hashTag.replace('-', ' '));
    },
  },
};
</script>

<style lang="scss" scoped>
.Container {
  width: 100vw;
  margin: 2em 0 5em 0;

  .NavTag_Container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    overflow-x: auto;
    .Tag_Container {
      list-style: none;
      margin: 0 1em;
      padding: 0;
      background-size: cover;
      position: relative;
      border-radius: $border_radius;
      &::after {
        content: '';
        cursor: pointer;
        display: block;
        width: 100%;
        height: 100%;
        background-color: #333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: $border_radius;
        z-index: 0;
      }
    }
    .active {
      list-style: none;
      margin: 0 1em;
      padding: 0;
      background-size: cover;
      position: relative;
      border: 1.5px solid $color_primary;
      border-radius: $border_radius;
      &::after {
        content: '';
        cursor: pointer;
        display: block;
        width: 100%;
        height: 100%;
        background-color: #2274f875;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: $border_radius;
        z-index: 0;
      }
    }
    .hashTag_Name {
      display: grid;
      place-items: center;
      height: 50px;
      width: 180px;
      border-radius: 5px;
      z-index: 3;
      .Link {
        text-decoration: none;
        z-index: 3;
        h4 {
          color: white;
          padding-left: 30px;
          padding-right: 20px;
          z-index: 3;
        }
      }
    }
  }
}
</style>
