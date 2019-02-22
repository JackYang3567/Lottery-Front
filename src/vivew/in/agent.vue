<template>
  <div id="app">
    <main class="kd-body">
        <form class="kd-form kd-container">
            <div class="kd-field">
                <label for="user_name_in_register" class="kd-field-title required">用户名  <i class="text_msg" v-remind="form.username"></i>  </label>
                <div class="kd-textinput text">
                    <input type="text" id="user_name_in_register" v-model.trim="form.username" v-verify="form.username" placeholder="输入数字、字母，4-20个字符">
                </div>
            </div>

            <div class="kd-field" v-if="re_type == 2 && phoneOn == 1">
              <label for="user_name_in_register" class="kd-field-title required">手机号  <i class="text_msg"></i>  </label>
              <div class="kd-textinput textinput_mobile">
                  <input type="text" id="mobile_in_register" v-model.trim="form.phone" placeholder="请正确输入,保证帐号安全">
              </div>
            </div>

            <!-- <div class="kd-field">
                <label for="mobile_in_register" class="kd-field-title required">手机号码</label>
                <div type="button" class="kd-button mobile_code-btn"><span>获取手机验证码</span>
                    <button type="button">Button</button>
                </div>
                <div class="kd-textinput textinput_mobile">
                    <input type="text" id="mobile_in_register" placeholder="输入11位手机号码">
                </div>
            </div>
            <div class="kd-field">
                <label for="mobile_code_in_register" class="kd-field-title required">手机验证码</label>
                <div class="kd-textinput number">
                    <input type="number" id="mobile_code_in_register" placeholder="输入验证码" maxlength="4">
                </div>
            </div>
            <div class="kd-field">
                <label for="real_name_in_register" class="kd-field-title required">姓名</label>
                <div class="kd-textinput text">
                    <input type="text" id="real_name_in_register" placeholder="输入中文">
                </div>
            </div> -->

            <div class="kd-field">
                <label for="password_in_register" class="kd-field-title required">登录密码  <i class="text_msg" v-remind="form.password"></i> </label>
                <div class="kd-textinput password">
                    <input type="password" id="password_in_register" placeholder="密码长度只能是6-20个字符！" v-model="form.password" v-verify="form.password">
                </div>
            </div>
            <div class="kd-field">
                <label for="confirmed_password_in_register" class="kd-field-title required">密码确认 <i class="text_msg" v-remind="form.to_password"></i> </label>
                <div class="kd-textinput password">
                    <input type="password" id="confirmed_password_in_register" placeholder="密码长度只能是6-20个字符！" v-model="form.to_password" v-verify="form.to_password">
                </div>
            </div>
            <div class="kd-field">
                <label for="" class="kd-field-title ">验证码 <i class="text_msg" v-remind="form.verify"></i></label>
                <div class="kd-textinput verify">
                    <input type="text" placeholder="请输入验证码" v-model.trim="form.verify" v-verify="form.verify">
                    <img @click="verify_img = Math.random();" alt="验证码" :src="($store.state.basic.chat_id ? ('api_path' in $store.state && $store.state.api_path ? '//' + $store.state.api_path : '/api') + '/home/in/verify?rnd=' + verify_img + ($store.state.basic.chat_id ? '&_chat_id=' + $store.state.basic.chat_id : ''):'')"/>
                </div>
            </div>
            <div class="kd-field agree">
                <div id="agree_terms" :class="['kd-checkbox ',{'checked':read}]" @click="read=!read"><i class="icon"></i><span></span></div>
                <label for="agree_terms" @click="read=!read">我已届满合法博彩年龄，且同意各项开户条约。</label>
                <br> <a href="javascript:;" @click="regtip.chack = !regtip.chack">查看《所有规则与条例以及隐私声明》</a></div>
            <div class="kd-buttons">
                <div type="button" class="kd-button main-button" @click="submit" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span>马上注册</span>
                    <button type="button">Button</button>
                </div>
                <!-- <a href="#/in"><div type="button" class="kd-button hollow" :style="{ color: $store.state.basic.main_color,border: '2px solid ' + $store.state.basic.main_color }">立即登录
                    <button type="button">Button</button>
                </div></a> -->
            </div>
        </form>
        <transition name="bounce2">
        <div class="promptbox-wrapper" v-show="regtip.chack" @click=" regtip.chack = !regtip.chack">
            <section class="promptbox prompt-rule" :style="{border: '2px solid ' + $store.state.basic.main_color}">
                <div class="prompt-head" :style="{background: $store.state.basic.main_color}">规则条例及隐私声明</div>
                <div class="prompt-body" >
                    <p v-html="regtip.content"></p>
                </div> <a href="javascript:;" class="prompt-close kd-close" >close</a></section>
            <div class="promptbox-overlay"></div>
        </div>
      </transition>
        <!-- <div class="promptbox-wrapper" style="display: none;">
            <section class="promptbox prompt-verifycode">
                <div class="prompt-head">请先输入验证码</div>
                <div class="prompt-body">
                    <div class="kd-field"><img src="#" alt="验证码" title="点击刷新验证码" class="prompt-verifycode__img">
                        <div class="kd-textinput prompt-verifycode__input text">
                            <input type="text" placeholder="请输入验证码">
                        </div>
                    </div>
                    <div type="button" class="kd-button">发送短信
                        <button type="button">Button</button>
                    </div>
                </div> <a href="javascript:;" class="prompt-close kd-close">close</a></section>
            <div class="promptbox-overlay"></div>
        </div> -->

    </main>
  </div>
</template>
<script>
export default {
  name:'agent', //这里是代理注册通道
  mounted(){
    this.getRegtip();//获取条约内容
    // alert(this.$route.params.u);
    if(!isNaN(this.$route.params.u)){//如果是数字
       this.form.agent = this.$route.params.u;
       // alert(this.$route.params.u);
    }
  },
  data () {
    return{
      form: {
        username: '',
        password: '',
        to_password: '',
        verify: '',
        phone: '',
        agent: '',
      },
      read: true,
      regtip:{
        chack:false,
        content:''
      } ,    //开户条约
      target:'',
      verify_img:'', //验证码
      re_type:0,
      phoneOn:0,
    }
  },
  verify:{
    form:{
      username:[
        'required',
        'special',
          { minLength:4,message: "用户名不得小于4位" },
          { maxLength:15,message: "用户名不得大于15位" }
      ],
      password:[
        'required',
          {minLength:6,message: "密码不得小于6位"},
          {maxLength:20,message: "密码不得大于20位"}
      ],
      to_password:[
        'required',
          {minLength:6,message: "新密码不得小于6位"},
          {maxLength:20,message: "新密码不得大于20位"}
      ],
      verify: [
        "required",
        { minLength:4,message: "验证码不得小于4位" },
        { maxLength:4,message: "验证码不得大于4位" }
      ]
    }
  },
  methods: {
    judge(){
      let agent = navigator.userAgent.toLowerCase(),type = '';
      if(agent.indexOf("android") > -1){
        type = 'android';
      }else if(agent.indexOf("iphone") > -1){
        type = 'iphone';
      }else if(agent.indexOf("ipad") > -1){
        type = 'ipad';
      }else{
        type = 'window';
      }
      return type;
    },
    pcheck(val){
      let regEn = /^((1[3,5,7,8,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
      if( !regEn.test(val) ){
        return false;
      }
      return true;
    },
    submit(){
      let _this = this;
      if(!this.$verify.check()){
        // _this.$toast('信息请填写完整');
        return false;
      }
      // || !_this.pcheck(_this.form.phone) )  取消手机号
      if(_this.phoneOn == 1 && _this.re_type == 2 && ( _this.form.phone == '')){
        _this.$toast('请填写正确的手机号码');
        return false;
      }else if(_this.form.password != _this.form.to_password){
        _this.$toast('两次密码不一致');
        return false;
      }else if(/[\u4e00-\u9fa5]/.test(_this.form.username)){
        _this.$toast('用户名不能用中文');
        return false;
      }else if(!_this.read){
        _this.$toast('请确认是否已到合法博彩年龄，并同意开户条约');
        return false;
      }
      // console.log(123);
      // return;
      _this.$getData({
        loading:true,
        url:'/api/home/in/agentReg',
        data: _this.form,
        callback: function(data){
          _this.$toast({message:data.msg,duration:1000});
          if(data.code > 0){
            for(let i in _this.form){
              _this.form[i] = '';
            }
          }
          if(data.code == 1){
            _this.$messagebox.alert(data.msg).then(action => {
            });
          }else{
            _this.$toast({message:data.msg,duration:1000});
            if(data.code == 2){
              setTimeout(()=>{
                if(_this.target != '' && _this.target['switch'] == 1){
                  let phone = _this.judge();
                  if(phone == 'android' && _this.target['apk'] != ''){
                    location.href = _this.target['apk'].indexOf('http') > -1 ? _this.target['apk'] : '//'+_this.target['apk'] ;
                  }else if((phone == 'iphone' || phone == 'ipad' ) && _this.target['ipa'] != ''){
                    location.href = _this.target['ipa'].indexOf('http') > -1 ? _this.target['ipa'] : '//'+_this.target['ipa'] ;
                  }else{
                    _this.$router.push('/My');
                  }
                }else{
                  _this.$router.push('/My');
                }
              },1000);
            }else{
              _this.verify_img = Math.random();
            }
          }
        }
      });
    },
    getRegtip(){
      var _this = this;
      _this.$getData({
        url:'/api/home/in/getRegtip',
        data:{'type':this.$route.params.u},
        type:'post',
        callback:function(res){
          _this.target = res.tge;
          _this.re_type = res.re_type;
          _this.phoneOn = res.phoneOn;
          if(res.xy){
            _this.regtip.content = res.xy ;
          }else{
            _this.regtip.content = '无内容！' ;
          }
        }
      });
    }
  }/*mtthods*/
}
</script>
<style scoped>
.verify input{
  width: 70% !important;
}
.verify img{
  display: block;
  float:right;
  width: 20%;
  height: 1.875rem;
}
.text_msg{
   font-style:normal;
   float:right;
   color:red;
}
</style>
