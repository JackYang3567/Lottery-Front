<template>
  <div id="app">
    <main class="kd-body game game-d game-pcdd-hall-d">
        <div class="pcdd-banner"><img src="../../../assets/images/pcdd-banner.png" alt="banner" class="girl">
        <a  class="qrcode" href="#"><img :src="qrcode" alt="二维码"></a>
        </div>
        <div class="kd-container pcdd-siteinfo  kd-row">
            <div class="kd-col pcdd-user">
                <p class="pcdd-user-total">注册人数：<span class="count">2691454人</span></p>
                <p class="pcdd-user-win">用户已赚：<span class="count">113910900元宝</span></p>
            </div>
            <div class="kd-col pcdd-win">
                97%
                <p class="pcdd-win-rate">赚钱率</p>
            </div>
            <div class="kd-col pcdd-rule">
                <div class="kd-chip-button chip-odd-desc playing-rule-button" @click="$store.state.game_rule = $route.params.id">
                    <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">规则说明</span></div>
                </div>
            </div>
        </div>
        <div class="kd-container rooms-list clearfix">
            <div :class="['room-box level'+item.level]" v-for='item in nav'>
                <div class="room-box__header">
                    <h2 class="room-title">{{item.text}}</h2>
                </div> <img :src="item.img" class="room-box-bg">
                <p class="room-desc">{{item.room}}</p>
                <router-link :to="{path:item.href+'/'+$route.params.id+'/'+(parseInt(item.level)-1)}" class="kd-cover-hidden">{{item.text}}</router-link>
                <!-- <a href="#/betting/" class="kd-cover-hidden">初级房</a>  -->
                <a href="javascript:;" class="room-odd-desc" @click="$store.state.game_rule = $route.params.id">赔率说明</a>
            </div>

            <!-- <div class="room-box level2">
                <div class="room-box__header">
                    <h2 class="room-title">中级房</h2>
                </div> <img src="../../../assets/images/room-level2-bg.png" class="room-box-bg">
                <p class="room-desc">86人 (代理提成0.3%)</p> <a href="#/betting/" class="kd-cover-hidden">中级房</a> <a href="javascript:;" class="room-odd-desc">赔率说明</a></div>

            <div class="room-box level3">
                <div class="room-box__header">
                    <h2 class="room-title">高级房</h2>
                </div> <img src="../../../assets/images/room-level3-bg.png" class="room-box-bg">
                <p class="room-desc">215人 (代理提成0.3%)</p> <a href="#/betting/" class="kd-cover-hidden">高级房</a> <a href="javascript:;" class="room-odd-desc">赔率说明</a></div>
        --></div>
    </main>
  </div>
</template>
<script>
export default{
  name: 'room',
  mounted(){
    //alert(this.title[this.$route.params.id]);
    
    this.lotteryAll();
    this.appQrcode();

  },
  created(){

  },
  data () {
    return {
      title:{'24':'北京28','25':'加拿大28','26':'重庆28','27':'新疆28'},
      nav:[
        {text:'初级房',room:'(代理提成0.3%)',odds:'赔率说明',img: require('../../../assets/images/room-level1-bg.png'),level:'1',href:'/game-pc/betting'},
        {text:'中级房',room:'(代理提成0.3%)',odds:'赔率说明',img: require('../../../assets/images/room-level2-bg.png'),level:'2',href:'/game-pc/betting'},
        {text:'高级房',room:'(代理提成0.3%)',odds:'赔率说明',img: require('../../../assets/images/room-level3-bg.png'),level:'3',href:'/game-pc/betting'},
      ],
      qrcode:'',
    }
  },
  watch:{
    $route(){
      this.$store.state.title = this.title[this.$route.params.id];
    }
  },
  methods:{
    lotteryAll(){
      let _this = this;
      _this.$getData({
        url:'/api/home/home/lotteryAll',
        data:'',
        type:'post',
        callback:function(res){
          if(res){
            _this.$set(_this,'title',res);
          }
          _this.$store.state.title = _this.title[_this.$route.params.id];
          // alert(this.$store.state.api_path);
        }
      });
    },
    appQrcode(){
      let _this = this;
      _this.$getData({
        url:'/api/home/in/setUp',
        data:{type:'app_qrcode'},
        type:'post',
        callback:function(res){
           _this.qrcode = '//'+ ('api_path' in _this.$store.state && _this.$store.state.api_path ? _this.$store.state.api_path : _this.$store.state.basic.static_path) + res.value;
          // alert(this.$store.state.api_path);
        }
      });
    }
  }
}
</script>
<style scoped>
</style>
