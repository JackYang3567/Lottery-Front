<template>
  <div id="app" style="height:0;"> <!-- position:relative; -->
    <main class="kd-body activities">
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange" topPullText="" topDropText="" topLoadingText="加载中" :distanceIndex="1">
        <ul class="nostyle kd-list activities" v-infinite-scroll="loadMore" infinite-scroll-disabled="dataOver" infinite-scroll-distance="10">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
                  <img src="../../assets/images/svg/more.svg">
              </span>
            </div>

            <li class="item" v-for="(item,key) in data">
              <a :href="'#/with-son/'+item.id" class="activity-box">
              	<div class="item_main">
	              	<div class="common_class">
	              		<p class="lottery_name">{{ item.name }}</p>
                    <div class="jdt">
                      <x-circle
                        :percent="item.jd"
                        :stroke-width="7"
                        :trail-width="7"
                        :stroke-color="($store.state.basic.main_color ?  $store.state.basic.main_color : '#ff1111')">
                        <span>{{ item.jd }}%</span>
                      </x-circle>
                    </div>
	              	</div>
	              	<div class="common_class item_1">
	              		<p>发起人：{{ item.username }}</p>
	              		<div class="item_1">
	              				{{ item.all }}
	              				<div style="float:right;margin-right:20px;">{{ item.bd }}</div>
	              		</div>
	              		<div style="margin-top: 7px;">
	              				总金额
	              				<div style="float:right;margin-right:20px;">保底</div>
	              		</div>
	              	</div>
	              	<div class="common_class item_1">
	              		<p><span v-if="item.win==0">状态:</span>{{ item.explain }}</p>
	              		<p class="item_1">{{ item.all - item.buy }}</p>
	              		<p style="margin-top: 7px;">剩余</p>
	              	</div>
              	</div>
              	<div align="right" @click.stop.prevent="" v-if="item.state" style="padding-right:40px;">
  	              	<div class="buy_class">
  	              		<div class="item_2" style="line-height: 40px;border-right:1px solid #dcdcdc;" @click="action(key,-1)">-</div>
  	              		<div style="display: inline-block;"><input type="number" value="1" class="attime" :id="'is'+key"></div>
  	              		<div class="item_2" style="line-height: 40px;border-left:1px solid #dcdcdc;" @click="action(key,1)">+</div>
  	              	</div>
  	              	<div class="buy_action" @click="action(key)" align="center" :style="{ backgroundColor:$store.state.basic.main_color }">参与</div>
              	</div>
              </a>
            </li>

            <li class="more_loading" style="text-align:center;">
              <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color" v-show="!dataOver"></mt-spinner>
              <span style="color:#bfbfbf" v-show="dataOver">—— 没有更多数据了 ——</span>
            </li>
        </ul>
      </mt-loadmore>
    </main>
  </div>
</template>

<script>
import { XCircle } from 'vux';
export default {
  components: { XCircle },
  created(){
    this.initialization();
  },
  data () {
    return {
      loading: false,
      topStatus: 'pull',
      dataOver: false,
      page: 1,
      data:[],
      form: {
      	value: 1,
      	key: 0
      }
    }
  },
  methods: {
    initialization(){
      let _this = this;
      if(0 && this.$route.path in this.$store.state.all_chat){
        this.data = this.$store.state.all_chat[this.$route.path]['list'];
        this.page = this.$store.state.all_chat[this.$route.path]['page'];
      }
      this.loadMore();
    },
    loadTop() {
      if(this.loading) return;
      this.loading = true;
      let _this = this;
      _this.$getData({
        data:{ is_id: (_this.data.length ? _this.data[0].id : 0) },
        url:'/api/home/With/getInfo',
        callback: function(res){
          if(res.data.length){
           _this.$set(_this,'data',res.data);
           //_this.$set(_this,'data',res.data.concat(_this.data));
           //_this.$store.state.all_chat[_this.$route.path] = { list:_this.data,page:_this.page };
          }
          //_this.$total({message:'获得'+res.data.length+'条最新合买',duration:1000});
          _this.loading = false;
          _this.allLoaded = true;
          _this.$refs.loadmore.onTopLoaded();
        }
      });
    },
    loadMore() {
      if(this.loading) return;
      this.loading = true;
      let _this = this;
      _this.$getData({
        data:{ page:_this.page },
        url:'/api/home/With/getInfo',
        callback: function(res){
          if(res.data.length){
           _this.$set(_this,'data',_this.data.concat(res.data));
           _this.page = parseInt(res.current_page) + 1;
           // _this.$store.state.all_chat[_this.$route.path] = { list:_this.data,page:_this.page };
          }
          if(res.data.length < res.per_page){
            _this.$set(_this,'dataOver',true);
          }
          _this.loading = false;
        }
      });
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    action(key,value){
    	let _obj = document.getElementById('is'+key);
    	if(value){
    		_obj.value = parseInt(_obj.value) + value;
    		if(_obj.value < 1){
    			_obj.value  = 1;
    		}
    	}else{
    		let _this = this;
    		if(!/^\d+$/.test(_obj.value) || _obj.value < 1){
    			_this.$total({ message: '参与的金额有误,至少为1',duration:1000,type: 2 });
    			_obj.value = 1;
    			return;
    		}
    		if(_obj.value > (_this.data[key].all - _this.data[key].buy)){
    			_this.$total({ message: '参与的金额最多' + (_this.data[key].all - _this.data[key].buy),duration:1000,type: 2 });
    			_obj.value = (_this.data[key].all - _this.data[key].buy);
    			return;
    		}
    		_this.$getData({
    			loadding: true,
	        url:'/api/home/With/buy',
	        data:{ id: _this.data[key].id,value:_obj.value,temp:0 },
	        callback: function(res){
	        	_this.$total({ message: res.msg,duration:1000,type:res.code });
	        	('data' in res) && (_this.$set(_this.data,key,res.data));
	        }
	      });

    	}
    }
  }
}
</script>

<style scoped>
  .activities{
    min-height: 450px;
  }
  .common_class{
  	display: inline-block;
  	width: 32%;
  	height: 100%;
  	vertical-align: middle;
  	text-align: center;
  }
  .item_main{
  	width: 100%;
  	height: 89px;
  }
  .jdt{
		width:70px;
    height:70px;
		margin: 0 auto;
		margin-top: 7px;
	}
	.activity-box{
		padding: 10px 0;
	}
	.item_1{
		padding-top: 15px;
		text-align: left;
  	font-size: .9rem;
	}
	.buy_class{
  	display: inline-block;
		text-align: center;
		border: 1px solid #dcdcdc;
		width: 141px;
		height: 40px;
		margin: 0 auto;
  	vertical-align: middle;
	}
	.attime{
		width: 50px;
		border: none;
		text-align: center;
  	vertical-align: middle;
	}
	.item_2{
  	display: inline-block;
  	text-align: center;
  	font-size: 30px;
  	width: 40px;
  	vertical-align: middle;
	}
	.buy_action{
  	display: inline-block;
		margin-left: 10px;
		width: 50px;
		color: #ffffff;
		border-radius: 4px;
		background-color: #02aecb;
  	vertical-align: middle;
		height: 40px;
		line-height: 40px;
	}
</style>
