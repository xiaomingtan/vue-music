<template>
  <div id="app">
      <tab></tab>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
      <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@/components/m-header/m-header'
  import Tab from '@/components/tab/tab'
  import player from '@/components/player/player'
  export default {
    name: 'app',
    components : {
        MHeader ,
        Tab,
        player
    }
  }
</script>

<style>
</style>
