<template>
  <div id="app">
    <div class="money-wrapper">
      <div class="money-in">
        <div v-if="navs.length">
          <div class="type" v-for="(item,key,index) in navs" :key="index">
            <router-link :to="'/order/' + item.id">
              <div class="type-title kd-container">
                <i :class="'icon icon-' + item.name"></i>
                <h5 class="title">{{ item.bank_name }}</h5>
                <p class="info">{{ item.slogan }}</p>
              </div>
            </router-link>
          </div>
          <div class="type">
            <a class="type-title kd-container" @click="$store.state.service = true ">
              <i class="icon icon-payservice"></i>
              <span class="title">客服充值</span>
              <span class="info">24小时为您服务，安全、稳定</span></a>
          </div>
        </div>
        <div class="empty_class" v-else>
          {{ tip }}
          <a href="#/in/register/u" v-if="tip&&tip!='加载中...'">前往</a>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    data () {
      return {
        navs: [],
        tip: '加载中...'
      }
    },
    mounted(){
      this.getInfo();
    },
    methods: {
      getInfo(){
        let _this = this;
        _this.$getData({
          url: '/api/Home/Capital/getBankList',
          data:{type:0},
          callback: function(res){
            if(res.code > 0){
              _this.navs = res.data;
            }else{
              _this.tip = res.msg;
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
  .empty_class {
    text-align: center;
    color: #999;
    line-height: 100px;
  }
  .empty_class a{
    width: 100%;
    height: 100%;
    padding: 5px;
    background: #008cba;
    color:#fff;
    border-radius:3px;
  }
</style>
