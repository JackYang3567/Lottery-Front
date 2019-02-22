<template>
  <div id="app">
    <main class="kd-body game game-j has-user-playing-info">

      <div class="lottery-wrapper">
        <div class="kd-container prev-lottery cqssc">
          <div class="prev-lottery-issue">{{ (data.history ? data.history.expect : '...') }}</div>
          <ul class="nostyle kd-row prev-lottery-balls">
              <li v-for="item in (data.history ? data.history.content.split(',') : 0)"><span class="lottery-ball solid">{{ item }}</span></li>
              <li ><span class="lottery-ball solid">1</span></li>
          </ul>
        </div>

        <div class="kd-container cqssc">
          <div class="lottery-status-wrapper">
              <div class="lottery-issue">{{ data.expect == 0 ? '等待销售中...' : data.expect }}</div>
              <div class="lottery-status">{{ now_time }}</div>
          </div>
          <div class="playing-news">
            <div title="3" class="kd-marquee kd-container">
              <div class="inner">
                <marquee direction="left" align="bottom" width="100%" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="3">
                  <span class="item" v-for="item in data.betting">用户<span class="nickname">{{item.user_name}}</span> {{item.content}} 下注 <span class="important">￥{{item.money}}</span></span>
                </marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="'basic' in data && Object.keys(data.basic).length" v-swipedown="topData">
        <!--左侧导航-->
        <div class="playing-methods-wrapper clearfix">
          <ul class="nostyle playing-methods">
            <li v-for="(item,key) in data['basic']" @click="delData">
              <a :class="'item'+[(betting[key] && Object.keys(betting).indexOf(key)) >-1 ? ' active selected': '']+[sel1 == key ? ' active' :'']">{{ item.name }}</a><!-- @click="sel1 = key"-->
            </li>
          </ul>
        </div>

        <!--选择玩法-->
        <section class="playing-method-section"  v-for="(item,key) in data['basic']" v-show="!select.length">
          <h1 class="playing-method-section-title">{{ item.name }}</h1>
          <ul class="nostyle kd-row lottery-balls">
            <li  :class="[ ((betting[key] && betting[key][key1]) ) ?'selected':'']" v-for="(item1,key1) in item.items" @click="goBet(key,key1)">
              <span class="lottery-prop">{{ item1.name }}</span>
              <span class="lottery-odds">{{ item1.odds }}</span>
              <i class="icon"></i>
            </li>
          </ul>
        </section>

        <!--选择球-->
        <section class="playing-method-section" v-show="select.length">
          <h1 class="playing-method-section-title">{{sel_type[0]}}</h1>
          <template v-for="(item,key) in data_sel['name'][sel_type[1]]">
            <div class="nostyle add_qxc_class " > <span>{{item}}</span></div>
              <div unselectable="on" onselectstart="return false;" style="-moz-user-select:none;" v-for="item1 in data_sel['qiu']" :class="'lottery-class-qxc ' + [ (data_qiu[key]?(data_qiu[key].indexOf(item1) > -1?true:false):false)?' red ' : '']" @click='selBet(item1,key)'>
                  <span class="ball" >{{item1}}</span>
              </div>
          </template>
        </section>

        <!--选择球确认按钮-->
        <section class="playing-method-section" v-show="select.length">
          <div class="prompt-foot check_main_button">
            <!-- disabled-->
            <div  class="kd-button main-button" @click="selBetClick">确认选择 {{sel_type_ok}} 注
              <button type="button" >Button</button>
            </div>
            <!-- <div class="kd-button">取 消
              <button type="button">Button</button>
            </div> -->
          </div>
        </section>


        <!--总注单显示-->
        <form class="bet-form clearfix" v-show="sel_type_all > 0">
          <div class="kd-field">
            <label for="count_in_bet_form" class="kd-field-title">已选 <span>{{sel_type_all}}</span> 注, 单注金额：<span>{{sel_money[0]}}元</span>,总共<span>{{sel_money[1]}}元</span></label>
            <div class="kd-textinput number">
              <input type="number" id="count_in_bet_form" step="0.01" v-model.trim="money">
            </div>
            <ul class="nostyle kd-chips" style="display: none;"></ul>
          </div>
          <div class="kd-buttons">
            <div type="button" :class="'kd-button main-button ' + [(sel_type_all > 0 && money) ? '' : 'disabled']" @click="submit()"><span>投 注</span>
              <button type="button">Button</button>
              <!-- disabled="disabled"  -->
            </div>
            <div type="button" class="kd-button" @click="delData(2)"><span>清 空</span>
              <button type="button">Button</button>
            </div>
          </div>
        </form>
      </div>
      <div align="center" v-else>
        <mt-spinner type="double-bounce" color="#02aecb"></mt-spinner>
      </div>

      <!--合买使用弹窗-->
      <!-- <div class="promptbox-wrapper prompt-select-balls prompt-select-balls-j" style="display: none;">
        <section class="promptbox">
          <div class="prompt-head">标 题(0注)</div>
          <div class="prompt-body"></div>
          <div class="prompt-foot">
            <div type="button" class="kd-button main-button disabled">确 定
              <button type="button" disabled="disabled">Button</button>
            </div>
            <div type="button" class="kd-button">取 消
              <button type="button">Button</button>
            </div>
          </div>
          <a href="javascript:;" class="prompt-close kd-close">close</a></section>
        <div class="promptbox-overlay"></div>
      </div>
      <div class="promptbox-wrapper prompt-cart-list" style="display: none;">
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
    </main>

  </div>
</template>
<script>
  export default{
    name: 'name',
    mounted(){
      this.getInfo();
      this.$store.state.title = "七星彩";
    },
    data () {
      return {
        data:{
          },
        //倒计时
        now_time:'...',
        //投注其他格式
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
        //七星彩投注类型
        data_sel:{
          name:[
            ['个位','十位','百位','千位'],
            ['选号'],
            ['重号','单号']
          ],
          qiu:[0,1,2,3,4,5,6,7,8,9]
        },
        //选择投注类型和球
        select:[],
        data_qiu:[
        ],
        //左侧选择栏
        sel1:'',
        //总投注内容
        betting:{

        },
        //每注金额
        money:'',
      }
    },
    computed:{
      //注单总额计算
      sel_money(){
        let rs=[0,0],_this = this;
        if(!(_this.money == 0 || _this.money == '' || _this.sel_type_all == 0)){
          if(_this.money > 999999999){
            _this.money = 999999999;
          }
          rs[0] = _this.money;
          rs[1] = parseInt(_this.money) * parseInt(_this.sel_type_all) ;
        }
        return rs;
      },
      //玩法类型 显示类型
      sel_type(){
        let _this = this,return_data = ['一定位',0],basic = this.data.basic;
        if(!_this.select.length){return false;}
        return_data[0] = basic[_this.select[0]]['items'][_this.select[1]]['name'];
        if(_this.select[0] == 'dw'){
           let arr = [
             ['yidw','erdw','sandw','sidw'],
             ['erdwscqd','sandwsancqd','sidwerscqd','yidwqd','erdwqd','sandwqd','sidwqd'],
             ['sandwscqd','sidwyscqd','sidwsancqd']
           ];
          for(let i in arr){
            if(arr[i].indexOf(_this.select[1])>-1){
              return_data[1] = i;
              break;
            }
          }
        }else{
          if(_this.select[1] == 'sanzxsc' || _this.select[1] == 'sizxsanc' || _this.select[1] == 'sizxyisc'){
            return_data[1] = 2;
          }else{
            return_data[1] = 1;
          }
        }
        return return_data;
      },
      //选择球时注数计算
      sel_type_ok(){
        let rs = 0;
        if(this.select.length && this.data_qiu.length){
          rs = this.betComput(this.select,this.data_qiu);
        }
        return rs;
      },
      //确认后全部总注计算
      sel_type_all(){
        let rs = 0,_this = this;
        if(Object.keys(_this.betting).length){
          for(let demo in _this.betting){
            for(let demo1 in _this.betting[demo]){
              rs += _this.betComput([demo,demo1],_this.betting[demo][demo1]['code']);
            }
          }
        }
        return rs;
      },

    },
    watch:{

    },
    methods:{
      //请求页面数据
      getInfo(){
        let _this = this;
        _this.$getData({
          url:'/api/home/lottery/getInfo',
          data:{type:29},
          type:'post',
          callback:function(res){
            if(res.data){
              _this.$set(_this,'data',res.data);
            }
          }
        });
      },
      //顶部历史开彩请求数据
      topData(){
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
      //此处发送注单
      submit(){
        let _this = this,_data={};
        if(!Object.keys(_this.betting).length || !_this.money){
          return false;
        }
        _data = {
          betting: JSON.stringify(_this.betting),
          basic: JSON.stringify({
            zh: _this.zh_data,
            hm: _this.hm_data,
            money: _this.money
          }),
          type: 29
        };
        _this.$toast('测试发送');
        _this.$getData({
          url:'/api/home/Lottery_S/betting',
          type:'post',
          data:_data,
          callback:function(res){
            _this.$total({ message:res.msg,duration:2000,type: res.code });
          }
        });
      },
      //选择投注类型
      goBet(key1 = '',key2 = ''){
        let _this = this,demo=[];
        if(key1 == '' || key2 == ''){
          return false;
        }else{
          _this.$set(_this,'select',[key1,key2]);
          _this.sel1 = key1;

          // _this.data_qiu = [];
          if(_this.betting.hasOwnProperty(key1) && _this.betting[key1].hasOwnProperty(key2) && _this.betting[key1][key2].hasOwnProperty('code')){
            // console.log(_this.betting[key1][key2]);
            demo = _this.betting[key1][key2]['code'];
            // 对象之间的赋值 属于高级赋值 是引用赋值 obj1改变obj2会跟着改变
            _this.$set( _this,'data_qiu',JSON.parse(JSON.stringify(demo)) );
          }else{
            _this.data_qiu = [];
          }
        }
      },
      //选择球
      selBet(val='',key=''){
        let _this = this,demo = [];
        demo = _this.data_qiu;
         console.log(_this.betting[_this.select[0]]);
        if(!demo[key]){
          demo[key] = [];
        }
        let rs = demo[key].indexOf(val);
        if(rs > -1){
          demo[key].splice(rs,1);
          if(!Object.keys(demo[key]).length){
            delete demo[key] ;
          }
        }else{
          //添加选球时 判断规则是否添加与删除
          if(_this.sel_type[1] == 2){
             let rule =(key == 1 ? 0 : 1);
             if(demo[rule] && demo[rule].indexOf(val) > -1){
               demo[rule].splice(demo[rule].indexOf(val),1);
               if(!demo[rule].length){
                delete demo[rule];
               }
             }
          }
          if(_this.select[0]=="dw"){
            if(_this.sel_type[1] == 0){//定位
              let arr = ['yidw','erdw','sandw','sidw'];
              if(Object.keys(demo).length > (arr.indexOf(_this.select[1])+1)  && !demo[key].length ){
                for(let k in demo){
                  if(k != key){
                    delete demo[k];
                    break;
                  }
                }
              }
            }
          }else if(_this.select[0]=="zx"){//字现
            let set = '';
            if(_this.select[1] == 'sizxersc'){
              if(demo[0] && demo[0].length >=2){
                set = demo[0][1];
                demo[0] = [];
                demo[0][0] = set;
              }
            }else if(_this.select[1] == 'sizxyisc'){
              if(demo[1] && demo[1].length >=2){
                set = demo[1][1];
                demo[1] = [];
                demo[1][0] = set;
              }
              if(key == 0){
                demo[0] = [];
              }
            }else if(_this.select[1].indexOf('sc')>-1 || _this.select[1].indexOf('sanc') >-1){
              demo[key] = [];
            }
          }
          demo[key].push(val);
        }

        _this.data_qiu = [];
        if(demo.length){
          _this.$set(_this,'data_qiu',demo);
        }

      },
      test(){
        let _this = this;
        _this.data_qiu = [];
        console.log(_this.betting);
      },
      //选择球确认
      selBetClick(){
        let _this = this,demo = {};
        demo = _this.betting;
        //无注数时处理方式
        if(_this.sel_type_ok == 0 ){
          if(demo[_this.select[0]] && demo[_this.select[0]][_this.select[1]]  && Object.keys(demo[_this.select[0]][_this.select[1]]).length){
            delete demo[_this.select[0]][_this.select[1]];
            if(!Object.keys(demo[_this.select[0]]).length){
              delete demo[_this.select[0]];
              if(!Object.keys(demo).length){
                _this.betting = {};
                _this.select = [];
                _this.data_qiu = [];
                return false;
              }
            }
          }else{
            _this.select = [];
            _this.data_qiu = [];
            return false;
          }
          //有注数时
        }else{
          if( !demo.hasOwnProperty(_this.select[0]) ){
          // 没有key1的情况下
            demo[_this.select[0]] = {};
          }
          if( !demo[_this.select[0]].hasOwnProperty(_this.select[1]) ){
          // 没有key2的情况下
            demo[_this.select[0]][_this.select[1]] = {  code:[],num:1 };
          }
          demo[_this.select[0]][_this.select[1]]['code'] = _this.data_qiu;
        }
        _this.betting = {};
        _this.$set(_this,'betting',demo);
        _this.select = [];
        _this.data_qiu = [];
      },
      //选择球的样式变化
      selBalls(val = '',key = ''){
        let _this = this;
        if(!_this.data_qiu.length){
          return false;
        }else if(!_this.data_qiu[key]){
          return false;
        }else{
          if(_this.data_qiu[key].indexOf(val)){
            return true;
          }else{
            return false;
          }
        }
      },
      //清除注单
      delData(type = 1){
        let _this = this;
        _this.select = [];
        _this.data_qiu = [];
        if(type == 2){
           _this.betting = {};
           _this.money = 0;
         }
      },
      //计算注数方法传递参数第一个参数为选择的k1,k2 ，第二个为选择的球
      betComput(sel=[],qiu=[]){
        let _this = this,renum = 0;
        if(!sel.length || !Object.keys(qiu).length || (sel[1].indexOf('dwqd') > -1 && !qiu.hasOwnProperty('0'))){return renum;}
        let arr = ['yi','er','san','si'],len = 0,bit = -1;
        for(let i=0;i<4;i++){
          bit = sel[1].indexOf(arr[i]+sel[0]);
          if(bit > -1){
            len = parseInt(i) +1 ;
          }
        }
        //console.log(1);
        if(sel[0] == 'dw'){
        //  console.log(2);
          let arr1 = ['yidw','erdw','sandw','sidw'];
          if(arr1.indexOf(sel[1]) > -1){         //普通定位计算公式
            // console.log(_this.data_qiu.length+'--'+len);
            if(Object.keys(qiu).length >= len){
              let bit = Object.keys(qiu);
              // console.log('判定已进');
              renum = 1;
              // console.log(1);
              for(let i=0;i<bit.length;i++){
              renum *=  qiu[bit[i]].length;
              }
            }
          }else if(sel[1].indexOf('dwqd') > -1){ //定位全倒计算公式
            if(qiu[0].length >= len){
              let ar=0,ar1=1,ar2=1;
               ar = len * 2 * (len == 4 ? (len-1) : (len+1));
                for(let i=0;i<len;i++){
                  ar1 *= (parseInt(qiu[0].length)-parseInt(i));
                  ar2 *= (parseInt(i)+1);
               }
              renum = (ar * (ar1/ar2));
            }
          }else if(sel[1] == 'erdwscqd'){//二定位双重全倒
            renum  = 1*qiu[0].length*6;
          }else if(sel[1] == 'sandwscqd'){//三定位双重全倒
            if(Object.keys(qiu).length >=2){
              renum = qiu[0].length * 12 * qiu[1].length;
            }
          }else if(sel[1] == 'sandwsancqd'){//三定位三重全倒
              renum = qiu[0].length * 4;
          }else if(sel[1] == 'sidwyscqd'){//四定位一双重全倒
              if(qiu[0] && qiu[1] && qiu[1].length >=2){
                let ar1=1,ar2=1;
                  for(let i=0;i<2;i++){
                    ar1 *= (parseInt(qiu[1].length)-parseInt(i));
                    ar2 *= (parseInt(i)+1);
                 }
                renum = (12 * (ar1/ar2))*qiu[0].length;
              }
          }else if(sel[1] == 'sidwerscqd'){//四定位二双重全倒
            if(qiu[0].length >=2){
              let ar1=1,ar2=1;
                for(let i=0;i<2;i++){
                  ar1 *= (parseInt(qiu[0].length)-parseInt(i));
                  ar2 *= (parseInt(i)+1);
               }
              renum = (6 * (ar1/ar2));
            }
          }else if(sel[1] == 'sidwsancqd'){//四定位三重全倒
            if(qiu[1] && qiu[0]){
            renum =  parseInt(qiu[1].length)*4*parseInt(qiu[0].length);
            }
          }
        }else{
          let arr1 = ['yizx','erzx','sanzx','sizx'];
          if(arr1.indexOf(sel[1]) > -1){
            if(qiu[0].length >= len){// 字现系列
              let ar1=1,ar2=1;
                for(let i=0;i<len;i++){
                  ar1 *= (parseInt(qiu[0].length)-parseInt(i));
                  ar2 *= (parseInt(i)+1);
               }
              renum = ar1/ar2;
            }
          }else if(sel[1] == 'sizxsanc' || sel[1] == 'sanzxsc'){// 四字现三重
            if(qiu[0] && qiu[1]){
              renum = 1;
            }
          }else if(sel[1] == 'sizxersc'){// 四字现二双重
            if(qiu[0] && qiu[0].length >= 2){
              renum = 1;
            }
          }else if(sel[1] == 'sizxyisc'){
            if(qiu[0]  && qiu[1] && qiu[1].length >= 2){// 四字现一双重
              renum = 1;
            }
          }else{
            renum = 1;
          }
        }
        return renum;
      }
    }
  }
</script>
<style scoped>

.lottery-balls>li .lottery-odds {
    margin-left: 0%;
    min-width: 1rem;
}
.check_main_button {
  text-align: center;
  margin-top:10%;
}
.check_main_button div{
  display: inline-block;
  width: 40%;
}
/*立体球*/
.lottery-class-qxc {
  display: inline-block;
  width: 9%;
  background: #539ed0;
  font-size: 1rem;
  position: relative;
  vertical-align: middle;
  margin-left: 1%;
  text-align: center;
  /*圆角属性*/
  border-radius:50% ;
  background: radial-gradient(circle at 50% 120%, #81e8f6, #76deef 10%, #055194 80%, #062745 100%);
}
/**/
.lottery-class-qxc .ball:before {
  content: "";
  position: absolute;
  top: 1%;
  left: 5%;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  /* radial-gradient(circle at 50% 120%, #81e8f6, #76deef 10%, #055194 80%, #062745 100%) */
  background: radial-gradient(circle at 50% 0px, #ffffff, rgba(255, 255, 255, 0) 58%);
  -webkit-filter: blur(5px);
  z-index: 2;
}
@keyframes ballchg{

}
.red {
  background: radial-gradient(circle at 50% 120%, red, #fa2740 10%, #f8344b 80%, red 100%);
  width: 9%;
  z-index: 0;
}
.lottery-class-qxc:before {
  content: "";
  display: inline-block;
  padding-bottom: 100%;
  width: .1px;
  vertical-align: middle;
}
.lottery-class-qxc span {
  display: inline-block;
  vertical-align: middle;
  /* font-size: 1rem; */
  color: #fff;
}
/*立体球*/
.add_qxc_class{
  text-align:center;
  padding: 0.5rem 0;
}
.add_qxc_class span{
  color:#646464;
}
</style>
