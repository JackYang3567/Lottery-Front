<template>
  <div style="height:0;">
    <main class="kd-body">
        <ul class="nostyle account-sub-nav kd-row-middle for-money-record" style="position: relative;">
            <li class="" v-for="(item,key) in navs" class="router-link-exact-active">
              <router-link :to="item.href" replace>{{ item.text }}</router-link>
            </li>
            <div class="active_effect" :style="{ left: dom_index * 33.333333 + '%',backgroundColor: $store.state.basic.main_color }"></div>
        </ul>
        <!-- <ul class="nostyle kd-container kd-list data-list">
            <li class="item">没有数据!</li>
        </ul> -->
        <transition :name="transitionName">
          <router-view/>
        </transition>
    </main>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.dom_index = this.$route.meta.index - 151;
    },
    data () {
      return {
        dom_index: 0,
        transitionName: '',
        navs:[
          {href:'/Capital/record',text:'快速充值记录'},
          {href:'/Capital/record/line',text:'在线充值记录'},
          {href:'/Capital/record/out',text:'提现记录'}
        ],
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
    }
  }
</script>

<style scoped>
  .active_effect{
    position: absolute;
    bottom: 0;
    left:0;
    transition: left 0.2s ease-in-out;
    width:33.333333%;
    height:3px;
  }
  .account-sub-nav.for-bank-info li, .account-sub-nav.for-money-record li{
    width:33.333333%;
  }
</style>
