<template>
  <div id='app'>
    <form class="kd-form kd-container">
        <p>以下选项均为必填 , 为确保审核通过，请填写有效真实信息！</p>
        <div class="kd-field">
            <label class="kd-field-title">会员ID</label>
            <div class="kd-field-text">{{ $store.state.user['id'] }}</div>
        </div>
        <div class="kd-field">
            <label class="kd-field-title">用户名</label>
            <div class="kd-field-text">{{ $store.state.user['username'] }}</div>
        </div>

        <div class="kd-field required">
              <label for="qq_in_profile" class="kd-field-title">手机号码 <i class="text_msg" v-remind="form.phone_number"></i> </label>
              <div v-if="get_data.phone_number==''">
              <div class="kd-textinput text">
                  <input type="text" v-model.trim="form.phone_number"  v-verify="form.phone_number">
              </div>
            </div>
            <div v-else class="kd-field-text">{{ get_data.phone_number }} <span>(如需更换请联系客服)</span></div>
        </div>
        <div class="kd-field required">
            <label for="qq_in_profile" class="kd-field-title">真实姓名 <i class="text_msg" v-remind="form.name"></i> </label>
          <div v-if="get_data.name==''">
            <div class="kd-textinput text">
                <input type="text" v-model.trim="form.name" v-verify="form.name">
            </div>
          </div>
            <div v-else class="kd-field-text">{{ get_data.name }} <span>(如需更换请联系客服)</span></div>
        </div>
        <div class="kd-field required">
            <label for="qq_in_profile" class="kd-field-title">身份证号码 <i class="text_msg" v-remind="form.id_number"></i> </label>
          <div v-if="get_data.id_number==''">
            <div class="kd-textinput text">
                <input type="text" v-model.trim="form.id_number" v-verify="form.id_number">
            </div>
          </div>
            <div v-else class="kd-field-text">{{ get_data.id_number }} <span>(如需更换请联系客服)</span></div>
        </div>
        <div class="kd-field required">
              <label for="qq_in_profile" class="kd-field-title">联系QQ <i class="text_msg" v-remind="form.qq"></i></label>
            <div v-if="get_data.qq==''">
              <div class="kd-textinput text">
                  <input type="text" v-model.trim="form.qq" v-verify="form.qq">
              </div>
            </div>
            <div v-else class="kd-field-text">{{ get_data.qq }}<span>(如需更换请联系客服)</span></div>
        </div>

        <div class="kd-field required">
            <label for="email_in_profile" class="kd-field-title">电子邮箱 <i class="text_msg" v-remind="form.email"></i> </label>
            <div class="kd-textinput email">
                <input type="email" v-model.trim="form.email" v-verify="form.email">
            </div>
        </div>
        <div type="button" class="kd-button main-button" @click="submit" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span>保存</span>
            <button type="button">Button</button>
        </div>
    </form>
  </div>
</template>

<script>

export default{
  mounted(){
    this.infoData();
  },
  data () {
    return {
      form: { //输入
        phone_number: '',
        qq: '',
        email: '',
        id_number: '',
        name:''
      },
      get_data:{
        phone_number: '',
        qq: '',
        email: '',
        id_number: '',
        name:''
      }
    }
  },
  verify:{//输入检验
    form:{
      phone_number: [
        "required",
        "mobile",
      ],
      qq:[
        "required",
        {maxLength:16,message:'请输入正确的QQ号'},
        {minLength:6,message:'请输入正确的QQ号'}
      ],
      email: [
        "required",
        "email",
      ],
      id_number:[
        "required",
      ],
      name:[
        "required",
      ]
    }
  },
  methods: {
    submit(){//发送数据
      let _this = this;
      if(!_this.$verify.check()){
        return false;
      }
      _this.$getData({
        loading:true,
        url:'/api/home/my/editInfo',
        data: _this.form,
        callback: function(data){

          if(data.code > 0){
            _this.$total({ message: data.msg,type: 1 });
            for(var k in _this.form){
              _this.get_data[k] = _this.form[k];
            }
          }else{
            _this.$total({ message: data.msg,type: 2 });
          }
        }
      });
    },
    infoData(){//请求数据
      let _this = this;
      _this.$getData({
        url:'/api/home/my/getInfo',
        callback: function(res){
          if(res.code){
            for(var k in res.data){
              _this.get_data[k] = res.data[k] ? res.data[k] : '';
              _this.form[k] = res.data[k] ? res.data[k] : '';
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
