<template>
  <div id="app">
    <main class="kd-body">
      <ul class="nostyle account-sub-nav kd-row-middle for-bank-info" style="position: relative;">
        <li class="router-link-exact-active" v-for="item in navs">
          <router-link :to="item.href" replace>{{ item.text }}</router-link>
        </li>
        <div class="active_effect" :style="{ left: dom_index * 50 + '%',background: $store.state.basic.main_color }"></div>
      </ul>
      <transition :name="transitionName">
        <router-view/>
      </transition>
    </main>
  </div>
</template>
<script>
  export default{
    mounted () {
      this.dom_index = this.$route.meta.index - 151;
    },
    data () {
      return {
        dom_index: 0,
        transitionName: '',
        navs:[
          {href:'/My/bank',text:'银行卡信息'},
          {href:'/My/bank/chasing_password',text:'设置提现密码'}
        ]
      }
    },
    methods:{
    },
    watch: {
      $route(to,from) {
        this.transitionName = to.meta.index > from.meta.index ? 'slide-left' : 'slide-right';
        if('meta' in to){
          this.dom_index = to.meta.index - 151;
        }
      }
    },
  }
</script>

<style scoped>
  .active_effect{
    position: absolute;
    bottom: 0;
    left:0;
    transition: left 0.2s ease-in-out;
    width:50%;
    height:3px;
  }
</style>
