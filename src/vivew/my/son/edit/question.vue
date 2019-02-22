<template>
  <div id='app'>
    <form class="kd-form kd-container">
        <div class="kd-field required" v-if="!ini.length">
            <label for="password_in_edit" class="kd-field-title required">登录密码 <i class="text_msg" v-remind="form.password"></i> </label>
            <div class="kd-textinput password">
                <input type="password" v-model="form.password" v-verify="form.password" placeholder="请输入登录密码">
            </div>
        </div>
        <div class="kd-field">
            <label class="kd-field-title">请选择安全问题</label>
            <div v-if="ini.length" class="kd-field-text">{{ini[0]}}</div>
            <div class="kd-select" v-else >
              <span class="value">{{ form.key }}</span>
              <select @change="change">
                  <option :value="item" v-for="item in nav">{{ item }}</option>
              </select>
            </div>

        </div>
        <div class="kd-field">
            <label class="kd-field-title">答案： <span v-if="ini.length" @click="see = !see">(点击查看)</span> <i class="text_msg" v-remind="form.value"></i> </label>
            <template v-if="ini.length">
              <div class="kd-field-text">
                {{ see ? ini[1]:'*********'}}
              </div>
            </template>
            <div class="kd-textinput text" v-else>
                <input type="text" v-model.trim="form.value" v-verify="form.value" placeholder="请输入您设定的安全问题答案">
            </div>

        </div>

        <div v-if="!ini.length" type="button" class="kd-button main-button" @click="submit" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
            <span>保存</span>
            <button type="button">Button</button>
        </div>
    </form>
  </div>
</template>
<script>
export default{
  mounted(){
    let _this = this;
    _this.form['key'] = _this.nav[0];
    _this.$getData({
      loading:true,
      url:'/api/home/my/quesGet',
      data:'',
      callback:function(res){
        if(res){
          _this.$set(_this,'ini',res);
        }
        // if(res.code > 0){
        //   // _this.ini[0] = '已设置:'+res[0];
        //   // _this.ini[1] = res[1];
        //
        // }
      }
    });
  },
  data(){
    return {
      form: {
        password: '',
        key: '',
        value: ''
      },
      see: false,
      ini: [],
      nav: ['你的父亲的名字？','你最喜欢的老师？','爱人的名字？']
    }
  },
  verify:{
    form:{
      password:[
        "required",
        {minLength:6,message:'密码不正确'},
        {maxLength:20,message:'密码不正确'}
      ],
      key:[
        "required",
      ],
      value:[
        "required",
      ],
    }
  },
  methods: {
    change(e){
      this.form.key = e.target.value;
    },
    submit(){
      let _this = this;
      if(!_this.$verify.check()){
        return false;
      }else if(_this.form.key == ''){
        _this.$total({ message: '请选择安全问题类型',type: 2 });
        return false;
      }
      _this.$getData({
        loading:true,
        url:'/api/home/my/question',
        data: _this.form,
        callback: function(data){
            _this.$total({ message: data.msg,type: data.code });
            _this.form.password = '';
            if(data.code == 1){
              _this.$set(_this,'ini',[_this.form['key'],_this.form['value']]);
            }
          }
      });
    }
  }
}
</script>
<style scoped>
</style>
