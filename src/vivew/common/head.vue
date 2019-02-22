<template>
  <div id="app">
        <header class="kd-head" :style="'background:' + $store.state.basic.main_color + ';-webkit-box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';'">

          <template v-if="$store.state.login && $route.meta.index < 5">
            <a class="kd-head-item menu-back-toggle" @click="changePush">
              <i class="icon icon-nav icon-account-setting-b"></i>
              <span class="line-check-title">{{ push ? '个性化设置':'个性化' }}</span>
            </a>
          </template>
          <template v-else-if="$route.meta.index < 5">
            <a class="kd-head-item menu-back-toggle" @click="appDown">
              <!-- <i class="icon ">
              </i> -->
              <span class="line-check-title"><u style="font-weight:bold ;">下载APP</u></span>
            </a>
          </template>

          <template v-if="$route.meta.index < 5">
            <a href="javascript:;" class="kd-head-item logo"><img :src="'//' + ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + $store.state.basic.logo_path"></a>
          </template>
          <template v-if="$route.meta.index > 4">
            <a class="kd-head-item menu-back-toggle">
              <i class="icon icon-nav-arrow-left" @click="$router.back()"></i>
            </a>
            <span class="kd-head-item categories-switch"  v-if="$store.state.official" @click="$store.state.offopen = !$store.state.offopen">
              <span class="categories-switch-name">玩法</span>
              <a href="javascript:;" :class="['categories-switch-value',{opened:$store.state.offopen}]">{{$store.state.offtxt}}</a>
            </span>
            <span v-else :class="['kd-head-item head-title',{'game-title':$route.path.indexOf('game-') > -1}]" @click="alertAction">{{ $store.state.title }}</span>
          </template>
          <!-- :href="'#/in?url='+$route.path" -->
          <a :href="$store.state.login ? 'javascript:;':'#/in?url='+$route.path" class="kd-head-item go-to-login">
            <span class="text" v-if="!$store.state.login">登录</span>
            <a href="javascript:;" class="kd-head-item userinfo" v-else @click="submenu=!submenu"><span style="white-space: nowrap;">余额</span><br>{{ $store.state.user ? $store.state.user.money : '00.00' }}</a>
            <i v-if="!$store.state.login || ($store.state.login && $store.state.user['photo'] == 0) || !$store.state.user['photo']" class="icon icon-user-circle" ></i>
            <img v-else class="icon icon-user-circle" style="width:40px;border-radius:50%;" :src="require('@/assets/images/photo/'+ ($store.state.user['photo'] > 0 ?$store.state.user['photo'] : '0') +'.png')"/>
          </a>

          <transition name="bounce1">
            <ul id="sub-menu-dropdown" class="nostyle sub-menu" v-show="submenu">
              <template v-if="$route.path.indexOf('game-') > -1">
                <li><a href="javascript:;" @click="alertAction" >选择游戏</a></li>
                <li><a href="#/My/record" >下注记录</a></li>
                <li><a :href="'#/My/open/'+$route.params.id" >开奖记录</a></li>
                <li v-if="$route.path.indexOf('game-pc/betting') > -1"><a href="javascript:;" @click="$store.state.trend_pc = true;submenu = false" >走势图</a></li>
                <li><a :href="'#/trend/'+$route.params.id" >历史走势</a></li>
                <li><a href="javascript:;" @click="$store.state.game_rule = $route.params.id;submenu=false">游戏规则</a></li>
              </template>
                <li v-else-if="$route.path.indexOf('trend') > -1" @click="$router.back()"><a href="javascript:;">返回游戏</a></li>
                <li><a href="#/My" >会员中心</a></li>
                <li><a href="#/My/photo"> 更改头像 </a></li>
                <li><a href="javascript:;" @click="loginOut">安全退出</a></li>
            </ul>
          </transition>
        </header>

        <!--右侧聊天室导航栏开关-->

        <div v-if="!$store.state.chart_chg &&  $store.state.chart_open" :class="['w_chart_room',{'list':true}]" @click="$store.state.chart_chg = !$store.state.chart_chg">计划聊天室</div>

        <!--右侧聊天室栏-->
        <nav class="kd-menu-wrapper w_chart_wrapper">
            <div class="close-menu close-menu-w" :style="'background:' + $store.state.basic.main_color + ';-webkit-box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';'" v-on:click="$store.state.chart_chg = false">
              <i class="icon"></i>
              关闭
            </div>
            <div class="kd-menu-w kd-scrollable">
              <charSet style="height:100%;" v-if=" $store.state.chart_open"/>
            </div>
        </nav>


        <!--头部左侧导航栏-->
        <nav class="kd-menu-wrapper">
            <div class="close-menu" :style="'background:' + $store.state.basic.main_color + ';-webkit-box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';'" v-on:click="changePush">
              <i class="icon"></i>
              关闭
            </div>
            <div class="kd-menu kd-scrollable">
                <!-- <ul class="kd-menu-inner nostyle">
                    <li class="kd-menu-item" v-for="item in link">
                    <span class="nav-line-cell"><i class="icon icon-nav-cloud"></i></span>
                    <span class="kd-textinput nav-line-cell nav-line-time">
                    <input type="text" readonly="readonly" :value="item.speed"></span>
                    <span class="kd-textinput nav-line-cell nav-line-url">
                    <input type="text" readonly="readonly" :value="item.url"></span>
                    <a :href="item.url" title="#" target="_blank" class="nav-line-cell">
                    <i class="icon icon-nav-visit"></i>
                    <img src="#" hidden="hidden"></a></li>
                </ul> -->
                <userSet v-if="$store.state.login && push"/>
                
            </div>

        </nav>

        <!--游戏彩种大厅-->
        <transition name="bounce2">
          <div class="game-list-wrapper" v-if="$store.state.trade">
              <h2 class="page-title">
                <i :class="['lli',{wactive:tabType == 1}]" @click="tabType = 1">游戏列表</i> 
                <i :class="['lli',{wactive:tabType == 2}]" @click="tabType = 2">棋牌列表</i>
              </h2>
              <a href="javascript:;" class="close-button" @click="$store.state.trade=false"><i class="icon icon-times"></i></a>
              <lotteryList :tabType="tabType"/>
          </div>
        </transition>



          

    </div>
</template>

<script>
  import userSet from '../my/son/setting';
  import charSet from '../my/chart/index';
  import lotteryList from '../home/common/lotteryList';
  export default {
      components:{ lotteryList,userSet,charSet },
      mounted(){
      },
      data () {
        return {
          link:[
            { speed: '暂无',url: "检测" },
            { speed: '暂无',url: "检测" },
            { speed:'暂无',url: "检测" },
          ],
          submenu: 0,
          push: false,
          user: '',
          tabType:1,
        }
      },
      watch:{
        $route(){
          this.submenu = 0;
        }
      },
      computed:{
      },
      methods:{
        //app下载
        appDown(){
          let _this = this,target = '#';

          _this.$messagebox({
            title:'温馨提示',
            message:'前往下载app吗？',
            showCancelButton:true,
            confirmButtonText:'确认前往',
            cancelButtonText:'取消'
          }).then((value)=>{

            if(value == 'confirm'){
              _this.$getData({
                loading:true,
                url:'/api/home/in/setUp',
                data:{type:'login_jump'},
                callback:function(res){
                  // console.log(res);
                  if(res.value){
                    if(_this.judge() == 'iphone'){
                      target = res.value['ipa'];
                    }else{
                      target = res.value['apk'];
                    }
                    if(target.indexOf('http') > -1){
                      // console.log(link);
                      location.href = target;
                    }else{
                      // console.log(link);
                      location.href = '//' + target;
                    }
                  }
                }
              });
            }

          });

        },
        judge(){
          let agent = navigator.userAgent.toLowerCase(),type='android';
          if(agent.indexOf("android") > -1){
            type = 'android';
          }else if(agent.indexOf("iphone") > -1){
            type = 'iphone';
          }else if(agent.indexOf("ipad") > -1){
            type = 'ipad';
          }else{
            type = 'window';
          }
          return type;
        },
        // webSpeed:function(){
        //   this.$getData({
        //     loading:true,
        //     url:'/api/Home/in/webSpeed',
        //     type:'POST',
        //     data:'',
        //     callback:function(res){
        //       this.link = res;
        //     },
        //     errorCallback:function(){
        //     }
        //   });
        // },
        changePush:function(){
          let _this = this;
          _this.push = !_this.push;
          _this.$parent.changeUp();
          // console.log(_this.push);
          return;
          if(_this.push){
            _this.$getData({
              loading:true,
              url:'/api/home/in/line',
              data:'',
              callback:function(res){
                _this.$set(_this,'link',res);
              }
            });
          }
        },
        alertAction(){
          // console.log(123);
          if(this.$route.path.indexOf('game-') > -1 || this.$route.path.indexOf('My/open/') > -1){
            if(this.$route.path.indexOf('My/open/') > -1){
              this.$store.commit('setData',{ key: 'gamesel',value: true });
            }else{
              this.$store.commit('setData',{ key: 'trade',value: true });
            }
          }
        },
        loginOut(){
          this.submenu =! this.submenu;
          let _this = this;
          _this.$getData({
            loading: true,
            url:'/api/home/in/loginOut',
            callback:function(res){
              if(res.code){
                localStorage.removeItem('pragma');
                _this.$store.state.login = false;
                _this.$store.state.user = false;
                // _this.$store.state.basic.main_color = '';
                if(_this.$route.path.indexOf('My') > -1 || _this.$route.path.indexOf('Capital') > -1){
                  _this.$router.push('/in');
                }
              }
              _this.$total({ message:res.msg,type: res.code });
            }
          });
        }
      }
  }
</script>

<style scoped>
.userinfo{
  padding-right: 2.5rem;
}
/* .push_chart_menu .{} */
.w_chart_wrapper{
  transform: translateX(100%);
}
.push_chart_menu .w_chart_wrapper{
  transform: translateX(0%);
}
.kd-menu-w{
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  margin:0;
  background-color: #ebf3f3;
  /* margin-left:25%; */
}
.w_chart_room {
  position: fixed;
  transition:.2s;
  width: 1.2rem;
  padding:2px;
  /* height:50px; */
  z-index: 8;
  border:1px solid #888;
  font-size: .7rem;
  /* line-height: .7rem; */
  display: inline;
  /* writing-mode:lr-tb; */
  background: #008aa3;
  color:white;
  border-radius: 5px;
  right: 0;
  bottom:50%;
  background: linear-gradient(to right, #008aa3 , #62e7ff);
}
.w_chart_room .chart_check{
  right:0%;
}
.close-menu-w{
    z-index:10;
    font-size: 0px;
    display: block;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: rotate(0deg);
    color: rgb(255, 255, 255);
    line-height: 40px;
    text-align: center;
    margin: -20px 0px 0px 1rem;
    transition: 0.2s ease;
    border-radius: 100%;
}
.page-title .lli{
  font-style: normal; 
}
.page-title .wactive{
  color:#008aa3;
  border-bottom: 1px solid #008aa3;
}
</style>
