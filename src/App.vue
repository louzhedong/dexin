<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@font-face {
  font-family: "GARATCS";
  src: url(./font/GARATCS.ttf);
}
@font-face {
  font-family: "方正精宋简体";
  src: url(./font/方正精宋简体.ttf);
}
#app {
  font-family: GARATCS, "方正精宋简体";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
}
</style>



