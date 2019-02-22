<template>
  <div>
      <div class="top_btn" :style="{height: top_btn_height + 'px'}">
        <img class="back-img" src="~@/assets/images/lhj/back.png" alt="" @click="$router.back()">
        <img class="tiger_help" src="~@/assets/images/lhj/about.png" alt="" @click="helpPlane" ref="helpimg" @load="setHeight()">
      </div>
      <div class="loding"></div>

      <img class="bg_img" :style="{display: bg_is_show}" src="~@/assets/images/lhj/gameBg.jpg" alt="">

     <iframe :style="{display: is_show}" class="game_box" :src="src" ref="iframebox" width="100%" height="100%" @load="loaded"></iframe>

      <modal @on-close="close" :show="help_show" title="规则说明" btn-str="确认">
        <img src="~@/assets/images/lhj/help1.png" alt="">
        <br>
        <img src="~@/assets/images/lhj/help2.png" alt="">
      </modal>
  </div>
</template>

<script>
// this.$parent.changeDonw();
import Modal from '@/components/Modal';

export default {
  name:'lhj',
  data() {
    return {
      bg_is_show: 'block',
      is_show: 'none',
      help_show: false,
      top_btn_height: 0,
      iframe_height: 0
    }
  },
  components: {
    Modal
  },
  computed: {
    src() {
      return '//' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + '/game/lh/?a=24&level=' + this.$route.params.level + (this.$store.state.login ? '&token=' + localStorage.getItem('pragma') : '');
    }
  },
  destroyed () { //组件销毁后调用
    this.$store.state.error_num = false;
  },
  // mounted(){
  //   this.$store.state.error_num = true;
  // },
  created() {
    this.$store.state.error_num = true;
    this.$store.commit('setData', { key: 'loading', value: true });

      window.addEventListener('message',(event) =>{
              //此处执行事件
              let data = event.data;
              if (data.name == 'pay') {
                this.$router.push('/Capital');
              }
      })

  },
  methods:{
    loaded() {
      this.is_show = 'block';
      // this.bg_is_show = 'none';
      this.$store.commit('setData', { key: 'loading', value: false });
    },
    helpPlane() {
      this.help_show = true;
    },
    close() {
      this.help_show = false;
    },
    setHeight() {
      this.top_btn_height = this.$refs.helpimg.offsetHeight
    }
  }
}
</script>

<style scoped>
  .game_box, .max_bg {
    position:absolute;
    top: 0;
    border:0px;
    padding: 0;
    margin: 0;
    /* margin-bottom:50px; */
  }
  .top_btn {
    position: absolute;
    z-index: 9;
    top: 3%;
    width: 100%;
  }
  .max_bg {
  }
  .back-img {
    position: absolute;
    top: 3%;
    left: 5%;
    width: 4%;
    height: auto;
    z-index: 10;
  }
  .bg_img {
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    list-style: none;
  }
  .tiger_help {
    position: absolute;
    width: 9%;
    top: -25%;
    right: 8%;
    z-index: 10;
}
</style>
