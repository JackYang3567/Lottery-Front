<template>
  <div class="bg_color">
    <div class="kd-body main">
      <div class="room">
        <router-link class="room_list" v-for="(item, key, index) in list" :key="index" :to="'/game-lhj-play/' + key">
          <img src="~@/assets/images/lhj/cover.png" alt="">
          <div class="room_info">水果拉霸{{item}}元场</div>
        </router-link>
        
        <router-link class="room_list" v-for="(item, key, index) in list2" :key="index" :to="'/game-lhj-play-2/' + key">
          <img src="~@/assets/images/lhj2/cover.png" alt="">
          <div class="room_info">沉鱼落雁{{item}}元场</div>
        </router-link>
        
        <router-link class="room_list" v-for="(item, key, index) in list3" :key="index" :to="'/game-lhj-play-3/' + key">
          <img src="~@/assets/images/lhj3/cover.png" alt="">
          <div class="room_info">忍者神龟{{item}}元场</div>
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
      ROOM_LIST: '/api/home/lottery_lh/getRoomList',
      ROOM_LIST2: '/api/home/lottery_lh/getRoomList?type=1',
      ROOM_LIST3: '/api/home/lottery_lh/getRoomList?type=2',
      list: [],
      list2: [],
      list3: [],
    }
  },
  computed: {

  },
  methods:{
  },
  created() {
    this.$getData({
      loading: true,
      url: this.ROOM_LIST,
      callback: res => this.list = res
    });
    
    this.$getData({
      loading: true,
      url: this.ROOM_LIST2,
      callback: res => this.list2 = res
    });

    this.$getData({
      loading: true,
      url: this.ROOM_LIST3,
      callback: res => this.list3 = res
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
  background: linear-gradient(#479cd6, #88ceff);
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
  width: 33.33%;
  padding: .5rem;
}
.room_info {
  text-align: center;
  font-size: .6rem;
  background: #ff8502;
  color: #ffffff;
  padding: .35rem 0;
  border-radius: .8rem;
}
</style>
