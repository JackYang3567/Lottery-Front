<template>
  <div id="app" style="height:0;">

    <main class="kd-body" >
      <ul class=" nostyle account-sub-nav kd-row-middle" style="position: relative;">
        <li class="router-link-exact-active">
          <a href="javascript:;" class="" @click="changeSel(0)">开元棋牌</a>
        </li>
        <li class="router-link-exact-active">
          <a href="javascript:;" class="" @click="changeSel(1)">龙城</a>
        </li>
        <li class="router-link-exact-active">
          <a href="javascript:;" class="" @click="changeSel(2)">乐游</a>
        </li>
        <div class="active_effect" :style="{left: buy*33.3+'%',backgroundColor: $store.state.basic.main_color}"></div>
      </ul>
      <mt-loadmore class="activities" :top-method="loadTop" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" >

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
              <img src="../../../assets/images/svg/more.svg">
          </span>
        </div>

      <!--数据展示-->
       <template v-if="data_sel.length" >
        <ul class="nostyle kd-container kd-list data-list playing-record-list " >
          <template v-for="(item,key) in data_sel">


            <li class="item kd-box data"  :style="{ borderTop:'3px solid ' + $store.state.basic.main_color }">
                <!--Tab卡第一层-->
                <div v-if="buy == 0" class="data-item">
                  <div class="data-item"><span class="data-item-key">游戏类型：</span><span class="data-item-value">{{item.name}}</span></div>
                  <div class="data-item"><span class="data-item-key">游戏局号：</span><span class="data-item-value">{{item.game_id}}</span></div>
                  <div class="data-item"><span class="data-item-key">有效下注：</span><span class="data-item-value">{{item.cell_score}}</span></div>
                  <div class="data-item"><span class="data-item-key">总下注：</span><span class="data-item-value">{{item.all_bet}}</span></div>
                  <div class="data-item"><span class="data-item-key">盈利：</span><span class="data-item-value">{{item.profit}}</span></div>
                  <div class="data-item"><span class="data-item-key">开始时间：</span><span class="data-item-value">{{item.game_start_time}}</span></div>
                  <div class="data-item"><span class="data-item-key">结束时间：</span><span class="data-item-value">{{item.game_end_time}}</span></div>
                  <div class="data-item"><span class="data-item-key">游戏厂商：</span><span class="data-item-value">{{item.gname}}</span></div>
                </div>

              <!--Tab卡第二层-->
              <div v-if="buy == 1" class="data-item">
                <div class="data-item"><span class="data-item-key">游戏类型：</span><span class="data-item-value">{{item.name}}</span></div>
                <div class="data-item"><span class="data-item-key">游戏局号：</span><span class="data-item-value">{{item.game_id}}</span></div>
                <div class="data-item"><span class="data-item-key">有效下注：</span><span class="data-item-value">{{item.cell_score}}</span></div>
                <div class="data-item"><span class="data-item-key">总下注：</span><span class="data-item-value">{{item.all_bet}}</span></div>
                <div class="data-item"><span class="data-item-key">盈利：</span><span class="data-item-value">{{item.profit}}</span></div>
                <div class="data-item"><span class="data-item-key">开始时间：</span><span class="data-item-value">{{item.game_start_time}}</span></div>
                <div class="data-item"><span class="data-item-key">结束时间：</span><span class="data-item-value">{{item.game_end_time}}</span></div>
                <div class="data-item"><span class="data-item-key">游戏厂商：</span><span class="data-item-value">{{item.gname}}</span></div>              </div>

              <!--Tab卡第三层-->
              <div v-if="buy == 2" class="data-item">
                <div class="data-item"><span class="data-item-key">游戏类型：</span><span class="data-item-value">{{item.name}}</span></div>
                <div class="data-item"><span class="data-item-key">游戏局号：</span><span class="data-item-value">{{item.game_id}}</span></div>
                <div class="data-item"><span class="data-item-key">有效下注：</span><span class="data-item-value">{{item.cell_score}}</span></div>
                <div class="data-item"><span class="data-item-key">总下注：</span><span class="data-item-value">{{item.all_bet}}</span></div>
                <div class="data-item"><span class="data-item-key">盈利：</span><span class="data-item-value">{{item.profit}}</span></div>
                <div class="data-item"><span class="data-item-key">开始时间：</span><span class="data-item-value">{{item.game_start_time}}</span></div>
                <div class="data-item"><span class="data-item-key">结束时间：</span><span class="data-item-value">{{item.game_end_time}}</span></div>
                <div class="data-item"><span class="data-item-key">游戏厂商：</span><span class="data-item-value">{{item.gname}}</span></div>              </div>

            </li>
          </template>
        </ul>
         <!--分页-->
        <div class="kd-pager">
          <!-- disabled -->
          <a class="kd-pager-item first " @click="pageOn(page_data[0])">&lt;&lt;</a>
          <a class="kd-pager-item prev " @click="pageOn(page_data[1])">&lt;</a>
          <span class="kd-pager-item current">{{page}} / {{total_page}}</span>
          <a class="kd-pager-item next " @click="pageOn(page_data[2])">&gt;</a>
          <a class="kd-pager-item last " @click="pageOn(page_data[3])">&gt;&gt;</a>
        </div>

        <div class="kd-container kd-list two-cols total">
            <!--暂时取消 误删-->
            <!-- <div class="item"><span class="kd-col">投注小计</span><span class="kd-col">￥{{sin_money[0]}}</span></div>
            <div class="item"><span class="kd-col">投注总计</span><span class="kd-col">￥{{all_money[0]}}</span></div>
            <div class="item"><span class="kd-col">中奖小计</span><span class="kd-col">￥{{sin_money[1]}}</span></div>
            <div class="item"><span class="kd-col">中奖总计</span><span class="kd-col">￥{{all_money[1]}}</span></div> -->
        </div>
      </template>
      <ul v-if="!is_loadding && data_sel.length==0" class="nostyle kd-container kd-list data-list playing-record-list"><li class="item empty">没有数据!</li></ul>
      <div align="center" v-if="is_loadding">
        <mt-spinner type="double-bounce" color="#02aecb"></mt-spinner>
      </div>
       </mt-loadmore>
      <!--过滤球-->
      <transition name="bounce2">
        <div class="promptbox-wrapper" v-show="filter">
          <section class="promptbox filter-tool" :style="{ border: '2px solid ' + $store.state.basic.main_color }">
            <div class="prompt-head" :style="{background: $store.state.basic.main_color }">过滤</div>
            <div class="prompt-body kd-form">
              <div class="filter-tool-body">
                <div class="kd-field">
                  <label class="kd-field-title">起始时间</label>
                  <div class="kd-textinput date">
                    <input type="date" v-model:value="where.start_time">
                  </div>
                </div>
                <div class="kd-field">
                  <label class="kd-field-title">截止时间</label>
                  <div class="kd-textinput date">
                    <input type="date" v-model:value="where.end_time">
                  </div>
                </div>
                <div class="kd-field">
                  <label class="kd-field-title">游戏类型</label>
                  <div class="kd-select"><span class="value">{{lottery[where.type] ? lottery[where.type]: '所有'}}</span>
                    <select v-model="where.type">
                      <option value="">所有</option>
                      <option :value="key" v-for="(item,key) in lottery">{{item}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div type="button" class="kd-button" @click="clickData" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span>确 定</span>
                <button type="button">Button</button>
              </div>
            </div> <a href="javascript:;" class="prompt-close kd-close" @click="filter=!filter">close</a></section>
          <div class="promptbox-overlay"></div>
        </div>
      </transition>
      <a href="javascript:;" class="filter-tool-toggle" @click="filter=!filter" v-if="!is_loadding" :style="{background: $store.state.basic.main_color }">过滤球</a>
      </main>

  </div>
</template>
<script>
  import { Cell,Group,CellFormPreview } from 'vux';
  export default{
    name: 'chess_record',
    mounted(){
      this.$store.state.title = '棋牌记录';      //标题
      this.where['start_time'] = this.reTime(); //初始化时间
      this.where['end_time'] = this.reTime();   //初始化时间
      this.queryData();                         //默认请求
      this.lotteryAll();
    },
    components:{
      Group,
      Cell,
      CellFormPreview
    },
    data () {
      return {
        //特殊显示类型
        tsarr:[35,54,55,56],
        //棋牌样式转换
        chess:{
          'flower':{
            'C':'club',
            'H':'heart',
            'S':'spade',
            'D':'diamond'
          },
          'num':{
            '1':'A',
            '11':'J',
            '12':'Q',
            '13':'K'
          }
        },
        //页面加载动画
        is_loadding: true,
        data_sel:[
          // {expect:'加拿大28，第500期',play:'大',money:'5',time:'2018-4-12 12:00:00',odds:'1',open:[9,7,8],win:'10'},
          // {expect:'重庆时时彩，第500期',play:'总和单,第一球大,第五球小,前三后三.....',money:'50',time:'2018-4-12 12:00:00',odds:'1',open:[9,7,8],win:'110'},
          // {expect:'重庆时时彩，第500期',play:'总和单',money:'5',time:'2018-4-12 12:00:00',odds:'1',open:[9,7,8],win:'10'},
        ],
        //统计
          all_money:[0,0],//全部页  0投注 1中奖
          sin_money:[0,0],//当前页  0投注 1中奖
        //普通详情查看
        data_key:[],
        //竞彩足球详情查看
        data_key_zq:[],
        //追号查看
        chasing:[],
        //彩种类型
        lottery:[
        ],
        //选择查询类型0自购，1合买，2追号
        buy:0,
        //过滤球
        filter:false,
        //查询条件
        where:{
          start_time:'',
          end_time:'',
          type:'',
        },
        page:1,//当前页&目标页
        click:0,//是否开启条件查询
        total_page:1,//全部页
        reload_time:1,//刷新定时器
        topStatus:'',//下拉状态
      }
    },
    computed:{//计算属性
      page_data(){
        let _this = this,
            one = '', // 第一页
            last = '',// 上一页
            next = '',// 下一页
            end  = '';// 最后一页
            if(parseInt(_this.page) - 1  >= 1){
              one = 1;
              last = parseInt(_this.page) - 1;
            }
            if(parseInt(_this.page) + 1  <= _this.total_page){
              next = parseInt(_this.page) + 1;
              end = _this.total_page;
            }
        return [one,last,next,end];
      }
    },
    methods:{
      handleTopChange(status) {
        this.topStatus = status;
      },

      clickData(){
        this.click = 1;
        this.queryData();
      },

      changeSel(val){    //切换
        let _this = this;
        if(_this.buy != val){
          _this.buy = val;
          _this.page = 1;
          // _this.click = 0;
          _this.data_key=[];
          _this.queryData();
        }
      },

      queryData(){//数据请求
        let _this = this;
        let bet = {
          page:_this.page,
          where:_this.where,
        };

        _this.$getData({
          loading:true,
          url:'/api/home/chess/chessrecord',
          data:{ page:_this.page,where:JSON.stringify(_this.where),click:_this.click,code:0,buy:_this.buy },
          callback:function(res){
            _this.is_loadding && (_this.is_loadding = false);
            _this.filter = false;
            if(res.data){
              _this.$set(_this,'data_sel',res.data);  //页面数据
              _this.page = res.current_page;          //当前第几页
              _this.total_page = res.last_page;       //总页数
              _this.all_money = res.all_money;        //统计全部
              _this.sin_money = res.sin_money;        //统计当页
            }else{
              _this.data_sel=[];         //页面数据
              _this.page = 1;            //当前第几页
              _this.total_page = 1;      //总页数
              _this.all_money = 0;       //统计全部
              _this.sin_money = 0;       //统计当页
            }
            if(res.code < 0){
              _this.$total({ message: res.msg,type: 0 }); //页面数据
            }else if(res.code == 0){
              _this.$router.push('/in');
            }
          }
        });
      },

      loadTop(id) { //下拉刷新
        let _this = this;
        if(_this.reload_time == 0){
          _this.$total({ message: '操作过于频繁',type: 2 });
          _this.$refs.loadmore.onTopLoaded();
        }else{
        _this.click = 0;
        _this.reload_time = 0;
        _this.queryData();
        _this.$total({ message: '刷新成功',type: 1 });
        _this.$refs.loadmore.onTopLoaded();
        setTimeout(function(){_this.reload_time = 1},1000);
        }
      },

      pageOn(page){ //翻页
        if(page==''){return false;}
        this.page = page;
        this.queryData();
      },

      reTime() {//初始化时间设置
        let _this = this;
        let now=new Date();
        // new Date()-7*24*60*60*1000
        let year=now.getFullYear();//获取四位数年数
        let month=now.getMonth()+1;
        let date=now.getDate();
        // let weeknum=now.getDay();
        // let hou = now.getHours(); //获取当前小时数(0-23)
        // let min = now.getMinutes(); //获取当前分钟数(0-59)
        // let sec = now.getSeconds(); //获取当前秒数(0-59)
        let s=year + "-"+_this.addZero(month) + "-" + _this.addZero(date);
        return s;
      },
      addZero(data) {
        if(data<10) return "0" +""+ data;
        else return data;
      },
      lotteryAll() {//过滤球选择的彩票种类
        let _this = this;
        _this.$getData({
          url:'/api/home/chess/chessAllType',
          data:'',
          callback:function(res){
            if(res){
              _this.$set(_this,'lottery',res);
            }
          }
        });
      },
    }
  }

</script>
<style scoped>
.red{
  color:red;
}
.kd-button>button, .kd-button>input, .kd-cover-hidden, .kd-select>select {
  font-size: 0.1rem;
}
.account-sub-nav li{
  width:33.33%;
}
.kd-field-box{
  width: 115%;
}
.account-sub-search li{
  width:28%;
  font-size: 0.1rem;
}
.value{
  font-size: 0.1rem;
}
.playing-record-list .data-item .data-item-key,
.playing-record-list .data-item .data-item-value {
  font-size: .775rem;
  vertical-align: middle;
  width: inherit;
}

.kd-textinput>input, .kd-textinput>textarea{
  font-size: .05rem;
}

.active_effect{
  position: absolute;
  bottom: 0;
  left:0;
  transition: left 0.2s ease-in-out;
  width:33.33%;
  height:3px;
  background: rgb(217, 29, 55);
}
  .kd-col{
    font-size: 0.3rem !important;
  }
  .data-item{
    word-break: break-all;
  }
  .activities{
    min-height: 450px;
}
  .search{
    min-height: 60px;
  }
</style>
