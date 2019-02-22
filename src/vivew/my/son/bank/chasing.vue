<template>
  <div>
    <form class="kd-form kd-container">
        <!---->
        <div class="kd-field required">
            <label for="password_in_edit" class="kd-field-title required">{{checkPWD == 1 ? '登陆密码' : '旧提现密码'}} <i class="text_msg" v-remind="form.password"></i></label>
            <div class="kd-textinput password">
                <input type="password" v-model="form.password" v-verify="form.password" placeholder="密码长度只能是6-20个字符！">
            </div>
        </div>
        <div class="kd-field required">
            <label for="password_in_edit" class="kd-field-title required">{{checkPWD == 1 ? '设置提现密码' : '新提现密码'}} <i class="text_msg" v-remind="form.draw_password"></i></label>
            <div class="kd-textinput password">
                <input type="password" v-model="form.draw_password" v-verify="form.draw_password" placeholder="密码长度只能是6-20个字符！">
            </div>
        </div>
        <div class="kd-field">
            <label for="confirmed_password_in_edit" class="kd-field-title required">{{checkPWD == 1 ? '确认提现密码' : '确认新提现密码'}}<i class="text_msg" v-remind="form.to_password"></i></label>
            <div class="kd-textinput password">
                <input type="password" v-model="form.to_password" v-verify="form.to_password" placeholder="密码长度只能是6-20个字符！">
            </div>
        </div>
        <div type="button" class="kd-button main-button" @click="submit" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
          <span>确 认</span><button type="button">Button</button>
        </div>
    </form>
  </div>
</template>

<script>
  export default{
    mounted(){
      let _this = this;
      _this.$getData({
        url:'/api/home/my/getBank',
        callback: function(res){
          _this.checkPWD = res.change_type;
        }
      });
    },
    data () {
      return {
        checkPWD:1,
        form: {
          password:'',
          draw_password: '',
          to_password: ''
        }
      }
    },
    verify:{
      form:{
        password:[
          "required",
          {minLength:6,message:'密码最小6位'},
          {maxLength:20,message:'密码最大20位'}
        ],
        draw_password:[
          "required",
          {minLength:6,message:'密码最小6位'},
          {maxLength:20,message:'密码最大20位'}
        ],
        to_password:[
          "required",
          {minLength:6,message:'密码最小6位'},
          {maxLength:20,message:'密码最大20位'}
        ],
      }
    },
    methods: {
      submit(){
        let _this = this;
        if(!_this.$verify.check()){
          return false;
        }else if(_this.form.draw_password != _this.form.to_password){
          _this.$total({ message: '密码确认不一致',type: 2 });
          return false;
        }
        _this.$getData({
          loading:true,
          url:'/api/home/my/setDrawPassword',
          data: _this.form,
          callback: function(data){
            if(data.code > 0){
              if(_this.checkPWD == 1){
                _this.$total({ message: data.msg,type: 1 });
                _this.$router.push('/Capital/moneyOut');
                _this.checkPWD == 2;
              }else{
                _this.$total({ message: '提现密码修改成功！',type: 1 });
                _this.$router.push('/Capital/moneyOut');
              }
              // _this.form.password = '';
              // _this.form.draw_password = '';
              // _this.form.to_password = '';
              // _this.checkPWD = 2;
              //location.reload();
            }else{
              _this.$total({ message: data.msg,type: 2 });
            }
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
