<template>
  <div id="app">

    <div align="center" v-if="loading">
      </br><mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner></br>
    </div>
    <form class="kd-form kd-container" v-else>
      <div class="kd-field required" v-if="typeClick < 3">
          <label for="password_in_edit" class="kd-field-title required">{{checkPWD == 1? '登录密码':'提现密码'}} <i class="text_msg" ></i></label>
          <div class="kd-textinput password">
              <input type="password" v-model="form.password"  placeholder="密码正确才能保存设置">
          </div>
      </div>

      <div class="kd-field"><label for="nick_name_in_bank_info" class="kd-field-title">开户姓名：<i class="text_msg" ></i></label>
        <div class="kd-textinput text">
          <input v-if="initial['username'] == ''" type="text" v-model="form.username" placeholder="输入中文">
          <span v-else>{{initial['username']}}</span>
        </div>
      </div>

      <div class="kd-field"><label for="nick_name_in_bank_info" class="kd-field-title">手机号码：<i class="text_msg"></i></label>
        <div class="kd-textinput text">
          <input v-if="phone == ''" type="text" v-model="form.phone"  placeholder="请输入手机号码">
          <span v-else>{{phone}}</span>
        </div>
      </div>

      <div class="kd-field"><label for="card_no_in_bank_info" class="kd-field-title">银行卡号：<i class="text_msg" ></i></label>
        <div class="kd-textinput text">
          <input v-if="initial['number'] == ''" type="text" v-model="form.number"  placeholder="输入银行卡号">
          <span v-else>{{initial['number']}}</span>
        </div>
      </div>

      <div class="kd-field"><label for="bank_name_in_bank_info" class="kd-field-title">开户银行：</label>
        <div :class="initial['name'] == ''?'kd-select':'kd-textinput text'">
          <template v-if="initial['name'] == ''">
            <span class="value">{{ form.name ? form.name : '请选择开户银行' }}</span>
            <select @change="change">
              <option :value="item" v-for="item in bank_name">{{ item }}</option>
            </select>
          </template>
          <span v-else>{{initial['name']}}</span>
        </div>
      </div>

      <div class="kd-field" v-if="typeClick == 1 || (form.branch != '' && form.branch != null )"><label for="branch_name_in_bank_info" class="kd-field-title">开户支行：<i class="text_msg" ></i></label>
        <div class="kd-textinput text">
          <input v-if="initial['branch'] == ''" type="text" v-model="form.branch"  placeholder="输入开户支行">
          <span v-else>{{initial['branch']}}</span>
        </div>
      </div>

      <div v-if="typeClick < 3 " type="button" class="kd-button main-button" @click="submit(typeClick)" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
        <span>保 存</span> <button type="button">Button</button>
      </div>
      <div v-else><span style="color:#555;">注：银行卡信息无法修改，如有特殊情况，请联系客服</span></div>
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
          // console.log(res);return;
          _this.checkPWD = res.change_type;
          _this.loading = false;
          if(res.phone){
            _this.phone = res.phone
          }
          if(res.code && res.data){
            _this.$set(_this,'initial',res.data);
            for(var k in res.data){
              _this.form[k] = res.data[k];
            }
          }else{
            // _this.$toast({message:res.msg,duration:1000});
          }
        }
      });
    },
    computed:{
      typeClick(){
        let _this = this,re = 1;
        if(_this.initial['number'] != ''){
          if( _this.phone != '' ){
            re = 3;
          }else{
            re = 2;
          }
        }
        return re;
      }
    },
    data () {
      return {
        //初始化数据
        initial:{
          name:'',
          number:'',
          username:'',
          branch:'',
        },
        phone:'',
        loading:true,
        checkPWD:1,
        //发送表单内容
        form: {
          password: '',
          username: '',
          name: '',
          phone:'',
          number: '',
          branch: ''
        },
        bank_name:[
          '中国工商银行','中国建设银行','中国银行','中国农业银行','交通银行','招商银行','中信银行',
          '中国民生银行','兴业银行','上海浦东发展银行','中国邮政储蓄银行','中国光大银行','平安银行',
          '华夏银行','北京银行','广发银行','上海银行','江苏银行','恒丰银行','浙商银行','南京银行',
          '宁波银行','渤海银行','杭州银行','东亚银行','深圳发展银行','厦门银行','广州农商银行',
          '广东农信','广西农村信用社','福建农村信用社','贵州农村信用社','桂林银行','东莞农村商业银行',
          '深圳农商银行','佛山顺德农村商业银行','贵阳银行','柳州银行','浙江农村信用社','东莞银行'
        ]
      }
    },
    // verify:{
    //   form:{
    //     // password:[
    //     //   "required",
    //     //   {minLength:6,message:'请输入正确的密码'},
    //     //   {maxLength:20,message:'请输入正确的密码'}
    //     // ],
    //     username:[
    //       "required"
    //     ],
    //     name:[
    //       "required"
    //     ],
    //     number:[
    //       "required",
    //       {minLength:16,message:'请输入16-19位卡号'},
    //       {maxLength:19,message:'请输入16-19位卡号'}
    //     ],
    //     branch:[
    //       "required"
    //     ],
    //   }
    // },
    methods: {
      change(e){
        this.form.name = e.target.value;
      },
      submit( val=1 ){
        let _this = this;
        if( _this.form['password'] == '' || _this.form['password'].length < 6 || _this.form['password'].length > 20){
          _this.$total({ message: '请输入正确的密码',type: 2 });
          return false;
        }else if(_this.initial['phone'] =='' && _this.form['phone'] == ''){
          _this.$total({ message: '请输入手机号',type: 2 });
          return false;
        }else if(_this.initial['branch'] == '' && _this.form['branch'] == ''){
          _this.$total({ message: '请输入支行',type: 2 });
          return false;
        }

        if(val == 2){
          _this.$getData({
            loading:true,
            url:'/api/home/my/editBank',
            data: {password:_this.form['password'],phone:_this.form['phone'],type:1},
            callback:function(res){
              if(res.code > 0){
                _this.phone = _this.form['phone'];
                _this.$total({ message: res.msg,type: 1 });
              }else{
                _this.$total({ message: res.msg,type: 0 });
              }
            }
          });
        }else{
          if(_this.initial['username'] != '' || _this.initial['number'] !=''){
            _this.$total({ message: '无法修改银行卡信息',type: 2 });
            return false;
          }else if(_this.form['number'] == '' || _this.form['number'].length < 16 || _this.form['number'].length > 19){
            _this.$total({ message: '请输入正确的银行卡号',type: 2 });
            return false;
          }else if( _this.form['username'] == ''){
            _this.$total({ message: '请输入开户姓名',type: 2 });
            return false;
          }else if( _this.form['branch'] == ''){
            _this.$total({ message: '请输入开户支行',type: 2 });
            return false;
          }else if(_this.form['name'] == ''){
            _this.$total({ message: '请选择开户银行',type: 2 });
            return false;
          }

        // form: {
        //   password:'',
        //   username: '',
        //   name: '',
        //   number: '',
        //   branch: ''
        // },

        // _this.$messagebox.confirm('为保证账户安全，银行卡信息一旦设置，无法更改！请仔细填写！', '提示').then(()=>{
          _this.$getData({
            loading:true,
            url:'/api/home/my/editBank',
            data: _this.form,
            callback: function(data){
              _this.form.password = '';
              if(data.code > 0){
                _this.$total({ message: data.msg,type: 1});
                if(_this.checkPWD == 1){
                  for(var k in _this.initial){
                    _this.initial[k] = _this.form[k];
                  }
                  _this.$messagebox.confirm('您还未设置提现密码，需要前往设置吗？', '设置提现密码').then(()=>{
                    _this.$router.push('/My/bank/chasing_password');
                  });
                  if(_this.phone == ''){
                    _this.phone = _this.form['phone'];
                  }
                }else{
                  setTimeout(function(){
                    _this.$router.push('/Capital/moneyOut');
                  },1000);
                }
              }else{
                _this.$total({ message: data.msg,type: 0 });
              }
            }
          });
          
         // },()=>{
         //    // alert(1);
         // });
        }
      },
    }
  }
</script>
<style scoped>
</style>
