<template>
  <div id="app">
    <table class="kd-container downline-members-list">
        <tr>
            <th>下线层级</th>
            <th>下线数量</th>
            <th>{{note}}打码量</th>
        </tr>
        <tr v-for="item in get">
          <td>{{item.level}}</td>
          <td @click="details(item.level,item.count)">{{item.count}} {{item.count == 0 ? '':'(查看)'}}</td>
          <td>{{item.money}}</td>
        </tr>
        <tr>
            <td colspan="3" class="continue">
              我要赚更多，<a href="#/My/promotion/" class="">努力继续推广</a>
            </td>

        </tr>
    </table>

    <group>
      <datetime v-model="time" clear-text="年-月-日" placeholder="默认当前时间" confirm-text="查询" :format="format"  :min-year="2015" title="选择查看时间"></datetime>
    </group>
    <!-- u_det.length  false-->
    <template v-if="u_det.length">
      <div style="text-align:center;margin:10px 0;"> 以下为({{list_level}}级会员)详细信息 </div>
      <table class="kd-container downline-members-list">
          <tr>
              <th>用户名</th>
              <th>最近登录</th>
              <th>{{note}}打码量</th>
          </tr>
          <tr v-for="item in u_det">
            <td>{{item.username}}</td>
            <td>{{item.line}}</td>
            <td>{{item.bet}}</td>
          </tr>
      </table>
    </template>

  </div>
</template>

<script>
  import { Group,Datetime,XTable,LoadMore   } from 'vux';
  export default{
    name: 'details_user',
    components:{
      Datetime,Group
    },
    mounted(){
      let _this = this;
      _this.$store.state.title="推广用户";
      _this.dataUser();
      _this.noteConfig();
    },
    data () {
      return {
        get:[
          {level:1,count:0,money:0},
          {level:2,count:0,money:0},
          {level:3,count:0,money:0},
        ],
        note:'今日',
        time:'',
        //用户详细内容
        u_det:[],
        list_level:1,
        //格式
        format:'YYYY-MM-DD'
      }
    },
    watch:{
      time(){
        this.noteConfig();
      }
    },
    methods:{
      //查询下级详细的信息
      details(val,num){
        // return;
        if(num <= 0){_this.$total({ message: '加油努力推广才能查看',type: res.code }); return;}
        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/home/my/exList',
          type:'post',
          data:{type:val,time:_this.time},
          callback:function(res){
            if(res){
              _this.list_level = val;
              _this.$set(_this,'u_det',res);
            }else{
              _this.u_det = [];
            }
          }
        });
      },
      noteConfig(){
        if(this.time == ''){
          return;
        }
        let set = Date.parse(this.time + ' 00:00:00') ,now=new Date(new Date().toLocaleDateString()).getTime();
        if(now == set){
          this.note = '今日';
        }else{
          this.note = this.time;
        }
        this.dataUser();
      },
      dataUser(){
        let _this = this;
        let _time = _this.time;//parseInt(Date.parse(_this.time)/1000);
        _this.$getData({
          loading:true,
          url:'/api/home/my/extension',
          data:{type:2,time:_time},
          type:'post',
          callback:function(res){
            if(res.code == -1){
              _this.$total({ message: res.msg,type: res.code });
              _this.$router.push('/my');
            }
            if(res && res.code == 1){
             _this.$set(_this,'get',res.data);
             _this.u_det = [];
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
</style>
