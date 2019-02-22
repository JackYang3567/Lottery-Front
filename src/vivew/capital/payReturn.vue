<template>
  <div id="app">
    <main class="kd-body" >
      <div class="w_true">
        
        <div :class="['myicon-tick-checked ' + ($route.params.type == 1 ? '' : 'tick_false' )]"></div>
        <template v-if="$route.params.type == 1">
          <div class="w_text"> 支付成功 </div>
          <div class="w_text"> ￥<i style="color:red;">{{num}}</i> </div>
        </template>
        <template v-else>
          <div class="w_text"> 支付失败！ </div>
          <div class="w_text" style="font-size:14px;color:#555;"> 提示：如遇到支付问题请联系客服 </div>
        </template>
        <div style="width:60%;margin:0 auto;">
          <div type="button" class="kd-button main-button" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">
            <span>点击返回({{time}})</span>
            <!--submit judge -->
              <input type="button" @click="back()"></input>
          </div>
        </div>
      <!-- </div> -->
      <!-- <div class="w_false">
        <div class="if"></div> -->
      </div>
    </main>
    
  </div>
</template>

<script>
  export default {
    mounted () {
      if(this.$route.params.type == 1){
        this.num = this.$route.params.num;
      }else{
        this.time = 6;
      }
      this.desc();
    },
    destroyed () { //组件销毁后调用
      this.lunxun = false;
    },
    data () {
      return {
        lunxun:true,
        num:0,
        time:4,
      }
    },
    methods:{
      back(){
        this.$router.push('/');
      },
      desc(){
        this.time -= 1;
        if(!this.lunxun){return;}
        if(this.time <= 0){
          this.back();
        }
        setTimeout(()=>{
          this.desc();
        },1000)
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
  .w_true{
    padding-top:10%;
  }
  .w_text{
    font-weight: bold;
    margin:50px;
    text-align: center;
    font-size: 25px;
  }
  .mone-in-out .account-sub-nav li{
    width:25%;
  }
  .active_effect{
    position: absolute;
    bottom: 0;
    left:0;
    transition: left 0.2s ease-in-out;
    width:25%;
    height:3px;
  }

  /**绿色勾*/
  .myicon-tick-checked {
    /* display: inline-block; */
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin:0 auto;
    background-color: #2ac845;
  }


  /**灰色勾*/
  /* .myicon-tick-uncheck {
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #5f646e;
  } */


  .myicon-tick-checked:before, .myicon-tick-checked:after{
    content: '';
    pointer-events: none;
    position: absolute;
    color: white;
    border: 1px solid;
    background-color: white;
  }

  .myicon-tick-checked:before {
    width: 30px;
    height: 10px;
    left: 20%;
    top: 59%;
    transform: skew(0deg,45deg);
  }


  .myicon-tick-checked:after {
    width: 50px;
    height: 10px;
    left: 45%;
    top: 52%;
    transform: skew(0deg,-45deg);
  }

  .tick_false {
    background-color: #c82a2a;
  }
  .tick_false:before{
    border-radius:50%;
    width: 60px;
    height: 10px;
    left: 25%;
    top: 45%;
  }
  .tick_false:after{
    border-radius:50%;
    width: 60px;
    height: 10px;
    left: 25%;
    top: 45%;
  }
</style>
