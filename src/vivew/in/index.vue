<template>
  <div id="app">
    <main class="kd-body" @keyup.13="submit()">
        <!-- 这里是登录 -->
        <div class="logo-wrapper kd-center" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span class="logo"><i class="icon "><img :src="'//' + ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + $store.state.basic.logo_path"></i></span></div>

        <form class="kd-form kd-container">
          <div class="kd-field">
              <label for="username"  class="kd-field-title">账号 <i class="text_msg" v-remind="form.username"></i></label>
              <div class="kd-textinput text">
                  <input type="text" placeholder="用户名" v-model.trim="form.username" v-verify="form.username">
              </div>
          </div>
          <div class="kd-field">
              <label for="password" class="kd-field-title">密码 <i class="text_msg" v-remind="form.password"></i></label>
              <div class="kd-textinput password">
                  <input type="password" placeholder="输入6-20位密码" v-model="form.password" v-verify="form.password">
              </div>
          </div>
          <div class="kd-field" v-if="$store.state.basic.login_verify == 1">
              <label for="" class="kd-field-title ">验证码 <i class="text_msg"></i></label>
              <div class="kd-textinput verify">
                  <input type="text" placeholder="请输入验证码" v-model="form.verify">
                  <img @click="verify_img = Math.random();" alt="验证码" :src="($store.state.basic.chat_id ? ('api_path' in $store.state && $store.state.api_path ? '//' + $store.state.api_path : '/api') + '/home/in/verify?rnd=' + verify_img + ($store.state.basic.chat_id ? '&_chat_id=' + $store.state.basic.chat_id : ''):'')"/>
              </div>
          </div>
          <div class="kd-field kd-row kd-row-remembered">
              <div class="kd-col remember-user-name" @click="form.remberu = !form.remberu">
                  <div class="kd-checkbox" :class="form.remberu?' checked' : ''" ><i class="icon"></i><span></span></div>
                  <label for="remember-user-name">记住账号</label>
              </div>
              <div class="kd-col remember-password kd-align-center"  @click="form.remberp = !form.remberp">
                  <div class="kd-checkbox" :class="form.remberp ?' checked' : ''"><i class="icon"></i><span></span></div>
                  <label for="remember-password">记住密码</label>
              </div>
              <div class="kd-col kd-align-right"><a href="#/in/back-password" class="">忘记密码？</a></div>
          </div>
          <div class="kd-buttons">
              <div type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span>马上登录</span>
                <!--submit judge -->
                  <input type="button"  @click="submit()"/>
              </div>

              <a href="#/in/register/u"><div type="button" class="kd-button hollow" :style="{ color: $store.state.basic.main_color,border: '2px solid ' + $store.state.basic.main_color }">立即注册
                  <button type="button">Button</button>
              </div>
              </a>

              <div @click="demoLogin()" v-if="$store.state.basic.demo_user == 1" type="button" class="kd-button hollow" :style="{ color: $store.state.basic.main_color,border: '2px solid ' + $store.state.basic.main_color }">
                  免费试玩
                  <button type="button">Button</button>
              </div>
          </div>
      </form>

    </main>
  </div>
</template>

<script>

  export default {
    mounted(){
    // alert(JSON.stringify(localStorage));
    },
    data () {
      return {
        form: {
          username: localStorage.cardu ? JSON.parse(localStorage.cardu) :'',
          password: localStorage.card ? JSON.parse(localStorage.card) :'',
          verify : '',
          remberu : true,//this.getCookie('user') ? true : false,
          remberp : localStorage.card ? true : false
        },
        verify_img : '',
      }
    },
    verify: {
      form: {
        username: [
          "required",
          { minLength:2,message: "用户名不得小于2位" },
          { maxLength:20,message: "用户名不得大于20位" }
        ],
        password:[
          "required",
          { minLength:6,message: "用户密码不得小于6位" },
          { maxLength:32,message: "用户密码不得大于32位" }
        ],
      }
    },
    methods: {
      //判断用户安卓苹果pc,预留
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
      //试玩用户登陆方法
      demoLogin(){
        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/Home/In/demoLogin',
          callback: function(res){
            if(res.code){
              _this.$total({ type: 1,message:res.msg });
              // setTimeout(function(){},1000);
              _this.$router.push('/');
            }
          }
        });
      },
      //用户登录后调用 重置设置
      userConfig(){
        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/Home/home/getBasic',
          callback: function(data){
            if(data['web_state'] == 0){
              _this.$router.push('/error');
            }
            localStorage.setItem('userConfig',(data['user_config'] ? JSON.stringify(data['user_config']) : ''));
            //设定系统颜色
            let bit = data['user_config']['config']['color'];
            if(bit && bit['op'] == 'ON'){
              data.main_color ='rgb('+bit['r']+','+bit['g']+','+bit['b']+')';
            }
            //设定系统颜色完
            delete data.user_config;
            //临时设置弹窗
            data['home_window'] = _this.$store.state.basic.home_window;
            _this.$store.commit('setData',{key:'basic',value:data});
            setTimeout(function(){
              _this.$router.push(_this.$route.query.url?_this.$route.query.url:'/My');
            },1300);
          }
        });
      },
      submit(){
        let _this = this;
        if(!this.$verify.check()){
          return false;
        }
        if(_this.$store.state.basic.login_verify == 1){
          if(_this.form.verify == '' || _this.form.verify.length < 4 || _this.form.verify.length > 4){
            _this.$toast({message:'验证码格式错误',icon:2});
            return false;
          }
        }
        // console.log(_this.$route.query.url);
        _this.$getData({
          loading:true,
          url:'/api/home/in/login',
          data: _this.form,
          callback: function(data){
            _this.$toast({message:data.msg,duration:1000});
            // console.log(data);
            // return;
            if(data.code){
              _this.form.username = '';
              _this.form.password = '';
              _this.form.verify = '';
              if(_this.form['remberp'] == 0 && localStorage.card){
                localStorage.removeItem('card');
              }else if(data['card'] && (!localStorage.card || JSON.parse(localStorage.card)!= data['card'])){
                localStorage.removeItem('card');
                localStorage.setItem( 'card',JSON.stringify(data['card']));
              }
              if(_this.form['remberu'] == 0 && localStorage.cardu){
                localStorage.removeItem('cardu');
              }else if(data['cardu'] && (!localStorage.cardu || JSON.parse(localStorage.cardu)!= data['cardu'])){
                localStorage.removeItem('cardu');
                localStorage.setItem( 'cardu',JSON.stringify(data['cardu']));
              }
              _this.userConfig();
              // console.log(data);


            }else{
              _this.verify_img = Math.random();
            }
          }
        });
      },
      getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
          return arr[2];
        }else{
          return '';
        }
      }
    }
  }
</script>

<style scoped>
  .verify input{
    width: 70% !important;
  }
  .is_red{
    color: red;
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
