<template>
  <div id="app">
    <main class="kd-body">
      <div class="empty_class" v-if="tip">{{ tip }} </div>
       <ul class="nostyle kd-container kd-list data-list" v-else>
         <li class="item kd-box data" :style="{ borderTop:'5px solid ' + $store.state.basic.main_color }">
           <div class="data-item">
             <span class="data-item-key">收款方式：</span><span class="data-item-value">
               {{ select_active.bank_name }}
               <span class="copy" :data-clipboard-text="select_active.bank_name" @click="copy">复制</span>
             </span>
           </div>

           <div class="data-item"><span class="data-item-key">{{select_active.name == 'payalipay' ? '支付宝号：' : (select_active.name == 'payweixin' ? '微信号：' : '收款账号：') }}</span><span class="data-item-value">
             {{ select_active.number }}
             <span class="copy" :data-clipboard-text="select_active.number" @click="copy(select_active.name,select_active.number)">复制</span></span>
           </div>

           <div  class="data-item" v-show="select_active.user_name"><span class="data-item-key">{{(select_active.name == 'payweixin' ||  select_active.name == 'payalipay') ? '支付类型：':'收款户名：'}}</span><span class="data-item-value">
             {{ select_active.user_name }}
             <span class="copy" :data-clipboard-text="select_active.user_name" @click="copy">复制</span></span>
           </div>
           <div class="data-item" v-if="select_active.qr_code">
             <!-- <span class="data-item-key">二维码：</span> -->
             <!--支付宝页面效果-->
             <div :class="['zfb_z_div',{'wx_z_div':select_active.name == 'payweixin'}]">
               <div class="zfb_z_logo">
                 <img v-if="select_active.name == 'payalipay'" src="../../../assets/images/zfb_w.png" />
                 <img v-else-if="select_active.name == 'payweixin'" src="../../../assets/images/wx_w.png" />
               </div>
               <div class="zfb_z_text"><span>{{select_active.slogan}}</span></div>
               <div :class="['zfb_z_qrd',{'wx_z_qrd':select_active.name == 'payweixin'}]">
                 <div :class="['zfb_z_qr',{'wx_z_qr':select_active.name == 'payweixin'}]" @click="showToast=true">
                   <img :src="'//' + ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + select_active.qr_code" />
                 </div>
                 <div class="zfb_z_lit"></div>
                 <div class="zfb_z_lit"></div>
                 <div class="zfb_z_lit"></div>
                 <div class="zfb_z_lit"></div>
               </div>
               <div class="zfb_z_note">{{ select_active.explain }}</div>
             </div>

           </div>
           <br/>
           <mt-field label="充值金额：" :placeholder="(select_active.min ? select_active.min : 1) + '~' + (select_active.max ? select_active.max : 99999)" v-model="form.money" type="number"></mt-field>
           <mt-field v-if="select_active.name == 'payalipay' || select_active.name == 'payweixin'" label="订单号码：" placeholder="订单后4位(必填)" v-model="form.name"></mt-field>
           <mt-field v-else label="付款账号：" placeholder="账号后4位(必填)" v-model="form.name"></mt-field>
           <!-- <mt-field label="个人备注：" placeholder="备注信息(选填)" v-model="form.msg"></mt-field> -->
           <!-- <mt-field label="付款备注：" placeholder="备注" v-model="form.msg"></mt-field>
           <div class="data-item" v-show="select_active.explain">
             <span style="color:red">注：</span>
             <span class="data-item-value" style="width:100%;text-indent:2em">{{ select_active.explain }}</span>
           </div> -->

           <div class="data-item"><div type="button" class="kd-button main-button" @click="submit" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span>提 交</span> <button type="button">Button</button></div></div>
         </li>
       </ul>
    </main>
    <!--图片放大功能-->
    <div >

      <x-dialog v-model="showToast" class="dialog-demo">
        <div style="padding:15px;" @click="showToast=false">
          <img :src="'//' + ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + select_active.qr_code"  width="100%" height="100%"/>
        </div>
        <div @click="showToast=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

  </div>
</template>
<script>
  import Clipboard from 'clipboard';
  import { XDialog } from 'vux'
  export default{
    mounted(){
      this.judgePhone();
      this.getInfo();
    },
    components:{
      XDialog
    },
    data () {
      return {
        showToast:false,
        tip: '加载中...',
        select_active: {},
        form: { money: '',name: '',msg: '' },
        //判断是否是手机登录
        phone:false
      }
    },
    methods: {
      copy(type = '',val = '') {
        let clipboard = new Clipboard('.copy')
        ,_this = this;
        clipboard.on('success', e => {
          _this.$toast({message:'成功复制',duration:1000});
          if(type == 'payweixin'){

            if(_this.phone){
              _this.$total({ message: '您成功复制微信号('+ val +')',type: 1 });
              _this.$messagebox.confirm('您成功复制微信号 '+ val +'，前往微信添加好友？', '提示').then(() =>{
                window.location.href='weixin://';
              }).catch(()=>{

              });
            }
          }
          clipboard.destroy();
        })
        clipboard.on('error', e => {
          _this.$toast({message:'该浏览器不支持自动复制',duration:1000});
          // 释放内存
          clipboard.destroy();
        })
      },
      //判断是否手机登录
      judgePhone(){
        let ua = navigator.userAgent;
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
        if(isMobile){
          this.phone = true;
        }
      },
      getInfo(){
        let _this = this;
        _this.$getData({
          url:'/api/Home/Capital/orderDetails',
          data: { type: _this.$route.params.id },
          callback: function(res){
            if(res.code){
              _this.$set(_this,'select_active',res.data);
              _this.$store.commit('setData',{ key:'title',value:res.data.bank_name + '订单' });
              _this.tip = false;
            }else{
              _this.tip = res.msg;
            }
          }
        });
      },
      submit(){
        let _this = this;
        if(!/^\d+$/.test(_this.form.money) || _this.form.money < 1){
          _this.$total({ message:'充值金额有误',type: 2 });
        }
        else if(_this.select_active.min > 0 && _this.form.money < _this.select_active.min){
          _this.$total({ message:'最低充值金额' + _this.select_active.min,type: 2 });
        }
        else if(_this.select_active.max > 0 && _this.form.money > _this.select_active.max){
          _this.$total({ message:'最高充值金额' + _this.select_active.max,type: 2 });
        }
        else if(_this.form.name == ''){
          _this.$total({ message:'请填写付款人',type: 2 });
        }
        else{
          _this.form.bank = _this.select_active.name;
          _this.$getData({
            loading:true,
            url:'/api/Home/Capital/bankSubmit',
            data: _this.form,
            callback: function(res){
              // console.log(res);
                _this.$total({ message:res.msg,type: 1 });
                if(res.code > 0){
                  _this.form = { name: '',money: '',msg: '' };
                  setTimeout(function(){
                    _this.$router.push('/');
                  },1000);
                }
            }
          });
        }
      }
    }
  }
</script>

<style scoped>

  .zfb_z_div{
    /* height:500px; */
    width:100%;
    padding-bottom:50px;
    background:#00a3ea;
    padding-top:20px;
  }
  .zfb_z_note{
    margin-top:5%;
    font-size:1rem;
    width:90%;
    margin:0 auto;
    font-weight:bold;
    text-align:center;
    margin-top:5%;
    color:#fff;
    text-shadow: 0 0 black, 1px 1px 5px black, 0px 0 black, 0 0px black ;
    -webkit-text-fill-color: white;  /*文字的填充色*/
    -webkit-text-stroke: 1px black;   /*描边的像素，也就是粗细，这里指定是2像素的黑色边框*/
  }
  .zfb_z_logo{
    width:60%;
    height:70px;
    margin:0 auto;
  }
  .zfb_z_logo img{
    width:100%;
    height:100%;
  }
  .zfb_z_text {
    /* height:30px; */
    text-align:center;
    background:#fff;
    color:#fff;
    line-height:25px;
    font-size:18px;
    width:70%;
    border-radius:2em;
    margin:8% auto;
    font-weight:bold;
    text-shadow: 0 1px black, 1px 0 black, -1px 0 black, 0 -1px black;
    /*-webkit-text-fill-color: white;  /*文字的填充色*/
    /*-webkit-text-stroke: 1px black;   /*描边的像素，也就是粗细，这里指定是2像素的黑色边框*/
  }


  .zfb_z_qr{
    position: absolute;
    height: 97%;
    width: 97%;
    margin:1.5% 1.5%;
    padding:5%;
    background:#00a3ea ;
    z-index: 1;
  }
  .zfb_z_qr img{
    width: 100%;
    height: 100%;
  }
  .zfb_z_qrd{
    position: relative;
    width:70%;
    background:#00a3ea;
    margin:0 auto;
    padding-bottom:70%;
  }
  .zfb_z_lit {
    height:20px;
    width: 20px;
    background: #fff;
    position: absolute;
  }
  .zfb_z_lit:nth-child(2){
    right:0;
  }
  .zfb_z_lit:nth-child(3){
    bottom:0;
  }
  .zfb_z_lit:nth-child(4){
    right:0;
    bottom:0;
  }
  .wx_z_div{
    background:#06ae4f;
  }
  .wx_z_qr{
    background: #06ae4f;
  }
  .wx_z_qrd{
    background: #06ae4f;
  }
  .copy {
    float: right;
    color: #008ca5;
  }
  .empty_class {
    text-align: center;
    color: #999;
  }
</style>
