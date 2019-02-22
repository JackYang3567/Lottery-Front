<template>
  <div id="app">
    <main class="kd-body game-chart game-chart-d">
        <div class="kd-tab kd-tab-normal">
            <ul class="kd-tab-title nostyle clearfix">
                <li class="kd-tab-title-item"><span :class="'kd-tab-title-item-text '+[sel_type == 0 ? 'active' : '']" @click="sel_type=0">号码</span></li>
                <li class="kd-tab-title-item"><span :class="'kd-tab-title-item-text '+[sel_type == 1 ? 'active' : '']" @click="sel_type=1">单双</span></li>
                <li class="kd-tab-title-item"><span :class="'kd-tab-title-item-text '+[sel_type == 2 ? 'active' : '']" @click="sel_type=2">大小</span></li>
            </ul>
            <div class="kd-tab-panel kd-tab-panel-0" >
                <table class="chart-normal chart-normal-d">
                    <tr>
                        <th :width="((100/(head_width[0].length+2))*(key == 0 ? 2:1))+'%'" v-for="(item,key) in head_width[0]">{{item}}</th>
                    </tr>

                    <tr v-if="data_sel.length && (parseInt(now_expect) - parseInt(data_sel[0]['expect']) > 1)">
                      <td class="grey">{{parseInt(data_sel[0]['expect']) + 1 }}</td>
                      <td v-for="(bit,key) in data_sel[0]['content'].length">{{open_wait[key] ? open_wait[key]:'-'}}</td>
                    </tr>

                    <tr v-for="(item,key) in data_sel" v-show="open ? true : (key < 5)  ">
                        <td class="grey">{{item.expect}}</td>
                        <!---->
                        <td :class=" [  (sel_type == 0 ? (lottery_type==2? (item.class[key]+'-area') :'') : (item1 == 1 ? 'red' : 'blue')) ]" v-for="(item1,key) in (sel_type == 0 ? item.content:(sel_type == 1 ?item.single : item.big))">

                          <template v-if="sel_type == 0">
                            {{item1}} <br />
                            <span class="lottery-prop" v-if="lottery_type==2">{{ item.zodiac[key] }}</span>
                          </template>

                          <template v-else-if="sel_type == 1">
                            {{item1 == 1 ? '单':'双'}}
                          </template>
                          <template v-else>
                            {{item1 == 1 ? '大':'小'}}
                          </template>
                        </td>
                    </tr>

                </table>
            </div>
            <div class="kd-tab-normal-more" @click="open = !open">{{open ? '收起 -':'展开 +'}}</div>
        </div>

        <div class="kd-tab kd-tab-position">

            <ul class="kd-tab-title nostyle clearfix">
                <li class="kd-tab-title-item has-five-cols" v-for="(item,key) in head_width[1]" @click="sel_ball = key"><span :class="'kd-tab-title-item-text '+[sel_ball == key ? 'active' : '']">{{item}}</span></li>
            </ul>
            <div class="kd-tab-panel">
                <div class="chart-grid-wrapper clearfix">
                    <ul class="chart-grid-categories nostyle">
                        <li :class="'chart-grid-category clearfix '+[type_ball==0?'active':'']" @click="type_ball=0">
                            <div class="chart-grid-category-col"><span class="chart-ball red"> 单</span><span class="counter">{{ball_data['count'][0]}}</span></div>
                            <div class="chart-grid-category-col"><span class="chart-ball blue">双</span><span class="counter">{{ball_data['count'][1]}}</span></div>
                        </li>
                        <li :class="'chart-grid-category clearfix '+[type_ball==1?'active':'']" @click="type_ball=1">
                            <div class="chart-grid-category-col"><span class="chart-ball red"> 大</span><span class="counter">{{ball_data['count'][2]}}</span></div>
                            <div class="chart-grid-category-col"><span class="chart-ball blue">小</span><span class="counter">{{ball_data['count'][3]}}</span></div>
                        </li>
                    </ul>
                    <div class="chart-grid clearfix">
                        <div class="chart-col" v-for="item in ball_data['data']">
                            <div class="chart-grid-item" v-for="item1 in item"><span :class="'chart-ball '+[item1 == 1 ? 'red':'blue']">{{item1==1?ball_data['text'][0]:ball_data['text'][1]}}</span></div>
                            <div class="chart-grid-item" v-for="bit in (item.length < 6 ? 6-item.length:0)"><span>&nbsp;</span></div>
                        </div>
                        <div class="chart-col" v-for="item in (8-ball_data['data'].length)">
                            <div class="chart-grid-item" v-for="bit in 6"><span>&nbsp;</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- <div class="kd-tab kd-tab-double">
            <ul class="kd-tab-title nostyle clearfix">
                <li class="kd-tab-title-item"><span :class="'kd-tab-title-item-text ' + [sel_msg==0 ? 'active' : '']" @click="sel_msg=0">两面长龙</span></li>
                <li class="kd-tab-title-item"><span :class="'kd-tab-title-item-text ' + [sel_msg==1 ? 'active' : '']" @click="sel_msg=1">最近交易</span></li>
            </ul>
            <div class="kd-tab-panel">
                <div class="chart-list-empty">没有数据！</div>
            </div>
            <div class="kd-tab-panel" style="display: none;">
                <div class="chart-list-empty">没有数据！</div>
            </div>
       </div> -->
    </main>
  </div>
</template>
<script>
  export default{
    name: 'trend',
    mounted(){
      this.lottery_id = this.$route.params.id;
      if(this.lottery_id > 52 || this.lottery_id < 1){
        this.$toast({message:'暂未开放',icon:2});
        this.$router.back();
      }
      this.getLottery(this.$route.params.id);
      this.timeDesc();
    },
    destroyed(){
      clearTimeout(this.stop);
    },
    data () {
      return {
        //页面显示数据
        data_sel:[

        ],
        //彩票id
        lottery_id:'',
        //定时开关
        stop:'',
        //最新倒计时与期数
        now_time:0,
        now_expect:0,
        //等待设置
        open_wait:['开','奖','中'],
        //彩票类型 0普通 1pk 2六合
        lottery_type:0,
        //展开或者收起
        open:false,
        //循环头第一栏和第二栏
        head_width:[],
        //第一栏切换显示大小单双
        sel_type:0,
        //第二栏切换第几球内容
        sel_ball:0,
        //第二栏切换大小单双
        type_ball:0,
        //第三栏切换两面长龙最近交易
        sel_msg:0,
      }
    },
    computed:{
      ball_data(){
        let _this = this,_arr = [],count = [0,0,0,0],_res = [],rs={};
        rs['data'] = _res;
        rs['count'] = count;
        rs['text'] = _this.type_ball == 0 ? ['单','双'] : ['大','小'];
        if(!_this.data_sel.length){
          return rs;
        }
        for(let i in _this.data_sel){
            if(_this.data_sel[i]['single'][_this.sel_ball] == 1){
              count[0]++;
            }else{
              count[1]++;
            }
            if(_this.data_sel[i]['big'][_this.sel_ball] == 1){
              count[2]++;
            }else{
              count[3]++;
            }
            if(_this.type_ball == 0){
              _arr[i] = _this.data_sel[i]['single'][_this.sel_ball];
            }else{
              _arr[i] = _this.data_sel[i]['big'][_this.sel_ball];
            }
        }
        for(let i in count){
          count[i] = count[i]<10 ? '0'+count[i] : count[i];
        }
        if(!_arr.length){
          return false;
        }
        let tem=[],row=0,col=0;
        for(let i=0,len = _arr.length;i<len;i++){
          tem[col] = _arr[i];
          if(tem[col] != _arr[(i+1)]){
            _res[row] = tem;
            row++;
            col = 0;
            tem = [];
          }else if(tem[col] == _arr[i]){
            col++;
          }
          if(row >= 8){
            break;
          }
        }
        return rs;
      }
    },
    methods:{
      timeDesc(){
        let _this = this;
        _this.now_time--;

        if(_this.now_expect != 0 && _this.data_sel.length && ( (_this.now_time < 0) ||  (_this.now_expect - _this.data_sel[0]['expect'] > 1) ) ){
          if(_this.now_time%3 == 0){
              _this.getLottery();
          }
        }
        _this.stop = setTimeout(_this.timeDesc,1000);
      },

      //请求彩种数据
      getLottery(){
        let _this = this;

        if(_this.lottery_id == '' || isNaN(_this.lottery_id)){
          alert('错误');
          return false;
        }
        _this.$getData({
          // loading:true,
          url:'/api/home/Home/trend',
          type:'post',
          data:{type:_this.lottery_id,expect:_this.data_sel.length ?_this.data_sel[0]['expect'] :0},
          callback:function(res){
             // console.log(res);

            if(res.code > 0){
              _this.$store.state.title = res.name;
              _this.lottery_type = res.type;
              _this.now_time = res.now['time'];
              _this.now_expect = res.now['expect'];
              if(res.data){
                _this.head_width[0] = _this.typeChange(res.data[0]['content'].length);
                _this.head_width[1] = _this.typeChange(res.data[0]['content'].length,2);
                _this.$set(_this,'data_sel',res.data);
              }
            }else if(res.code == -2){
              clearTimeout(_this.stop);
            }else{
            //  _this.$router.push('/');
            }
          }
        });
      },
      typeChange(val,type=1){
        let _this = this;
        let head = ['一','二','三','四','五','六','七','八','九','十','十一','十二'],data='';
        data = head.slice(0,val);

        if(_this.lottery_type == 1){
          data[0] = '冠';
          data[1] = '亚';
        }else if(_this.lottery_type == 2){
          data[6] = '特';
        }
        if(type == 1){
          data.unshift('期数');
        }else{

          for(let i=0,len=data.length;i<len;i++){
            if(_this.lottery_type == 1){

                if(i < 2){
                  data[i] = data[i] + '军';
                }else{
                  data[i] = '第'+ data[i] + '名';
                }
            }else if(_this.lottery_type == 2){

              if(i==6){
                data[i] = '特码';
              }else{
                data[i] = '正码'+ data[i];
              }
            }else{
              data[i] = '第'+ data[i] + '球';
            }
          }
        }
        return data;
      },
    }
  }
</script>
<style scoped>
.chart-grid-item{
  border:1px solid #efefef;
}
</style>
