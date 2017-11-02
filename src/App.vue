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
  font-family: gara;
  src: url(./font/gara15.ttf);
}
@font-face {
  font-family: laobaosong;
  src: url(./font/laobaosong.ttf);
}
#app {
  font-family: gara laobaosong;
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



