<template>
  <div id="app" style="height:0">
    <main class="kd-body">
      <mt-loadmore class="activities" :top-method="loadTop" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" >

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
              <img src="../../../assets/images/svg/more.svg">
          </span>
        </div>
      <template v-if = 'data_sel.length'>
        <ul class="nostyle kd-container kd-list data-list">
            <li class="item kd-box data" v-for="item in data_sel" :style="{ borderTop:'3px solid ' + $store.state.basic.main_color }">
                <div class="data-item"><span class="data-item-key">流水类型：</span><span class="data-item-value">{{item.type}}</span></div>
                <div class="data-item"><span class="data-item-key">发生金额：</span><span class="data-item-value">￥{{item.money}}</span></div>
                <div class="data-item"><span class="data-item-key">日 期：</span><span class="data-item-value">{{item.create_time}}</span></div>
                <!-- <div class="data-item"><span class="data-item-key">备 注：</span><span class="data-item-value">PC蛋蛋加拿大28第2246175期初级房中奖</span></div> -->
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
        <!-- <div class="kd-container kd-list two-cols total">
            <div class="item"><span class="kd-col">小计：</span><span class="kd-col">￥{{sin_money}}</span></div>
            <div class="item"><span class="kd-col">总计：</span><span class="kd-col">￥{{all_money}}</span></div>
        </div> -->
      </template>
      <ul v-if="!is_loadding && data_sel.length < 1" class="nostyle kd-container kd-list data-list playing-record-list"><li class="item empty">没有数据!</li></ul>
      <div align="center" v-if="is_loadding">
        <mt-spinner type="double-bounce" color="#02aecb"></mt-spinner>
      </div>
      </mt-loadmore>
      <!--筛选-->
        <transition name="bounce2">
        <div class="promptbox-wrapper" v-show="filter">
          <section class="promptbox filter-tool" :style="{ border: '2px solid ' + $store.state.basic.main_color }">
            <div class="prompt-head" :style="{background: $store.state.basic.main_color }">过滤</div>
            <div class="prompt-body kd-form">
                <div class="filter-tool-body">
                    <div class="kd-field">
                        <label>起始时间</label>
                        <div class="kd-textinput date">
                            <input v-model="where.start_time" type="date">
                        </div>
                    </div>
                    <div class="kd-field">
                        <label>截止时间</label>
                        <div class="kd-textinput date">
                            <input v-model="where.end_time" type="date">
                        </div>
                    </div>
                    <div class="kd-field">
                        <label>流水类型</label>
                        <div class="kd-select"><span class="value">{{fil_sel[where.type] ? fil_sel[where.type] : '所有'}}</span>
                            <select v-model='where.type'>
                                <option value="">所有</option>
                                <option :value="key" v-for="(item,key) in fil_sel">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div type="button" class="kd-button" @click="clickData" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
                    <span>确 定</span>
                    <button type="button">Button</button>
                </div>
            </div>
            <a href="javascript:;" class="prompt-close kd-close" @click="filter=false">close</a>
          </section>
          <div class="promptbox-overlay"></div>
        </div>
        </transition>
        <!--报表统计弹窗-->
        <transition name="bounce2">
        <div class="promptbox-wrapper" v-show="water_check">
          <section class="promptbox filter-tool promptbox_report" :style="{ border: '2px solid ' + $store.state.basic.main_color }">
            <div class="prompt-head" :style="{background: $store.state.basic.main_color }">报表查看</div>
            <div class="prompt-body kd-form prompt-body-bb">

              <template v-for="item in report">
                <flexbox>
                  <flexbox-item>
                    <div class="flex-demo-bb" style="text-align:center;">
                      <divider>{{item.name}}</divider>
                      <span class="red" style="font-size:1rem;">{{item.num}}</span>￥
                    </div>
                  </flexbox-item>
                </flexbox>
                <br/>
              </template>
              <group>
                <datetime v-model="rewhere.start_time" clear-text="筛选开始时间" placeholder="默认7天以前" format="YYYY-MM-DD"  :min-year="2015" title="开始时间"></datetime>
                <datetime v-model="rewhere.end_time" clear-text="筛选结束时间" placeholder="默认当前时间" format="YYYY-MM-DD"  :min-year="2015" title="结束时间"></datetime>
              </group>
            </div>
            <a href="javascript:;" class="prompt-close kd-close" @click="water_check=false">close</a>
          </section>
          <div class="promptbox-overlay"></div>
        </div>
        </transition>
        <a href="javascript:;" @click="moneyType()" class="filter-tool-toggle" :style="{background: $store.state.basic.main_color }">过滤球</a>
        <a href="javascript:;" @click="reportOn()" class="filter-tool-toggle" :style="{background: $store.state.basic.main_color ,bottom:'25%'}">统计</a>
    </main>
  </div>
</template>
<script>
import { Divider,Flexbox, FlexboxItem,Datetime,Group   } from 'vux';
  export default{
    name: 'name',
    components:{
      Flexbox, FlexboxItem,Divider,Datetime,Group
    },
    mounted(){
      this.$store.state.title = '账户流水';
      this.where['start_time'] = this.reTime(Date.parse(new Date()),-7); //初始化时间 开始时间
      this.where['end_time'] = this.reTime(Date.parse(new Date()));  //初始化时间 结束时间
      this.queryData();
    },
    data () {
      return {
        is_loadding: true,
        //页面数据
        data_sel:[
          // {type:'派奖',money:'100','create_time':'2018-4-21 11:09:24'},
        ],
        //过滤球
        filter:false,
        //过滤球选择
        fil_sel:{
          // '0':'下注',
          // '1':'提现',
          // '2':'线下充值',
          // '3':'中奖',
          // '4':'扣款',
          // '5':'赠送',
          // '6':'退款',
          // '7':'在线充值',
          // '8':'返佣',
          // '10':'抽奖',
          // '11':'返水',
          // '12':'冻结资金',
          // '13':'冻结返还',
          // '14':'保底投注',
          // '15':'系统充值',
          // '16':'红包',
        },
        //数据查询条件
        where:{
          start_time:'',
          end_time:'',
          type:'',
        },
        //报表查询开关
        water_check:false,
        //报表查询条件
        rewhere:{
          start_time:'',
          end_time:'',
        },
        //报表内容
        report:[
          {name:'下注',num:'加载中...'},
          {name:'中奖',num:'加载中...'},
          {name:'充值',num:'加载中...'},
          {name:'赠送',num:'加载中...'},
          {name:'提现',num:'加载中...'},
          {name:'代理反佣',num:'加载中...'},
          // win:0,
          // bet:0,
          // in_money:0,//充值
          // out_money:0,//提现
          // give_money:0,//赠送
        ],
        page:1,//当前页&目标页
        click:0,//开启条件查询
        total_page:1,//全部页
        sin_money:0,//小计
        all_money:0,//总计
        topStatus:'',//下拉状态
      }
    },
    computed:{//计算属性
      page_data(){
        let _this = this,
            one = '', // 第一页
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
    watch:{
      'rewhere.start_time':function(){
          this.reportOn();
      },
      'rewhere.end_time':function(){
          this.reportOn();
      }
    },
    methods:{
      moneyType(){
        let _this = this;
        if(!Object.keys(_this.fil_sel).length){
          _this.$getData({
            loading:true,
            url:'/api/home/my/moneyAllType',
            data:'',
            callback:function(res){
              _this.$set(_this,'fil_sel',res);
              _this.filter = true;
            }
          });
        }else{
          _this.filter = true;
        }

      },
      //报表查看
      reportOn(){
        let _this = this;
        if(!_this.water_check){
          _this.water_check = true;
        }
        _this.$getData({
          loading:true,
          url:'/api/home/my/waterReport',
          type:'post',
          data:_this.rewhere,
          callback:function(res){
            if(res){
              _this.$set(_this,'report',res);
            }
          }
        });
      },
      //下拉刷新状态
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop(id) { //下拉刷新
        let _this = this;
        _this.page = 1;  //页面重置为1
        _this.click = 0; //关闭条件查询
        _this.queryData();
        _this.$total({ message: '刷新成功',type: 1 });
        _this.$refs.loadmore.onTopLoaded();
      },
      clickData(){
        this.click = 1; //开启条件查询
        this.queryData();
      },
      queryData(){
        let _this = this;
        _this.$getData({
          url:'/api/home/my/queryData',
          type:'post',
          data:{where:JSON.stringify(_this.where),page:_this.page,click:_this.click,code:2},
          callback:function(res){
            _this.is_loadding && (_this.is_loadding = false);
            _this.filter = false;
            if(res.data){
              _this.$set(_this,'data_sel',res.data);
              _this.page = res.current_page;        //当前第几页
              _this.total_page = res.last_page;     //总页数
              _this.all_money = res.moneyAll;       //统计全部
              _this.sin_money = res.money;          //统计当页
            }else{
              _this.data_sel = [];
            }
            if(res.code<0){
              _this.$total({ message: res.msg,type: 0 });
            }
          }
        });
      },

      pageOn(page){ //翻页
        if(page==''){return false;}
        this.page = page;
        this.queryData();
      },
      reTime(time,type = 0) {//初始化时间设置 type 第几天
        if(type != 0){
          time = time + (type*86400*1000);
        }
        let _this = this;
        let now = new Date(time);
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
    }
  }
</script>

<style scoped>
  .prompt-body-bb{
    max-height:100%;
  }
  .red{
    color:red;
  }
  .flex-demo-bb{
    border:1px solid #5e5e5e;
    border-radius:5px;
    word-wrap : break-word
  }
  .activities{
    min-height: 450px;
  }
  .promptbox_report{
    max-width:100%;
    width: 100%;
    height:100%;
  }
</style>
