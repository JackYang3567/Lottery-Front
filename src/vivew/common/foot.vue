<template>
  <div id="app">
    <nav :class="['kd-toolbar',{'hide-toolbar':nav_up}]">
      <a id="toggle-to-hide-toolbar" class="icon kd-toolbar-toggle" @click="changePush"></a>
      <div class="active_effect" :style="{ left: dom_index * 20 + '%'}" v-show="active_show"></div>
      <ul class="kd-toolbar-inner" :style="'background:' + $store.state.basic.main_color">
          <!-- router-link-exact-active active -->
          <li class="kd-toolbar-item" v-for="(item,k) in navs" :key="k">
              <a href="javascript:;" @click="navSel(k)">
                <i :class="['icon',item.icon]"></i>
                {{item.title}}
              </a>
          </li>
      </ul>
    </nav>

    <!--游戏规则-->
    <gameRule/>
    <!-- <service /> -->

    <!--客服-->
    <transition name="bounce2">
    <div class="promptbox-wrapper" v-if="s_open = $store.state.service">
     <!--客服-->
     <section class="promptbox prompt-service">
         <div class="prompt-head" :style="{background: $store.state.basic.main_color }">客服</div>
         <div class="prompt-body">
           <!-- <a href="weixin://">12312312312</a> -->
            <div v-if="online">

            <ul class="nostyle prompt-service__list" v-if="hb == 1">
              <li class="prompt-service__item prompt-service__item--redpack prompt-service__item1" @click="$store.state.service=false;$router.push('/My/chart')">
                <i class="icon icon-redpack-2 icon--large" ></i>
                <p class="prompt-service__intro">
                  <span>聊天室 抢红包</span>
                  <i class="icon prompt-service__status"></i>
                </p>
                <i class="icon prompt-service__arrow"></i>
              </li>
            </ul>

             <template v-for="(item,key) in online">
               <template v-for="item1 in item" v-if="item1 != ''">
                  <ul class="nostyle prompt-service__list" v-if="key == 'online_service'">
                     <li class="prompt-service__item prompt-service__item--chat" ><i class="icon icon-chat icon--large"></i>
                         <p class="prompt-service__intro"><span>在线客服</span> <i class="icon prompt-service__status"></i></p>
                         <i class="icon prompt-service__arrow"></i>
                         <a :href="item1" class="kd-cover-hidden"></a>
                     </li>
                 </ul>
                 <ul class="nostyle prompt-service__list" v-if="key == 'qq_service'">
                     <li class="prompt-service__item prompt-service__item--qq">
                       <i class="icon icon-qq-im icon--large"></i>
                       <p class="prompt-service__intro"><span>QQ客服</span> <i class="icon prompt-service__status"></i></p>
                       <i class="icon prompt-service__arrow"></i>
                       <a v-if="phone" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+item1+'&version=1&src_type=web&web_src=oicqzone.com'" class="kd-cover-hidden"></a>
                       <a v-else :href="'tencent://message/?uin='+item1+'&Site=web&Menu=yes'" class="kd-cover-hidden"></a>
                     </li>
                 </ul>
                 <ul class="nostyle prompt-service__list" v-if="key == 'wx_service'"> <!--wxbox(item1)-->
                   <li class="prompt-service__item prompt-service__item--wx" :data-clipboard-text="item1"  @click="copy(item1)">
                     <i class="icon icon-weixin icon--large"></i>
                     <p class="prompt-service__intro"><span>微信客服</span> <i class="icon prompt-service__status"></i></p>
                     <i class="icon prompt-service__arrow"></i>
                   </li>
                 </ul>
              </template>
             </template>
           </div>
           <div style="text-align:center;line-height:2rem;" v-else>
             <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner>
           </div>
         </div>
         <a href="javascript:;" class="prompt-close kd-close" @click="$store.state.service=false">close</a>
      </section>
     <div class="promptbox-overlay" @click="$store.state.service=false"></div>
    </div>
  </transition>
    <!-- <div class="promptbox-wrapper prompt-in-game-rule" style="display: none;">
        <section class="promptbox">
            <div class="prompt-head">规则说明</div>
            <div class="prompt-body article"></div> <a href="javascript:;" class="prompt-close kd-close">close</a></section>
        <div class="promptbox-overlay"></div>
    </div>
    <section class="game-list-wrapper pcdd-game-rule-wrapper" style="display: none;">
        <h2 class="page-title">规则说明<a href="javascript:;" class="close-button"><i class="icon icon-times"></i></a></h2>
        <div class="pcdd-game-rule-body kd-scrollable"></div>
    </section> -->
  </div>
</template>

<script>
import gameRule from '../home/common/gameRule';
import Clipboard from 'clipboard';
export default {
  components:{
    gameRule
  },
  mounted(){
    this.judgePhone();
  },
  data () {
    return {
      s_open: false,
      nav_up: false,
      dom_index: 0,
      active_show: true,
      navs: [
        {title:'首页',href:'/',icon:'icon-home'},
        {title:'游戏大厅',href:'/Trade/0',icon:'icon-sel-home'},
        {title:'合买大厅',href:'/With',icon:'icon-sel-hemai'},
        {title:'优惠/资讯',href:'/Discount',icon:'icon-gift'},
        // {title:'客服',href:'',icon:'icon-online-service-toolbar animated infinite bounce'}
        {title:'会员中心',href:'/My',icon:'icon-user-center'}
      ],
      //是否是手机登录
      phone:false,
      //在线客服内容
      online:false,//{
        // online_service:[''],
        // qq_service:[''],
        // wx_service:[''],
        //},
      //聊天室红包开关
      hb:0,
    }
  },

  computed:{

  },
  watch: {
    s_open(){
      this.onlineService();
    },
    $route(to) {
      this.active_show = false;
      if('meta' in to){
        if('index' in to.meta && to.meta.index < 5){
          this.dom_index = to.meta.index;
          this.active_show = true;
        }
      }
    },
  },
  methods:{
    //复制功能
    copy(val) {
        let clipboard = new Clipboard('.prompt-service__item--wx'),_this = this;
        clipboard.on('success', e => {
          _this.$total({ message:'成功复制微信号（'+ val +'）',duration:2000,type: 1 });

          if(_this.phone){

            _this.$messagebox.confirm('您成功复制微信号 '+ val +'，前往微信添加好友？', '提示').then(() =>{
              window.location.href='weixin://';
            }).catch(()=>{

            });

          }
          // 释放内存
          clipboard.destroy();
        })
        clipboard.on('error', e => {
          _this.$total({ message:'该浏览器不支持自动复制',duration:1000,type: 0 });
          // 释放内存
          clipboard.destroy();
        })
      },
    //判断是否手机登录
    judgePhone(){
      let ua = navigator.userAgent;
      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid;
      if(isMobile){
        this.phone = true;
      }
    },
    changePush:function(){
      this.nav_up = !this.nav_up;
      this.$parent.changeDonw();
      this.$store.state.up = !this.$store.state.up;
    },
    navSel:function(key){
      // console.log(this.navs[key]['href']);
      if(this.navs[key]['href'] == ''){
        this.onlineService();
      }else{
        this.$router.push(this.navs[key]['href']);
      }
    },
    onlineService(){//请求客服内容
      let _this = this;
      // _this.$store.state.service = !_this.$store.state.service;
      if(_this.$store.state.service && _this.online == false){
        _this.$getData({
          loding:true,
          url:'/api/home/in/onlineService',
          data:{type:2},
          type:'post',
          callback:function(res){
            if(res){
              _this.$set(_this,'online',res.online);
              _this.hb = res.hb;
            }
          }
        });
      }
    },
    // wxbox(val){
    //   // console.log(val);
    //   // 'url(http://' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + item.img_url + ')'
    //   let _this = this;
    //   _this.$messagebox({
    //     title: '微信扫码',
    //     message: '<img src="http://'+ ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + val +'">',
    //     showCancelButton: false,
    //   });
    // }
  }
}
</script>

<style scoped>
  .prompt-service__item1{
    color:red;
  }
  .active_effect{
    position: absolute;
    left:0;
    transition: left 0.2s ease-in-out;
    background-color: rgba(0,0,0,.08);
    width:20%;
    height:100%;
  }
  #toggle-to-hide-toolbar{
    margin-bottom: 0;
  }
</style>
