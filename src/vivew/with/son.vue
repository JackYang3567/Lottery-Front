<template>
  <div id="app" style="height:0;">
    <main :class="['kd-body activities',{'kd-body-jczq':data.state}]">
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange" topPullText="" topDropText="" topLoadingText="加载中" :distanceIndex="1" v-if="Object.keys(data).length > 1">
        <ul class="nostyle kd-list activities" infinite-scroll-distance="10">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
                  <img src="../../assets/images/svg/more.svg">
              </span>
            </div>
            <li class="item">
 							<div class="common_class">
 								<div class="fqr_class">方案类型：</div>
 								<div style="display: inline-block;">{{ data.name }}</div>
 							</div>
 							<div class="common_class">
 								<div class="fqr_class">发起人：</div>
 								<div class="content_class">{{ data.username }}</div>
 								<span class="fqr_class" style="position: absolute;right: 10px;">
 									查看次数：{{ data.num }}
 								</span>
 							</div>
              <div class="common_class">
                <div class="fqr_class">方案总进度:</div>
                <div class="jdt">
                  <x-circle
                    :percent="chat_jd"
                    :stroke-width="7"
                    :trail-width="7"
                    :stroke-color="$store.state.basic.main_color">
                    <span>{{ chat_jd }}%</span>
                  </x-circle>
                </div>
              </div>
              <div align="center">
                <grid :show-lr-borders="false">
                  <grid-item :key="1">
                  <div class="at1" :style="{color:'#121212'}">{{ data.all }}</div>
                  <div class="at3">方案总额</div>
                  </grid-item>
                  <grid-item :key="2">
                  <div class="at1" :style="{color:'#121212'}">{{ data.tc }}%</div>
                  <div class="at3">中奖提成</div>
                  </grid-item>
                  <grid-item :key="3">
                  <div class="at1" :style="{color:'#121212'}">{{ data.zg }}</div>
                  <div class="at3">发起人自购</div>
                  </grid-item>
                  <grid-item :key="4">
                    <div class="at1" :style="{color:'#121212'}">{{ data.bd }}</div>
                    <div class="at3">方案保底</div>
                  </grid-item>
                </grid>
              </div>
              <div class="common_class" style="border-top:none;">
                <div class="fqr_class">方案状态:</div>
                <div class="content_class" :style="'color:' + $store.state.basic.main_color + ';'">{{ data.explain }}</div>
              </div>
              <div class="common_class" style="width:100%;font-size: .9rem;" v-if="data.win > 0">
                <div class="fqr_class">中奖详情:</div><br/><br/>
                  <x-table :full-bordered="false" :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                    <tbody>
                      <tr v-for="item in data.details.split('$')">
                        <td>
                          {{ item }}
                        </td>
                      </tr>
                    </tbody>
                  </x-table>
              </div>
            <div class="common_class" style="width:100%;font-size: .9rem;" v-if="data.type == 35">
                <div class="fqr_class">方案内容详情:</div><br/><br/>
                    <div class="jczq_list" v-for="jczq in data.content.game">
                      <div class="jczq_vs" >{{jczq['vs'][0]}} vs {{jczq['vs'][1]}}</div>
                      <template v-for="jczq1 in jczq['data']">
                        <span class="jczq_vs_sel" v-for="bit in jczq1['data']">
                          {{jczq1['type'] == 'rqspf'? '(让)'+bit[0] : bit[0]}}
                        </span>
                      </template>
                    </div>
                <div class="fqr_class">玩法:</div><br/><br/>
                  <div>
                      <span class="jczq_vs_play" v-for="jcp in data.content.play">{{jcp}}</span>
                  </div>
                    <!-- <div class="jczq_list">
                      <div class="jczq_vs" >{{data.content.game[0]['vs'][0]}} vs {{data.content.game[0]['vs'][1]}}</div>
                      <span class="jczq_vs_sel" >胜</span>
                    </div> -->
                  <!-- <x-table :full-bordered="false" :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                    <tbody>

                    </tbody>
                  </x-table> -->
            </div>
            <template v-else>
 							<div class="common_class" style="width:100%;font-size: .9rem;" >
 								<div class="fqr_class">方案内容详情:</div><br/><br/>
                  <x-table :full-bordered="false" :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                    <tbody>
                      <tr v-for="item in data.content.split(';')">
                        <td>{{ item }}</td>
                      </tr>
                    </tbody>
                  </x-table>
 							</div>
 							<div class="common_class" style="width:100%;font-size: .9rem;">
 								<div class="fqr_class">方案期数详情:</div><br/><br/>
                <x-table :full-bordered="false" :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                  <thead>
                    <tr style="background-color: #F7F7F7">
                      <th>期数</th>
                      <th>开奖情况</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in data.expect">
                      <td>{{ item.expect }}</td>
                      <td>{{ item.code }}</td>
                    </tr>
                  </tbody>
                </x-table>
 							</div>
            </template>
 							<div class="common_class" style="width:100%;font-size: .9rem;">
 								<div class="fqr_class">合买参与详情:</div><br/><br/>
                <x-table :full-bordered="false" :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                  <thead>
                    <tr style="background-color: #F7F7F7">
                      <th>用户</th>
                      <th>参与金额</th>
                      <th>参与时间</th>
                      <th>获得奖金</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in data.gen">
                      <td>{{ item.username.substr(0,3) + '***' }}</td>
                      <td>{{ item.money }}</td>
                      <td>{{ item.create_time }}</td>
                      <td>{{ item.win }}</td>
                    </tr>
                  </tbody>
                </x-table>
 							</div>
 							<div class="common_class" v-if="data.xy">
 								<div class="fqr_class">方案宣传</div>
 								<div class="content_class">{{ data.xy }}</div>
 							</div>
 							<div class="common_class">
 								<div class="fqr_class">发起时间</div>
 								<div class="content_class">{{ data.create_time }}</div>
 							</div>
            </li>
        </ul>
      </mt-loadmore>

      <div align="center" v-else>
	      <mt-spinner type="double-bounce" :color="$store.state.basic.main_color"></mt-spinner>
	    </div>

    </main>

    <div class="bet-form clearfix" style="text-align:center;padding:15px 0;" v-if="data.state">
      <div class="buy_class">
        <div class="item_2" style="line-height: 40px;border-right:1px solid #dcdcdc;" @click="action(-1)">-</div>
        <div style="display: inline-block;"><input type="number" v-model="money" class="attime"></div>
        <div class="item_2" style="line-height: 40px;border-left:1px solid #dcdcdc;" @click="action(1)">+</div>
      </div>
      <div class="buy_action" @click="action(false)" :style="{ backgroundColor:$store.state.basic.main_color }">参与</div>
    </div>

  </div>
</template>

<script>
import { XCircle, Grid, GridItem, XTable } from 'vux';
export default {
  components: { XCircle, Grid, GridItem, XTable },
  mounted(){
    this.loadMore(true);
  },
  data () {
    return {
      loading: false,
      topStatus: 'pull',
      data: {},
      money: 1,
      chat_jd: 0
    }
  },
  methods: {
    loadTop() {
      this.loadMore();
    },
    loadMore(type) {
      if(this.loading) return;
      this.loading = true;
      let _this = this;
      _this.$getData({
        data:{ id: _this.$route.params.id,type: (type?1:0) },
        url:'/api/home/With/details',
        callback: function(res){
           // console.log(res.data.content);return;
          if(res.code){
           _this.$set(_this,'data',res.data);
           _this.$nextTick(()=>{
           		_this.chat_jd = 0;
	    				_this.drawProcess();
	          });
          }
          _this.loading = false;
          _this.allLoaded = true;
          _this.$refs.loadmore.onTopLoaded();
        }
      });
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    action(value){
    	let _this = this;
    	if(value){
    		_this.money += value;
    		if(_this.money < 1){
    			_this.money  = 1;
    		}
    	}else{
    		if(!/^\d+$/.test(_this.money) || _this.money < 1){
    			_this.$total({ message: '参与的金额有误,至少为1',type:2 });
    			_this.money = 1;
    			return;
    		}
    		if(_this.money > (_this.data.all - _this.data.buy)){
    			_this.$total({ message: '参与的金额最多' + (_this.data.all - _this.data.buy),type:2 });
    			_this.money = (_this.data.all - _this.data.buy);
    			return;
    		}
    		_this.$getData({
    			loadding: true,
	        url:'/api/home/With/buy',
	        data:{ id: _this.data.id,value:_this.money,temp:1 },
	        callback: function(res){
	        	_this.$total({ message: res.msg,type: res.code });
	        	_this.$set(_this,'data',res.data);
			      _this.$nextTick(()=>{
		       		_this.chat_jd = 0;
		    			_this.drawProcess();
		        });
	        }
	      });
    	}
    },
    drawProcess() {
      let _this = this;
	    if(this.chat_jd < this.data.jd){
	    	this.chat_jd += 5;
        if(this.chat_jd > this.data.jd){
          this.chat_jd = this.data.jd;
          return;
        }
	    	setTimeout(()=>{
	    		_this.drawProcess();
	    	},50);
	    }
	  }
  }
}
</script>

<style scoped>
  .jczq_vs_play{
    display: inline-block;
    margin:2px;
    padding: 10px 20px;
    font-size: 15px;
    border:1px solid #555 ;
    border-radius: 5px;
  }
  .kd-body-jczq{
    margin-bottom: 50px;
  }
  .jczq_list{
    margin-bottom:5px;
    padding:5px 0;
    border-bottom:1px solid #555;
    /* border-top:1px solid #555; */
  }
  .jczq_vs{
    line-height:30px;
    font-size:20px;
    text-align:center;
  }
  .jczq_vs_sel{
    display: inline-block;
    margin: 2px;
    padding: 10px 20px;
    /* width:20%; */
    background: #ba2636;
    border-radius: 2px;
    color: #fff;
    font-size: 15px;
  }
  .jczq_vs_sel:nth-child(odd)
  {
    background: #ffd200;
  }
  .jdt{
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
  .activities{
    min-height: 450px;
  }
  .common_class{
  	width: 100%;
  	padding: 15px 15px;
  	border-top: #e5e5e5 solid 1px;
  	position: relative;
  }
  .fqr_class{
  	display: inline-block;
  	color: #999;
    font-size: .9rem;
    vertical-align: middle;
  }
  .at1{
  	font-size: 22px;
  }
  .at3{
  	color: #999;
    font-size: .9rem;
    line-height: 20px;
  }
  .content_class{
  	display: inline-block;
  	margin-left:10px;
  	vertical-align: middle;
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
    font-size: 1rem;
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
