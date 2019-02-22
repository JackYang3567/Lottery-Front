<template>
  <div id='app'>
    <form class="kd-form kd-container">
        <div class="kd-field">
            <label for="oldpassword_in_edit" class="kd-field-title required">原始密码 <i class="text_msg" v-remind="form.password"></i></label>
            <div class="kd-textinput password">
                <input type="password" v-model="form.password" v-verify="form.password" placeholder="请输入原始密码">
            </div>
        </div>
        <div class="kd-field required">
            <label for="password_in_edit" class="kd-field-title required">新的密码 <i class="text_msg" v-remind="form.new_password"></i></label>
            <div class="kd-textinput password">
                <input type="password" v-model="form.new_password" v-verify="form.new_password" placeholder="密码长度只能是6-20个字符！">
            </div>
        </div>
        <div class="kd-field">
            <label for="confirmed_password_in_edit" class="kd-field-title required">密码确认 <i class="text_msg" v-remind="form.to_password"></i></label>
            <div class="kd-textinput password">
                <input type="password" v-model="form.to_password" v-verify="form.to_password" placeholder="密码长度只能是6-20个字符！">
            </div>
        </div>
        <div type="button" class="kd-button main-button" @click="submit" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
          <span>确 认 修 改</span>
          <button type="button">Button</button>
        </div>
    </form>
  </div>
</template>
<script>
export default{
  data (){
    return {
      form:{
        password: '',
        new_password: '',
        to_password: ''
      },
    }
  },
  verify:{
    form:{
      password:[
        "required",
        {minLength:6,message:'密码最小6位'},
        {maxLength:20,message:'密码最大20位'}
      ],
      new_password:[
        "required",
        {minLength:6,message:'密码最小6位'},
        {maxLength:20,message:'密码最大20位'}
      ],
      to_password:[
        "required",
        {minLength:6,message:'密码最小6位'},
        {maxLength:20,message:'密码最大20位'}
      ]
    }
  },
  methods: {
    submit(){
      let _this = this;
      if(!_this.$verify.check()){
        return false;
      }else if(_this.new_password != _this.to_password){
        _this.$total({ message: '两次密码不一致',type: 2 });
        return false;
      }
      _this.$getData({
        url:'/api/home/my/editPassword',
        data: _this.form,
        callback: function(res){
          _this.$total({ message: res.msg,type: res.code });
          if(res.code){
            _this.form = {password:'',new_password:'',to_password:''};
          }
        }
      });
    }
  }
}
</script>
<style scoped>

</style>
