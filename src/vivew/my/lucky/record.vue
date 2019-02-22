<template>
  <div id="app" style="height:0">
    <main class="kd-body">
      <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" >

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
              <img src="../../../assets/images/svg/more.svg">
          </span>
        </div>
      <template v-if = 'data_sel.length'>
        <ul class="nostyle kd-container kd-list data-list">
            <li class="item kd-box data" v-for="item in data_sel" :style="{ borderTop:'3px solid ' + $store.state.basic.main_color }">
                <div class="data-item"><span class="data-item-key">中奖类型：</span><span class="data-item-value">{{item.explain}}</span></div>
                <div class="data-item"><span class="data-item-key">中奖金额：</span><span class="data-item-value">￥{{item.money}}</span></div>
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

      </template>
      <ul v-else class="nostyle kd-container kd-list data-list playing-record-list"><li class="item empty">没有数据!</li></ul>
      </mt-loadmore>

        <!-- <div class="promptbox-wrapper" v-show="filter">
            <section class="promptbox filter-tool">
                <div class="prompt-head">过滤</div>
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
                    <div type="button" class="kd-button" @click="clickData"><span>确 定</span>
                        <button type="button">Button</button>
                    </div>
                </div> <a href="javascript:;" class="prompt-close kd-close" @click="filter=false">close</a></section>
            <div class="promptbox-overlay"></div>
        </div>
        <a href="javascript:;" @click="filter=true" class="filter-tool-toggle">过滤球</a> -->
    </main>
  </div>
</template>
<script>
  export default{
    name: 'name',
    mounted(){
      this.$store.state.title = '抽奖记录';
      this.where['start_time'] = this.reTime(); //初始化时间
      this.where['end_time'] = this.reTime();  //初始化时间
      this.queryData();
    },
    data () {
      return {
        //页面数据
        data_sel:[
          // {explain:'一等奖',money:'100','create_time':'2018-4-21 11:09:24'},
        ],
        where:{
          start_time:'',
          end_time:'',
        },
        page:1,//当前页&目标页
        click:0,//开启条件查询
        total_page:1,//全部页
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
      loadTop(id) { //下拉刷新
        let _this = this;
        _this.page = 1;  //页面重置为1
        _this.click = 0; //关闭条件查询
        _this.queryData();
        _this.$total({ message: '刷新成功',type: 0 });
        _this.$refs.loadmore.onTopLoaded();
      },
      clickData(){
        this.click = 1; //开启条件查询
        this.queryData();
      },
      queryData(){
        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/home/my/queryData',
          type:'post',
          data:{ where:JSON.stringify(_this.where),page:_this.page,code:5,click:_this.click },
          callback:function(res){
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
</style>
