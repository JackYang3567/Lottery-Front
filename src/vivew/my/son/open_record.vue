<template>
  <div id="app" style="height:0">
    <main class="kd-body game-record">
      <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" >
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
                <img src="../../../assets/images/svg/more.svg">
            </span>
          </div>
         <br/>
         <template v-if="data_sel.length">
         <ul class="nostyle kd-container">
             <li class="kd-box gd" v-for="item in data_sel" :style="{ borderTop:'3px solid ' + $store.state.basic.main_color }">
                 <div class="item kd-row-middle"><span class="item-title">期号：</span> <span class="item-body">{{item.expect}}</span></div>
                 <div class="item kd-row-middle"><span class="item-title">奖号：</span>

                        <!-- pk赛车开奖显示方式 -->
                       <ul class="nostyle data-item-value balls" v-if="item.open_type == 1">
                         <li v-for="num in item.content"><span :class="'lottery-ball pk10 solid ball'+parseInt(num)">{{num}}</span></li>
                       </ul>
                       <!-- 幸运农场开奖显示方式 -->
                       <ul class="nostyle data-item-value balls xync" v-else-if="item.open_type == 2">
                         <li v-for="num in item.content"><span :class="'lottery-ball xync solid ball'+parseInt(num)">{{num}}</span></li>
                       </ul>
                       <!-- 急速六合显示方式 -->
                       <ul class="nostyle item-body balls" v-else-if="item.open_type == 3">
                         <template v-for="(num,key) in item.content">
                           <li>
                             <span :class="'lottery-ball marksix solid '+num[1]">{{num[0]}}</span><br>
                             <span class="lottery-prop">{{num[2]}}</span>
                           </li>
                           <li v-if="key == 5"><span class="lottery-plus gjs"></span>&nbsp;</li>
                         </template>
                      </ul>
                      <!--百人牛牛显示（扑克） heart红桃 club梅花 diamond方块 黑桃spade-->

                      <ul class="nostyle item-body balls" v-else-if="item.open_type == 4">
                        <li><span class="lottery-ball-title">{{item.title[0]}}</span></li>
                        <li><span :class="'lottery-ball dragon longhu '+ s1[1]" v-for="s1 in item['content'][0]">{{s1[0]}}</span></li>
                        <br/>
                        <li><span class="lottery-ball-title">{{item.title[1]}}</span></li>
                        <li><span :class="'lottery-ball dragon longhu '+ s1[1]" v-for="s1 in item['content'][1]">{{s1[0]}}</span></li>
                      </ul>

                       <ul class="nostyle item-body balls" v-else>
                           <li v-for="num in item.content"><span class="lottery-ball cqssc solid" :style="{ backgroundColor:$store.state.basic.main_color,border:'2px solid ' + $store.state.basic.main_color }">{{num}}</span></li>
                       </ul>

                 </div>
                 <!---->
                 <!---->
                 <div class="item kd-row-middle" v-for="item1 in item.plus" v-if="item.plus[0]['name'] != ''">
                   <span class="item-title">{{item1['name']}}：</span>
                   <span class="item-body">{{item1['data']}}</span>
                 </div>

                 <div class="item kd-row-middle datetime"><span class="item-title">日期：</span> <span class="item-body">{{item.create_time}}</span></div>
             </li>
         </ul>
         <div class="kd-pager">
           <!-- disabled -->
           <a class="kd-pager-item first " @click="pageOn(page_data[0])">&lt;&lt;</a>
           <a class="kd-pager-item prev " @click="pageOn(page_data[1])">&lt;</a>
           <span class="kd-pager-item current">{{page}} / {{total_page}}</span>
           <a class="kd-pager-item next " @click="pageOn(page_data[2])">&gt;</a>
           <a class="kd-pager-item last " @click="pageOn(page_data[3])">&gt;&gt;</a>
         </div>
       </template>

       <ul v-if="!is_loadding && data_sel.length==0" class="nostyle kd-container kd-list data-list playing-record-list">
         <li class="item empty">
          没有数据!
         </li>
       </ul>

       <div align="center" v-if="is_loadding">
        <mt-spinner type="double-bounce" :color="$store.state.basic.main_color"></mt-spinner>
       </div>

       </mt-loadmore>
         <transition name="bounce2">
         <div class="promptbox-wrapper" v-show="filter">
             <section class="promptbox filter-tool" :style="{ border: '2px solid ' + $store.state.basic.main_color }">
                 <div class="prompt-head" :style="{background: $store.state.basic.main_color }">过滤</div>
                 <div class="prompt-body kd-form">
                     <div class="filter-tool-body">
                         <div class="kd-field">
                             <label class="kd-field-title">起始时间</label>
                             <div class="kd-textinput date">
                                 <input type="date" v-model="where.start_time">
                             </div>
                         </div>
                         <div class="kd-field">
                             <label class="kd-field-title">截止时间</label>
                             <div class="kd-textinput date">
                                 <input type="date" v-model="where.end_time">
                             </div>
                         </div>
                         <div class="kd-field">
                             <label class="kd-field-title">期号</label>
                             <div class="kd-textinput number">
                                 <input type="number" v-model.trim="where.expect" placeholder="可输入期号查询">
                             </div>
                         </div>
                         <div class="kd-field">
                             <label class="kd-field-title">彩票种类</label>
                             <div class="kd-select"><span class="value">{{lottery_data[type_tem]}}</span>
                                 <select v-model="type_tem">
                                     <option :value="key" v-for="(item,key) in lottery_data" v-if="!open_off.includes(parseInt(key))">{{item}}</option>
                                 </select>
                             </div>
                         </div>
                     </div>
                     <div type="button" class="kd-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
                        <span>确 定</span>
                        <button type="button" @click="clickData">Button</button>
                     </div>
                 </div> <a href="javascript:;" class="prompt-close kd-close" @click="filter = false">close</a></section>
             <div class="promptbox-overlay"></div>
         </div>
       </transition>
       <a href="javascript:;" class="filter-tool-toggle" @click="filter = true" v-if="!is_loadding && data_sel.length" :style="{background: $store.state.basic.main_color }">过滤球</a>
       </main>
  </div>
</template>
<script>
  export default{
    mounted(){
      this.getInfo();
    },
    data () {
      return {
        is_loadding: true,
        data_sel:[
          // {expect:871690,content:['4','3','5'],time:'2018-02-09 13:55:00'},
          // {expect:871689,content:['7','3','9'],time:'2018-02-09 13:50:00'},
          // {expect:871688,content:['9','9','6'],time:'2018-02-09 13:45:00'},
        ],
        type_tem:'',
        where:{
          start_time:'',
          end_time:'',
          expect:'',
          type:'',
        },
        page:1,//当前页&目标页
        click:0,//是否开启条件查询
        total_page:1,//全部页
        reload_time:1,//刷新定时器
        topStatus:'',//下拉状态
        lottery_data:[],//彩票数量
        filter:false,//过滤球
        topStatus:'',//下拉状态
        open_off:[0,1,53,54,55,56],//禁止查询的类型有 龙虎 百家 老虎机
      }
    },
    computed:{
      page_data(){
        let _this = this,
            one = '',   // 第一页
            last = '',//上一页
            next = '',//下一页
            end  = '';//最后一页
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
    methods: {
      getInfo(){
        this.type_tem = this.$route.params.id;
        this.where.type = this.$route.params.id; //获取id
        this.$store.state.title = '加载中...';     //标题
        this.where['start_time'] = this.reTime(); //初始化开始时间
        this.where['end_time'] = this.reTime();   //初始化结束时间
        this.lottery();                           //请求彩种数
        this.queryData();                         //请求开奖数据
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop(id) { //下拉刷新
        let _this = this;
        _this.page = 1;
        _this.click = 0;
        _this.expect = '';
        _this.queryData();
        _this.$total({ message: '刷新成功',type: 1 });
        _this.$refs.loadmore.onTopLoaded();
      },
      lottery(){//请求彩票
        var _this = this;
        _this.$getData({
          url:'/api/home/home/lotteryAll',
          data:'',
          callback:function(res){
            _this.$set(_this,'lottery_data',res);
            _this.$store.state.title = (res[_this.where.type] ? res[_this.where.type]:'') + '开奖';
          }
        });
      },
      clickData(){
        this.click = 1;
        this.where.type = this.type_tem;
        this.queryData();
      },
     queryData(){//开奖号
       // if(Math.abs( (Date.parse(this.where.start_time)/1000) - (Date.parse(this.where.end_time)/1000) ) > parseInt(10*86400) ){
       //   this.$toast('只能查询最近10天');
       //   return false;
       // }
       let _this = this;
       //禁止查询类型

       if(_this.open_off.includes(_this.where['type'])){
         _this.$total({ message: '暂不支持该类查询',type: 0 });
         return false;
       }
       _this.$getData({
         loading:true,
         url:'/api/home/home/queryData',
         data:{page:_this.page,where:JSON.stringify(_this.where),click:_this.click,code:1},
         callback:function(res){
           _this.is_loadding && (_this.is_loadding = false);

           if(res.code <= 0){
             _this.$total({ message: res.msg,type: 0 });

           }else{
             _this.filter = false;
             if(res.data){
               _this.$set(_this,'data_sel',res.data);
               _this.page = res.current_page ?res.current_page:1;     //当前第几页
               _this.total_page = res.last_page?res.last_page:1;      //总页数
               _this.$store.state.title = _this.lottery_data[_this.where['type']]; //修改标题
             }else{
               _this.data = [];
             }
           }
         }
       });
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
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route(){
        this.click = 0;
        this.data_sel = [];
        this.is_loadding = true;
        this.$store.state.title = '加载中...';
        this.getInfo();
      }
    }
  }
</script>

<style scoped>
  .activities{
    min-height: 450px;
  }
</style>
