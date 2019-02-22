<template>
  <div>
    <main class="kd-body account">

      <div class="hb_box" v-if="hongbao" @click="hongbaoAction">
        <i class="icon icon-redpack-2 icon--large"></i>
      </div>

      <div class="kd-container kd-list two-cols basic-information clearfix">
          <dl class="item" v-for="data in user">
              <dt class="kd-col"><span>{{ data.text1 }}</span></dt>
              <dd class="kd-col"><span>{{data.note}}{{ data.text2 }}</span>
                <template v-if="data.level && $store.state.user['type'] == 0">
                  <span class="basic-information__level"><img :src="data.level"/></span>
                </template>
              </dd>
          </dl>
          <template v-for="data in user_count">
            <dl class="item">
              <dt class="user_basic">{{data.note}}{{data.text1}}</dt>
            </dl>
            <dl class="item">
              <dt class="user_basic">{{data.note}}{{data.text2}}</dt>
            </dl>
          </template>
          <!-- <dl class="item">
              <dt class="kd-col"><span>用户名</span></dt>
               <dd class="kd-col"><span>cc2654639</span>
               <span class="basic-information__level"><img src="../../assets/images/svg/level1.svg"></span></dd>
          </dl> -->
          </div>
          <div class="account-nav-wrapper">
            <!--这里是转换金额弹窗-->
            <transition name="bounce2">
              <div class="promptbox-wrapper promptbox-transfer-money" v-show="change">
                <!-- :style="{background: $store.state.basic.main_color,borderTop: $store.state.basic.main_color,borderBottom:$store.state.basic.main_color} -->
                <section class="promptbox" :style="{borderColor:$store.state.basic.main_color}">
                  <div class="prompt-head" :style="{backgroundColor:$store.state.basic.main_color}">额度转换</div> 
                  <div class="prompt-body">
                      <!-- <ul class="nostyle account-sub-nav kd-row-middle">
                        <li :class="!inout? 'active':''" @click="inout = false">
                          <a>转入</a>
                        </li> 
                        <li :class="inout? 'active':''" @click="inout = true">
                          <a>转出</a>
                        </li>
                      </ul>  -->
                    <tab style="margin-bottom:1rem;font-size:20px;" :active-color="$store.state.basic.main_color">
                      <tab-item :selected="!inout" @on-item-click="inout = false">转入(上分)</tab-item>
                      <tab-item :selected="inout" @on-item-click="inout = true">转出(下分)</tab-item>
                    </tab>
                    <div class="kd-field">
                      <label class="kd-field-title">平台</label> 
                      <div class="kd-select">
                        <template  v-if="api_data.length" >
                          <span class="value"> {{api_data[api_sel] ?　api_data[api_sel]['name']:'请选择平台'}}</span> 
                          <select v-model="api_sel" >
                            <option value=""> 请选择平台 </option>
                            <option :value="key" v-for="(vo,key) in api_data"  :key="key">{{vo.name}}</option> 
                          </select>
                        </template>
                        <span class="value" v-else>加载中..</span> 
                      </div>
                    </div>
                    <!--加载显示余额的地方-->
                    <div class="kd-field" v-if="api_sel !== ''">
                      <label class="kd-field-title"> {{api_data[api_sel]['name']}}余额：{{viw_money}}</label>
                    </div>
                    <div class="kd-field">
                      <label for="transfer-money" class="kd-field-title">转换金额</label> 
                      <div class="kd-textinput number">
                        <input type="number" onfocus="this.select()" id="transfer-money" @blur="checkCoin()" v-model.trim="coin" placeholder="请输入转换金额">
                      </div>
                    </div>
                  </div> 
                  <div class="prompt-foot" @click="apiInOut()">
                    <div type="button" class="kd-button" :style="{backgroundColor:$store.state.basic.main_color,borderColor:$store.state.basic.main_color}">确定 <button type="button">Button</button></div>
                  </div> <a class="prompt-close kd-close" @click="change = false">close</a>
                </section> <div class="promptbox-overlay"></div>
              </div>
            </transition>

              <ul class="nostyle kd-row account-nav ">
                  <li v-for="(item,key) in menu" :key="key">
                    <a href="javascript:;" @click="targetHref((item.href ? item.href : item.target))">
                      <i :class="['icon',item.class]"></i>{{ item.text }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="appDown">
                      <i class="icon" style="text-align:center;"><img src="@/assets/images/svg/APP.svg" style="height:40px;width:40px;"></i>APP下载
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="loginOut">
                      <i class="icon icon-account-logout"></i>安全退出
                    </a>
                  </li>
              </ul>
          </div>
      </main>

      <!-- <actionsheet
            v-model="app_show"
            :menus="app_menu"
            theme="android"
            @on-click-menu="appDown">
      </actionsheet> -->
      <group>
        <x-dialog v-model="app_show" class="dialog-demo" hide-on-blur>
          <div style="margin:10px 0;">

            <x-button mini action-type="button" @click.native="chgApp(1)" type="primary">{{app_type == 'android' ? '切换苹果':'切换安卓' }}</x-button>
            <x-button mini action-type="button" type="warn" @click.native="chgApp(2)" >前往下载</x-button>
            <!-- <x-button mini type="warn">Delete</x-button> -->
            <div style="margin-bottom:5px;color:#555;font-size:14px;padding:6px 0;">{{app_type == 'android' ? '安卓':'苹果' }}app下载二维码</div>

            <qrcode :value="app_type == 'android' ? app_line['apk']:app_line['ipa'] " type="img"></qrcode>
          </div>
        </x-dialog>
      </group>
  </div>
</template>

<script>

import { Group,Actionsheet,XSwitch,XDialog,Qrcode,XButton,Tab,TabItem } from 'vux';
export default{
  mounted(){
    this.getInfo();
    //判断是什么手机登录
    this.judge();
    // let _this = this;
    // _this.$store.state.title = '我的地盘';
  },
  components:{
    Qrcode,Group,Actionsheet,XSwitch,XDialog,XButton,Tab,TabItem
  },
  data () {
    return {
      //棋牌游戏内容
      api_data:[],
      //选择的游戏,
      api_sel:'',
      //转入还是转出 false是转入游戏 true是从游戏转出
      inout:false,
      //金额转换
      change:false,
      //需要转换的金额
      coin:0,
      //显示厂商余额
      viw_money:0,
      //app下载弹窗
      app_show:false,
      //app下载地址
      app_line:{},
      //当前手机类型
      app_type:'',
      hongbao: 0,
      basic: { out_money: 0,ing: 0 },
      user:[
        {text1:'用户ID',text2:'...',note:''},
        {text1:'用户名',text2:'...',level:'1',note:''},
        {text1:'剩余积分',text2:'...',note:''},
        {text1:'可用余额',text2:'...',note:'￥'},
        {text1:'冻结资金',text2: '...',note:'￥'},
        {text1:'累积提款',text2:'...',note:'￥'},
      ],
      user_count:[
        {text1:'今日盈亏',text2:'0.00',note:'￥'},
        {text1:'今日流水',text2:'0.00',note:'￥'},
      ],
      menu:[
        {class:"icon-account-money-in-out",href:'/Capital',text:'充值/提现'},
        {class:"icon-account-playing-record",href:'/My/record',text:'下注记录'},
        {class:"icon-account-balance-sheet",href:'/My/liquidity',text:'账户流水'},
        {class:"icon-shortcut-choujiang",href:'/My/lucky',text:'充值抽奖'},
        {class:"icon-account-promotion",href:'/My/promotion/',text:'代理推广'},
        {class:"icon-account-rob-coin",href:'/My/chart',text:'聊天室'},
        {class:'icon-shortcut-check-in',href:'',text:'签到',target:'2' },
        {class:"icon-account-edit-profile",href:'/My/edit',text:'修改资料'},
        {class:"icon-account-bank-info",href:'/My/bank',text:'银行卡信息'},
        {class:"icon-account-messages-list ",href:'/My/messages',text:'信息中心'},
        // {class:"icon-account-game",href:'',text:'选择游戏',target:'1'},
        {class:"icon-account-chess",href:'/My/chess_record',text:'棋牌下注记录'},
        {class:"icon-account-change",href:'',text:'金额转换',target:'3'}
        // {class:"icon-account-setting",href:'/My/setting',text:'账户设置'},
        // {class:"icon-account-money-management",href:'/with',text:'合买大厅'},
      ]
    }
  },
  watch:{
    //获取游戏内容
    change(curVal,oldVal){
      let _this = this;
      if(_this.$store.state.user['type'] != 0){
        _this.$total({ message:'请先注册为有效会员',type: 2 });
        _this.change = false;
      }else if(curVal && !_this.api_data.length){
        _this.ApiGet();
      }
    },
    api_sel(now,old){
      if(now !== '' && this.api_data.length){
        this.ApiMoney(this.api_data[now]['list']);
      }
    },
  },
  methods: {
    //游戏金额的转入转出
    apiInOut(){
      let _this = this;
      if(!_this.api_data.length || _this.api_data == ''){return;}
      // _this.$messagebox('', 123);
      if(_this.coin <= 0){
        _this.$total({ message:'金额错误',type: 0 });
        return;
      }else if(_this.api_sel === ''){
        _this.$total({ message:'请选择游戏平台',type: 0 });
        return;
      }
      let is_data = {
        's' : (_this.inout ? 3 :2),
        'list': _this.api_data[_this.api_sel]['list'],
        'money': _this.coin
      };
      _this.$getData({
        loading:true,
        url:'/api/home/api_game_config/gameInOut',
        data:is_data,
        callback:function(res){
          if(res['code'] > 0){
            _this.$total({ message:'操作成功',type: 1 });
            if(_this.inout){
              _this.user[3].text2 = (parseFloat(_this.user[3].text2) + parseFloat(_this.coin)).toFixed(2);
            }else{
              _this.user[3].text2 = (parseFloat(_this.user[3].text2) - parseFloat(_this.coin)).toFixed(2);
            }
            // console.log(_this.user[3].text2);
            // console.log(_this.coin);
            _this.coin = 0;
          }else{
            _this.$total({ message:res.msg,type: 0 });
          }
        }
      });
    },
    //查询游戏内部余额
    ApiMoney(list = ''){
      // console.log(list);
      if(list === ''){return;}
      let _this = this;
      _this.viw_money = '加载中...';
      // console.log('查询api');
      _this.$getData({
        url:'/api/home/api_game_config/queryDownMoney',
        data:{list:list},
        callback:function(res){
          if(res.code == 1){
            _this.viw_money = res.data;
          }else{
            _this.viw_money = 0;
          }
        }
      });
    },
    //查询游戏API
    ApiGet(){
      let _this = this;
      _this.$getData({
        url:'/api/home/Lottery/getLotteryListApi',
        data:{type:-1},
        callback:function(res){
          if(res){
            _this.$set(_this,'api_data',res);
          }
        }
      });
    },
    hongbaoAction(){
      let _this = this;
      if(_this.hongbao){
        _this.$getData({
          url:'/api/Home/My/getUserHongbao',
          callback: (res) => {
            _this.$messagebox('', res.msg);
            _this.$set(_this,'hongbao',res.data);
          }
        });
      }
    },
    checkCoin(){
      if(this.coin === '' || this.coin === null){ 
        this.coin = 0; 
      }else{
        this.coin = parseFloat(this.coin).toFixed(2);
      }
    },
    //app下载切换
    chgApp(type = 1){
      let _this = this;
      if(type == 1){
        if(_this.app_type == 'window'){
          return false;
        }else if(_this.app_type == 'android'){
          _this.app_type = 'iphone';
        }else{
          _this.app_type = 'android';
        }
      }else{
        let link = _this.app_type == 'android' ? _this.app_line['apk']:_this.app_line['ipa'];
        // console.log(link.indexOf('http'));
        if(link.indexOf('http') > -1){
          // console.log(link);
          location.href = link;
        }else{
          // console.log(link);
          location.href = '//' + link;
        }
      }
    },
    //个人中心初始化数据
    getInfo(){
      let _this = this;
      // console.log(_this.$store.state.user['level']);return;
      this.$getData({
        url:'/api/Home/My/getBasic',
        callback: function(data){
          if(data){
            _this.user[0].text2 = _this.$store.state.user['id'];
            _this.user[1].text2 = _this.$store.state.user['username'];
            _this.user[1].level = '//' + ('api_path' in _this.$store.state && _this.$store.state.api_path ? _this.$store.state.api_path : _this.$store.state.basic.static_path) + '/static/images/level'+_this.$store.state.user['level']+'.svg';//'../../../assets/images/svg/level' + _this.$store.state.user['level'] + '.svg';
            _this.user[2].text2 = _this.$store.state.user['point'] + '分';
            _this.user[3].text2 = _this.$store.state.user['money'];
            _this.user[4].text2 = parseFloat(_this.$store.state.user['no_money']);
            _this.user[5].text2 = data.out_money;
            _this.user_count[0].text2 = data.win;     //今日盈亏
            _this.user_count[1].text2 = data.water;   //今日流水
            _this.$set(_this,'hongbao',data.hongbao);
            if(data.msg == 1){
              _this.menu[9].class = "icon-account-messages-list has-message";
            }
            if(data.jump){
              _this.$set(_this,'app_line',data.jump);
            }
            //console.log(_this.user[1].level);
          }
        }
      });
    },
    //判断用户安卓苹果pc,预留
    judge(){
      let agent = navigator.userAgent.toLowerCase(),_this = this;
      if(agent.indexOf("android") > -1){
        _this.app_type = 'android';
      }else if(agent.indexOf("iphone") > -1){
        _this.app_type = 'iphone';
      }else if(agent.indexOf("ipad") > -1){
        _this.app_type = 'ipad';
      }else{
        _this.app_type = 'window';
      }
      // return type;
    },
    //app下载
    appDown(){
      let _this = this;
      if(_this.app_type == '' || !Object.keys(_this.app_line).length){
        _this.$total({ message:'暂未开放',type: 2});
      }else if( (_this.app_type == 'iphone' || _this.app_type == 'ipad') && _this.app_line['ipa'] == '' ){
        _this.$total({ message:'暂未苹果下载地址,敬请期待！',type: 2});
      }else if( _this.app_type == 'android' && _this.app_line['apk'] == '' ){
        _this.$total({ message:'暂未安卓下载地址,敬请期待！',type: 2});
      }else if( _this.app_type == 'window' ){
        _this.$total({ message:'请用手机登录查看二维码',type: 2});
      }else{
        _this.app_show = !_this.app_show;
      }
    },
    loginOut(){
      let _this = this;
      // this.$router.push('/in');
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
    },
    targetHref(type){
      let _this = this;
      if(type == 1){
        _this.$store.commit('setData',{ key:'trade',value: true });
      }else if(type == 2){
        _this.$getData({ //签到
          url:'/api/home/my/sign',
          data:'',
          callback:function(res){
            // console.log(res);
            _this.$toast(res.msg);
            if(res.code == 0){
              _this.$router.push('/in');
            }
          }
        });
      }else if(type == 3){
        _this.change = true;
      }else if(type == 4){
        _this.$total({ message:'暂时关闭',type: 2 });
      }else{
        if(type == '/My/promotion/'){
          if(_this.$store.state.user.type != 0){
            _this.$total({ message:'请先注册为有效会员',type: 2 });
            return false;
          }
        }
        _this.$router.push(type);
      }
    },
  }
}
</script>
<style  scoped>
  /* .dialog-demo{
    width: 50% ;
  } */
  .hb_box {
    position: fixed;
    right: 10px;
    top: 30%;
    z-index: 100;
  }
  .icon-redpack-2:before{
    width: 4.5rem;
    height: 4.5rem;
  }
  .user_basic{
    padding: 0 .3125rem;
    font-size: .875rem;
    border: 1px solid #c1d5ff;
    border-top-width: 0;
    border-left-width: 0;
    height: 40px;
    line-height: 40px;
    text-align: left;
    word-wrap: break-word;
    word-break: break-all;
  }
  @media screen and (max-width: 600px) {
    .account{
      background-color:#ebf3f3;
    }
  }
  .account-sub-nav{
    /* margin: 0; */
    border:none;
  }
  .account-sub-nav li{
    width:50%;
  }
</style>
