<template>
  <div id="app">
    <main class="kd-body">
        <div class="page-lucky__header">
          <a class="page-lucky__button page-lucky__button--back" @click="$router.back()"></a>
          <a href="#/My/lu_record" class="page-lucky__button page-lucky__button--record">抽奖记录</a>
        </div>
        <div class="page-lucky__container">
            <div class="wheel">
                <p class="wheel__header">
                  <span v-if="$store.state.user" class="page-lucky__button page-lucky__button--wheel">还剩 <i class="wheel__times">{{rotate_num}}</i> 次机会</span>
                  <span v-else class="page-lucky__button page-lucky__button--wheel" @click="$router.push('/in')">点击此处登录抽奖</span>
                  <br /><span class="page-lucky__button page-lucky__button--wheel" style="margin-top:5px;" @click="explain = true" >抽奖说明</span>
                </p>

                <div class="wheel__main">
                    <div class="wheel__body" >
                        <div class="wheel__inner" :style="{transform: 'rotate('+ rotate +'turn)'}">
                            <div class="wheel__part" v-for="(item,key) in prize" :style="{transform: 'rotate('+((-(1/prize.length)/2)+key * (1/prize.length)) + 'turn)'+' '+'skewY('+percent[prize.length]+'turn)'}"></div>
                            <!-- <div class="wheel__part" style="transform: rotate(0.0625turn) skewY(0.375turn);"></div>
                            <div class="wheel__part" style="transform: rotate(0.1875turn) skewY(0.375turn);"></div>
                            <div class="wheel__part" style="transform: rotate(0.3125turn) skewY(0.375turn);"></div>
                            <div class="wheel__part" style="transform: rotate(0.4375turn) skewY(0.375turn);"></div>
                            <div class="wheel__part" style="transform: rotate(0.5625turn) skewY(0.375turn);"></div>
                            <div class="wheel__part" style="transform: rotate(0.6875turn) skewY(0.375turn);"></div>
                            <div class="wheel__part" style="transform: rotate(0.8125turn) skewY(0.375turn);"></div> -->
                            <!-- <canvas class="wheel__part wheel__cavs" width="10px" height="10px" style="border: 1px solid red;">  您的浏览器不支持canvas标签。</canvas> -->
                            <div class="wheel__prize" :style="{transform:'rotate('+key * (1/prize.length)+'turn)'}" v-for="(item,key) in prize">
                                <figure class="wheel__prize-item">
                                    <figcaption>{{item.text}}</figcaption> <img src="" class="wheel__prize-img">
                                </figure>
                            </div>
                            <!-- <div class="wheel__prize" style="transform: rotate(0.125turn);">
                                <figure class="wheel__prize-item">
                                    <figcaption>一等奖</figcaption> <img src="" class="wheel__prize-img"></figure>
                            </div>
                            <div class="wheel__prize" style="transform: rotate(0.25turn);">
                                <figure class="wheel__prize-item">
                                    <figcaption>二等奖</figcaption> <img src="" class="wheel__prize-img"></figure>
                            </div>
                            <div class="wheel__prize" style="transform: rotate(0.375turn);">
                                <figure class="wheel__prize-item">
                                    <figcaption>三等奖</figcaption> <img src="" class="wheel__prize-img"></figure>
                            </div>
                            <div class="wheel__prize" style="transform: rotate(0.5turn);">
                                <figure class="wheel__prize-item">
                                    <figcaption>四等奖</figcaption> <img src="" class="wheel__prize-img"></figure>
                            </div>
                            <div class="wheel__prize" style="transform: rotate(0.625turn);">
                                <figure class="wheel__prize-item">
                                    <figcaption>五等奖</figcaption> <img src="" class="wheel__prize-img"></figure>
                            </div>
                            <div class="wheel__prize" style="transform: rotate(0.75turn);">
                                <figure class="wheel__prize-item">
                                    <figcaption>幸运奖</figcaption> <img src="" class="wheel__prize-img"></figure>
                            </div>
                            <div class="wheel__prize" style="transform: rotate(0.875turn);">
                                <figure class="wheel__prize-item">
                                    <figcaption>参与奖</figcaption> <img src="" class="wheel__prize-img"></figure>
                            </div> -->

                        </div>
                          <img src="../../../assets/images/lucky-wheel-pointer.png" class="wheel__pointer" >
                          <a href="javascript:;" class="wheel__start" @click="getData(2)"></a>
                      </div>

                    <div class="wheel__lights">
                        <div class="wheel__light" style="transform: rotate(0.0294118turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.0588235turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.0882353turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.117647turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.147059turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.176471turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.205882turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.235294turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.264706turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.294118turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.323529turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.352941turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.382353turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.411765turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.441176turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.470588turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.5turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.529412turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.558824turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.588235turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.617647turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.647059turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.676471turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.705882turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.735294turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.764706turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.794118turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.823529turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.852941turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.882353turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.911765turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(0.941176turn);"></div>
                        <div class="wheel__light" style="transform: rotate(0.970588turn);"></div>
                        <div class="wheel__light wheel__light--sm" style="transform: rotate(1turn);"></div>
                    </div>
                </div>
            </div>
            <!---->
            <div class="page-lucky__rule"></div>
        </div>
    </main>

    <transition name="bounce2">
       <div class="promptbox-wrapper" v-if="explain && Object.keys(rule)">
          <section class="promptbox prompt-notice" :style="{border:'2px solid '+$store.state.basic.main_color }">
              <div class="prompt-head" :style="{background: $store.state.basic.main_color,borderTop: $store.state.basic.main_color,borderBottom:$store.state.basic.main_color}">抽奖说明</div>
              <div class="prompt-body article-detail" >
                <div style="margin-bottom:20px;" >
                    <span style="line-height:50px;font-size:20px;">
                      1.必须注册为有效会员。<br />
                      2.每次抽奖将会扣除{{rule['use_point']}}积分。 <br />
                      3.累计充值金额达到{{rule['in_money']}}￥。 <br />
                    </span>
                      注：达成以上条件,每天有{{rule['num']}}次,抽奖机会。<br /><br />
                      奖品信息：
                    <table >
                      <tr v-for="item in prize">
                          <td style="text-align:center;">
                            {{item['text']}}
                          </td>
                          <td style="text-align:center;">
                            <span style="color:red;">{{item['money']}}</span>￥
                          </td>
                      </tr>
                    </table>
                </div>
              </div>
              <a href="javascript:;" class="prompt-close kd-close" @click="explain = false">close</a></section>
          <div class="promptbox-overlay" @click="explain = false"></div>
        </div>
    </transition>

  </div>
</template>
<script>
  export default{
    name: 'luck',
    mounted(){
      // this.$store.state.title = '';
      this.getData();
    },
    data () {
      return {
        explain:false,
        prize:[
          {text:'加载中...'},
          {text:'加载中...'},
          {text:'加载中...'},
          {text:'加载中...'},
          {text:'加载中...'},
          {text:'加载中...'},
          {text:'加载中...'},
          {text:'加载中...'},
        ],
        percent:{
          '3':0.084,
          '4':0,
          '5':0.45,
          '6':0.418,
          '7':0.392,
          '8':0.375,
          '9':0.362,
          '10':0.35,
          '11':0.342,
          '12':0.335,
          '13':0.327,
          '14':0.322,
          '15':0.317,
          '16':0.313,
        },
        //抽奖规则
        rule:{},
        //转盘默认旋转的圈数
        rotate:0,
        //转盘可否点击
        rotate_on:true,
        //可抽奖次数
        rotate_num:0,
      }
    },
    methods:{
      gameOn(reward){//点击游戏开始 reward 为奖励
        let _this = this,data,correct = 0;
        if(!_this.rotate_on){
          this.$total({ message: '正在抽奖,请稍后',type: 2 });
          return false;
        }
        //   模拟随机计算出奖励
        data = _this.prize.length  - reward;//Math.floor(Math.random()*_this.prize.length);
        //   度数补正 保证转盘正确
        correct = 1 - (_this.rotate%1);
        //   转盘点击关闭
        _this.rotate_on = false;
        //   开始转盘
        _this.rotate += (4+(data * (1/_this.prize.length) ) + correct);
        //  console.log(data);
        setTimeout(function(){
            if(data > 0 && data < _this.prize.length){
              alert('恭喜您中了'+_this.prize[parseInt(_this.prize.length) - parseInt(data)]['text']);
            }else{
              alert('感谢参与');
            }
            _this.rotate_on = true;
          },6000);
      },
      getData(_type=1){
        let _this = this;
        _this.$getData({
          url:'/api/home/in/luck',
          type:'post',
          data:{type:_type},
          callback:function(res){

            if(_type == 1 && res.data != ''){
              _this.$set(_this,'prize',res.data);
              _this.$set(_this,'rule',res.rule);
            }else if(_type == 2 && res.code > 0){
              _this.gameOn(res.data);
            }

            _this.rotate_num = res.num;
            if(_type == 2 && res.code == -2){
              _this.$router.push('/in');
              _this.$total({ message: res.msg,type: 0 });
            }if(res.code == -1){
              _this.$total({ message: res.msg,type: 0 });
              _this.$router.back();
            }else if(_type == -2 && res.code < 0){
              _this.$total({ message: res.msg,type: 0 });
            }else if(res.code != 1){
              _this.$total({ message: res.msg,type: 0 });
            }

          }
        });
      }
    }
  }
</script>
<style scoped>

</style>
