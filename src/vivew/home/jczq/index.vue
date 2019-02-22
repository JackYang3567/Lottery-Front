<template>
  <div id="app" >
    <div class="lottery-wrapper">
      <tab :active-color="$store.state.basic.main_color" v-model="index" >
        <tab-item v-for="(item,key) in nav" :key="key">{{ item }}</tab-item>
      </tab>
    </div>

    <transition :name="transitionName">
      <router-view :menu="index"/>
    </transition>
  </div>
</template>

<script>
import { Tab,TabItem } from 'vux';
export default {
  components:{ Tab,TabItem },
  data () {
    return {
      nav: [ '混合投注','单关固定','胜平负','让球胜平负','比分','总进球','半全场' ],
      index: 0,
      transitionName: '',
    }
  },
  mounted(){
  },
  methods: {
    screen(){
      console.log(1);
    }
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
.lottery-wrapper{
  /* position:absolute; */
  margin: 0 auto;
  left:initial;
}
</style>