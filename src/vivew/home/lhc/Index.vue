<template>
  <div id="app">

    <Lottery :select_data="data"></Lottery>

    <transition name="bounce2">
      <div class="promptbox-wrapper prompt-select-balls prompt-select-balls-tjssc" v-show="layer">
        <section class="promptbox" :style="{border: '2px solid ' + $store.state.basic.main_color}">
          <div class="prompt-head" :style="styleTool(true)">{{ betting_name }}({{ zhushu }}注)</div>

          <div class="prompt-body">
            <ul class="nostyle lottery-balls-list">
              <li :class="['lottery-ball marksix ' + codeType(item),{'solid': arrayIndexOf(betting_data,(betting_type1 == 'ptw' ? (item - 1) : item))>-1 || (isOk()[1] && arrayIndexOf(data.betting_all[betting_type1][betting_type]['code'],(betting_type1 == 'ptw' ? (item - 1) : item)) > -1)}]" v-for="item in forData" @click="select((betting_type1 == 'ptw' ? (item - 1) : item))"> {{ (betting_type1 == 'ptw' ? (item - 1) : item) }}
              </li>
            </ul>
          </div>

          <div class="prompt-foot">
            <p v-if="betting_type1 == 'ptx' && Object.keys(lo_data).length" class="has-special-odds">注：本命 - 赔率({{$route.params.id == 21 ? lo_data['oddsb'][disc] : lo_data['oddsb'] }})</p>
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
import Lottery from './Lottery';
  export default{
    components:{ Lottery },
    data () {
      return {
        data: {
          alert_select: ['pm','dxzt','ptx','ptw','ptbz'],
          betting_all: {},
          single_select: {
            x:'da',da: 'x',dan: 's',s: 'dan',jx:'yx',yx:'jx',tx:'dx',dx:'tx',
            hd:'hx',hx:'hd',hdan:'hs',hs:'hdan',ld:'lx',lx:'ld',ldan:'ls',ls:'ldan',
            nd:'nx',nx:'nd',ndan:'ns',ns:'ndan',rdd:'rds',rds:'rdd',rddan:'rxs',rxs:'rddan',
            bdd:'bds',bds:'bdd',bxd:'bxs',bxs:'bxd',gdd:'gds',gds:'gdd',gxdan:'gxs',gxs:'gxdan'
          },
          betting_url: 'Lottery_L',
          info_url: 'Lottery_L'
        },
        //选择内容
        lo_data:{},
        //ab盘
        disc:0,
        zhushu: 0,
        betting_data: [],
        layer: false,
        betting_name: '',
        betting_type: '',
        betting_type1: '',
        wave: [
          { code: ['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46'],class: 'red' },
          { code: ['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48'],class: 'blue' },
          { code: ['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49'],class: 'green' }
        ],
        zodiac: ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'],
      }
    },
    computed: {
      forData(){
        let data;
        switch (this.betting_type1) {
          case 'pm':
          case 'ptbz':
            data = 49;
            break;
          case 'dxzt':
          case 'ptx':
            data = this.zodiac;
            break;
          case 'ptw':
            data = 10;
            break;
          default:
            data = 0;
        }
        return data;
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
      codeType(code){
        if(this.betting_type1 == 'ptw'){
          return '';
        }
        code = ('0' + code).substr(-2) ;
        for(let i = 0,j = this.wave.length; i < j; i++){
          if(this.arrayIndexOf(this.wave[i].code,code) > -1){
            return this.wave[i].class;
          }
        }
        return '';
      },
      isOk(){
        return [(this.betting_type1 in this.data.betting_all),(this.betting_type1 in this.data.betting_all && this.betting_type in this.data.betting_all[this.betting_type1])];
      },
      betting(data,key1,key2,betting_all,disc){
        this.$set(this,'lo_data',data);
        this.disc = disc;
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
          this.betting_data = [];
        }
      },
      select(value){
        let _key = this.arrayIndexOf(this.betting_data,value),betting_chat = [];
        if(_key > -1){
          this.betting_data.splice(_key,1);
        }else{
          this.betting_data.push(value);
        }
        this.calculation();
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
      calculation(){
        let _this = this;
        // 计算投注注数
        let action_zhushu = {
          pm: {
            p2z2(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,2) * 1;
            },
            p3z3(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,3) * 1;
            },
            p3z2(){
              action_zhushu.pm.p3z3();
            }
          },
          dxzt: {
            sxzt(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,4) * 1;
            },
            wxzt(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,5) * 1;
            },
            lxzt(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,6) * 1;
            }
          },
          ptx: {
            pt1x(){
              _this.zhushu = _this.betting_data.length;
            },
            pt2x(){
              action_zhushu.pm.p2z2();
            },
            pt3x(){
              action_zhushu.pm.p3z3();
            },
            pt4x(){
              action_zhushu.dxzt.sxzt();
            },
            pt5x(){
              action_zhushu.dxzt.wxzt();
            }
          },
          ptw: {
            pt1w(){
              action_zhushu.ptx.pt1x();
            },
            pt2w(){
              action_zhushu.pm.p2z2();
            },
            pt3w(){
              action_zhushu.pm.p3z3();
            },
            pt4w(){
              action_zhushu.dxzt.sxzt();
            }
          },
          ptbz: {
            wbz(){
              action_zhushu.dxzt.wxzt();
            },
            lbz(){
              action_zhushu.dxzt.lxzt();
            },
            qbz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,7) * 1;
            },
            bbz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,8) * 1;
            },
            jbz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,9) * 1;
            },
            sbz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,10) * 1;
            },
            s1bz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,11) * 1;
            },
            s2bz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,12) * 1;
            },
            s3bz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,13) * 1;
            },
            s4bz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,14) * 1;
            },
            s5bz(){
              let l = _this.betting_data.length;
          		_this.zhushu = action_zhushu.combinationBasic(l,15) * 1;
            },
          },
          combinationBasic(n,m){
            let n1 = 1,n2 = 1;
            for (let i = n,j = 1; j <= m; n1 *= i--,n2 *= j++);
            return n1 / n2;
          }
        };
        if(_this.betting_type1 in action_zhushu && _this.betting_type in action_zhushu[_this.betting_type1]){
          action_zhushu[_this.betting_type1][_this.betting_type]();
          if(_this.zhushu > 0){
            if(!this.isOk()[0]){
              _this.data.betting_all[_this.betting_type1] = {};
            }
            _this.data.betting_all[_this.betting_type1][_this.betting_type] = {
              code: (() => {
                let array_chat = [];
                if(_this.betting_data.length > 0){
                  array_chat = _this.betting_data;
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

</style>
