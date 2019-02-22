<template>
  <div class="lottery-wrapper">
    <div class="g_card_box">
      <router-link v-for="(item, key) of list" :key="key" class="g_card" :to="item.path" v-if="item.status">
        <div class="g_card_item" :style="{background: 'url(' + item.bg + ')'}">
          <img class="g_icon_s" :src="item.icon"/>
          <div class="g_info_box">
            <div class="g_name_str">{{item.name}}</div>
            <div class="g_info_str">{{item.info}}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  data () {
    return {
      list: [
        {
          name: '百家乐',
          info: '游戏说明',
          icon: require('@/assets/images/gpark/bg0.png'), //游戏图标路劲
          bg: require('@/assets/images/gpark/card_bg.jpg'), //背景
          path: '/Bjl/0',
          status: 1
        },
        {
          name: '龙虎斗',
          info: '游戏说明',
          icon: require('@/assets/images/gpark/bg1.png'), //游戏图标路劲
          bg: require('@/assets/images/gpark/card_bg.jpg'), //背景
          path: '/Lhd/1',
          status: 1
        },
        {
          name: '百人牛牛',
          info: '游戏说明',
          icon: require('@/assets/images/gpark/bg3.png'), //游戏图标路劲
          bg: require('@/assets/images/gpark/card_bg.jpg'), //背景
          path: '/game-brnn/52',
          status: 1
        },
        {
          name: '水果拉霸',
          info: '想开就开',
          icon: require('@/assets/images/gpark/bg2.png'), //游戏图标路劲
          bg: require('@/assets/images/gpark/card_bg.jpg'), //背景
          path: '/game-lhj/53',
          status: 1
        },
        {
          name: '沉鱼落雁',
          info: '想开就开',
          icon: require('@/assets/images/gpark/bg4.png'), //游戏图标路劲
          bg: require('@/assets/images/gpark/card_bg.jpg'), //背景
          path: '/game-lhj/54',
          status: 1
        },
        {
          name: '忍者神龟',
          info: '想开就开',
          icon: require('@/assets/images/gpark/bg5.png'), //游戏图标路劲
          bg: require('@/assets/images/gpark/card_bg.jpg'), //背景
          path: '/game-lhj/55',
          status: 1
        },
      ]
    }
  },
  methods: {},
}
</script>

<style scoped>
.lottery-wrapper {
  border-bottom: none;
  bottom: 0;
}
.g_card_box {
  display: flex;
  margin: .5rem;
  flex-wrap: wrap;
}
.g_card {
  padding: 1rem .5rem;
  width: 50%;
}
.g_card_item {
  position: relative;
  height: 6rem;
  box-shadow: 0 0 .5rem #c6cbd2;
  border-radius: .25rem;
  background: url();
  background-size: 100% 100%;
}
.g_icon_s {
  position: absolute;
  top: -1rem;
  width: auto;
  height: 7rem;
}
.g_info_box {
  position: absolute;
  display: flex;
  flex: 1;
  top: 0;
  bottom: 0;
  left: 4rem;
  right: 0;
  color: #FFF;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.g_name_str,
.g_info_str
{
  padding: .25rem 0;
  background: rgba(0, 0, 0, .6);
}
.g_name_str {
  font-size: 1.2rem;
  border-radius: .5rem 0 0 0;
}
.g_info_str {
  font-size: #e0e0e0;
  border-radius: 0 0 0 .5rem;
}
</style>
