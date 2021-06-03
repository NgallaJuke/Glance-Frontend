<template>
  <div class="Container">
    <ul class="NavTag_Container">
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name"><h4>Illustration</h4></div>
      </li>
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name"><h4>Graphic Design</h4></div>
      </li>
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name"><h4>Photography</h4></div>
      </li>
      <li class="Tag_Container">
        <div class="HashTag"><b>#</b></div>
        <div class="hashTag_Name"><h4>Branding</h4></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
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
        h4 {
          padding-left: 30px;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
