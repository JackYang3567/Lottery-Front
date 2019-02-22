<template>
  <div id="app">
    <main class="kd-body mone-in-out">
         <ul class="nostyle account-sub-nav kd-row-middle" style="position: relative;">
             <li class="" v-for="(item,key) in navs" class="router-link-exact-active">
               <router-link :to="item.href">{{ item.text }}</router-link>
             </li>
             <div class="active_effect" :style="{ left: dom_index * 25 + '%',backgroundColor: $store.state.basic.main_color }"></div>
         </ul>
         <transition :name="transitionName">
           <router-view/>
         </transition>
     </main>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.dom_index = this.$route.meta.index1;
    },
    data () {
      return {
        dom_index: 0,
        transitionName: '',
        navs: [
          { href:'/Capital',text:'快速入款' },
          { href:'/Capital/moneyIn',text:'在线入款' },
          { href:'/Capital/moneyOut',text:'立即提现' },
          { href:'/Capital/record',text:'交易记录' }
        ]
      }
    },
    methods:{
    },
    watch: {
      $route(to,from) {
        this.transitionName = to.meta.index1 > from.meta.index1 ? 'slide-left' : 'slide-right';
        if('meta' in to){
          this.dom_index = to.meta.index1;
        }
      }
    }
  }
</script>

<style scoped>
  .mone-in-out .account-sub-nav li{
    width:25%;
  }
  .active_effect{
    position: absolute;
    bottom: 0;
    left:0;
    transition: left 0.2s ease-in-out;
    width:25%;
    height:3px;
  }
</style>
