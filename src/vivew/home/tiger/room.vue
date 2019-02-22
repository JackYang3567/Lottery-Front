<template>
  <div class="bg_color">
    <div class="kd-body main">
      <div class="room" v-if="list.length">
        <router-link class="room_list" v-for="(item, key, index) in list" :key="index" :to="'/game-tiger/' + key" v-if="key < 4">
          <img class='room_img' :src="img[key]" alt="">
          <div class="room_info">{{item == 0 ? '':(item+'元场')}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// this.$parent.changeDonw();
export default {
  data() {
    return {
      list: [],
      img:[
        require('@/assets/images/tiger/cover0.png'),
        require('@/assets/images/tiger/cover1.png'),
        require('@/assets/images/tiger/cover2.png'),
        require('@/assets/images/tiger/cover3.png'),
      ],
    }
  },
  computed: {

  },
  methods:{
  },

  created() {
    let _this = this;
    this.$getData({
      loading: true,
      url: '/api/home/Lottery_lh/gameTigerConfig',
      callback: function(res){
        // console.log(res);return;
        if(res['switch'] == 0){
          _this.$total({ message:'此游戏暂时关闭',type: 2 });
          _this.$router.push('/');
        }else{
          _this.$set(_this,'list',res['basic_config']['room']);
        }
      }
    });
  }
}
</script>
<style>
.bg_color {
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(#d366d9, #88ceff);
}
</style>

<style scoped>
.main {
  position:absolute;
  z-index: 3;
}
.room {
  display: flex;
  flex-wrap: wrap;
}
.room_list {
  /* width: 33.33%; */
  width: 50%;
  padding: .5rem;
}
.room_info {
  position:relative;
  color:#997457;
  font-size: .6rem;
  font-weight: bold;
  bottom:15%;
  left:40%;
  z-index: 6;
  /* text-align: center;
  font-size: .6rem;
  background: #ff8502;
  color: #ffffff;
  padding: .35rem 0;
  border-radius: .8rem; */
}

.room_img{
  max-width: 90%;
  height: auto;
  margin: 0 auto;
  border: none;
  display: block;
}
</style>
