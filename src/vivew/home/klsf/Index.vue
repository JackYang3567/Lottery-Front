<template>
  <div id="app">
    <Lottery :select_data="data"></Lottery>
  </div>
</template>

<script>
import Lottery from '../common/Lottery';
  export default{
    components:{ Lottery },
    data () {
      return {
        data: {
          alert_select: [],
          betting_all: {},
          single_select: {
            x:'da',da: 'x',dan: 's',s: 'dan',l: 'hu',hu: 'l',wd: 'wx',wx: 'wd'
          }
        },
      }
    }
  }
</script>

<style scoped>
</style>
