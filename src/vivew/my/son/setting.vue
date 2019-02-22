<template>
  <div id="app">
    <!-- <main class="kd-body"> --><br/>
      <form class="kd-form kd-container account-setting">
          <div class="kd-field" v-for="(item,key) in data_sel"><label class="kd-field-title inline">{{item.text}}：</label>
            <div class="kd-switch clearfix" :class="[bet_sel['config'][key] == 1 ? 'checked' : '']" @click="chip(key,'config')">
              <span class="kd-switch-val" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">是</span>
              <span class="kd-switch-space">&nbsp;</span>
              <span class="kd-switch-val" >否</span>
            </div>
          </div>
          <!-- <div class="kd-field"><label class="kd-field-title inline">显示下注金额：</label>
            <div class="kd-switch clearfix checked" >
              <span class="kd-switch-val">是</span>
              <span class="kd-switch-space">&nbsp;</span>
              <span class="kd-switch-val">否</span>
            </div>
          </div>
          <div class="kd-field"><label class="kd-field-title inline">显示下注玩法：</label>
            <div class="kd-switch clearfix checked">
              <span class="kd-switch-val">是</span>
              <span class="kd-switch-space">&nbsp;</span>
              <span class="kd-switch-val">否</span>
            </div>
          </div>
          <div class="kd-field"><label class="kd-field-title inline">开启全局声音：</label>
              <div class="kd-switch clearfix checked">
                <span class="kd-switch-val">是</span>
                <span class="kd-switch-space">&nbsp;</span>
                <span class="kd-switch-val">否</span>
              </div>
          </div>
          <div class="kd-field"><label class="kd-field-title inline">开启背景音乐：</label>
            <div class="kd-switch clearfix checked">
              <span class="kd-switch-val">是</span>
              <span class="kd-switch-space">&nbsp;</span>
              <span class="kd-switch-val">否</span>
            </div>
          </div> -->
          <div class="kd-field"><label class="kd-field-title">快选金额(最多可选3个)：</label>
            <div class="kd-chips">
              <div :class="['kd-chip chip'+key + (bet_sel['chip']['chip' + key] == 1?' checked':'')]"   @click="chip(('chip' + key),'chip')" v-for="(item,key) in bet_chip">
                <i class="icon"></i><span>{{item.text}}</span>
              </div>
              <!-- <div class="kd-chip chip1"><i class="icon"></i><span>100</span></div>
              <div class="kd-chip chip2"><i class="icon"></i><span>500</span></div>
              <div class="kd-chip chip3"><i class="icon"></i><span>1千</span></div>
              <div class="kd-chip chip4"><i class="icon"></i><span>2千</span></div>
              <div class="kd-chip chip5"><i class="icon"></i><span>5千</span></div>
              <div class="kd-chip chip6"><i class="icon"></i><span>1万</span></div> -->
            </div>
          </div>

          <div class="kd-field"><label class="kd-field-title">龙虎百家游戏快选金额设置：</label>
            <div v-for="(item,key) in chess" style="margin:5px 0; ">
              <div :class="'kd-chip kd-chip-qp qp_chip'+key">
                <i class="icon"></i>
                <span>{{ chessNum(key,item) }}</span>
              </div> 设置：<input type="number" v-model="chess[key]" style="width:50%;">
            </div>
          </div>

          <div class="kd-field">
            主题颜色设置：<div class="user-color-sel" :style="{background:'rgb('+color['r']+','+color['g']+','+color['b']+')'}"></div>
            <template v-for="(item,key) in color_list">
              <mt-range style="margin-bottom:5px;" v-model.number="color[key]"
                  :value="parseInt(item['val'])"
                  :min="0"
                  :max="item['max']"
                  :step="1"
                  :bar-height="1">
                  <div slot="end" style="width:20%;">{{item.name}}:{{color[key]}}</div>
              </mt-range>
            </template>
            <mt-radio
              v-model="color['op']"
              :options="options">
            </mt-radio>
          </div>

          <div type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
            <span>保存设置</span>
            <button type="button" @click="saveStorage">Button</button>
          </div>
      </form>

      <!-- <divider> {{demo5}}</divider>
      <checker
      v-model="demo5"
      default-item-class="demo5-item"
      selected-item-class="demo5-item-selected"
      >
        <checker-item v-for="i in [1, 2, 3]" :key="i" :value="i">￥{{i*300}}</checker-item>
      </checker> -->

    <!-- </main> -->
  </div>
</template>
<script>
import { Checker, CheckerItem } from 'vux';
  export default{
    components:{
      Checker, CheckerItem
    },
    mounted(){
      this.getStorage();
    },
    data () {
      return {
        demo5:0,
        //主题颜色设置
        color_list:{
          r:{name:'红',max:255,val:100},
          g:{name:'绿',max:255,val:100},
          b:{name:'蓝',max:255,val:100},
        },
        color:{
          r:0,
          g:0,
          b:0,
          op:'OFF'
        },
        system_color:'',
        demo5:0,
        options:[
          {
            label: '启用设定颜色',
            value: 'ON'
          },
          {
            label: '使用系统默认',
            value: 'OFF'
          },
        ],
        //基础数据
        data_sel:{
          // notice:{text:'接受中奖通知',sel:true},    //中奖通知
          // win_radio:{text:'开启中奖广播',sel:true}, //中奖广播
          // bet_money:{text:'显示下注金额',sel:true}, //下注金额显示
          // bet_play:{text:'显示下注玩法',sel:true},  //下注玩法显示
          all_music:{text:'开启全局音乐',sel:true}, //全局音乐
          // bgm:{text:'开启背景音乐',sel:true},       //背景音乐
        },
        //筹码选择
        bet_chip:[
          {text:'50',sel:false},
          {text:'100',sel:false},
          {text:'500',sel:false},
          {text:'1千',sel:false},
          {text:'2千',sel:false},
          {text:'5千',sel:false},
          {text:'1万',sel:false}
        ],
        chess:[10,100,500,1000,10000],// 棋牌筹码
        //
        bet_sel:{
          config:{
            notice:1,      //中奖通知(未)
            win_radio:1,   //中奖广播(未)
            bet_money:1,   //显示下注筹码(普通投注)
            bet_play:1,    //下注玩法(未)
            all_music:1,   //开启全局音乐
            bgm:1,         //开启背景音乐(未)
          },
          chip:{           //普通筹码

          }
        }
      }
    },
    // filters:{//过滤器

    // },
    // watch:{

    // },
    methods:{

      //设置棋牌筹显示内容调整
      chessNum(key,val){
        if(val!='' && parseInt(val)!=val){
          this.chess[key] = parseInt(val);
          val = parseInt(val);
        }
        if(val > 100000){
          this.$total({ message: '最高10W筹码',type: 2 });
          this.chess[key] = 100000;
          val = 100000;
        }
        if(val < 0 || val == ''){
          val = 0;
        }else if(val >= 10000){
          val = parseInt(val/10000)+'万';
        }else if(val >= 1000){
          val = parseInt(val/1000)+'千';
        }
        return val;
      },
      chip(key,type="config"){//筹码选择
        let _this = this;
        if(_this.bet_sel[type][key]){
          if(type=="chip"){
            _this.$delete(_this.bet_sel[type],key);
          }else{
            _this.$set(_this.bet_sel[type],key,0);
          }
        }else{
          let len = Object.keys(_this.bet_sel['chip']);
          if(type=="chip" && len.length >= 3){
            _this.$total({ message: '筹码最多只能设置三个',type: 2 });
            return false;
          }
          _this.$set(_this.bet_sel[type],key,1);
        }
        //console.log(_this.bet_sel);
      },
      getStorage() {
        let _this = this;
        _this.$getData({
          url:'/api/home/my/userSet',
          callback:function(res){
            if(res){
              _this.system_color = res.system_color;
              _this.$set(_this,'bet_sel', res.bet_sel);
              _this.$set(_this,  'chess', res.chess);
              //传下来数字为字符串 必须转换 否则会报错
              _this.color['r'] = parseInt(res.color['r']);
              _this.color['g'] = parseInt(res.color['g']);
              _this.color['b'] = parseInt(res.color['b']);
              _this.color['op'] = res.color['op'];
              // console.log(typeof(res.color['r']));
              // console.log(typeof(parseInt(res.color['r'])));
              // _this.$set(_this,  'color', res.color);
            }
          }
        });
        // if(localStorage.userConfig != ''){
        //     let _this = this,
        //     initial = JSON.parse(localStorage.userConfig);
        //     console.log(initial);
        //     if(false && initial['config'] != ''){
        //       _this.$set(_this,'bet_sel',initial);
        //     }else{
        //       _this.$getData({
        //         url:'/api/home/my/userSet',
        //         callback:function(res){
        //           console.log(res);
        //         }
        //       });
        //     }
        // }
      },
      saveStorage(){//保存
        let _this = this,
            data = {};
        // 保存数据：localStorage.setItem(key,value);
        // 读取数据：localStorage.getItem(key);
        // 删除单个数据：localStorage.removeItem(key);
        // 删除所有数据：localStorage.clear();
        // 得到某个索引的key：localStorage.key(index);
        //console.log(localStorage);
        if(localStorage){
          //判断设置棋牌筹码
          for(let i in _this.chess){
            if(_this.chess[i] == '' || _this.chess[i] <= 0){
              _this.$total( { message: '请设置正确的筹码,最小为1',type: 2 } );
              return;
            }
          }

          if(this.$store.state.login){
              data['backstage'] = {
                notice:_this.bet_sel['config']['notice'] ,
                win_radio:_this.bet_sel['config']['win_radio'],
                bet_money:_this.bet_sel['config']['bet_money'],
                bet_play:_this.bet_sel['config']['bet_play'],
              };
              data['reception'] = {
                all_music:_this.bet_sel['config']['all_music'],
                bgm:_this.bet_sel['config']['bgm'],
                chip:_this.bet_sel['chip'],
                chess:_this.chess,
                color:_this.color,
              };

              _this.$getData({
                loading:true,
                url:'/api/home/my/setting',
                type:'post',
                data:data,
                callback:function(res){
                  _this.$total( { message: res.msg,type: res.code } );
                  if(res.code > 0){
                    if(_this.color['op'] == 'ON'){
                      _this.$store.state.basic.main_color = 'rgb('+_this.color['r']+','+_this.color['g']+','+_this.color['b']+')';
                    }else{
                      _this.$store.state.basic.main_color = _this.system_color;
                    }
                    localStorage.removeItem('userConfig');
                    localStorage.setItem( 'userConfig',JSON.stringify(_this.bet_sel) );
                  }
                }
              });
          }else{
            this.$total({ message: '未登录',type: 2 });
            this.$router.push('/in');
          }
        }else{
         alert('不支持本地存储,此功能无效');
        }
      }
    }
  }
</script>
<style scoped>

.user-color-sel{
  width: 100%;
  height:30px;
  border-radius: 5px;
}
.kd-chip-qp{
    height: 40px;
    width: 40px;
}
  .qp_chip0{
    box-shadow: 0 1px 0 #117884;
    border: 1px solid #006773;
    color:#000;
  }
  .qp_chip0 span{
    border: 1px solid #006773;
  }
  .qp_chip0:before,.qp_chip0:after,.qp_chip0 i:after,.qp_chip0 i:before{
    background-color:#006773;
  }

  .qp_chip1{
    box-shadow: 0 1px 0 #378411;
    border: 1px solid #267300;
    color:#000;
  }
  .qp_chip1 span{
    border: 1px solid #267300;
  }
  .qp_chip1:before,.qp_chip1:after,.qp_chip1 i:after,.qp_chip1 i:before{
    background-color:#267300;
  }

  .qp_chip2{
    box-shadow: 0 1px 0 #113784;
    border: 1px solid #002673;
    color:#000;
  }
  .qp_chip2 span{
    border: 1px solid #002673;
  }
  .qp_chip2:before,.qp_chip2:after,.qp_chip2 i:after,.qp_chip2 i:before{
    background-color:#002673;
  }

  .qp_chip3{
    box-shadow: 0 1px 0 #841c48;
    border: 1px solid #730b37;
    color:#000;
  }
  .qp_chip3 span{
    border: 1px solid #730b37;
  }
  .qp_chip3:before,.qp_chip3:after,.qp_chip3 i:after,.qp_chip3 i:before{
    background-color:#730b37;
  }

  .qp_chip4{
    box-shadow: 0 1px 0 #323232;
    border: 1px solid #212121;
    color:#000;
  }
  .qp_chip4 span{
    border: 1px solid #212121;
  }
  .qp_chip4:before,.qp_chip4:after,.qp_chip4 i:after,.qp_chip4 i:before{
    background-color:#212121;
  }

</style>
