<template>
  <div id="app">
    <main :class="['kd-body game game-l has-user-playing-info',{'cart-not-empty':Object.keys(select_data.betting_all).length}]">

        <div class="lottery-wrapper" @click="topData()">

          <!-- <transition name="bounce4">
            <div class="top_set_expect" :style="{height:top_height+'px'}" v-show="top_height>0">
              <div class="top_set_expect_div">
                <template v-if="Object.keys(top_list).length" v-for="item in top_list['data']">
                  <br/>
                  <div class="prev-lottery-issue">{{item.expect}}</div>
                  <ul class="nostyle kd-row prev-lottery-balls">
                    <template v-for="(item1,key) in item['content']">
                      <li>
                        <span :class="'lottery-ball solid marksix ' + item.class[key]">{{ item1 }}</span><br><span class="lottery-prop">{{ item.zodiac[key] }}</span>
                      </li>
                      <li v-if="key == 5"><span class="lottery-plus"></span></li>
                    </template>
                  </ul>
                  <br/>

               </template>
              </div>
            </div>
          </transition> -->
  <!-- {{data.history.content}} -->
            <div class="kd-container prev-lottery marksix">
                <div class="prev-lottery-issue">{{ (data.history ? data.history.expect : '...') }}</div>
                <ul class="nostyle kd-row prev-lottery-balls">
                  <li v-if="(data.history && data.history.content == 0)">
                    <span v-for="bit in ['正','在','开','奖']" class="lottery-ball solid " >{{bit}}</span>
                  </li>
                  <template v-else>
                    <li v-for="(item,key) in (data.history ? data.history.content : 0)" v-if="key < 6">
                      <span :class="'lottery-ball solid marksix ' + $parent.codeType(item.code)">{{ item.code }}</span><br><span class="lottery-prop">{{ item.type }}</span>
                    </li>
                    <li v-if="data.history"><span class="lottery-plus"></span></li>
                    <li v-for="(item,key) in (data.history ? data.history.content : 0)" v-if="key > 5">
                      <span :class="'lottery-ball solid marksix ' + $parent.codeType(item.code)">{{ item.code }}</span><br><span class="lottery-prop">{{ item.type }}</span>
                    </li>
                  </template>
                </ul>
            </div>


            <div class="kd-container marksix">
                <div class="lottery-status-wrapper">
                    <div class="lottery-issue">{{ data.expect == 0 ? '等待销售中...' : data.expect }}</div>
                    <div class="lottery-status">{{ now_time }}</div>
                </div>
                <!--新增开奖记录直达-->
                <div class="playing-news" style="">
                    <a :href="'#/My/open/'+$route.params.id"  class="text_list_open" :style="'color:'+$store.state.basic.main_color+';'">开奖记录>></a>
                </div>
                <!--中奖幸运用户提示-->
                <!-- <div class="playing-news">
                  <div title="3" class="kd-marquee kd-container">
                    <div class="inner">

                      <marquee direction="left" align="bottom" width="100%" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="3">
                        <span class="item" v-for="item in data.betting">用户<span class="nickname">{{item.user_name}}</span> {{item.content}} 下注 <span class="important">￥{{item.money}}</span></span>
                      </marquee>
                    </div>
                  </div>
                </div> -->
            </div>
        </div>
        <div v-if="'basic' in data && Object.keys(data.basic).length" v-swipedown="topData">

          <div class='' style="width:100%;" :style="{height:top_height+'px'}"></div>

        <div class="playing-methods-wrapper clearfix" :style="{top:(top_height+135)+'px'}">
          <ul class="nostyle playing-methods">
            <li class="switch-disc kd-row-middle" v-if="$route.params.id == 21">
              <a href="javascript:;" :class="{'active':disc==0}" @click="disc=0">A盘</a>
              <a href="javascript:;" :class="{'active':disc==1}" @click="disc=1">B盘</a>
            </li>
            <li v-if="$route.params.id != 21 ||($route.params.id == 21 && item.switch == 1)" v-for="(item,key) in data.basic" @click="target(key)"><a :class="['item',{'active selected':leftSelect(key)},{'active':leftValue==key}]" :style="styleTool(leftValue==key || leftSelect(key))">{{ item.name }}</a></li>
          </ul>
        </div>

        <section class="playing-method-section" v-for="(item,key) in data.basic" :id="key">
          <h1 v-if="$route.params.id != 21 || ($route.params.id == 21 && item.switch == 1)" class="playing-method-section-title"><span style="font-size:0.5rem;">{{($route.params.id == 21) ?  (disc ? 'B盘-':'A盘-'): ''}}</span>{{ item.name }}</h1>
          <ul class="nostyle kd-row lottery-balls">
            <template v-if="$route.params.id != 21">
              <li v-if="$route.params.id != 21" v-for="(item1,key1) in item.items" :class="{'selected':(key in select_data.betting_all && key1 in select_data.betting_all[key])}" @click="betting(key,key1,(arrayIndexOf(select_data.alert_select,key) > -1 || arrayIndexOf(select_data.alert_select,key1) > -1 ? item1 : false))">
                <span :class="[/^\d+$/.test(item1.name)?'lottery-ball marksix solid ' + $parent.codeType(item1.name):'lottery-prop']">{{ item1.name }}</span>
                <span class="lottery-odds">{{ item1.odds }}</span>
                <i class="icon"></i>
              </li>
            </template>
            <template v-else-if="item.switch == 1">
              <li v-if="item1['switch'][disc] == 1"  v-for="(item1,key1) in item.items" :class="{'selected':(key in select_data.betting_all && key1 in select_data.betting_all[key])}" @click="betting(key,key1,(arrayIndexOf(select_data.alert_select,key) > -1 || arrayIndexOf(select_data.alert_select,key1) > -1 ? item1 : false))">
                <span :class="[/^\d+$/.test(item1.name)?'lottery-ball marksix solid ' + $parent.codeType(item1.name):'lottery-prop']">{{ item1.name }}</span>
                <span class="lottery-odds">{{ item1.odds[disc] }}</span>
                <i class="icon"></i>
              </li>
            </template>
          </ul>
        </section>

        <form class="bet-form clearfix" v-show="Object.keys(select_data.betting_all).length">
          <div class="kd-field">
            <label for="count_in_bet_form" class="kd-field-title">已选 <span>{{ zhushuSum }}</span> 注, 单注金额 <span>{{ amount?amount:0 }}</span> 元, 总共 <span>{{ amount*zhushuSum }}</span> 元</label>
            <div class="kd-textinput number">
                <input type="number" v-model="amount">
            </div>
            <ul class="nostyle kd-chips" v-if="chip.length">
              <li :class="'kd-chip '+item.class" v-for="item in chip" @click="amount =  (amount? parseInt(amount) : 0 ) + parseInt(item.value)">
                <i class="icon"></i>
                <span>{{item.text}}</span>
                <!-- v-enter plus-one -->
                <b class="plus ">{{item.value}}</b>
              </li>
            </ul>
          </div>

          <div class="kd-buttons">
            <div type="button" :class="['kd-button main-button',{'disabled':!amountTesting}]" @click="zi" :style="styleTool_2(true)">
              <span>自购</span>
              <button type="button">Button</button>
            </div>
            <div type="button" :class="['kd-button main-button',{'disabled':!amountTesting}]" @click="he" v-if="'set' in data && data.set.hm_switch==1" :style="styleTool_2(true)">
              <span>合买</span>
              <button type="button">Button</button>
            </div>
            <div type="button" :class="['kd-button main-button',{'disabled':!amountTesting}]" @click="zhui" v-if="'max_expect' in data && data.max_expect && 'set' in data && data.set.zh_switch==1" :style="styleTool_2(true)">
              <span>追号</span>
              <button type="button">Button</button>
            </div>
            <div type="button" class="kd-button" @click="select_data.betting_all={}" :style="styleTool_2(true)">
              <span>清空</span>
              <button type="button">Button</button>
            </div>
          </div>

        </form>
      </div>
    </main>
    <div align="center" v-if="!('basic' in data) || Object.keys(data.basic).length < 1">
      <mt-spinner type="double-bounce" :color="$store.state.basic.main_color"></mt-spinner>
    </div>

        <transition name="bounce2">
	        <div class="promptbox-wrapper" v-if="alert==1">
	         <section class="promptbox prompt-service">
	             <div class="prompt-head" :style="styleTool(true)" style="letter-spacing:normal;">发起总额为 {{ amount*zhushuSum*(zh_data.expect_s.length ? zh_data.expect_s.length : 1) }} 的合买</div>
	             <div class="prompt-body" style="padding-bottom:50px;">
	               <mt-field label="自 购：" v-model.trim="hm_data.buy_money"></mt-field>
	               <mt-field label="保 底：" v-model.trim="hm_data.bd" v-if="'set' in data && data.set.bd_switch==1"></mt-field>
	               <mt-field label="中奖提成(%)：" :placeholder="'提成不能超过'+data.set.tc_num" v-model.trim="hm_data.tc" v-if="'set' in data && data.set.tc_switch==1"></mt-field>
	               <mt-field label="宣传：" placeholder="写下您的合买宣言" type="textarea" rows="4" v-model="hm_data.explain"></mt-field>
	               <mt-radio
	                 title="投注内容是否公开"
	                 align="right"
	                 v-model="hm_data.open"
	                 :options="opens">
	               </mt-radio>
	               <div style="position:absolute;bottom:0px;padding-bottom:5px;left:8px;right:7px;background:#efefef;">
	                 <div class="data-item" align="center" @click="hmCheck">
	                  <div type="button" class="kd-button main-button" :style="styleTool_2(true)">
	                    <span>发起合买</span>
	                    <button type="button">Button</button>
	                  </div>
	                 </div>
	               </div>
	             </div>
	             <a href="javascript:;" class="prompt-close kd-close" @click="alert=0">close</a>
	          </section>
	         <div class="promptbox-overlay" @click="alert=0"></div>
	      </div>
	    </transition>

	    <transition name="bounce2">
	      <div class="promptbox-wrapper" v-if="alert==2">
	       <section class="promptbox prompt-service">
	           <div class="prompt-head" :style="styleTool(true)">追号</div>
	           <div class="prompt-body" style="padding-bottom:100px;">
	             <mt-checklist
	              align="right"
	              title="选择您要追号的期数"
	              v-model="zh_data.expect_s"
	              :options="expect_s" v-if="expect_s.length">
	            </mt-checklist>
	            <p v-else>今天暂时没有可用追期</P>
	            <br/>
	            <div style="position:absolute;bottom:0px;padding-bottom:5px;left:8px;right:7px;background:#efefef;">
	              <a class="mint-cell" v-if="expect_s.length">
	                <div class="mint-cell-left"></div>
	                <div class="mint-cell-wrapper">
	                  <div class="mint-cell-title">
	                    <span class="mint-cell-text">中奖了,是否停止追号</span>
	                  </div>
	                  <div class="mint-cell-value">
	                    <label class="mint-switch">
	                      <input type="checkbox" class="mint-switch-input" v-model="zh_data.stop">
	                      <span class="mint-switch-core"></span>
	                      <div class="mint-switch-label"></div>
	                    </label>
	                  </div>
	                </div>
	                <div class="mint-cell-right"></div>
	              </a></br>
	              <div class="data-item" align="center" @click="alert=0">
	                 <div type="button" class="kd-button main-button" :style="styleTool_2(true)">
	                   <span>确 定</span>
	                   <button type="button">Button</button>
	                 </div>
	             </div>
	           </div>
	           </div>
	           <a href="javascript:;" class="prompt-close kd-close" @click="alert=0">close</a>
	        </section>
	       <div class="promptbox-overlay" @click="alert=0"></div>
	      </div>
	  </transition>

	  <transition name="bounce2">
	    <div class="promptbox-wrapper" v-if="alert==3">
	     <section class="promptbox prompt-service">
	         <div class="prompt-head" :style="styleTool(true)">请您确认</div>

	         <div class="prompt-body">
	           <!-- <mt-cell title="游 戏" :value="data.name"></mt-cell> -->
	           <template v-for="item in expectTool">
	             <mt-cell title="下注期号" :value="item"></mt-cell>
	           </template>
	           <mt-cell title="总金额" :value="amount*zhushuSum*(zh_data.expect_s.length ? zh_data.expect_s.length : 1)" v-if="hm_data.buy_money"></mt-cell>
             <mt-cell title="自 购" :value="hm_data.buy_money" v-if="hm_data.buy_money"></mt-cell>
	           <mt-cell title="保 底" :value="hm_data.bd" v-if="hm_data.bd"></mt-cell>
	           <mt-cell title="中奖提成" :value="hm_data.tc" v-if="hm_data.tc>0"></mt-cell>
	           <mt-cell title="投注号码可见" :value="hm_data.open" v-if="hm_data.buy_money"></mt-cell>
	           <mt-cell title="中奖停止追号" :value="zh_data.stop?'是':'否'" v-if="zh_data.expect_s.length>1"></mt-cell>
           <mt-cell title="需要支付" :value="(hm_data.buy_money?(hm_data.buy_money * 1 + hm_data.bd * 1):(amount*zhushuSum*(zh_data.expect_s.length ? zh_data.expect_s.length : 1)))"></mt-cell>
	           <br/>
	           <div class="data-item" align="center" @click="bettingAction">
	            <div type="button" class="kd-button main-button" :style="styleTool_2(true)">
	              <span>确认无误,提交</span>
	              <button type="button">Button</button>
	            </div>
	           </div>
	         </div>

	         <a href="javascript:;" class="prompt-close kd-close" @click="alert=0">close</a>
	      </section>
	     <div class="promptbox-overlay" @click="alert=0"></div>
	    </div>
	  </transition>

  </div>
</template>

<script>
  export default{
    props: {
      select_data: {
        default: () => {
          return {
            alert_select: [],
            betting_all: {},
            single_select: { x: 'da',da: 'x',dan: 's',s: 'dan' }
          };
        }
      }
    },
    mounted(){
      this.getInfo();
      this.chipSet();
      this.$store.state.chart_open = true; 
    },
    destroyed () { //组件销毁后调用
      this.$store.state.chart_open = false; 
      this.$store.state.chart_chg = false; 
	  },
    data () {
      return {
        alert: 0,
        opens: ['完全公开', '仅跟单人可见', '截止后公开','完全保密'],
        expect_s: [],
        zh_data: {
          expect_s: [],
          stop: false
        },
        hm_data: {
          open: '完全公开',
          explain: '',
          buy_money: 0,
          bd: 0,
          tc: ''
        },
        disc: 0,
        data: {},
        leftValue: '',
        amount: 0,
        end_time: 0,
        now_time: '',
        loading: false,
        down: 0,
        down_loading: true,
        setTimeout_ids: [],
        //筹码
        chip:[
          // {class:'chip0',text:'50',value:50},
        ],
        //顶部下拉开彩历史--
        top_height:0,
        //顶部历史开彩数据--
        top_list:{},
        betting_state: false
      }
    },
    computed:{
      expectTool(){
        let chat_data = [];
        for(let i = 0,j = this.zh_data.expect_s.length;i < j;i++){
          if(this.zh_data.expect_s[i] >= this.data.expect){
            chat_data.push(this.zh_data.expect_s[i]);
          }
        }
        chat_data.sort();
        this.zh_data.expect_s = chat_data;
        return chat_data;
      },
      amountTesting(){
        return (/^\d+$/.test(this.amount) && this.amount>0 && Object.keys(this.select_data.betting_all).length) && this.betting_state ? true : false;
      },
      zhushuSum(){
        let zhushu = 0;
        for(let i in this.select_data.betting_all){
          for(let j in this.select_data.betting_all[i]){
            zhushu += this.select_data.betting_all[i][j].num;
          }
        }
        return zhushu;
      }
    },
    methods: {
      styleTool(value){
        let _data = {};
        if(value){
          _data.background = this.$store.state.basic.main_color;
        }
        return _data;
      },
      styleTool_2(value){
        let _data = {};
        if(value){
          _data.background = this.$store.state.basic.main_color;
          _data.border = '1px solid ' + this.$store.state.basic.main_color;
        }
        return _data;
      },
    	hmCheck(){
        let sum = this.amount * this.zhushuSum * (this.zh_data.expect_s.length ? this.zh_data.expect_s.length : 1)
        ,_this = this
        ,chat_data;
        if(this.data.set.zg > 0 && parseInt(this.hm_data.buy_money / (sum / 100)) < this.data.set.zg){
          chat_data = Math.ceil(sum / 100 * this.data.set.zg);
          _this.$total({ message:'自购至少认购' + chat_data,type: 2 });
          _this.hm_data.buy_money = chat_data;
          return;
        }
        if(this.hm_data.buy_money > sum){
          _this.$total({ message:'自购最多认购' + sum,type: 2 });
          _this.hm_data.buy_money = sum;
          _this.hm_data.bd = 0;
          return;
        }
        if(_this.hm_data.bd > (sum - _this.hm_data.buy_money)){
          _this.$total({ message:'保底最多保底' + (sum - _this.hm_data.buy_money),type: 2 });
          _this.hm_data.bd = (sum - _this.hm_data.buy_money);
          return;
        }
        if(this.data.set.bd > 0 && parseInt(this.hm_data.bd / ((sum - this.hm_data.buy_money) / 100))  < this.data.set.bd){
          chat_data = Math.ceil((sum - this.hm_data.buy_money) / 100 * this.data.set.bd);
          _this.$total({ message:'保底至少保底' + chat_data,type: 2 });
          _this.hm_data.bd = chat_data;
          return;
        }
        if(this.data.set.tc_num > 0 && this.hm_data.tc > this.data.set.tc_num){
          _this.$total({ message:'提成不能大于奖金的' + this.data.set.tc_num + '%',type: 2 });
          _this.hm_data.tc = this.data.set.tc_num;
          return;
        }
        this.expectCheck();
        this.alert = 3;
      },
      expectCheck(){
        let chat_data = [];
        for (let i = 0,j = this.zh_data.expect_s.length; i < j; i++) {
          if(this.zh_data.expect_s[i] >= this.data.expect){
            chat_data.push(this.zh_data.expect_s[i]);
          }
        }
        if(chat_data < 1){
          chat_data.push(this.data.expect);
        }
        this.zh_data.expect_s = chat_data;
      },
      zhui(){
        if(!this.amountTesting){
          return;
        }
        let expect_s = [];
        if('max_expect' in this.data && this.data.max_expect){
          let chat_data = (this.data.expect+'').substr(0,8) + '' + this.data.max_expect;
          if(chat_data > this.data.expect){
            for(let i=this.data.expect;i<=chat_data;i++){
              expect_s.push(i);
            }
          }
        }
        this.expectCheck();
        this.expect_s = expect_s;
        this.alert = 2;
      },
      he(){
        if(!this.amountTesting){
          return;
        }
        let sum = this.amount * this.zhushuSum * (this.zh_data.expect_s.length ? this.zh_data.expect_s.length : 1);
        this.hm_data.buy_money = Math.ceil(sum / 100 * this.data.set.zg);
        this.hm_data.bd = Math.ceil((sum - this.hm_data.buy_money) / 100 * this.data.set.bd);
        this.expectCheck();
        if(this.data.set.total > this.amount * this.zhushuSum * (this.zh_data.expect_s.length ? this.zh_data.expect_s.length : 1)){
            this.$total({ message:'发起合买总金额不能少于' + this.data.set.total,type: 2 });
        }else{
          this.alert = 1;
        }
      },
      zi(){
        if(!this.amountTesting){
          return;
        }
        this.hm_data = {
          'open': '完全公开',
          'buy_money': 0,
          'bd': 0,
          'tc': 0
        };
        this.expectCheck();
        this.alert = 3;
      },
      //顶部历史开彩请求数据
      topData(){
        return;
        let _this = this;
        _this.top_height = (_this.top_height == 0 ? 200 : 0);
        // console.log(Object.keys(_this.top_list).length);
        if(_this.top_height > 0 && !Object.keys(_this.top_list).length){
            _this.$getData({
              url:'/api/home/Home/trend',
              type:'post',
              data:{type:_this.$route.params.id,expect:0},
              callback:function(res){
                if(res.data){
                  _this.$set(_this,'top_list',res);
                }
              }
            });
        }
      },
      chipSet(){
        let arr = {
          chip0:['50',50],
          chip1:['100',100],
          chip2:['500',500],
          chip3:['1千',1000],
          chip4:['2千',2000],
          chip5:['5千',5000],
          chip6:['1万',10000],
        },
        rs = JSON.parse(localStorage.userConfig);
        if(rs['chip'].length == 0){
          rs['chip'] = { chip0: 1,chip1: 1,chip2: 1 };
        }
        for(let i in rs['chip']){
          this.chip.push({class:i,text:arr[i][0],value:arr[i][1]});
        }
      },
      initialization(){
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.now_time = '...';
        if(this.$route.path in this.$store.state.all_chat){
          this.data = this.$store.state.all_chat[this.$route.path];
          this.$store.state.title = this.$store.state.all_chat[this.$route.path].name;
          this.$store.state.all_chat[this.$route.path].basic && (this.leftValue = Object.keys(this.$store.state.all_chat[this.$route.path].basic)[0]);
        }
      },
      clearTimeout(){
        for (let i = 0,j = this.setTimeout_ids.length; i < j; i++) {
          clearTimeout(this.setTimeout_ids[i]);
        }
        this.setTimeout_ids = [];
      },
      arrayIndexOf (arr,obj) {
        if(arr){
          for (let i = 0,ii = arr.length; i < ii; i++) {
            if (arr[i] == obj) {
              return i;
            }
          }
        }
        return -1;
      },
      timeTool(){
        if(this.$route.path.indexOf('/game-l/') == -1){
          return;
        }
        let _this = this
        ,cha = Math.round((_this.end_time - new Date().getTime()) / 1000); //秒
        this.clearTimeout();
        if(_this.data.expect == null || _this.data.expect == 0){
          _this.down > 0 && (_this.down % 5) == 0 && (_this.getInfo());
          _this.down++;
        }
        if(cha < 1){
          this.betting_state = false;
          this.alert = 0;
          if(parseInt(this.data.desc) + parseInt(cha) < 0 ){
            _this.now_time = '加载中...';
            _this.getInfo();
          }else{
            _this.setTimeout_ids.push(setTimeout(()=>{
              _this.data.history.expect = _this.data.expect;
              _this.data.history.content = 0;
              _this.now_time = '封盘中... ' + this.timeFormat(parseInt(this.data.desc) - cha * -1);
              _this.timeTool();
            },1000));
          }
        }else{
          this.betting_state = true;
          this.now_time = (this.data.expect == 0 ? '' : '距封盘：') + this.timeFormat(cha);
          _this.setTimeout_ids.push(setTimeout(() => {
            if(_this.data.expect && _this.data.history && 'history' in this.data && 'content' in this.data.history && this.data.history.content == 0 && _this.down_loading){
              _this.down > 0 && (_this.down % 5) == 0 && (_this.getHistory());
              _this.down++;
            }
            _this.timeTool();
          },1000));
        }
      },
      timeFormat(cha){
        let day = parseInt(cha / 86400)
          ,h = parseInt(cha % 86400 / 3600)
          ,m = parseInt(cha % 86400 % 3600 / 60)
          ,s = Math.round(cha % 86400 % 3600 % 60);
          (h < 10) && (h = "0" + h);
          (m < 10) && (m = "0" + m);
          (s < 10) && (s = "0" + s);
          return ((day > 0 ? day + '天 ' : '') + h + ':' + m + ':' + s);
      },
      getInfo(loading){
        if(this.loading) return;
        this.clearTimeout();
        this.initialization();
        this.loading = true;
        let _this = this;
        _this.$getData({
          url:'/api/Home/' + (this.select_data.info_url ? this.select_data.info_url : 'Lottery') + '/getInfo',
          data: { type: _this.$route.params.id },
          callback: function(res){
            if(res.code){
              _this.data = res.data;
              _this.$store.state.all_chat[_this.$route.path] = res.data;
              _this.leftValue == '' && (_this.leftValue = Object.keys(res.data.basic)[0]);
              _this.$store.state.title == '' && (_this.$store.state.title = res.data.name);
              _this.end_time = parseInt((new Date()).getTime())  + parseInt(res.data.number) * 1000;
              _this.timeTool();
              _this.loading = false;
            }else{
              //_this.$total({ message:res.msg,duration:2000,type: 0 });
              //setTimeout(()=>{_this.$router.back();},2500);
            }
          }
        });
      },
      getHistory(){
        if(this.loading) return;
        let _this = this;
        this.down_loading = false;
        _this.$getData({
          url:'/api/Home/Lottery_L/getHistoryL',
          data: { type: _this.$route.params.id },
          callback: function(res){
            if(res){
              _this.data.expect = res.expect;
              _this.data.number = res.time;
              _this.data.history = res.history;
              if(Object.keys(_this.top_list).length && _this.top_list.data.length && _this.top_list.data[0].expect < res.history.expect){
                _this.top_list.data.unshift({ expect: res.history.expect,content:res.history.content.split(',') });
              }
            }
            _this.down_loading = true;
          }
        });
      },
      target(key){
        let data = document.getElementById(key).offsetTop - (135+this.top_height);
        document.documentElement.scrollTop = data;
        document.body.scrollTop = data;
        this.leftValue = key;
      },
      leftSelect(key){
        return ((key in this.select_data.betting_all && Object.keys(this.select_data.betting_all[key]).length) ? true : false);
      },
      betting(key1,key2,data){
        if(this.data.expect == null || this.data.expect == 0){
          this.$total({ message:'未开始销售,您可以看看其它在售彩种',type: 2 });
          return;
        }
        if(data){
          this.$parent.betting(data,key1,key2,this.select_data.betting_all,this.disc);
        }else{
          let betting_chat = {};
          if(!(key1 in this.select_data.betting_all)){
            this.select_data.betting_all[key1] = {};
          }
          if(key2 in this.select_data.betting_all[key1]){
              delete this.select_data.betting_all[key1][key2];
              if(Object.keys(this.select_data.betting_all[key1]).length < 1){
                delete this.select_data.betting_all[key1];
              }
          }else{
            if(this.data.basic[key1].number > 0 && Object.keys(this.select_data.betting_all[key1]).length >= this.data.basic[key1].number){
              this.$total({ message:this.data.basic[key1].name + '选择不能超过' + this.data.basic[key1].number + '注',duration:2000,type: 2 });
              return;
            }
            if(key2 in this.select_data.single_select){
              delete this.select_data.betting_all[key1][this.select_data.single_select[key2]];
            }
            this.select_data.betting_all[key1][key2] = {
              code: '',num: 1
            }
          }
          for(let _i in this.select_data.betting_all){
            betting_chat[_i] = this.select_data.betting_all[_i];
          }
          this.$set(this.select_data,'betting_all',betting_chat);
        }
      },
      clearBetting(){
        this.select_data.betting_all = {};
      },
      bettingAction(is_hm){
        let _this = this;
        // 这里投注限制 hook
        if(this.amountTesting && this.amount < 100000){
          let chat_data = [];
          for (let i = 0,j = this.zh_data.expect_s.length; i < j; i++) {
            if(this.zh_data.expect_s[i] >= this.data.expect){
              chat_data.push(this.zh_data.expect_s[i]);
            }
          }
          if(chat_data < 1){
            chat_data.push(this.data.expect);
          }
          this.zh_data.expect_s = chat_data;
          this.$getData({
            loading: true,
            url:'/api/Home/' + (this.select_data.betting_url ? this.select_data.betting_url : 'Lottery') + '/betting',
            data: {
              betting: JSON.stringify(_this.select_data.betting_all),
              basic: JSON.stringify({
                zh: _this.zh_data,
                hm: _this.hm_data,
                money: _this.amount,
                disc: _this.disc
              }),
              type: _this.$route.params.id
            },
            callback: function(res){
              _this.$total({ message:res.msg,duration:2000,type: res.code });
              if(res.code){
                _this.select_data.betting_all = {};
                _this.amount = 0;
                _this.hm_data = {
                  'open': '完全公开',
                  'buy_money': 0,
          				'explain': '',
                  'bd': 0,
                  'tc': 0
                };
                _this.zh_data = {
                  'expect_s': [],
                  'stop': false
                };
                _this.alert = 0;
              }
              _this.data = res.data;
            }
          });
        }else{
          this.$total({ message:'您下注的金额有误',duration:1500,type: 0 });
        }
      }

    },
    watch: {
      $route(){
        this.getInfo();
        this.top_height = 0;
        this.top_list = {};
      }
    }
  }
</script>

<style scoped>
  .bet-form .kd-button{
    width: 23%;
  }
  .bet-form .kd-button{
    margin-left: 2px;
  }
  .bet-form .kd-button:first-child{
    margin-right: 0%;
  }
  .bet-form .kd-buttons{
    text-align: center;
  }
</style>
