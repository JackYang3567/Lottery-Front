<template>
  <div id="app">
    <main class="kd-body">
        <form class="kd-form kd-container forgot-password-form">
            <ul :class="['nostyle kd-row step step'+ (parseInt(pace) - 1)]">
                <li>第一步</li>
                <li>第二步</li>
                <li>第三步</li>
            </ul>
            <!--第一步-->
            <div class="kd-field" v-if="pace == 1">
                <label for="user_name_in_finding" class="kd-field-title">请输入账号 <i class="text_msg" v-remind="form.username"></i></label>
                <div class="kd-textinput text">
                    <input type="text" id="user_name_in_finding" v-model.trim="form.username" placeholder="用户ID" v-verify="form.username">
                </div>
            </div>
            <!--第二步-->
            <template v-if="pace == 2">
            <div class="kd-field" >
                <label class="kd-field-title">请选择方式</label>
                <div class="kd-select">
                  <span class="value">{{select_text}}</span>
                    <select v-model="form.selected">
                        <option  value="question">安全问题</option>
                        <!-- <option  value="email">电子邮箱</option> -->
                    </select>
                </div>
            </div>
            <!---->
            <template v-if="form.selected == 'question'">
            <div class="kd-field">
                <label class="kd-field-title"> {{form.question}} </label>
            </div>
            <div class="kd-field">
                <label class="kd-field-title">答案：<i class="text_msg" v-remind="form.answer"></i></label>
                <div class="kd-textinput text">
                    <input type="text" id="secure_code_in_finding" v-model.trim="form.answer"  v-verify="form.answer" placeholder="请输入您设定的安全问题答案">
                </div>
            </div>
          </template>
          </template>
            <!--第三步-->
            <template v-if="pace == 3">
            <div class="kd-field required">
                <label class="kd-field-title required" for="password_in_edit" v-model="form.password">新的密码 <i class="text_msg" v-remind="form.password"></i></label>
                <div class="kd-textinput">
                    <input type="password" id="password_in_edit" v-model="form.password"  v-verify="form.password" placeholder="密码长度只能是6-20个字符！">
                </div>
            </div>
            <div class="kd-field">
                <label class="kd-field-title required" for="confirmed_password_in_edit">密码确认 <i class="text_msg" v-remind="form.to_password"></i></label>
                <div class="kd-textinput text">
                    <input type="password" id="confirmed_password_in_edit" v-model="form.to_password" v-verify="form.to_password" placeholder="密码长度只能是6-20个字符！">
                </div>
            </div>
            </template>

            <div class="kd-field">
                <label for="secure_code_in_finding" class="kd-field-title">验证码 <i class="text_msg" v-remind="form.verify"></i></label>
                <div class="kd-textinput secure-code text">
                    <input type="text"v-model.trim="form.verify" id="secure_code_in_finding" placeholder="请输入验证码" v-verify="form.verify">
                </div> <img @click="verify_img = Math.random();"  :src="($store.state.basic.chat_id ? ('api_path' in $store.state && $store.state.api_path ? '//' + $store.state.api_path : '/api') + '/home/in/verify?rnd=' + verify_img + ($store.state.basic.chat_id ? '&_chat_id=' + $store.state.basic.chat_id : ''):'')" alt="验证码" class="photo-secure-code"></div>
            <div type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span>下一步</span>
                <button type="button" @click="paceData">Button</button>
            </div>
            <router-link :to="{ path:'/in' }">
            <div type="button" :style="'border-color:' + $store.state.basic.main_color+';'+'color:'+$store.state.basic.main_color"  class="kd-button hollow back-to-login"><span>想起密码？返回登录</span>
                <button type="button">Button</button>
            </div></router-link>
        </form>
    </main>
  </div>
</template>
<script>
export default{
  name:'backpwd',
  data(){
    return{
      verify_img:'',
      pace:1,
      form:{
        username:'',
        proment:'',
        question:'',
        selected:'',
        answer:'',
        email:'',
        password:'',
        to_password:'',
        verify:''
      },
      sel_data:{
        question:'安全问题',
        email:'电子邮箱'
      }
    }
  },
  computed:{
    select_text(){
      var _this = this;
      if(_this.pace == 2 && _this.form.selected && !_this.form[_this.form.selected]){
        _this.$toast('用户没有设置'+_this.sel_data[_this.form.selected]);
      }
      if(_this.form.selected == ''){
        return '---选择方式---';
      }else{
        return _this.sel_data[_this.form.selected];
      }
    }
  },
  verify: {
    form: {
      username: [
        "required",
        { minLength:4,message: "用户名不得小于4位" },
        { maxLength:20,message: "用户名不得大于20位" }
      ],
      answer:[
        "required",
      ],
      password:[
        "required",
        { minLength:6,message: "用户密码不得小于6位" },
        { maxLength:32,message: "用户密码不得大于32位" }
      ],
      to_password:[
        "required",
        { minLength:6,message: "用户密码不得小于6位" },
        { maxLength:32,message: "用户密码不得大于32位" }
      ],
      verify: [
        "required",
        { minLength:4,message: "验证码不得小于4位" },
        { maxLength:4,message: "验证码不得大于4位" }
      ]
    }
  },
  methods:{
    paceData(){
      var _this = this;
      if(!_this.$verify.check()){
        return false;
      }
      if(_this.pace == 2 && _this.form.selected && !_this.form[_this.form.selected]){
        _this.$toast('用户没有设置'+_this.sel_data[_this.form.selected]);
        return false;
      }else if(_this.pace == 2 && !_this.form.selected){
        _this.$toast('请选择问题');
        return false;
      }
      if(_this.pace == 3 && _this.form.password != _this.form.to_password){
        _this.$toast('两次密码不一致');
        return false;
      }
      _this.$getData({
        loading:true,
        url:'/api/home/in/backpwd',
        data:{pace:_this.pace,data:_this.form},
        callback:function(res){
          _this.verify_img = Math.random();
          _this.form.verify = '';
          if(res.code > 0){
            _this.pace = res.pace;
          }else{
            _this.$toast(res.msg);
          }
          if(_this.pace == 2 && res.problem){
            _this.form.question = res.problem['question'];
            _this.form.email = res.problem['email'];
          }
          if(res.code == 2 && res.pace == 4){
            _this.$toast(res.msg);
            _this.$router.push('/in');
          }
        }
      });
    },
    test(){
      console.log(this.form);
    }
  }
}
</script>
<style scoped>
.photo-secure-code{
  height: 2.5rem;
}
.text_msg{
   font-style:normal;
   float:right;
   color:red;
}
</style>
