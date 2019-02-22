import Vue from 'vue';
import verify from 'vue-verify-plugin';

Vue.use(verify,{
    blur: true,
    rules: {
      va_name: {
        test: function(val){
          return false;
        },
        message:"提示信息"
      },
      special: {
        test: function(val){
          // var regEn = /[ `~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
          //     regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
          if(!val.match(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/)){
            return false;
          }
          return true;
        },
        message:'特殊字符无效'
      },
      phone:{
        test: function(val){
          let regEn = /^((1[3,5,7,8,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
          if( !regEn.test(val) ){
            return false;
          }
          return true;
        },
        message:'请输入正确手机号'
      },
    }
});
