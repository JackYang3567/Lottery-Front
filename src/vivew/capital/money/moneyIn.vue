<template>
<div id="app">
  <div class="money-wrapper">
    <div class="money-in">
        <!-- <div class="empty_class"> {{ tip }} </div> -->
        <!-- 充值金额：<input type="number" v-model="money" placeholder="请输入充值金额">  
        <button @click="payOn()">确认充值</button> -->


      <div :class="['type',{opened:check === key}]" v-if="navs.length" v-for="(item,key) in navs" :key="key">
        <div class="type-title kd-container" @click=" check === key ? check = '' : check = key;">
          <i :class="'icon icon-'+item['name']"></i> 
          <h5 class="title">{{item['bank_name']}}</h5> 
          <p class="info">{{item['solgan']}}</p>
        </div> 
        <div class="type-body method-zfb2" v-show="check === key">
          <div class="kd-field">
            <label class="kd-field-title">充值金额：</label> 
            <div class="kd-textinput number">
              <input v-model="money" type="number" placeholder="请输入金额" step="0.01">
            </div> 
            <p class="notice"> 最低充值{{item['min']}}</p>
          </div> 
          <div type="button" class="kd-button main-button">
            <span>提 交</span> 
            <button type="button" @click="payOn(item['id'])">Button</button>
          </div>
          <div>
            <ul class="nostyle notices-list">
              <li>使用支付宝在线入款,无需联系客服,24小时内实时到账,方便快捷</li> 
              <!-- <li>持有储蓄卡网银用户，请使用电脑在线支付充值，无需联系客服，24小时内实时到账！</li> 
              <li>温馨提示：在您需要进行网银在线支付前，请先选择网站上的（电脑版）进行充值。</li> -->
            </ul>
          </div>
        </div>
      </div>
      <div class="empty_class" v-if="!navs.length">
        {{tip}}
        <!-- <a href="#/in/register/u" v-if="tip&&tip!='加载中...'">前往</a> -->
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
        money: '',
        tip: '加载中...',
        check:'',//在线充值开关
        list:false,
      }
    },
    mounted(){
      this.getInfo();
    },
    methods:{
      payOn(list = ''){
        if(list == ''){return;}
        let _this = this;
        _this.$getData({
          'loading':true,
          'url':'/api/home/line_pay/index',
          'data':{money:_this.money,host:location.protocol+'//'+location.host,list:list},
          callback:function(res){
            if(res['code'] > 0){
              location.href = res['msg'];
            }else{
              _this.$total({ message:res.msg,type: 0 });
            }
            //地址跳转
            // 
          }
        });
      },
      getInfo(){
        let _this = this;
        _this.$getData({
          url: '/api/Home/Capital/getBankList',
          data:{type:1},
          callback: function(res){
            if(res.code > 0){
              _this.navs = res.data;
            }else{
              // _this.tip = res.msg;
              _this.tip = '充值通道已关闭';
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
  .empty_class{
    text-align: center;
    color: #999;
    line-height: 100px;
  }
  .money-in .type-title {
      border-bottom: 1px solid #ced2d4 !important;
  }
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
