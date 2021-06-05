<template>
  <div class="Container">
    <ul class="NavTag_Container">
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>

        <div class="hashTag_Name">
          <router-link
            @click="GoToHashTag('illustration')"
            class="Link"
            :to="{ name: 'following-posts', params: { post: 'illustration' } }"
          >
            <h4>Illustration</h4>
          </router-link>
        </div>
      </li>
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name">
          <router-link
            @click="GoToHashTag('graphic-design')"
            class="Link"
            :to="{ name: 'following-posts', params: { post: 'graphic-design' } }"
          >
            <h4>Graphic Design</h4>
          </router-link>
        </div>
      </li>
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name">
          <router-link
            @click="GoToHashTag('art')"
            class="Link"
            :to="{ name: 'following-posts', params: { post: 'art' } }"
          >
            <h4>Art</h4>
          </router-link>
        </div>
      </li>
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name">
          <router-link
            @click="GoToHashTag('photography')"
            class="Link"
            :to="{ name: 'following-posts', params: { post: 'photography' } }"
          >
            <h4>Photography</h4>
          </router-link>
        </div>
      </li>
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name">
          <router-link
            @click="GoToHashTag('branding')"
            class="Link"
            :to="{ name: 'following-posts', params: { post: 'branding' } }"
          >
            <h4>Branding</h4>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    GoToHashTag(hashTag) {
      this.$emit('gotohashtag', hashTag);
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
      display: flex;
      cursor: pointer;
      .HashTag {
        height: 50px;
        width: 50px;
        background-color: rgb(145, 196, 245);
        border: solid $color_primary 1.5px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        z-index: 2;

        b {
          font-size: 1.5em;
        }
      }
      .hashTag_Name {
        position: relative;
        display: grid;
        place-items: center;
        background-color: rgb(153, 245, 145);
        border-radius: 5px;
        left: -20px;
        width: 180px;
        z-index: 1;
        .Link {
          color: #000;
          text-decoration: none;
          h4 {
            padding-left: 30px;
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>
