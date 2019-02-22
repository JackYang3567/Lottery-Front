<template>
  <div id="app">

    <Lottery :select_data="data"></Lottery>

    <transition name="bounce2">
      <div class="promptbox-wrapper prompt-select-balls prompt-select-balls-tjssc" v-show="layer">
        <section class="promptbox" :style="{border: '2px solid ' + $store.state.basic.main_color}">
          <div class="prompt-head" :style="styleTool(true)">{{ betting_name }}({{ zhushu }}注)</div>
          <div class="prompt-body">
            <ul class="nostyle lottery-balls-list" v-for="key in betting_line">
              <li :class="['lottery-ball sd115',{'solid': arrayIndexOf(betting_data[key-1],value)>-1 || (isOk()[1] && arrayIndexOf(data.betting_all[betting_type1][betting_type]['code'][key-1],value) > -1)}]" v-for="value in 11" @click="select(key-1,value)">{{ value }}</li>
              <li>
                <div class="is_button" :style="styleTool(true)" @click.stop="allSelect(key-1)">
                全选/清
                </div>
              </li>
            </ul>
          </div>
          <div class="prompt-foot">
            <div type="button" :class="['kd-button main-button',{'disabled':zhushu<1}]" @click="selectAction" :style="styleTool_2(true)">确 定</div>
            <div type="button" class="kd-button" @click="closeSelect" :style="styleTool_2(true)">取 消</div>
          </div>
          <div class="prompt-close kd-close" @click="layer=false">close</div>
        </section>
        <div class="promptbox-overlay"></div>
      </div>
    </transition>

  </div>
</template>

<script>
import Lottery from '../common/Lottery';
  export default{
    components:{ Lottery },
    data () {
      return {
        data: {
          alert_select: ['bzwf'],
          betting_all: {},
          single_select: {
            x: 'da',da: 'x',dan: 's',s: 'dan'
          },
          betting_url: 'Lottery_X'
        },
        zhushu: 0,
        betting_data: [[],[],[]],
        layer: false,
        betting_name: '',
        betting_line: 0,
        betting_type: '',
        betting_type1: ''
      }
    },
    methods: {
      styleTool(value){
        let _data = {};
        if(value){
          _data.background = this.$store.state.basic.main_color;
        }
        return _data;
      },
      styleTool_2(value){
        let _data = {};
        if(value){
          _data.background = this.$store.state.basic.main_color;
          _data.border = '1px solid ' + this.$store.state.basic.main_color;
        }
        return _data;
      },
      isOk(){
        return [(this.betting_type1 in this.data.betting_all),(this.betting_type1 in this.data.betting_all && this.betting_type in this.data.betting_all[this.betting_type1])];
      },
      allSelect(key){
        let _value = [1,2,3,4,5,6,7,8,9,10,11];
        if(this.betting_data[key].length > 0){
          _value = [];
        }
        this.$set(this.betting_data,key,_value);
        this.calculation();
      },
      betting(data,key1,key2,betting_all){
        this.data.betting_all = betting_all;
        this.layer = true;
        this.betting_name = data.name;
        this.betting_type1 = key1;
        this.betting_type = key2;
        if(this.isOk()[1]){
          this.betting_data = betting_all[key1][key2].code;
          this.zhushu = betting_all[key1][key2].num;
        }else{
          this.zhushu = 0;
          this.betting_data = [[],[],[]];
        }
        if(/^前一|^任选/.test(data.name)){
          this.betting_line = 1;
        }
        else if(/^前二/.test(data.name)){
          this.betting_line = 2;
        }else if(/^前三/.test(data.name)){
          this.betting_line = 3;
        }
        else{
          this.betting_line = 0;
        }
      },
      arrayIndexOf (arr,obj) {
        if(arr){
          for (let i = 0,ii = arr.length; i < ii; i++) {
            if (arr[i] == obj) {
              return i;
            }
          }
        }
        return -1;
      },
      select(key,value){
        let _key = this.arrayIndexOf(this.betting_data[key],value),betting_chat = [];
        if(_key > -1){
          this.betting_data[key].splice(_key,1);
        }else{
          this.betting_data[key].push(value);
        }
        this.calculation();
      },
      calculation(){
        let _this = this,betting_type_chat;
        switch (_this.betting_type) {
          case 'rx1':
            betting_type_chat = 'q1zx';
            break;
          case 'rx2':
          case 'rx3':
          case 'rx4':
          case 'rx5':
          case 'rx6':
          case 'rx7':
          case 'rx8':
            betting_type_chat = 'rx';
            break;
          default:
            betting_type_chat = _this.betting_type;
        }
        // 计算投注注数
        let action_zhushu = {
            q1zx(){
              _this.zhushu = _this.betting_data[0].length;
            },
            q2zx(){
              _this.zhushu = 0;
              let [ len0,len1 ] = [ _this.betting_data[0].length,_this.betting_data[1].length ];
              if(len0 < 1 || len1 < 1){
                return;
              }
              let is_zs = 0;
              for (let i = 0; i < len0; i++){
                for (let k = 0; k < len1; k++){
                  if(_this.betting_data[0][i] != _this.betting_data[1][k]){
                    is_zs++;
                  }
                }
              }
              _this.zhushu = is_zs;
            },
            q3zx(){
              _this.zhushu = 0;
              let [ len0,len1,len2 ] = [ _this.betting_data[0].length,_this.betting_data[1].length,_this.betting_data[2].length ];
              if(len0 < 1 || len1 < 1 || len2 < 1){
                return;
              }
              let is_zs = 0;
              for(let i = 0; i < len0; i++){
                for (let k = 0; k < len1; k++){
                   for (let n = 0; n < len2; n++){
                    if(_this.betting_data[0][i] != _this.betting_data[2][n] && _this.betting_data[1][k] != _this.betting_data[2][n] && _this.betting_data[0][i] != _this.betting_data[1][k]){
                      is_zs++;
                    }
                  }
                }
              }
              _this.zhushu = is_zs;
            },
            rx(){
              let code_type = _this.betting_type.match(/\d{1}$/);
              if(code_type){
                _this.zhushu = action_zhushu.combinationBasic(_this.betting_data[0].length,code_type);
              }else{
                _this.zhushu = 0;
              }
            },
            combinationBasic(n,m){
            	let n1 = 1,n2 = 1;
            	for (let i = n,j = 1; j <= m; n1 *= i--,n2 *= j++);
            	return n1 / n2;
            }
        };
        if(betting_type_chat in action_zhushu){
          action_zhushu[betting_type_chat]();
          if(_this.zhushu > 0){
            if(!this.isOk()[0]){
              _this.data.betting_all[_this.betting_type1] = {};
            }
            _this.data.betting_all[_this.betting_type1][_this.betting_type] = {
              code: (() => {
                let array_chat = [];
                for(let i = 0,j = _this.betting_data.length;i<j;i++){
                  if(_this.betting_data[i].length > 0){
                    array_chat[i] = _this.betting_data[i];
                  }
                }
                return array_chat;
              })(),
              num: _this.zhushu
            }
          }else{
            this.deleteData();
          }
          _this.setData();
        }
      },
      selectAction(){
        if(this.zhushu < 1){
          this.$total({ message:'请您至少选择一注',duration:1500,type: 2 });
        }else{
          this.layer = false;
        }
      },
      closeSelect(){
        this.layer = false;
        this.deleteData();
        this.setData();
      },
      deleteData(){
        if(this.isOk()[0]){
          if(this.isOk()[1]){
            delete this.data.betting_all[this.betting_type1][this.betting_type];
          }
          if(Object.keys(this.data.betting_all[this.betting_type1]).length < 1){
            delete this.data.betting_all[this.betting_type1];
          }
        }
      },
      setData(){
        let betting_chat = {};
        for(let _i in this.data.betting_all){
          betting_chat[_i] = this.data.betting_all[_i];
        }
        this.$set(this.data,'betting_all',betting_chat);
      }
    }
  }
</script>

<style scoped>
  .is_button{
    background-color: #01beb8;
    border-radius: 2px;
    width: 50px;
    padding: 3px;
    margin: 3px auto;
    color: #fff;
  }
</style>