<template>
  <div id="app">

      <main class="kd-body home">

          <div style="width:100%;height:150px;">
            <mt-swipe :auto="5000" v-if="basic.swipe.length">
              <div is="mt-swipe-item" :key="index" v-for="(item,key,index) in basic.swipe">
                  <div :style="{background:'url(//' + ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + item.img_url + ')',backgroundSize:'100% 100%',height:'100%'}" @click="swipeAction(item.img_href)">
                  </div>
              </div>
            </mt-swipe>
            <div style="text-align:center;line-height:150px;" v-else>
              <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner>
            </div>
          </div>

          <div class="kd-notice"><i class="icon icon-notice"></i>
            <div title="3" class="kd-marquee kd-notice-body" style="width:100%">
              <div class="inner" style="width:100%">
                <marquee direction="left" align="bottom" width="100%" scrollamount="3">
                  <span>{{basic.notice}}</span>
                  <!-- <span class="kd-notice-title" v-if="basic.notice.length"> [公告]: </span>
                  <a :href="'#/discount-son/' + item.id" v-for="(item,key) in basic.notice">{{ (key+1) }}. {{ item.title}} </a> -->
                </marquee>
              </div>
            </div>
            <a href="#/My/chart" class="kd-button hollow rob-coin" :style="'color:' + $store.state.basic.main_color + ';border: 2px solid ' + $store.state.basic.main_color + ';'">
              <i class="icon icon-rob-coin"></i>聊天室
            </a>
          </div>

          <ul class="nostyle kd-row-middle kd-shortcut">
              <li class="kd-shortcut-item" :key="index" v-for="(item,key,index)  in shortcut" @click="shortcutClick(key)"><a href="javascript:;" v-bind:class="[item.class]">
                  <i v-bind:class="['icon icon-shortcut-'+item.class]"></i>{{ item.text }}</a>
              </li>
          </ul>
            <div class="w_snav kd-notice">
              <!-- <div class="vux-button-group">
                <a href="javascript:" class="vux-button-tab-item vux-button-group-current vux-button-tab-item-first" style="">热门彩票</a> 
                <a href="javascript:" class="vux-button-tab-item vux-button-tab-item-last">棋牌游戏</a>
              </div> -->
              <button-tab >
                <button-tab-item :selected="tabType == 1 ? true:false" @on-item-click="tabType = 1">热门彩票</button-tab-item>
                <button-tab-item :selected="tabType == 2 ? true:false" @on-item-click="tabType = 2">棋牌游戏</button-tab-item>
              </button-tab>
            </div>
          <lotteryList :tabType="tabType" />

          <div class="member-news" style="margin-top:5px;">
              <h6 class="title" style="background:#fff;" ><i class="icon icon-member-news"></i>会员动态</h6>
              <marquee-component class="nostyle kd-container news-list" :item-height="32.19" style="height:10rem;" v-if="UserDynamics.length">
                <template v-for="(item,ik) in UserDynamics">
                  <marquee-item :key="ik" class="align-middle item playing">
                    <i class="elem icon icon-mn-playing"></i>
                      <span class="elem user">{{ item.chgcon.username }}</span>
                      <span class="elem type">在游戏<i :style="{color:$store.state.basic.main_color}">{{ item.chgcon.lottery }}</i>,中奖</span>
                      <span class="elem content"><strong class="amount">{{ item.win }}</strong></span>
                      <time class="elem time">{{ item.create_time }}</time>
                  </marquee-item>
                </template>
              </marquee-component>
              <ul class="nostyle kd-container news-list" style="width:100%;" v-else-if="UserDynamics1 == 1"  >
                  <li class="item">
                      <span class="elem time">没有数据</span>
                  </li>
              </ul>
              <div style="text-align:center;" v-else>
                <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner>
              </div>
          </div>
          
          <section class="copyright" style="border-top: none">
            <p>2015-{{getTime()}}
              <span class="copyright-c">&copy;</span> {{ $store.state.basic.web_name }}平台
              <!--span class="ak-ico"><img src="../../assets/images/gk.png" /--> <!-- <img src="../../assets/images/ak-ICON.ico" /></span>-->
              版权所有
            </p>
            <p>
              {{ $store.state.basic.web_name }}平台提示：彩票有风险，投注需谨慎！
              <span class="hidden copyright-pc">不向未满18岁的青少年出售彩票</span>
            </p>
          </section>
      </main>
  </div>
</template>

<script>
import lotteryList from './common/lotteryList';
import { Marquee, MarqueeItem, ButtonTab, ButtonTabItem } from 'vux';
let MarqueeComponent = Marquee;
export default {
  components:{
    lotteryList,
    MarqueeComponent,
    MarqueeItem,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      //首页彩票切换栏木
      tabType:1,
      shortcut: [
       //中间导航条
       { class:'money-in-out',text:'充值/提现' },
       { class:"bet", text:'下注记录'},
       // { class:'check-in',text:'签到' },
       { class:'choujiang',text:'抽奖'},
       // { class:'try-playing',text:'免费试玩' },
       { class:'online-service',text:'客服' }
      ],
      //会员动态
      UserDynamics: [],
      UserDynamics1:0,
      basic: {
        swipe: [],
        notice: []
      },

    }
  },
  mounted(){
    // console.log(this.$store.state.basic.home_window);
    // let a = '192.168.31.27:8080/#/abc';
    // let b = encodeURIComponent(a);
    // console.log(b);
    // console.log(decodeURIComponent(b));
    this.initialization();

    //获取最新会员动态 //暂时取消
    this.userAction();
  },
  methods: {
    userAction(){
      let _this = this;
      _this.$getData({
        url:'/api/home/in/userAction',
        type:'post',
        data:'',
        callback:function(res){

          if(res && res.length){
            _this.$set(_this,'UserDynamics',res);
          }else{
            _this.UserDynamics1 = 1;
          }
        }
      });
    },
    initialization(){
      // 这里加个条件,有时候路由有缓存,延时
      if(this.$route.path in this.$store.state.all_chat && this.$route.path == "/"){
        this.basic = this.$store.state.all_chat[this.$route.path];
      }else{
        this.getInfo();
      }
    },
    getInfo(){
      let _this = this;
      this.$getData({
        url:'/api/Home/home/getInfo',
        callback: function(data){
          _this.basic = data;
          _this.$store.state.all_chat[_this.$route.path] = data;
        }
      });
    },
    shortcutClick(data){
      let _this = this;
      switch(data){
        case 0:
          _this.$router.push('/Capital');
        break;
        case 1:
          _this.$router.push('/My/record');
        break;
        case 2:
          _this.$router.push('/My/lucky');
          // _this.demoLogin();
        break;
        case 3:
          _this.$store.state.service = true;
        break;
      }
    },
    // wxbox(val){
    //   //  console.log(val);
    //   // 'url(http://' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + item.img_url + ')'
    //   let _this = this;
    //   _this.$messagebox({
    //     title: '微信扫码',
    //     message: '<img src="http://'+ ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + val +'">',
    //     showCancelButton: false,
    //   });
    // },
    onlineService(){//请求客服内容
      let _this = this;
      _this.service = !_this.service;
      if(_this.service && _this.online==''){
        _this.$getData({
          loding:true,
          url:'/api/home/in/onlineService',
          data:{type:2},
          type:'post',
          callback:function(res){
            if(res){
              _this.$set(_this,'online',res);
            }
          }
        });
      }
    },
    getTime(){
      var myDate = new Date();
      return myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    },
    swipeAction(value){
      if(value){
        this.$router.push('/discount-son/' + value);
      }
    },

  }
}
</script>

<style scoped>
  .member-news .news-list{
    padding: 0.2rem 1rem;
  }
  .member-news{
    border-bottom: 1px solid #eee;
  }
  .ak-ico{
    border:1px solid #fff !important;
  }
  @media (max-width:450px){}
    /*背景颜色*/
    .home{
      background-color: #f5f5f9;
    }
    /*宽度*/
    .kd-notice{
      /* margin:0 .625rem; */
    }
    /*广告*/
    .kd-notice{
      padding:.3rem 0 .3rem 0;
    }
    .kd-notice{
      background-color:#fff;
      /* margin-top:.5rem; */
      /* border-radius:10px 10px 0 0 ; */
    }
    /*中部导航条*/
    .kd-shortcut{
      /* margin:0 .625rem; */
      background-color:#fff;
      /* margin-bottom:1rem; */
      /* border-radius:0 0 10px 10px ; */
    }
    .kd-shortcut-item{
      border:none;
    }
    /*导航条图标*/
    .kd-shortcut-item .icon{
      font-size:2.5rem;
      display: block;
    }
    /*会员动态*/
    .member-news .title{
      border:none;
    }
    .member-news .item{
      padding:.9rem 0 .3rem 1.6rem;
    }
    .align-middle{
      /* border-bottom: 1px solid #ddd; */
    }
    .kd-container {
      border-top:1px solid #eee;
      background-color: #fff;
      /* border-radius: 10px; */
      /* width: 93.75%; */
    }
    .news-list{
      background-color: #fff;
      /* border-radius:10px; */
    }
    .w_snav{
      background:none;
      /* border-radius:10px; */
    }
</style>
