<template>
  <div id="app" style="height:0;"> <!-- position:relative; -->
    <main class="kd-body activities">
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange" topPullText="" topDropText="" topLoadingText="加载中" :distanceIndex="1">
        <ul class="nostyle kd-list activities" v-infinite-scroll="loadMore" infinite-scroll-disabled="dataOver" infinite-scroll-distance="10">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate-180': topStatus === 'drop' }">
                  <img src="../../assets/images/svg/more.svg">
              </span>
            </div>
            <li class="item" v-for="item in data">
              <a :href="'#/discount-son/'+item.id" class="activity-box">
                <i :class="['icon icon-activity-' + (item.cat_id + 54)]"></i>
                <span class="activity-title">{{ item.title }}</span>
              </a>
            </li>
            <li class="more_loading" style="text-align:center;">
              <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color" v-show="!dataOver"></mt-spinner>
              <span style="color:#bfbfbf" v-show="dataOver">—— 数据加载完了 ——</span>
            </li>
        </ul>
      </mt-loadmore>
    </main>
  </div>
</template>

<script>
export default {
  created(){
    this.initialization();
  },
  // 55 - 70 不同的类型的图标
  data () {
    return {
      loading: false,
      topStatus: 'pull',
      dataOver: false,
      page: 1,
      data:[]
    }
  },
  methods: {
    initialization(){
      let _this = this;
      if(this.$route.path in this.$store.state.all_chat){
        this.data = this.$store.state.all_chat[this.$route.path]['list'];
        this.page = this.$store.state.all_chat[this.$route.path]['page'];
      }
      this.loadMore();
    },
    loadTop() {
      if(this.loading) return;
      this.loading = true;
      let _this = this;
      _this.$getData({
        data:{ id: (_this.data.length ? _this.data[0].id : 0) },
        url:'/api/home/Discount/getInfo',
        callback: function(data){
          if(data.length){
             _this.data = data.concat(_this.data);
             _this.$store.state.discount['list'] = _this.data;
          }
          _this.$total({ message:'获得'+data.length+'条最新优惠',duration:1000,type: 1 });
          _this.loading = false;
          _this.allLoaded = true;
          _this.$refs.loadmore.onTopLoaded();
        }
      });
    },
    loadMore() {
      if(this.loading) return;
      this.loading = true;
      let _this = this;
      _this.$getData({
        data:{ page:_this.page },
        url:'/api/home/Discount/getInfo',
        callback: function(res){
          if(res.data.length){
           _this.data = _this.data.concat(res.data);
           _this.page = parseInt(res.current_page) + 1;
           _this.$store.state.all_chat[_this.$route.path] = { list:_this.data,page:_this.page };
          }
          if(res.data.length < res.per_page){
            _this.$set(_this,'dataOver',true);
          }
          _this.loading = false;
        }
      });
    },
    handleTopChange(status) {
      this.topStatus = status;
    }
  }
}
</script>

<style scoped>
  .activities{
    min-height: 300px;
  }
</style>
