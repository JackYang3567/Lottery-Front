<template>
  <main class="kd-body game game-d-room game-pcdd-room-d ">
      <div class="pcdd-game-head">
          <div class="kd-row room-head">
              <div class="kd-col">
                  <div class="bet-period" @click="test()">距
                      <p class="rh-box"><span>{{ desc['code'] }}</span></p> 期{{desc['msg']}}
                  </div>
                  <div class="countdown-text">
                      {{ desc['num'] }}
                  </div>
              </div>
              <div class="kd-col">
                  <div class="bet-period">第
                      <p class="rh-box rh-box-gray"><span>{{ open_msg['code'] }}</span></p> 期</div>
                  <div class="result-text">
                    {{open_msg['msg']}}
                    <i class="icon icon-circle-arrow-down" v-on:click="lottery_num =! lottery_num"></i></div>
              </div>
          </div>
      </div>
      <div class="pcdd-chat-room">
          <dl name="pcdd-chat-messages" class="kd-container chat-messages pcdd-chat-messages">
            <template v-for="(item,key) in desktop">
              <!--用户投注信息使用-->
              <template v-if="item.type == 1 || item.type == 2 ">
              <dt class="chat-author pcdd-chat-author bet-msg "  :class="item.type == 1? 'other': 'self'">
                <span class="time"><time class="inner">{{item.time}}</time></span>
                <span class="name" v-if="item.type == 2">{{item.name}}</span>

                <span class="pcdd-avatar" v-if="item.photo == 0"></span>
                <img style="width:37px;border-radius:50%;"  :src="require('@/assets/images/photo/'+ item.photo +'.png')" v-else />

                <span class="name" v-if="item.type == 1">{{item.name}}</span>
                <!-- <span v-if="item.type == 1" class="pcdd-avatar"></span>
                <span class="name">{{item.name}}</span>
                <span v-if="item.type == 2" class="pcdd-avatar"></span> -->
              </dt>
              <dd class="chat-message pcdd-chat-message bet-msg " :class="item.type == 1? 'other': 'self'">
                  <div class="inner" @click="withBet(key)"><i class="icon icon-clock"></i>
                    <span class="msg-text-item issue-no">{{item.expect}} 期</span>
                    <span class="msg-text-item period">投注：{{item.code ? item.code : '***'}}</span>
                    <span class="msg-text-item amount">¥ {{item.money ? item.money : '***'}}</span>
                    <span class="msg-text-tip"></span></div>
              </dd>
            </template>
            <!--提示信息使用-->
            <dd class="chat-message pcdd-chat-message system" v-if="item.type == 3">
                <div class="inner">{{item.msg1}}<span class="color-blue">{{item.msg2}}</span>{{item.msg3}}</div>
            </dd>
            <!--用户进入房间-->
              <!-- <dd class="chat-message pcdd-chat-message system"v-if="item.type == 3">
                  <div class="inner">欢迎<span class="color-blue msg-text-user"> {{item.name}} </span>进入房间... </div>
              </dd> -->
              <!--提示信息使用-->
              <!-- <dd class="chat-message pcdd-chat-message system">
                  <div class="inner"><span class="color-blue">【871685期】</span>已封盘</div>
              </dd> -->
              <!--个人用户投注信息-->
              <!-- <template v-if="item.type == 2">
              <dt class="chat-author pcdd-chat-author bet-msg self" >
                <span class="time"><time class="inner">{{item.time}}</time></span>
                <span class="name">{{item.name}}</span>
                <span class="pcdd-avatar"></span>
              </dt>
              <dd class="chat-message pcdd-chat-message bet-msg self">
                <div class="inner"><i class="icon icon-clock"></i>
                  <span class="msg-text-item issue-no">{{item.expect}} 期</span>
                  <span class="msg-text-item period">投注：{{item.code}}</span>
                  <span class="msg-text-item amount">¥ {{item.money}}</span>
                  <span class="msg-text-tip"></span></div>
              </dd>
            </template> -->
          </template>
          </dl>

            <!-- 音频测试 -->

            <!-- 音频测试完 -->

          <div class="pcdd-chat-footer">
              <div class="pcdd-chat-textinput">
                  <div type="button" class="kd-button pcdd-button" v-on:click='betting_sel = !betting_sel'><span>投注</span>
                      <button type="button">Button</button>
                  </div>
                  <div class="kd-textinput text">
                      <input type="text" maxlength="20" v-model.trim="bet_input" placeholder="请输入注单,如小单1000" class="pcdd-chat-input">
                      <input type="text" maxlength="20" v-model.trim="bet_input" placeholder="输入如小单 1000" class="pcdd-chat-input pcdd-chat-input--sm">
                  </div>


                  <div type="button" class="kd-button pcdd-button-odd" @click="clickInput"><span>发送注单</span>
                      <button type="button">Button</button>
                  </div>
              </div>
          </div>

<transition name="bounce2">
  <div class="follow-betting"  v-show="with_sel">
    <div class="follow-betting-body">
      <!--情况一-->
      <template v-if="withType.code > 0">
      <h5 class="title">确定跟投吗？</h5>
      <ul class="nostyle betting-datas">
        <li class="data-item">玩家：<span class="data-item-value">{{with_bet['name']}}</span></li>
        <li class="data-item">期号：<span class="data-item-value">{{with_bet['expect'] }}</span></li>
        <li class="data-item">玩法：<span class="data-item-value">{{with_bet['code'] }}</span></li>
        <li class="data-item">金额：<span class="data-item-value">{{with_bet['money'] }}</span></li>
      </ul>
      <div class="kd-buttons">
        <div type="button" class="kd-button confirm-button" @click="withOn">
          <span>确定</span> <button type="button">Button</button>
        </div>
        <div type="button" class="kd-button cancel-button" @click="with_sel=false">
          <span>取消</span> <button type="button">Button</button></div>
      </div>
    </template>
      <!--情况二三四-->
      <template v-else>
      <h5 class="title">提示</h5>
      <div class="betting-datas empty">
          <p> {{withType.msg}}</p>
      </div>
      <div class="kd-buttons">
          <div type="button" class="kd-button confirm-button" @click="with_sel=false"><span>确定</span>
              <button type="button">Button</button>
          </div>
      </div>
    </template>

      </div>
    </div >
  </transition>
          <!---->
      </div>


      <transition name="bounce2"><!--投注选择列表-->
      <div class="pcdd-betting-panel" v-show="betting_sel">
          <div class="overlay"></div>
          <div class="inner has-setting">
              <div class="pcdd-betting-panel-body" >
                  <div class="betting-box" >
                      <div class="betting-box-head">
                          <h6 class="betting-box-title"><span class="betting-box-title-box">投注类型</span><a class="btn-close"><i class="icon icon-times" v-on:click="betting_sel=!betting_sel"></i></a></h6>

                          <div class="selected-balls">{{bet_note}}&nbsp;</div>
                      </div>
                      <div class="betting-box-body" >
                      <template v-for="(item,itemK) in bet_list" v-if="item.switch == 1">
                      <ul data-id="d-t1" :class="['nostyle kd-row-middle betting-box-lottery-balls '+(item.class ? item.class: '')]" >
                          <li v-for="(item1,item1K) in item.data" v-if="item1.switch == 1" :class="['item '+ (item1['class'] ? item1['class']:'') +(bet_data[item1K]?' selected':'') ]"    @click="betData([item1K,item1['name'],item1['odds']],itemK)">
                              <p class="lottery-ball">{{item1['name']}}<span class="lottery-odd">{{item1['odds']}}</span></p>
                          </li>
                      </ul>
                    </template>
                      </div>
                      <div class="betting-box-foot" >
                          <div class="bet-setting"><a class="btn">筹码选择</a></div>
                          <!-- <div class="bet-setting-body" style="display: none;">
                              <ul class="nostyle kd-row-middle betting-box-chips chips-setting">
                                  <li class="item">
                                      <div class="kd-chip-button chip1">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">5</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip2">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">10</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip3">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">20</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip4">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">50</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip5">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">100</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip6">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">500</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip7">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">1千</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip8">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">5千</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip9">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">1万</span></div>
                                      </div>
                                  </li>
                                  <li class="item">
                                      <div class="kd-chip-button chip10">
                                          <div class="kdcb-inner"><i class="kdcb-border one"></i> <i class="kdcb-border two"></i> <span class="kdcb-text">5万</span></div>
                                      </div>
                                  </li>
                              </ul>
                              <div class="kd-row-middle"><a class="bet-button confirm">确定</a> <a class="bet-button cancel">取消</a></div>
                          </div> -->
                          <div class="betting-box-form">
                              <ul class="nostyle kd-row-middle betting-box-chips">
                                  <li class="item" v-for="(item,key) in bet_point['data']" v-on:click="betPoint([key,item.val])">
                                      <div :class="['kd-chip-button '+item.class+(bet_point['sel'] === key ? ' selected':'')]">
                                          <div class="kdcb-inner ">
                                            <i class="kdcb-border one"></i>
                                            <i class="kdcb-border two"></i>
                                            <span class="kdcb-text">{{item.text}}</span>
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                              <div class="kd-row-middle">
                                  <label for="betting-amount">单注金额</label>
                                  <div class="kd-textinput number">
                                      <input id="betting-amount" type="number" v-model.number="money">
                                  </div> <a class="bet-button reset" @click="delData()">清除</a>
                                  <a class="bet-button" :class="{'disabled': (!Object.keys(bet_data).length || !money)}"  @click="betOn()">投注 </a></div>
                                  <!-- disabled -->
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 开盘时候的音乐 -->
          <!-- <audio preload="auto" id="music_start" src="/static/audios/start-bet.mp3"></audio> -->
          <!-- 封盘时候的音乐 -->
          <!-- <audio preload="auto" id="music_close" src="/static/audios/close-bet.mp3"></audio> -->
          <!-- 开出号码的音乐 -->
          <!-- <audio preload="auto" id="music_show" src="/static/audios/show-result.mp3"></audio> -->
          <!-- 投注成功声音 -->
          <!-- <audio preload="auto" id="music_bet"   src="/static/audios/click-bet.mp3"></audio> -->
          <!-- 选择注单声音 -->
          <!-- <audio preload="auto" id="music_ball"  src="/static/audios/click-ball.mp3"></audio> -->
          <!-- 选择筹码声音 -->
          <!-- <audio preload="auto" id="music_chip" src="/static/audios/click-chip.mp3"></audio> -->
      </div>
    </transition>

    <!-- <li class="item clearfix">
   第 <span class="important">2273133</span> 期
      <span class="lottery-result">&nbsp;&nbsp;9&nbsp;&nbsp;+&nbsp;&nbsp;1&nbsp;&nbsp;+&nbsp;&nbsp;4&nbsp;&nbsp;=&nbsp;14&nbsp;</span>
      <span class="lottery-prop large-small">大</span> <span class="lottery-prop odd-even">双</span>
    </li> -->

<transition name="bounce2">
        <div class="room-latest-history-list" v-show="lottery_num" >
          <div class="overlay"></div> <a class="rlhl-close" v-on:click="lottery_num = !lottery_num">关闭</a>
          <div class="kd-container rlhl-inner">
              <ul class="nostyle">
                <li class="item clearfix" v-for="item in lottery" v-if='item.expect!=0'>
                  第 <span class="important">{{item.expect}}</span> 期
                  <span class="lottery-result">
                    &nbsp;&nbsp;{{ open_data(item.num)[0] }}
                    &nbsp;&nbsp;+&nbsp;&nbsp;{{ open_data(item.num)[1] }}
                    &nbsp;&nbsp;+&nbsp;&nbsp;{{ open_data(item.num)[2] }}
                    &nbsp;&nbsp;=&nbsp;{{ open_data(item.num)[3] }}&nbsp;
                  </span>
                  <span class="lottery-prop large-small">{{ open_data(item.num)[4] }}</span>
                  <span class="lottery-prop odd-even">{{ open_data(item.num)[5] }}</span>
                </li>
              </ul>
          </div>
      </div>
 </transition>

      <!-- <div class="promptbox-wrapper prompt-cart-list" style="display: none;">
          <section class="promptbox">
              <div class="prompt-head">我的注单 (共 0 注)</div>
              <ul class="prompt-body nostyle">

                  <li>您的注单是空的...<a>前往选号</a></li>

              </ul>
              <div class="prompt-foot">
                  <div type="button" class="kd-button main-button disabled">确认下注
                      <button type="button" disabled="disabled">Button</button>
                  </div>
                  <div type="button" class="kd-button">取 消
                      <button type="button">Button</button>
                  </div>
              </div> <a href="javascript:;" class="prompt-close kd-close">close</a>
              <div class="message-tip" style="display: none;">false</div>
          </section>
          <div class="promptbox-overlay"></div>
      </div> -->

        <trendPc />

      <!---->
      <!---->
  </main>
</template>



<script>
  import trendPc from '../common/trend_pc';
export default {
  components:{trendPc},
  created(){      //组件实列创建完成
  },
  mounted(){      //模版编译挂载后 初始化
    this.room = this.$route.params.level;
    this.lunxun = true;
    this.bet();             //投注列表信息
    this.dataRedy();        //页面信息
    this.timeDesc();        //开启倒计时
  },
  update(){      //组件更新后
  },
  destroyed () { //组件销毁后调用
    this.lunxun = false;
  },
  data () {
    return {
      //页面标题
      title:{room:['24','25','26','27','57','58'],
            level:['初级房','中级房','高级房']},
      //页面弹窗
      betting_sel:false,
      lottery_num:false,
      //开奖数据(期号和时间)
      lottery:[],
      lottery_new:{expect:0,time:0},
      //轮询
      lunxun:false,
      //倒计时定时器
      stop:'',
      stop1:'',
      //房间数据
      send_data:{
        type:'',//彩票种类
        level:'',//房间等级
      },
      //提示信息参数
      tip:{
        expect_start:true,
        expect_center:true,
        expect_end:true,
      },
      //投注列表和倍数
      bet_list:{
        sd:{class:'','switch':1,data:{
          sda:{name:'大',odds:2,class:'a','switch':1,prize:'14,15,16,17,18,19,20,21,22,23,24,25,26,27'},
          sdb:{name:'小',odds:2,class:'b','switch':1,prize:'0,1,2,3,4,5,6,7,8,9,10,11,12,13'},
          sdbc:{name:'小单',odds:4.6,class:'bc','switch':1,prize:'1,3,5,7,9,11,13'},
          sdad:{name:'大双',odds:4.6,class:'ad','switch':1,prize:'14,16,18,20,22,24,26'},
          sdmin:{name:'极小',odds:15,class:'min','switch':1,prize:'0,1,2,3,4,5'},
          sdc:{name:'单',odds:2,class:'c','switch':1,prize:'1,3,7,5,7,9,11,13,15,17,19,21,23,25,27'},
          sdd:{name:'双',odds:2,class:'d','switch':1,prize:'0,2,4,6,8,10,12,14,16,18,20,22,24,26'},
          sdac:{name:'大单',odds:4.2,class:'ac','switch':1,prize:'15,17,19,21,23,25,27'},
          sdbd:{name:'小双',odds:4.2,class:'bd','switch':1,prize:'0,2,4,6,8,10,12'},
          sdmax:{name:'极大',odds:15,class:'max','switch':1,prize:'22,23,24,25,26,27'}}
        },
        color:{class:'spectial-product','switch':1,data:{
          colorred:{name:'红',odds:2.61,class:'red',type:'color','switch':1,prize:'1,2,7,8,12,13,18,19,23,24'},
          colorblue:{name:'蓝',odds:2.82,class:'blue',type:'color','switch':1,prize:'3,4,9,10,14,15,20,25,26'},
          colorgreen:{name:'绿',odds:3.15,class:'green',type:'color','switch':1,prize:'0,5,6,11,16,17,21,22,27'},
          coloryellow:{name:'豹子',odds:80,class:'yellow',type:'other','switch':1,prize:'三个数一样即为中奖'}}
        },
        num:{class:'number-product','switch':1,data:{
          num0:{name:0,odds:800,class:'green','switch':1},
          num1:{name:1,odds:260,class:'red','switch':1},
          num2:{name:2,odds:130,class:'red','switch':1},
          num3:{name:3,odds:80,class:'blue','switch':1},
          num4:{name:4,odds:53,class:'blue','switch':1},
          num5:{name:5,odds:38,class:'green','switch':1},
          num6:{name:6,odds:28,class:'green','switch':1},
          num7:{name:7,odds:22,class:'red','switch':1},
          num8:{name:8,odds:18,class:'red','switch':1},
          num9:{name:9,odds:15,class:'blue','switch':1},
          num10:{name:10,odds:13,class:'blue','switch':1},
          num11:{name:11,odds:13,class:'green','switch':1},
          num12:{name:12,odds:12,class:'red','switch':1},
          num13:{name:13,odds:12,class:'red','switch':1},
          num14:{name:14,odds:12,class:'blue','switch':1},
          num15:{name:15,odds:12,class:'blue','switch':1},
          num16:{name:16,odds:13,class:'green','switch':1},
          num17:{name:17,odds:13,class:'green','switch':1},
          num18:{name:18,odds:15,class:'red','switch':1},
          num19:{name:19,odds:18,class:'red','switch':1},
          num20:{name:20,odds:22,class:'blue','switch':1},
          num21:{name:21,odds:28,class:'green','switch':1},
          num22:{name:22,odds:38,class:'green','switch':1},
          num23:{name:23,odds:53,class:'red','switch':1},
          num24:{name:24,odds:80,class:'red','switch':1},
          num25:{name:25,odds:130,class:'blue','switch':1},
          num26:{name:26,odds:260,class:'blue','switch':1},
          num27:{name:27,odds:800,class:'green','switch':1}}
        },
      },
      //投注筹码
      bet_point:{sel:'','switch':1,data:[
          {class:"chip1",text:'5',val:5,'switch':1},
          {class:'chip2',text:'10',val:10,'switch':1},
          {class:"chip3",text:'20',val:20,'switch':1},
          {class:'chip4',text:'50',val:50,'switch':1},
          {class:'chip5',text:'100',val:100,'switch':1},
          {class:'chip6',text:'500',val:500,'switch':1},
          {class:'chip7',text:'1千',val:1000,'switch':1},
          {class:'chip8',text:'5千',val:5000,'switch':1},
          {class:'chip9',text:'1万',val:10000,'switch':1},
          {class:'chip10',text:'5万',val:50000,'switch':1},
        ]
      },
      //选择投注数据
      bet_data:{
      },
      //投注时注释数据
      bet_note:'',
      //输入投注数据
      bet_input:'',
      //投注金钱
      money:'',
      //用户数据最大id
      user_list:0,
      //用户最大时间
      user_time:0,
      //用户跟投数据
      with_sel:false,
      with_bet:{
        name:'',
        expect:'',
        code:'',
        money:'',
      },
      //房间号
      room:0,
      //桌面显示的数据
      desktop:[
        //{type:0,name:'张**',expect:'265489',code:'大',money:'500',time:'2018-03-17 14:04:01'},//其他用户信息
        //{type:2,name:'张**',expect:'265489',code:'小',money:'600',time:'2018-03-17 14:04:01'},//本人用户信息
        //{type:3,name:'李**'},//用户进入房间信息
        //{type:4,expect:'265490'},//截至封盘,开启信息
      ],
    }
  },
  computed:{//计算属性
    open_msg(){//右侧开奖
      var msg = {};
      if(this.lottery_new['expect'] == 0){
        msg['code'] = 0;
        msg['msg'] = '暂停开奖';
      }else{
        msg['code'] = String(this.lottery_new['expect'] - 1);
        //msg['code'] = String(msg['code']);
        if(msg['code'].length > 7){
          msg['code'] = msg['code'].substr(msg['code'].length - 7);
        }
        if(!this.lottery.length || (this.lottery_new['expect'] - 1) !=  this.lottery[0]['expect']){
          msg['msg'] = '正在开奖中....';
        }else{
          var code = this.lottery[0]['num'].split(',');
          var plus = parseInt(code[0])+parseInt(code[1])+parseInt(code[2]);
          msg['msg'] = code[0] + '+' +code[1]+ '+' +code[2] + '=' + plus + '(' + (plus < 14 ? '小' : '大') + ',' + (plus%2 ? '单' : '双') + ')';
        }
      }
      return msg;
    },
    desc(){//左侧倒计时
      let msg = {};
      if(this.lottery_new['expect'] == 0){
        msg['code'] = 0;
        msg['msg'] = '开奖';
        msg['num'] = '00分00秒';
      }else{
          msg['code'] = String(this.lottery_new['expect']);
          if(msg['code'].length > 7){
            msg['code'] = msg['code'].substr(msg['code'].length - 7);
          }
          msg['num'] = this.lottery_new['time'];
        if(msg['num'] < 0){
          msg['num'] = 30 + parseInt(msg['num']);
          msg['msg'] = '开奖';
        }else{
          msg['msg'] = '截止';
        }
        if(msg['num'] <= 0){
          msg['num'] = '00分00秒';
        }else{
          let i = parseInt(msg['num']/60),
              s = parseInt(msg['num']%60);
              msg['num'] = (i < 10 ? '0'+i : i) + '分'+(s < 10? '0'+s:s) + '秒';
        }
      }
      return msg;
    },
    withType(){//跟投样式
      // if(this.with_bet['code'] == '' || this.with_bet['money'] == ''){
      //   console.log(123);
      // }
      let _this = this;
      let return_data = {};
      if(_this.lottery_new.time <= 0){
         return_data['code'] = -1;
         return_data['msg'] = '已封盘,请等待下一期';
         //console.log(1);
      }else if(_this.with_bet['expect'] != _this.lottery_new['expect']){
        return_data['code'] = -2;
        return_data['msg'] = '只能跟投当前期';
        //console.log(2);
      }else if(_this.with_bet['code'] == '' || _this.with_bet['money'] == ''){
        return_data['code'] = -3;
        return_data['msg'] = '不允许跟投';
        //console.log(3);
      }else{
        return_data['code'] = true;
        return_data['msg'] = '';
        //console.log(4);
      }
      return return_data;
    }
   },
  watch:{//状态侦听
    desktop(){
      let _this = this;
      _this.$nextTick(()=>{//当dom发生变化，更新后执行的回调
        _this.smooth();
      });
    }
  },
  methods:{//方法
    lotteryAll(){
      let _this = this;
      _this.$getData({
        url:'/api/home/home/lotteryAll',
        data:'',
        type:'post',
        callback:function(res){
          // if(res){
          //   _this.$set(_this,'title',res);
          // }
          _this.$store.state.title = res[_this.$route.params.id]+'-'+_this.title['level'][_this.room];
          // _this.$store.state.title = _this.title[_this.$route.params.id];
          // alert(this.$store.state.api_path);
        }
      });
    },
    playMusic(type = 0){
      // let _this = this;
      // this.$refs.music.playOn(type);
      // arr[type]

        let arr = [
          'music_ball' , //选择注单
          'music_bet'  ,  //成功发送注单
          'music_chip' , //筹码
          'music_start',  //开始投注
          'music_close',  //封盘
          'music_show' ,//开出新的一期
        ];
        this.$music(arr[type]);


    },
    postData(){//页面数据请求
      var _this = this;
      var get_Data = {
        'type':_this.send_data['type'],
        'level':_this.send_data['level'],
        'number':_this.lottery.length ? _this.lottery[0]['expect'] : 0,                        //期号最后一个id
        'people':_this.user_list,                                 //用户最后一个id
        'peoplet':_this.user_time,                                  //用户最后一个time
        'time':_this.lottery_new['time'] < -29 ? 1 : 0 ,
      };
      //console.log(get_Data);
      _this.$getData({
        // loading:true,
        url:'/api/Home/Lottery28/getData',
        type: 'POST',
        data: get_Data,
        callback: function(res){
          //console.log(postData);
            if(res){
              _this.lottery_new['expect'] = res.expect;
              _this.lottery_new['time'] = res.time;
              var codes = [];
              if(res.number != ''){ //开奖期号
                if(_this.lottery.length){
                  _this.playMusic(5);
                }
                _this.$set(_this,'lottery',res.number.concat(_this.lottery));
              }
              if(res.people != '' && res.expect!=0){//用户页面投注内容
                _this.user_list = res.people[0]['list'];
                _this.user_time = res.people[0]['listt'];
                codes = res.people.reverse();
                _this.$set(_this,'desktop',_this.desktop.concat(codes));
                // alert(1);
              }
            }
            //alert(1);
            // console.log(_this.lunxun);
            if(_this.lunxun){
              setTimeout(_this.postData,3000);
            }
        },
        errorCallback:function(){
          if(_this.lunxun){
            setTimeout(_this.postData,3000);
          }
        }
      });

    },
    test(){
      // console.log(document.body.scrollHeight);
      // // console.log(document.documentElement.scrollTop);    //滚动条条位置
      // // console.log(document.documentElement.clientHeight); //
      // document.documentElement.scrollTop += 300;
    },
    smooth(){//滚动条平滑动作
          let scrollTop = document.documentElement.scrollTop;
          //公式 总滚动距离 - 滚动条长度 = 可滚动距离
          let range = document.documentElement.scrollHeight - document.documentElement.offsetHeight;
          //如果 可滚动距离 - 滚动条位置 > 500
          if(range - document.documentElement.scrollTop > 500){
            document.documentElement.scrollTop += 300;
          }else{
            document.documentElement.scrollTop += 10;
          }
          //如果无效 使用第二种方式下拉
          if(scrollTop == document.documentElement.scrollTop){
            range = document.body.scrollHeight - document.body.offsetHeight;
            if(range - document.body.scrollTop > 500){
              document.body.scrollTop += 300;
            }else{
              document.body.scrollTop += 10;
            }
            if(document.body.scrollTop < range){
              setTimeout(this.smooth,10);
            }
          }else if(document.documentElement.scrollTop < range){
            setTimeout(this.smooth,10);
          }
    },
    timeDesc(){//这里是倒计时----------------
      let _this = this;
      _this.lottery_new.time--;
      if(_this.lottery_new.time > 60 && _this.tip.expect_start){//提示信息
          _this.playMusic(3);
        _this.desktop.push({
            type:3,
            msg1:'',
            msg2:'【'+_this.lottery_new['expect']+'】期',
            msg3:',请开始投注'});
        _this.tip.expect_start = false;
        _this.tip.expect_center = true;
        _this.tip.expect_end = true;
      }else if(_this.lottery_new.time <= 60 && _this.lottery_new.time > 40 && _this.tip.expect_center){
        _this.desktop.push({
            type:3,
            msg1:'',
            msg2:'【'+_this.lottery_new['expect']+'】期',
            msg3:',距封盘还有'+_this.lottery_new.time+'秒,请尽快下注'});
        _this.tip.expect_center = false;
      }else if(_this.lottery_new.time < -1 && _this.tip.expect_end && _this.lottery_new['expect']!=0){
        _this.playMusic(4);
        _this.desktop.push({
            type:3,
            msg1:'',
            msg2:'【'+_this.lottery_new['expect']+'】期',
            msg3:'已封盘'});
        _this.tip.expect_end = false;
        _this.tip.expect_start = true;
      }
      if(_this.lunxun){
        setTimeout(_this.timeDesc,1000); //倒计时
      }
    },
    dataRedy(){// 地址栏是否正确 --------------------
      if(!(this.title['room'].indexOf(this.$route.params.id) > -1)  || !this.title['level'][this.$route.params.level] ){
        // console.log(['57',58,59,10,15].indexOf(this.$route.params.id));
        // console.log(this.title['room'].indexOf(this.$route.params.id));
       this.$router.push('/');
      }else{
        this.lotteryAll();
        this.send_data['type'] = this.$route.params.id;
        this.send_data['level'] = this.$route.params.level;
        this.postData();
      }
    },
    open_data(code){//开奖计算
      if(code != ''){
      var code = code.split(',');
      var return_data = [];
          return_data[0] = code[0];
          return_data[1] = code[1];
          return_data[2] = code[2];
          return_data[3] = parseInt(code[0])+parseInt(code[1])+parseInt(code[2]);
          return_data[4] = return_data[3] < 14 ? '小':'大';
          return_data[5] = return_data[3] % 2 == 0 ? '双':'单';
          if(return_data[3] < 10){
            return_data[3] = ' '+return_data[3]+' ';
          }
          return return_data;
      }else{
        return '正在开奖中.....';
      }
    },
    changeType(data){
      let bet_arr = {
       大: ['a','single','sd'],
       小: ['b','single','sd'],
       单: ['c','single','sd'],
       双: ['d','single','sd'],
       大单: ['ac','double','sd'],
       大双: ['ad','double','sd'],
       小单: ['bc','double','sd'],
       小双: ['bd','double','sd'],
       极大: ['max','other','sd'],
       极小: ['min','other','sd'],
       绿: ['green','color','color'],
       蓝: ['blue','color','color'],
       红: ['red','color','color'],
       豹子: ['yellow','other','color'],
     };
     return bet_arr[data] ? bet_arr[data] : [data,'double','num'];
    },
    clickInput(){//输入式注单发送按钮
        var _this = this;
        if(_this.bet_input == ''){
          return false;
        }else if(_this.lottery_new['time'] < 0){
          _this.$total({ message:'本期已封盘！',type: 2 });
          return false;
        }
        var  number=[],dit='',point=[];
        var arrval = _this.bet_input.split(' ');
        for(var i=0,len=arrval.length;i<len;i++){
          if( /^[大|小|单|双|红|蓝|绿]{1}\d+$/.test(arrval[i]) || /^极大\d+$/.test(arrval[i]) ||
              /^[极大|极小|豹子|大单|大双|小双|小单]{2}\d+$/.test(arrval[i])||
              /^[1-2]{1}[0-7]{1}[\/|.|艹|草|操]\d+$/.test(arrval[i]) ||
              /^[0-9]{1}[\/|.|艹|草|操]\d+$/.test(arrval[i])){
              dit = arrval[i].match(/^[\u4e00-\u9fa5]{1,2}|^\d+/)[0];
              let re = _this.changeType(dit);
              number[i] = [dit,_this.bet_list[re[2]]['data'][(re[2]+re[0])]['odds'],re[0],re[1]]; //输入内容
              point[i] = arrval[i].match(/\d+$/)[0];                                  //输入金额
          }else{
            _this.$total({ message:'下注格式错误',type: 2 });
            return false;
          }
        }
        _this.betOn(2,number,point);
    },
    betPoint(num){//筹码选择
      let _this = this;
      _this.playMusic(2);
      _this.bet_point['sel'] = num[0];
      _this.money = (_this.money == '' ? _this.money : parseInt(_this.money))+parseInt(num[1]);
    },
    betData(add,key){//选择投注 样式变化
      let _this = this;
      _this.playMusic(0);
      if(_this.bet_data[add[0]]){
        _this.delData(add[0]);
        _this.bet_note = ' ';
      }else{
        let rule = { //投注规则
          sdbc:'a', //小单
          sdad:'a', //大双
          sdac:'b', //大单
          sdbd:'b', //小双
        },
        rule_del = {//规则内容
          a:['sdac','sdbd'],
          b:['sdbc','sdad']
        };

        if(rule[add[0]]){
          for(let item in rule_del[rule[add[0]]]){
            if(_this.bet_data[rule_del[rule[add[0]]][item]]){
              _this.delData(rule_del[rule[add[0]]][item]);
            }
          }
        }

        _this.$set(_this.bet_data,add[0],[add[1],add[2],_this.changeType(add[1])[0],_this.changeType(add[1])[1]]);
        _this.bet_note = _this.bet_list[key]['data'][add[0]]['prize'] ? '中奖和值['+ _this.bet_list[key]['data'][add[0]]['prize']+']': '中奖号码['+ add[1] +']';


      }
    },
    delData(date = ''){//注单清除
      if(date == ''){
        this.bet_data = {};
        this.money = '';
      }else{
        delete this.bet_data[date];
        let new_data = {};
        for(var a in this.bet_data){
          new_data[a] = this.bet_data[a];
        }
        this.bet_data = new_data;
      }
    },
    betOn(_type = 1,_data = '',_money = ''){//发送
      var _this = this;
      //数据加载
      var dataOn = {
        type:_type,
        lottery:this.$route.params.id,    //当前彩种
        room:_this.room,                                           //当前房间等级
        expect:_this.lottery_new['expect'],                        //当前期号
        data:_type == 1 ? _this.bet_data : _data,                  //当前注数
        money:_type == 1 ? _this.money : _money                    //当前投注金额
      }
      //前端投注数据验证
      if(_this.lottery_new['time'] <= 0){
        if(_this.lottery_new['expect'] == 0){
          _this.$total({ message:'维护中....',type: 2 });
        }else{
          _this.$total({ message:'已封盘,请期待下一期',type: 2 });
        }
        return false;
      }else if(dataOn.lottery == '' || dataOn.expect == ''){
        _this.$total({ message:'数据错误,请刷新页面！',type: 2 });
        return false;
      }else if(!Object.keys(dataOn.data).length){
        _this.$total({ message:'请选择投注类型',type: 2 });
        return false;
      }else if(dataOn.money == ''){
        _this.$total({ message:'请输入投注金额',type: 2 });
        return false;
      }
      //验证成功后发送 清除注单和金钱


      _this.$getData({
        loading:true,
        url:'/api/Home/Lottery28/betting',
        type:'POST',
        data:dataOn,
        callback:function(res){

          if(res.code > 0){
            _this.$total({ message:res.msg,type: 1 });
            _this.playMusic(1);
            if(_type == 1){
              _this.bet_data = {};
              _this.money = '';
            }else{
              _this.bet_input = '';
            }
            _this.betting_sel = false;
          }else{
            _this.$total({ message:res.msg,type: 2 });
          }
          if(res.code == -1){
            _this.$router.push('/in');
          }
        },
        errorCallback:function(){
        }
      });
    },
    withBet(key){//跟投弹窗-----------------------------
      let _this = this;
      for(let k in _this.with_bet){
        _this.with_bet[k] = _this.desktop[key][k];
      }
      _this.with_sel = true;
    },
    withOn(){//跟投确认
      let _this = this;
      if(_this.withType.code){
        let number=[],point=[],
            re = _this.changeType(_this.with_bet['code']);
        number[0] = [_this.with_bet['code'],_this.bet_list[re[2]]['data'][(re[2]+re[0])]['odds'],re[0],re[1]];
        point[0] = _this.with_bet['money'];
        _this.betOn(2,number,point);
        _this.with_sel = false;
      }else{

      }
    },
    bet(){//页面数据  是否开启彩票
      var _this = this;
      _this.$getData({
        loding:true,
        url:'/api/Home/Lottery28/bet',
        type: 'POST',
        data: {type:this.$route.params.id},
        callback: function(res){
          if(res.code < 0){
            _this.$total({ message:res.msg,type: 2 });
            _this.$router.push('/');
          }else{

            for(var k in res.data){
              _this.bet_list[k]['name'] = res.data[k]['name'];
              _this.bet_list[k]['switch'] = res.data[k]['switch'];
              for(var k1 in res.data[k]['items']){
                 _this.bet_list[k]['data'][k1]['switch'] = res.data[k]['items'][k1]['switch'];
                 _this.bet_list[k]['data'][k1]['odds'] = res.data[k]['items'][k1]['odds'][_this.room];

              }
            }
          }
        },
        errorCallback:function(){
          _this.$total({ message:'彩票暂时关闭!请选择其他游戏',type: 2 });
          _this.$router.push('/');
        }
      });
    },
  }
}
</script>

<style scoped>
.betting-box-chips {
  display: -webkit-box;
  white-space: nowrap;
  overflow-x: scroll;
}
.betting-box-chips .item{
  width: 15%;
}

</style>
