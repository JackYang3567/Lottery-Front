<template>
  <div style="">
    <mt-loadmore class="activities" :top-method="loadTop" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" >
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
            <img src="../../../assets/images/svg/more.svg">
        </span>
      </div>

    <template v-if="data_sel.length">
        <ul class="nostyle kd-container kd-list data-list" >
            <li class="item kd-box data" v-for="item in data_sel" :style="{ borderTop:'5px solid ' + $store.state.basic.main_color }">
                <div class="data-item"><span class="data-item-key">充值金额：</span><span class="data-item-value">￥{{item.money}}</span></div>
                <div class="data-item"><span class="data-item-key">交易帐号：</span><span class="data-item-value">{{item.pay_account}}</span></div>
                <div class="data-item"><span class="data-item-key">充值时间：</span><span class="data-item-value">{{item.create_time}}</span></div>
                <!---->
                <div class="data-item"><span class="data-item-key">状    态：</span><span class="data-item-value">{{item.state}}</span></div>
                <div class="data-item"><span class="data-item-key">备    注：</span><span class="data-item-value">{{item.remarks}}</span></div>
            </li>
        </ul>
        <div class="kd-pager">
          <a class="kd-pager-item first " @click="pageOn(page_data[0])">&lt;&lt;</a>
          <a class="kd-pager-item prev " @click="pageOn(page_data[1])">&lt;</a>
          <span class="kd-pager-item current">{{page}} / {{total_page}}</span>
          <a class="kd-pager-item next " @click="pageOn(page_data[2])">&gt;</a>
          <a class="kd-pager-item last " @click="pageOn(page_data[3])">&gt;&gt;</a>
        </div>

        <!-- <div class="kd-container kd-list two-cols total">
            <div class="item"><span class="kd-col">小计：</span><span class="kd-col">￥0</span></div>
            <div class="item"><span class="kd-col">总计：</span><span class="kd-col">￥0</span></div>
        </div> -->
      </template>
      <ul v-if="!is_loadding && data_sel.length==0" class="nostyle kd-container kd-list data-list" align="center">
          <li class="item">没有数据!</li>
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
                        <!-- <div class="kd-field">
                            <label>充值方式</label>
                            <div class="kd-select"><span class="value">所有</span>
                                <select>
                                    <option value="">所有</option>
                                    <option value="微信">微信</option>
                                    <option value="支付宝">支付宝</option>
                                    <option value="QQ钱包">QQ钱包</option>
                                    <option value="网上银行">网上银行</option>
                                    <option value="充值卡">充值卡</option>
                                    <option value="会员转账">会员转账</option>
                                    <option value="客服充值">客服充值</option>
                                    <option value="客服存入">客服存入</option>
                                    <option value="存款优惠">存款优惠</option>
                                    <option value="返点优惠">返点优惠</option>
                                    <option value="活动优惠">活动优惠</option>
                                    <option value="支付通道掉单">支付通道掉单</option>
                                    <option value="理财转入">理财转入</option>
                                    <option value="理财平台出款异常冲正">理财平台出款异常冲正</option>
                                    <option value="取消出款">取消出款</option>
                                    <option value="负数额度归零">负数额度归零</option>
                                    <option value="其他人工存入">其他人工存入</option>
                                </select>
                            </div>
                        </div> -->
                        <div class="kd-field">
                            <label>状态</label>
                            <div class="kd-select"><span class="value">{{type_tem == '' ? '所有' :data_type[type_tem]}}</span>
                                <select v-model="type_tem">
                                    <option value="">所有</option>
                                    <option value="0">未支付</option>
                                    <option value="1">已支付</option>
                                    <option value="2">已撤单</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div type="button" class="kd-button" @click="clickData" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span>确 定</span>
                        <button type="button">Button</button>
                    </div>
                </div> <a href="javascript:;" class="prompt-close kd-close" @click="filter=false">close</a></section>
            <div class="promptbox-overlay"></div>
          </div> 
        </transition>
        <a href="javascript:;" class="filter-tool-toggle" @click="filter=true"  :style="{background: $store.state.basic.main_color }">过滤球</a>
    </div>
</template>

<script>
  export default {
    is_loadding: true,
    name: 'moneyRecordIn',
      mounted(){
        this.where['start_time'] = this.reTime(); //初始化时间
        this.where['end_time'] = this.reTime();   //初始化时间
        this.queryData();                         //默认请求
      },
      data () {
        return {
          is_loadding: true,
          data_sel:[
            // {state:已处理,money:0,pay_account:123,create_time:123,remarks:'备注'},
          ],
          data_type:['未处理','已处理','已撤单'],
          //统计
          all_money:0,//全部页
          sin_money:0,//当前页
          //详情查看
          data_key:[],
          //彩种类型
          lottery:[
          ],
          //过滤球
          filter:false,
          //查询条件
          type_tem:'',
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
      methods:{
        handleTopChange(status) {
          this.topStatus = status;
        },
        nav_up:function(key){//详情
          //console.log(key);
          let _this = this,list;
          _this.data_key[key] ? _this.$set(_this.data_key,key,false) : _this.$set(_this.data_key,key,true);
          //console.log(_this.data_key);
          if(_this.data_sel[key]['open'] == '' && _this.data_key[key]){
            list = _this.data_sel[key]['list'];
            _this.$getData({
              url:'/api/home/my/betDetails',
              data:{key:list},
              callback:function(res){
                if(res){
                  for(let k in res){
                    _this.$set(_this.data_sel[key],k,res[k]);
                  }
                }
              }
            });
          }
        },
        clickData(){
          this.click = 1;
          this.where.type = this.type_tem;
          this.queryData();
        },
        queryData(){//数据请求
          let _this = this;
          let bet = {
            page:_this.page,
            where:_this.where,
          };
          _this.$getData({
            url:'/api/Home/My/queryData',
            data:{ page:_this.page,where:JSON.stringify(_this.where),click:_this.click,code:3 },
            callback:function(res){
              _this.is_loadding && (_this.is_loadding = false);
              _this.filter = false;
              if(res.data){
                _this.$set(_this,'data_sel',res.data); //页面数据
                _this.page = res.current_page;         //当前第几页
                _this.total_page = res.last_page;      //总页数
                _this.all_money = res.all_money;       //统计全部
                _this.sin_money = res.sin_money;       //统计当页
              }else{
                _this.data_sel=[]; //页面数据
                _this.page = 1;            //当前第几页
                _this.total_page = 1;      //总页数
                _this.all_money = 0;       //统计全部
                _this.sin_money = 0;       //统计当页
              }
              if(res.code < 0){
                _this.$toast(res.msg); //页面数据
              }
            }
          });
        },
        loadTop(id) { //下拉刷新
          let _this = this;
          if(_this.reload_time == 0){
            _this.$toast('操作过于频繁');
            _this.$refs.loadmore.onTopLoaded();
          }else{
          _this.click = 0;
          _this.reload_time = 0;
          _this.queryData();
          _this.$toast('刷新成功');
          _this.$refs.loadmore.onTopLoaded();
          setTimeout(function(){_this.reload_time = 1},1000);
          }
        },
        pageOn(page){ //翻页
          if(page==''){return false;}
          this.page = page;
          this.queryData();
        },
        // test(){
        //   alert(1);
        // },
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
      }
    }

</script>

<style scoped>
  .activities{
    min-height: 450px;
  }
</style>
