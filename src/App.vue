<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: arial;
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



