<template>
  <div id="app" style="height:0;">
<transition name="bounce2">
        <section class="game-list-wrapper pcdd-game-chart-wrapper"  v-if="$store.state.trend_pc">
        <h2 class="page-title">走势图<a href="javascript:;" class="close-button" @click="$store.state.trend_pc = false"><i class="icon icon-times"></i></a></h2>



        <div class="pcdd-game-chart-body kd-scrollable">
          <mt-loadmore :top-method="loadTop"  @top-status-change="handleTopChange"  :auto-fill="false" ref="loadmore" >
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
                  <img src="../../../assets/images/svg/more.svg">
              </span>
            </div>

            <table class="pcdd-game-chart" :infinite-scroll-disabled="buttom_load[0]" v-infinite-scroll="loadBottom" infinite-scroll-distance="5">
                <tr>
                    <th>期号</th>
                    <th>值</th>
                    <th>大</th>
                    <th>小</th>
                    <th>单</th>
                    <th>双</th>
                    <th>大单</th>
                    <th>小单</th>
                    <th>大双</th>
                    <th>小双</th>
                </tr>
                <tr v-for="item in data_sel" v-if="data_sel.length">
                    <td>{{item.expect}}</td>
                    <td>{{item.plus}}</td>
                    <td v-for="(value,key) in bit"><span :class="'lottery-prop '+ [item.list.indexOf(key) > -1?value[1]:'']">{{ item.list.indexOf(key) > -1 ? value[0] :''}}</span></td>
                </tr>
            </table>
          </mt-loadmore>
          <div class="chart-load-more"><a href="javascript:;">{{buttom_load[1]}}</a></div>
        </div>
      </section>
  </transition>

  </div>

</template>
<script>
  export default{
    name: 'trendPc',
    mounted(){
     this.getData();
    },
    data () {
      return {
        data_sel:[],
        page:1,
        all_page:1,
        bit:{
          'a' :['大','odd-even'],
          'b' :['小','large-small'],
          'c' :['单','odd-even'],
          'd' :['双','large-small'],
          'ac':['大单','odd-even both'],
          'bc':['小单','large-small both'],
          'ad':['大双','odd-even both'],
          'bd':['小双','large-small both'],
        },
        topStatus:'',
      }
    },
    computed:{
      list(){
        if(this.$store.state.trend_pc && !this.data_sel.length){
              this.getData();
        }
      },
      buttom_load(){
        if(this.page < this.all_page){
          return [true,'加载更多...'];
        }else{
          return [false,'已全部加载'];
        }
      }
    },
    watch:{
      $route(){
        $store.state.trend_pc = false;
      }
    },
    methods:{
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop(id) {
        //下拉执行
        var _this = this;
        _this.page = 1;
        _this.getData();
        // document.body.scrollTop = 0;
        _this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){
        //滑动到底部更新
        let _this = this;
        if(_this.page >= _this.all_page){
          return false;
        }
        _this.page +=1;
        _this.getData();
      },
      getData(){
        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/Home/home/trendPc',
          type:'post',
          data:{id:this.$route.params.id,page:_this.page},
          callback:function(res){
            if(res.data){
              if(_this.page == 1){
                _this.$set(_this,'data_sel',res.data);
                _this.all_page = res.last_page;
              }else{
                _this.$set(_this,'data_sel',_this.data_sel.concat(res.data));
              }
            }
          }
        });
      }
    }
  }
</script>
<style scoped>
</style>
