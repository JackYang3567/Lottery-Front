<template>
  <div class="bg_color">



    <div class="scroll" style="transform: translate3d(0px, 0px, 0px) scale(1);">
      <!--背景图-->
      <img class="fruitGameBg" src="@/assets/images/tiger/gameBg.png" >
      <!--后退按钮-->
      <img class="fruitBack" src="@/assets/images/tiger/back.png" @click="$router.back()">
      <!--音量按键 pauseVideo这个是关闭按钮-->
      <img class="fruitSource" src="@/assets/images/tiger/playVideo.png" v-if="music" @click="chgMusic()">
      <img class="fruitSource" src="@/assets/images/tiger/pauseVideo.png" v-else @click="chgMusic()">
      <!--中间的logo-->
      <img class="fruitResultBg" src="@/assets/images/tiger/betBg.png" >
      <!--中间的logo ->祝你好运-->
      <img class="fruitLuck" src="@/assets/images/tiger/goodLuck.png" v-if="win==0">
      <div class="fruitWinMoneyContainer" style="display: block;" v-else>赢得奖金:
      <span id="fruitWinMoney">
        <countup :end-val="win" :duration="1" :decimals="2" class="red"></countup>
      </span></div>
      <!--金额和局数 -->
      <div class="fruitCoin">
        <span>账户余额</span>
        <br>
        <i>
          {{play_money}}
          <!-- <countup :end-val="parseInt(play_money)" :duration="1" :decimals="2" ></countup> -->
        </i>
      </div>
      <div class="fruitPlayNum">
        <span>今日局数</span>
        <br>
        <i>{{play_num}}</i>
      </div>
      <!--转盘-->
      <div class="fruitContainer" :style="'height: '+auto_width*0.8+'px;'">
        <!--上-->
        <div class="topFruitRowContainer">
          <span :class="['fruitElement',{'activeFruit':act === (vo-1)}]" :style="{'height': li_width+'px','line-height': li_width+'px'}"  v-for="vo in 7">
            <img class="fruitImg" :src="fimg[(vo-1)]" :style="{'width': li_width+'px'}"/>
          </span>
        </div>
        <!--右-->
        <div class="rightFruitColContainer" :style="{'width':li_width+'px', 'bottom':li_width+'px'}">
          <span :class="['fruitElement',{'activeFruit':act === (vo+6)}]" :style="{'height': li_width+'px','line-height': li_width+'px'}" v-for="vo in 5">
            <img class="fruitImg" :src="fimg[(vo+6)]" :style="{'width': li_width+'px'}"/>
          </span>
        </div>
        <!--下-->
        <div class="bottomFruitRowContainer">
          <span :class="['fruitElement','bottomFruitCol',{'activeFruit':act === ( (19-vo))}]" :style="{'height': li_width+'px','line-height': li_width+'px'}" v-for="vo in 7">
            <img class="fruitImg" :src="fimg[( (19 - vo))]" :style="{'width': li_width+'px'}"/>
          </span>
        </div>
        <!--左-->
        <div class="leftFruitColContainer" :style="{'width':li_width+'px', 'bottom':li_width+'px'}">
          <span :class="['fruitElement','rightFruitCol',{'activeFruit':act === (24-vo)}]" :style="{'height': li_width+'px','line-height': li_width+'px'}" v-for="vo in 5">
            <img class="fruitImg" :src="fimg[(24-vo)]" :style="{'width': li_width+'px'}"/>
          </span>
        </div>
      </div>

      <!--第一层按钮-->
      <!--全部all +1-->
      <img class="fruitAllBet" src="@/assets/images/tiger/all.png" @click="allAddChip()">

      <!--自动开始 pause.png-->
      <img class="fruitStartAuto" src="@/assets/images/tiger/startAuto.png" v-if="!auto_game" @click="autoGame()">
      <img class="fruitStartAuto" src="@/assets/images/tiger/pause.png" v-else @click="autoGame()">

      <!--结 束-->
      <!-- <img class="fruitStartAuto" src="@/assets/images/tiger/pause.png"> -->

      <!--单点开始-->
      <img class="fruitStart" src="@/assets/images/tiger/start.png" @click="betOn()">

      <!--清空下注-->
      <img class="fruitclear" src="@/assets/images/tiger/clear.png" @click="allClear()">

      <!--第二层按钮--><!--投注类型按钮 fruitBetWin  -->
      <ul class="fruitBetArea">
        <li class="fruitBet fruitBtn" v-for="(vo,key) in fbet" >
            <img :src="vo" @click="sigeAddChip(key)" :class="bingo[key].includes(wink) ? 'fruitBetWin':''">
            <!-- <span class="fruitBetMoney">{{money[key]}}</span> -->
            <input type="tel" class="fruitBetMoney" v-model:value="money[key]" @keyup="inputCheck(key)">
        </li>
      </ul>

      <!--第三层按钮--><!--筹码-->
      <ul class="fruitChipQuick">
          <li v-for="(vo,key) in fchip" @click="cchip = key">
              <img class="betMoneyIdx" :src="cchip == key ? vo['nimg']:vo['img']">
          </li>
      </ul>

      <!--音频文件-->
      <!--背景音乐-->
      <audio id="bgMusic" autoplay="autoplay" loop="loop">
        <source src="@/assets/audios/tiger/fruitBg.mp3" type="audio/mpeg" />
      </audio>
      <!--注单选择-->
      <audio id="button_m" preload="preload">
        <source src="@/assets/audios/tiger/ButtonClick.mp3" type="audio/mpeg" />
      </audio>
      <!--中奖-->
      <audio id="add_m" preload="preload">
        <source src="@/assets/audios/tiger/addMoney.mp3" type="audio/mpeg" />
      </audio>
      <!--未中奖-->
      <audio id="ok_m" preload="preload">
        <source src="@/assets/audios/tiger/ok.mp3" type="audio/mpeg" />
      </audio>
      <!--启动音乐-->
      <audio id="count_m" preload="preload">
        <source src="@/assets/audios/tiger/countDown.mp3" type="audio/mpeg" />
      </audio>
      <!-- '1': 'button_m', //选择注单
      '2': 'add_m', //中奖
      '3': 'ok_m', //未中奖
      '4': 'count_m'//启动音乐 -->
    </div>
  </div>
</template>

<script>
import { Countup } from 'vux';
export default {
  components:{
    Countup
  },
  created() {
    this.$store.state.error_num = true;
  },
  mounted(){ //初始化内容
    // console.log(this.$route.params.level);
    // 定位宽高
    this.auto_width = document.body.scrollWidth;
    this.li_width = (document.body.scrollWidth*0.8)/7;
    // 初始化金额
    this.initial();
  },
  destroyed () { // 组件销毁后调用
    this.$store.state.error_num = false;
    this.auto_game = false;
  },
  data() {
    return {
      //房间规则
      room_money:1,
      //转盘奖品 总共24个
      fimg:[
        require('@/assets/images/tiger/1.png'),
        require('@/assets/images/tiger/2.png'),
        require('@/assets/images/tiger/3.png'),
        require('@/assets/images/tiger/4.png'),
        require('@/assets/images/tiger/5.png'),
        require('@/assets/images/tiger/6.png'),
        require('@/assets/images/tiger/7.png'),
        require('@/assets/images/tiger/8.png'),
        require('@/assets/images/tiger/9.png'),
        require('@/assets/images/tiger/10.png'),
        require('@/assets/images/tiger/11.png'),
        require('@/assets/images/tiger/12.png'),
        require('@/assets/images/tiger/13.png'),
        require('@/assets/images/tiger/14.png'),
        require('@/assets/images/tiger/15.png'),
        require('@/assets/images/tiger/16.png'),
        require('@/assets/images/tiger/17.png'),
        require('@/assets/images/tiger/18.png'),
        require('@/assets/images/tiger/19.png'),
        require('@/assets/images/tiger/20.png'),
        require('@/assets/images/tiger/21.png'),
        require('@/assets/images/tiger/22.png'),
        require('@/assets/images/tiger/23.png'),
        require('@/assets/images/tiger/24.png'),
      ],
      //下注类型
      fbet:[
        require('@/assets/images/tiger/b8.png'),
        require('@/assets/images/tiger/b7.png'),
        require('@/assets/images/tiger/b6.png'),
        require('@/assets/images/tiger/b5.png'),
        require('@/assets/images/tiger/b4.png'),
        require('@/assets/images/tiger/b3.png'),
        require('@/assets/images/tiger/b2.png'),
        require('@/assets/images/tiger/b1.png'),
      ],
      //下注筹码
      fchip:[
        {img:require('@/assets/images/tiger/chip1On.png'),nimg:require('@/assets/images/tiger/chip1.png'),value:1},
        {img:require('@/assets/images/tiger/chip2On.png'),nimg:require('@/assets/images/tiger/chip2.png'),value:5},
        {img:require('@/assets/images/tiger/chip3On.png'),nimg:require('@/assets/images/tiger/chip3.png'),value:10},
        {img:require('@/assets/images/tiger/chip5On.png'),nimg:require('@/assets/images/tiger/chip5.png'),value:50},
        {img:require('@/assets/images/tiger/chip6On.png'),nimg:require('@/assets/images/tiger/chip6.png'),value:100},
      ],
      //中奖类型转换
      bingo:[
        [2,3],
        [14,15],
        [19,20],
        [7,8],
        [1,13,23],
        [6,17,18],
        [0,11,12],
        [4,5,10,16,22]
      ],
      //筹码选择
      cchip:0,
      //注单
      money:[0,0,0,0,0,0,0,0],
      //当前指标位置
      act:'',
      //适应宽高1
      auto_width:0,
      //适应宽高2
      li_width:0,
      //每次抽奖默认转圈数
      default:2,
      //中奖金额
      win:0,
      //中奖K闪烁使用
      wink:'',
      //游戏是否进行中
      stop:0,
      //音量开关
      music:true,
      //自动游戏按钮
      auto_game:false,
      //页面显示金额
      play_money:0,
      //今日游戏局数
      play_num:0,
      //临时变量
      demo:{},
    }
  },
  computed: {

  },
  watch: {
  },
  methods:{
    //初始化
    initial(){
      let _this = this;

      //声音
      let rs = localStorage.userConfig;
      if (rs && _this.$store.state.login) {
        rs = JSON.parse(rs);
        if (rs['config']['all_music'] == 0) {
          _this.music = false;
          // return false;
        }
      }

      //_this.play_money = _this.$store.state.user.money ? _this.$store.state.user.money : 0 ;
      _this.$getData({
        url:'/api/home/lottery_lh/gameTigerNum',
        type:'post',
        callback:function(res){
          _this.play_num += res.num;
          if(res['room'].hasOwnProperty(_this.$route.params.level)){
            _this.room_money = res['room'][_this.$route.params.level];
            _this.play_money = res.money;
          }else{
            _this.$total({ message:'房间错误',type: 2 });
            _this.$router.back();
          }
        }
      });
    },
    //音乐开关与播放
    chgMusic(val=0){
      let _this = this;
      if(val == 0){
        _this.music = !_this.music;
        //console.log(1);
        let bg_music = document.getElementById('bgMusic');//document.getElementById("bgMusic");
        if(_this.music){
          bg_music.play();
        }else{
          bg_music.pause();
        }
      }else{
        if(!_this.music){return false;}

        let arr = {
          '0': 'bgMusic',
          '1': 'button_m', //选择注单
          '2': 'add_m', //中奖
          '3': 'ok_m', //未中奖
          '4': 'count_m'//启动音乐
        };
        let bg_music = document.getElementById(arr[val]);
        bg_music.play();
        // if (arr[val]) {
        //   let audio = document.createElement('audio');
        //   audio.src = '~@/assets/audios/tiger/' + arr[val];
        //   audio.play();
        // }
      }
    },

    //添加注码
    addChip(key){
      let _this = this,bit = JSON.parse(JSON.stringify(_this.money));
      bit[key] += _this.fchip[this.cchip]['value'];
      if(_this.room_money > 0 && bit[key] > _this.room_money){
        bit[key] = _this.room_money;
      }
      _this.$set(_this,'money',bit);
    },
    //单个添加注码
    sigeAddChip(key){
      if(this.stop == 1){return false;}
      this.chgMusic(1);
      this.addChip(key);
    },
    //全部添加注码
    allAddChip(){
      if(this.stop == 1){return false;}
      this.chgMusic(1);
      for(let i in this.money){
        this.addChip(i);
      }
    },
    //清除所有下注
    allClear(){
      if(this.stop == 1){return false;}
      this.chgMusic(1);
      this.money = [0,0,0,0,0,0,0,0];
      // for(let i in this.money){
      //   this.addChip(i);
      // }
    },
    inputCheck( key ){
      // console.log(key);
      // console.log(this.room_money);
      // console.log(this.money[key]);
      let _this = this;
      let rs = JSON.parse(JSON.stringify(_this.money));
      this.money[key]=this.money[key].replace(/[^\d]/g,'');
      if(_this.room_money > 0 && _this.money[key] > parseInt(_this.room_money)){
        rs[key] = _this.room_money ;
        _this.$set(_this,'money',rs);
      }
    },
    //开启自动
    autoGame(){
      let _this = this;
      _this.chgMusic(1);
      _this.auto_game = !_this.auto_game;
      if(_this.stop == 1 || !_this.auto_game){return false;}
      _this.betOn();
    },
    //请求开奖
    betOn(){
      let _this = this;
      if(_this.stop == 1){return false;}
      //开奖内容
      // let win = parseInt(24*Math.random());
      let sum = 0;
      for (let i in _this.money){
        _this.money[i] = _this.money[i] == '' ? 0 :_this.money[i];
        sum += parseInt(_this.money[i]);
      }
      if(!_this.$store.state.login){
        _this.$total({ message:'请先登录游戏',type: 2 });
        _this.auto_game = false;
        return false;
      }else if(sum == 0){
        _this.$total({ message:'请输入游戏金额',type: 2 });
        _this.auto_game = false;
        return false;
      }else if(sum > _this.play_money){
        _this.$total({ message:'余额不足',type: 2 });
        _this.auto_game = false;
        return false;
      }
      _this.win = 0;
      _this.wink = '';
      _this.stop = 1;
      _this.$getData({
        url:'/api/home/Lottery_lh/tiger',
        type:'post',
        data:{money:_this.money},
        callback:function(res){
          if(!res.code){return;}
          if(res.code == 0){
            _this.$router.push('/in');
            return;
          }else if(res.code < 0){
            _this.$total({message:'金额错误',type:2});
            _this.stop = 0;
            return;
          }
          _this.play_num += 1;
          let wink = res.wink;
          //给与临时变量
          _this.demo = {};
          _this.demo = res;
          //移动的步数
          let num = 24*(_this.default)+wink+(24-_this.act);
          if(_this.act === ''){
            _this.act = 0;
          }
          //启动音乐
          _this.chgMusic(4);
          //启动动画
          
          _this.anima(num,num);
        }
      });
      // //移动的步数
      // let num = 24*(_this.default)+win+(24-_this.act);
      // if(_this.act === ''){
      //   _this.act = 0;
      // }
      // //启动动画
      // _this.stop = 1;
      // _this.anima(num,num);
    },
    //动画效果val剩余步数，all总步数
    anima(val = 0,all = 0){
      let time = 30;
      if(val <= 0){
        let _this = this;
        _this.win = _this.demo.win;
        _this.play_money = _this.demo.money;
        _this.wink = _this.demo.wink;
        _this.stop = 0;
        setTimeout(()=>{
          if(_this.wink != ''){
            _this.wink = '';
          }
        },3000);

        if(_this.auto_game){
          setTimeout(()=>{
            if(!_this.auto_game){return false;}
            _this.betOn();
          },3000);
        }
        let on_music = document.getElementById('count_m');
        // on_music.pause();
        on_music.load();
        if(_this.demo.win > 0){
          _this.chgMusic(2);
        }else{
          _this.chgMusic(3);
        }
        return;
      }
      // if(all != val){
      if(val <= 2 || (all-val <= 2)){
        time = 200;
      }else if(val <= 4 || (all-val <= 4)){
        time = 150;
      }else if(val <= 12 || (all-val <= 12)){
        time = 80;
      }
      // }
      //每一圈是24
      //clearInterval(timer)
      setTimeout(()=>{
        this.act += 1;
        if(this.act >= 24){
          this.act = 0;
        }
        this.anima(val-=1,all);
      },time);
    }
  },
}
</script>
<style scoped>
  ol, ul {
    list-style: none;
    padding:0;
  }
  i{
    font-style:normal;
  }
  img {
      -webkit-user-drag: none;
  }
  .bg_color{
    background-color:#321f35;
    position: absolute;
    width:100%;
    height:100%;
    /* overflow: hidden; */
    transform: translate3d(0px, 0px, 0px) scale(1);
  }
  .fruitGameBg{
    width: 100%;
    height:100%;
  }
  .fruitBack {
      left: 5%;
      width: 4%;
  }
  .fruitBack, .fruitSource {
      position: absolute;
      top: 0.5%;
  }
  .fruitSource {
      right: 5%;
      width: 7%;
  }
  .fruitBack, .fruitSource {
      position: absolute;
      top: 0.5%;
  }
  .playVideo, .pauseVideo {
      position: absolute;
      width: 9%;
      top: 1.8%;
      right: 14%;
      z-index: 99999;
  }
  .fruitContainer {
      width: 80%;
      margin: 0 auto;
      position: absolute;
      top: 7%;
      left: 10%;
      font-size: 0;
  }
  .topFruitRowContainer, .bottomFruitRowContainer {
      position: absolute;
      width: 100%;
      display: flex;
  }
  .topFruitRowContainer {
      top: 0;
  }
  .topFruitRowContainer .fruitElement, .bottomFruitRowContainer .fruitElement {
      flex: 1;
      text-align: center;
  }
  .topFruitRow {
      width: 10%;
  }
  .fruitElement {
      display: inline-block;
      background: url(~@/assets/images/tiger/fruitBg.png);
      background-size: cover;
  }
  .activeFruit {
      background: url(~@/assets/images/tiger/fruitActive.png)!important;
      background-size: cover!important;
  }
  .fruitElement img {
      display: inline-block;
  }
  .rightFruitColContainer {
      position: absolute;
      right: 0;
      line-height: 0;
  }
  .rightFruitColContainer .fruitElement, .leftFruitColContainer .fruitElement {
    width: 100%;
    text-align: center;
  }
  .bottomFruitRowContainer {
      bottom: 0;
  }
  .leftFruitColContainer {
      position: absolute;
      left: 0;
      line-height: 0;
  }
  .fruitResultBg {
      position: absolute;
      width: 44%;
      top: 17%;
      left: 50%;
      margin-left: -22%;
  }
  .fruitLuck {
      position: absolute;
      bottom: 66.5%;
      width: 30%;
      left: 50%;
      margin-left: -15%;
  }
  .fruitCoin {
      left: 14%;
  }
  .fruitCoin, .fruitPlayNum {
      position: absolute;
      top: 36.5%;
      text-align: center;
      width: 43%;
      font-size: 12px;
      display: table-cell;
  }
  .fruitPlayNum {
      left: 43%;
  }
  .fruitCoin span, .fruitPlayNum span {
      display: inline-block;
      padding-bottom: 1px;
      vertical-align: bottom;
      color:#fff;
  }
  .fruitCoin i, .fruitPlayNum i {
      color: #f5f58f;
      display: inline-block;
      font-weight: 600;
      font-size: 14px;
      width: 60%;
      line-height: 20px;
      border:#9d743f 2px solid;
      background:#49301f;
      /*123*/
      margin-top:2px;
  }
  .fruitStartAuto, .fruitStart, .fruitclear, .fruitAllBet, .fruitStopAuto {
      position: absolute;
      width: 15%;
  }
  .fruitAllBet {
      left: 12%;
  }
  .fruitAllBet, .fruitclear {
      bottom: 36.5%;
  }

  .fruitStartAuto, .fruitStart, .fruitStopAuto {
      bottom: 36.5%;
      width: 18%;
  }
  .fruitStartAuto, .fruitStopAuto {
      left: 31%;
  }
  .fruitAllBet, .fruitclear {
      bottom: 36.5%;
  }
  .fruitclear {
      right: 12%;
  }
  .fruitStart {
      right: 31%;
  }
  .fruitBetArea {
      position: absolute;
      bottom: 24.5%;
      /* line-height: 0.85rem; */
      color: #f5f58f;
      font-weight: 600;
      display: flex;
      width: 100%;
  }
  .fruitWinMoneyContainer {
      position: absolute;
      bottom: 67.5%;
      left: 50%;
      width: 40%;
      margin-left: -20%;
      text-align: center;
      color:#fff;
      /* display: none; */
  }
  #fruitWinMoney {
      color: #f5f58f;
      font-weight: 600;
  }
  .fruitBetArea li, .fruitChipQuick li {
      flex: 1;
      text-align: center;
      /* margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
      font: inherit;
      font-size: 100%; */

  }
  .fruitBetArea li input {
      display: inline-block;
      width: 90%;
      margin: 0 auto;
      text-align: center;
      border: navajowhite;
      background: none;
      color: #f5f58f;
      height: 1.3rem;
      /* line-height: 16px; */
  }
  @keyframes changeFruitWin
  {
      0%   {opacity: 1}
      10%   {opacity: 0.5}
      20%   {opacity: 1}
      30%   {opacity: 0.5}
      40%   {opacity: 1}
      50%   {opacity: 0.5}
      60%   {opacity: 1}
      70%   {opacity: 0.5}
      80%   {opacity: 1}
      90%   {opacity: 0.5}
      100%   {opacity: 1}
  }
  .fruitBetWin {
      animation:changeFruitWin 4s infinite;
      -moz-animation:changeFruitWin 4s infinite; /* Firefox */
      -webkit-animation:changeFruitWin 4s infinite; /* Safari and Chrome */
      -o-animation:changeFruitWin 4s infinite; /* Opera */
  }
  .fruitBetArea img {
      width: 100%;
  }
  .fruitChipQuick {
      position: absolute;
      bottom: 15.8%;
      right: 0;
      left: 0;
      margin: auto;
      width: 100%;
      display: flex;
  }
  .fruitChipQuick img {
      width: 80%;
  }
  .lispan{
    color:#f5f58f;
  }
</style>
