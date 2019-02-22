<template>
  <div id="app">
    <div class="money-wrapper money-out">
      <div class="empty_class" v-if="tip">
        {{ tip }}
        <span @click="target" v-if="tip&&tip!='加载中...'">前往</span>
      </div>

      <form class="kd-form kd-container kd-center" v-else>
          <div class="kd-field" style="margin-top:7%;" v-if="frozen > 0">
            <span style="color:red;">特别提示：您的流水未达到{{frozen}}￥,无法提现,如有疑问请联系客服</span>
          </div>

          <div class="kd-field" style="margin-top:7%;">
              <label class="kd-field-title">提现金额 <i class="text_msg" v-remind="form.money"></i></label>
              <div class="kd-textinput number">
                  <input type="number" v-model="form.money" v-verify="form.money" placeholder="请输入金额">
              </div>
          </div>
          <div class="kd-field">
            <label class="kd-field-title">提现密码 <i class="text_msg" v-remind="form.password"></i></label>
            <div class="kd-textinput password">
                <input  type="password" v-model="form.password" v-verify="form.password" placeholder="请输入提现密码" >
            </div>
          </div>
          <!-- <div class="kd-field">
            <label class="kd-field-title">备注 <i class="text_msg"></i></label>
            <div class="kd-textinput password">
                <input type="text" v-model="form.remarks" placeholder="提款备注" >
            </div>
          </div> -->
          <div class="caption" v-if="data.num[0]">今天提款次数剩下 {{ data.num[1] }} 次,每天只能提款 {{ data.num[0] }} 次</div>
          <div class="caption">{{ data.cash_time }}</div>
          <div class="caption"><strong class="important" :style="{ color: $store.state.basic.main_color }">注意：</strong>{{ data.cash_explain }}</div>
          <div type="button" class="kd-button main-button kd-center" @click="submit" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
            <span>申请提现</span>
            <button type="button">Button</button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){
      //查询提示等信息
      this.getInfo();
    },
    data () {
      return {
        //流水是否已经达到,0为已达到
        frozen:0,
        //最低取款金额 0 为不限制
        min:0,
        form: { money: '',password: '',remarks: '' },
        code: 0,
        tip: '加载中...',
        is_loading: false,
        data: { cash_explain: '加载中...',cash_time: '加载中...' }
      }
    },
    verify:{
      form:{
        money:[
          "required",
        ],
        password:[
          'required',
          { maxLength:20,message:'请输入正确的密码' },
          { minLength:6,message:'请输入正确的密码' }
        ]
      }
    },
    methods:{
      getInfo(){
        let _this = this;
        _this.$getData({
          url:'/api/home/Capital/verification',
          callback:function(res){
            if(res.code > 0){
              _this.tip = false;
              _this.data = res.data;
              _this.frozen = res.frozen;
              _this.min = res.min;
            }else{
              _this.tip = res.msg;
              _this.code = res.code;
            }
          }
        });
      },
      submit(){

        if(this.is_loading){ return; }
        let _this = this;
        _this.is_loading = true;
        if(!_this.$verify.check()){
          _this.is_loading = false;
          return false;
        }
        if((_this.min > 0) && (_this.min > _this.form['money'])){
          _this.$total({ message:'提款金额最低'+_this.min,type: 2 });
          _this.is_loading = false;
          return false;
        }
        _this.sendData();
        // if(_this.frozen > 0){
        //   _this.$messagebox.confirm('您的流水还未达到'+_this.frozen+',如果强行提现,将会收取一定手续费', '注意').then(() =>{
        //     _this.sendData();
        //   }).catch(()=>{
        //     _this.is_loading = false;
        //     return;
        //   });
        // }else{
        //   _this.sendData();
        // }
      },
      sendData(){

        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/home/Capital/moneyOut',
          data: _this.form,
          callback:function(res){
            if(res.code){
              _this.form.money = '';
              _this.form.password = '';
              _this.form.remarks = '';
              _this.getInfo();
              setTimeout(function(){
                _this.$router.push('/my');
              },1000);

            }
            _this.$toast(res.msg);
            _this.is_loading = false;
          },
          errorCallback:function(res){
            _this.is_loading = false;
          }
        });
      },
      target(){
        if(this.code == 0){
          this.$router.push('/in/register/u');
        }else if(this.code == -2){
          this.$router.push('/My/bank/chasing_password');
        }else if(this.code == -3){
          this.$router.push('/My/bank');
        }
      }
    }
  }
</script>

<style scoped>
  .empty_class{
    text-align: center;
    color: #999;
    line-height: 100px;
  }
  .empty_class span{
    width: 100%;
    height: 100%;
    padding: 5px;
    background: #008cba;
    color:#fff;
    border-radius:3px;
  }
</style>
