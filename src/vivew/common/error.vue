<template>
    <div style="height:0;">
      <div class="error_bg ">
        <!-- <img class="error_img" src="~@/assets/images/error.png"/> -->
        <img class="error_img"  v-if="$store.state.basic.web_state == 0"  src="~@/assets/images/maintain.png">
        <img class="error_img" v-else src="~@/assets/images/error1.png">
        <div class="error_text">

          <template v-if="$store.state.basic.web_state == 0">
            <div class="error-desc" style="font-size: 2rem;color:#0192df;">
                正在维护...
            </div><br/>
          </template>
          <span v-else style="font-size:1.5rem;"><a @click="$router.push('/')">(迷路了!点击送我回去~)</a></span>
        </div>
      </div>

      <!-- <div style="position:absolute;background-color:#f3f3f4;color:#676a6c;width:100%;height:100%;margin:0 auto; text-align:center; padding:20% 0 0 0;">
        <div style="">
                <h1 class="h_size">404</h1>
                <h3 class="font-bold">页面未找到！</h3><br>

            </div>
      </div> -->
    <!-- <main class="kd-body">

     </main> -->
   </div>
</template>

<script>
  export default {
      destroyed () { //组件销毁后调用
        this.$store.state.error_num = false;
      },
      mounted(){
        this.$store.state.error_num = true;
      },
      data () {
        return {
        }
      },
      watch:{
      },
      computed:{
      },
      methods:{

      }
  }
</script>

<style scoped>

.error_bg{
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
  max-width: 640px;
  overflow: hidden;
  /* background-color:#ffffff; */
  /* background: url(~@/assets/images/error.png) 100% 100% no-repeat; */
}

.errcolor{
  background: #98d9ca;
}

.error_img{
  /* position: absolute; */
  /* z-index: 3; */
  display:block;
  margin:70px auto;
  height:300px ;
  width:300px ;
  background-color:#ffe1b1;
  border-radius: 20%;
}
.error_text{
  position: absolute;
  z-index: 4;
  width: 100%;
  text-align: center;
  color:#555;
  top:65%;
}
.h_size{
  font-size:18rem;
}
@media (max-width:450px){
  .h_size{
    font-size:50vw;
  }
}
 /* @import "../../assets/css/errorcss/bootstrap.min.css"; */
 /* @import "../../assets/css/errorcss/style.css"; */
/*
 @import "../../../assets/css/jczq/style.css";
 @import "../../assets/css/jczq/basic.css";
 @import "../../assets/css/jczq/index.css"; */
</style>
